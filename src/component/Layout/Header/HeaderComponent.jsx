import React, { Fragment } from 'react'
import NavbarComponent from './Navbar/NavbarComponent'
import TopbarComponent from './Topbar/TopbarComponent'


function HeaderComponent() {
  
  return (
    
    <Fragment>
      <TopbarComponent/>
      <NavbarComponent/>
      
    </Fragment>
  )
}

export default HeaderComponent