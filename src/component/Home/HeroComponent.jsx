import React from 'react'

function HeroComponent() {
  return (
    <div>
  <div className="container-fluid bg-primary py-5 mb-5 hero-header">
    <div className="container py-5">
      <div className="row justify-content-start">
        <div className="col-lg-8 text-center text-lg-start">
          <h1 className="display-1 text-uppercase text-dark mb-lg-4">
            Cửa hàng thú cưng
          </h1>
          <h1 className="text-uppercase text-white mb-lg-4">
          Ngôi nhà thứ hai cho thú cưng của bạn.
          </h1>
          <p className="fs-4 text-white mb-lg-4">
          Chúng tôi cung cấp dịch vụ chăm sóc toàn diện cho thú cưng, bao gồm tư vấn dinh dưỡng, tắm và cắt tỉa lông . . . , Ngoài ra, chúng tôi còn tổ chức sự kiện giao lưu, tạo cơ hội cho thú cưng và chủ nhân kết nối với nhau.          </p>
          <div className="d-flex align-items-center justify-content-center justify-content-lg-start pt-5">
            <a
              href=""
              className="btn btn-outline-light border-2 py-md-3 px-md-5 me-5"
            >
              Tìm hiều thêm
            </a>
            <button
              type="button"
              className="btn-play"
              data-bs-toggle="modal"
              data-src="https://www.youtube.com/embed/-ApsfcJybCc"
              data-bs-target="#videoModal"
            >
              <span />
            </button>
            <h5 className="font-weight-normal text-white m-0 ms-4 d-none d-sm-block">
              Xem
            </h5>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    className="modal fade"
    id="videoModal"
    tabIndex={-1}
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog">
      <div className="modal-content rounded-0">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            Video về cửa hàng
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div className="modal-body">
          <div className="ratio ratio-16x9">
            <iframe
              className="embed-responsive-item"
              src=""
              id="video"
              allowFullScreen=""
              allowscriptaccess="always"
              allow="autoplay"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
    </div>
  )
}

export default HeroComponent