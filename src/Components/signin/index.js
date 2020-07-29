import React, { Component } from 'react'
import { firebase } from '../../firebase'

import FormField from '../misc/FormFields'
import { validate } from '../misc/misc'

class SignIn extends Component {
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
      },
      password: {
        element: 'input',
        value: '',
        config: {
          name: 'password_input',
          type: 'password',
          placeholder: 'Enter you password'
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: ''
      }
    }
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
      firebase.auth()
      .signInWithEmailAndPassword(
        dataToSubmit.email,
        dataToSubmit.password
      ).then(() => {
        this.props.history.push('/dashboard')
      }).catch(error => {
        this.setState({
          formError: true
        })
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

    newFormdata[element.id] = newElement
    // console.log(newFormdata)

    this.setState({
      formError: false,
      formData: newFormdata
    })
  }

  render() {
    return (
      <div className="container">
        <div className="signin_wrapper" style={{margin: '100px'}}>
          <form onSubmit={(event) => this.submitForm(event)}>
            <h2>Please Login</h2>

            <FormField 
              id={'email'}
              formdata={this.state.formData.email}
              change={(element)=> this.updateForm(element)}
            />
            
            <FormField 
              id={'password'}
              formdata={this.state.formData.password}
              change={(element)=> this.updateForm(element)}
            />
            {
              this.state.formError ? 
                (<div className="error_label">Something is wrong, try again.</div>)
              :null
            }
            <button onClick={(event) => this.submitForm(event)}>Login</button>
          </form>
        </div>
      </div>
    )
  }
}

export default SignIn
