import React from 'react'

function TopbarComponent() {
  return (
    <div>
         <div className="container-fluid border-bottom d-none d-lg-block">
        <div className="row gx-0">
      <div className="col-lg-4 text-center py-2">
        <div className="d-inline-flex align-items-center">
          <i className="bi bi-geo-alt fs-1 text-primary me-3" />
          <div className="text-start">
            <h6 className="text-uppercase mb-1">Địa chỉ cửa hàng</h6>
            <span>Cần Thơ</span>
          </div>
        </div>
      </div>
      <div className="col-lg-4 text-center border-start border-end py-2">
        <div className="d-inline-flex align-items-center">
          <i className="bi bi-envelope-open fs-1 text-primary me-3" />
          <div className="text-start">
            <h6 className="text-uppercase mb-1">Email</h6>
            <span>CTU@example.com</span>
          </div>
        </div>
      </div>
      <div className="col-lg-4 text-center py-2">
        <div className="d-inline-flex align-items-center">
          <i className="bi bi-phone-vibrate fs-1 text-primary me-3" />
          <div className="text-start">
            <h6 className="text-uppercase mb-1">Gọi cho chúng tôi</h6>
            <span>+012 345 6789</span>
          </div>
        </div>
      </div>
        </div>
      </div>
    </div>
  )
}

export default TopbarComponent