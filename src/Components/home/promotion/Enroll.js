import React, { Component } from 'react'
import Fade from 'react-reveal/Fade'
import FormField from '../../misc/FormFields'
import { validate } from '../../misc/misc'
import { firebasePromotions } from '../../../firebase'

class Enroll extends Component {

  state = {
    formError: false,
    formSuccess: '',
    formData: {
      email: {
        element: 'input',
        value: '',
        config: {
          name: 'email_input',
          type: 'email',
          placeholder: 'Enter you email'
        },
        validation: {
          required: true,
          email: true,
        },
        valid: false,
        validationMessage: ''
      }
    }
  }

  resetFormSuccess = (type) => {
    const newFormdata = {...this.state.formData}

    for (let key in newFormdata) {
      newFormdata[key].value = ''
      newFormdata[key].valid = false
      newFormdata[key].validationMessage = ''
    }

    this.setState({
      formError: false,
      formData: newFormdata,
      formSuccess: type ? 'Congratulations!' : 'Already on the database'
    })
  }

  submitForm(event) {
    event.preventDefault()

    let dataToSubmit = {}
    let formIsValid = true

    for(let key in this.state.formData) {
      dataToSubmit[key] = this.state.formData[key].value
      formIsValid = this.state.formData[key].valid && formIsValid
    }
    if(formIsValid) {
      firebasePromotions.orderByChild('email').equalTo(dataToSubmit.email).once('value')
      .then((snapshot) => {
        if(snapshot.val() === null) {
          firebasePromotions.push(dataToSubmit)
          this.resetFormSuccess(true)
        }else {
          this.resetFormSuccess(false)
        }
      })

      // console.log(dataToSubmit)
      // this.resetFormSuccess()
    }else {
      this.setState({
        formError: true
      })
    }
  }

  updateForm(element) {
    const newFormdata = {...this.state.formData}
    const newElement = {...newFormdata[element.id]}

    newElement.value = element.event.target.value

    let vaildData = validate(newElement)
    newElement.valid = vaildData[0]
    newElement.validationMessage = vaildData[1]

    // console.log(newElement)
    newFormdata[element.id] = newElement

    this.setState({
      formError: false,
      formData: newFormdata
    })
  }

  render() {
    return (
      <Fade>
        <div className="enroll_wrapper">
          <form onSubmit={(event) => this.submitForm(event)}>
            <div className="enroll_title">
              Enter your email
            </div>
            <div className="enroll_input">
              <FormField 
                id={'email'}
                formdata={this.state.formData.email}
                change={(element)=> this.updateForm(element)}
              />
              {
                this.state.formError ? 
                  (<div className="error_label">Something is wrong, try again.</div>)
                :null
              }
              <div className="success_label">{this.state.formSuccess}</div>
              <button onClick={(event) => this.submitForm(event)}>Enroll</button>
              <div className="enroll_discl">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum, quam.
              </div>
            </div>
          </form>
        </div>
      </Fade>
    )
  }
}

export default Enroll
