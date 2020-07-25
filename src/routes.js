import React from 'react';
import { Switch, Route } from 'react-router-dom'

import Layout from './Hoc/Layout'

import Home from './Components/home'

const Routes = (props) => {
  // console.log(props)
  return(
    <Layout>
      <Switch>
        <Route exact component={Home} path="/" />
      </Switch>
    </Layout>
  )
}

export default Routes;
