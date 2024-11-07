import React from 'react'
import AboutComponent from '../../component/Home/AboutComponent'
import OfferComponent from '../../component/Home/OfferComponent'
import TeamComponent from '../../component/Home/TeamComponent'

function AboutPage() {
  return (
    <div>
      <AboutComponent/>
        <OfferComponent/>
        <TeamComponent/>
    </div>
  )
}

export default AboutPage