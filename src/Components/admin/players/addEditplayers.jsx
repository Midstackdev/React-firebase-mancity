import React, { Component } from 'react'
import AdminLayout from "../../../Hoc/AdminLayout";
import FormField from "../../misc/FormFields";
import { validate } from "../../misc/misc";
import FileUploader from '../../misc/fileUploader'

import { firebasePlayers, firebase, firebaseDB } from "../../../firebase";

export class AddEditPlayers extends Component {
  state = {
    playerId: "",
    formType: "",
    formError: false,
    formSuccess: "",
    defaultImg: "",
    teams: [],
    formData: {
      name: {
        element: "input",
        value: "",
        config: {
          name: "name_input",
          type: "text",
          label: "Player name",
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: "",
        showLabel: true,
      },
      lastname: {
        element: "input",
        value: "",
        config: {
          name: "lastname_input",
          type: "text",
          label: "Player last name",
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: "",
        showLabel: true,
      },
      number: {
        element: "input",
        value: "",
        config: {
          name: "number_input",
          type: "text",
          label: "Player number",
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: "",
        showLabel: true,
      },
      position: {
        element: "select",
        value: "",
        config: {
          name: "position_select",
          type: "select",
          label: "Slect a position",
          options: [
            {key:'Keeper', value:'Keeper'},
            {key:'Defence', value:'Defence'},
            {key:'Midfield', value:'Midfiled'},
            {key:'Striker', value:'Striker'},
          ],
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: "",
        showLabel: true,
      },
      image: {
        element: 'image',
        value: '',
        validation: {
          required: true,
        },
        valid:false
      }
    }
  }

  updateFields = (player, playerId, formType, defaultImg) => {
    const newFormdata = { ...this.state.formData}
    
    for(let key in newFormdata) {
      newFormdata[key].value = player[key]
      newFormdata[key].valid = true
    }

    this.setState({
      playerId,
      defaultImg,
      formType,
      formData: newFormdata
    })
    // console.log(newFormdata)
  }

  componentDidMount(){
    const playerId = this.props.match.params.id

    if(!playerId) {
      this.setState({
        formType: 'Add player'
      })
    }else {
      firebaseDB.ref(`players/${playerId}`).once('value')
      .then(snapshot => {
        const playerData = snapshot.val()

        firebase.storage().ref('players')
        .child(playerData.image).getDownloadURL()
        .then(url => {
          this.updateFields(playerData, playerId, 'Edit player', url)
        }).catch(error => {
          this.updateFields({
            ...playerData,
            image: ''
          }, playerId, "Edit player", '');
        })
      })
    }
  }

  successForm = (message) => {
    this.setState({
      formSuccess: message
    })

    setTimeout(() => {
      this.setState({
        formSuccess: '',
      });
    }, 2000)
  }

  submitForm(event) {
    event.preventDefault();

    let dataToSubmit = {};
    let formIsValid = true;

    for (let key in this.state.formData) {
      dataToSubmit[key] = this.state.formData[key].value;
      formIsValid = this.state.formData[key].valid && formIsValid;
    }

    this.state.teams.forEach((team) => {
      if (team.shortName === dataToSubmit.local) {
        dataToSubmit["localThmb"] = team.thmb;
      }
      if (team.shortName === dataToSubmit.away) {
        dataToSubmit["awayThmb"] = team.thmb;
      }
    });

    if (formIsValid) {
      if(this.state.formType === 'Edit player') {
        firebaseDB.ref(`players/${this.state.playerId}`)
        .update(dataToSubmit).then(() => {
          this.successForm('Update correctly')
        }).catch(error => {
          this.setState({
            formError: true
          })
        })
      }else {
        firebasePlayers.push(dataToSubmit).then(() => {
          this.props.history.push('/admin-players')
        }).catch(error => {
          this.setState({
            formError: true
          })
        })
      }
      // console.log(dataToSubmit)
      // this.resetFormSuccess()
    } else {
      this.setState({
        formError: true,
      });
    }
  }

  updateForm(element, content = '') {
    const newFormdata = { ...this.state.formData }
    const newElement = { ...newFormdata[element.id] }
    
    if (content === '') {
      newElement.value = element.event.target.value
    }else {
      newElement.value = content

    }

    let vaildData = validate(newElement)
    newElement.valid = vaildData[0]
    newElement.validationMessage = vaildData[1]

    newFormdata[element.id] = newElement
    // console.log(newFormdata)

    this.setState({
      formError: false,
      formData: newFormdata,
    });
  }

  resetImage = () =>{
    const newFormdata = { ...this.state.formData }
    newFormdata['image'].value = ''
    newFormdata['image'].valid = false

    this.setState({
      defaultImg: '',
      formData: newFormdata
    })
  }
  
  storeFilename = (filename) =>{
    this.updateForm({id: 'image'}, filename)
    // console.log(filename)
  }
  

  render() {
    return (
      <AdminLayout>
        <div className="editmatch_dialog_wrapper">
          <h2>{this.state.formType}</h2>
          <div>
            <form onSubmit={(event) => this.submitForm(event)}>
              <FileUploader
                dir="players"
                tag={"player image"}
                defaultImg={this.state.defaultImg}
                defaultImgName={this.state.formData.image.value}
                resetImage={() => this.resetImage()}
                filename={(filename)=> this.storeFilename(filename)}
              />

              <FormField
                id={"name"}
                formdata={this.state.formData.name}
                change={(element) => this.updateForm(element)}
              />

              <FormField
                id={"lastname"}
                formdata={this.state.formData.lastname}
                change={(element) => this.updateForm(element)}
              />

              <FormField
                id={"number"}
                formdata={this.state.formData.number}
                change={(element) => this.updateForm(element)}
              />

              <FormField
                id={"position"}
                formdata={this.state.formData.position}
                change={(element) => this.updateForm(element)}
              />

              <div className="success_label">{this.state.formSuccess}</div>
              {this.state.formError ? (
                <div className="error_label">Something went wrong</div>
              ) : null}
              <div className="admin_submit">
                <button onClick={(event) => this.submitForm(event)}>
                  {this.state.formType}
                </button>
              </div>
            </form>
          </div>
        </div>
      </AdminLayout>
    );
  }
}

export default AddEditPlayers
