import React from 'react';
import { Switch } from 'react-router-dom'

import Layout from './Hoc/Layout'

import Home from './Components/home'
import SignIn from './Components/signin'

import Dashboard from './Components/admin/Dashboard'
import AdminMatches from './Components/admin/matches'
import AddEditMatch from './Components/admin/matches/addEditMatch'
import AdminPlayers from './Components/admin/players'
import AddEditPlayers from './Components/admin/players/addEditplayers'

import PrivateRoute from './Components/authRoutes/PrivateRoutes'
import PublicRoutes from './Components/authRoutes/PublicRoutes'

const Routes = (props) => {
  // console.log(props)
  return(
    <Layout>
      <Switch>
        <PrivateRoute {...props} exact component={Dashboard} path="/dashboard" />
        <PrivateRoute {...props} exact component={AdminPlayers} path="/admin-players" />
        <PrivateRoute {...props} exact component={AddEditPlayers} path="/admin-players/edit-player/:id" />
        <PrivateRoute {...props} exact component={AddEditPlayers} path="/admin-players/edit-player" />
        <PrivateRoute {...props} exact component={AdminMatches} path="/admin-matches" />
        <PrivateRoute {...props} exact component={AddEditMatch} path="/admin-matches/edit-match" />
        <PrivateRoute {...props} exact component={AddEditMatch} path="/admin-matches/edit-match/:id" />
        <PublicRoutes {...props} restricted={true} exact component={SignIn} path="/sign-in" />
        <PublicRoutes {...props} restricted={false} exact component={Home} path="/" />
      </Switch>
    </Layout>
  )
}

export default Routes;
