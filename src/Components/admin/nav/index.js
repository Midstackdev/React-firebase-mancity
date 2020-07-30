import React from 'react'
import { Link } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem'
import { firebase } from '../../../firebase'

const AdminNav = () => {

  const links = [
    {
      title: 'Matches',
      linkTo: '/admin-matches'
    },
    {
      title: 'Add Matches',
      linkTo: '/admin-matches/edit-match'
    },
    {
      title: 'Players',
      linkTo: '/admin-players'
    },
    {
      title: 'Add Players',
      linkTo: '/admin-players/edit-player'
    },
  ]

  const style = {
    color: '#ffffff',
    fontWeight: '300',
    borderBottom: '1px solid #353535'
  }

  const logoutHandler = () => {
    
    firebase.auth().signOut().then(() => {
      console.log('Log out is successful')
    }, (error) => {
       console.log('Error logging out')
    })
  }
  
  const renderItems = () => (
    links.map(link => (
      <Link to={link.linkTo} key={link.title}>
        <ListItem button style={style}>
          {link.title}
        </ListItem>
      </Link>
    ))
  )

  return (
    <div>
      {renderItems()}
      <ListItem button style={style} onClick={()=> logoutHandler()}>
          Logout
        </ListItem>
    </div>
  )
}

export default AdminNav
