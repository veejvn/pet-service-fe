import React from 'react'

function OfferComponent() {
  return (
    <div>
  <div className="container-fluid bg-offer my-5 py-5">
    <div className="container py-5">
      <div className="row gx-5 justify-content-start">
        <div className="col-lg-7">
          <div className="border-start border-5 border-dark ps-5 mb-5">
            <h6 className="text-dark text-uppercase">Ưu đãi đặt biệt</h6>
            <h1 className="display-5 text-uppercase text-white mb-0">
              Giảm 50% toàn bộ dịch vụ cho khách hàng mới
            </h1>
          </div>
          <p className="text-white mb-4">
          Chúng tôi cung cấp dịch vụ chăm sóc thú cưng chuyên nghiệp, bao gồm tắm rửa, cắt tỉa lông và tư vấn dinh dưỡng. Đặc biệt, khách hàng mới sẽ được giảm 50% cho toàn bộ dịch vụ. Hãy để chúng tôi chăm sóc "người bạn bốn chân" của bạn trong không gian thoải mái và an toàn!
          </p>
          <a href="contact" className="btn btn-light py-md-3 px-md-5 me-3">
            Đăng ký ngay
          </a>
          
        </div>
      </div>
    </div>
  </div>
    </div>
  )
}

export default OfferComponent