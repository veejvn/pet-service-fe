import React from "react";
import HeroComponent from "../../component/Home/HeroComponent";
import AboutComponent from "../../component/Home/AboutComponent";
import OfferComponent from "../../component/Home/OfferComponent";
import PricingPlanComponent from "../../component/Home/PricingPlanComponent";
import TeamComponent from "../../component/Home/TeamComponent";
import TestimonialComponent from "../../component/Home/TestimonialComponent";
import ServicesComponent from "../../component/Home/ServicesComponent";

function HomePage() {
  return (
    <div>
      <>
        <HeroComponent />
        <AboutComponent />
        <ServicesComponent limit={3} />
        <OfferComponent />
        <PricingPlanComponent />
        <TeamComponent />
        <TestimonialComponent />
      </>
    </div>
  );
}

export default HomePage;
