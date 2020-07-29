import React from 'react';
import { Switch } from 'react-router-dom'

import Layout from './Hoc/Layout'

import Home from './Components/home'
import SignIn from './Components/signin'

import Dashboard from './Components/admin/Dashboard'
import AdminMatches from './Components/admin/matches'

import PrivateRoute from './Components/authRoutes/PrivateRoutes'
import PublicRoutes from './Components/authRoutes/PublicRoutes'

const Routes = (props) => {
  // console.log(props)
  return(
    <Layout>
      <Switch>
        <PrivateRoute {...props} exact component={Dashboard} path="/dashboard" />
        <PrivateRoute {...props} exact component={AdminMatches} path="/admin-matches" />
        <PublicRoutes {...props} restricted={true} exact component={SignIn} path="/sign-in" />
        <PublicRoutes {...props} restricted={false} exact component={Home} path="/" />
      </Switch>
    </Layout>
  )
}

export default Routes;
