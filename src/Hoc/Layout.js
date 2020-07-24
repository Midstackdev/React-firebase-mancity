import React from 'react'

import Header from '../Components/layouts/Header'
import Footer from '../Components/layouts/Footer'

const Layout = (props) => {
  return (
    <div>
      <Header />
      {props.children}
      <Footer/>
    </div>
  )
}

export default Layout
