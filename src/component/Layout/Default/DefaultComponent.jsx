import React from 'react'
import HeaderComponent from '../Header/HeaderComponent'
import FooterComponent from '../footer/FooterComponent'



function DefaultComponent({children}) {
  return (
    <div>
        <HeaderComponent/>
        {children}
        <FooterComponent/>
    </div>
  )
}

export default DefaultComponent