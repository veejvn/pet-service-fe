import React from 'react'
import OfferComponent from '../../component/Home/OfferComponent'
import PricingPlanComponent from '../../component/Home/PricingPlanComponent'
import ProductsComponent from '../../component/Product/ProductsComponent'

function ProductsPage() {
  return (
    <div>
      <>
        < ProductsComponent/>
        <OfferComponent/>
        <PricingPlanComponent/>
      </>
    </div>
  )
}

export default ProductsPage