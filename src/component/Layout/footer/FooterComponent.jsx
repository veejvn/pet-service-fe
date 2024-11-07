import React from 'react';

function FooterComponent() {
  return (
    <div>
      <>
        <div className="container-fluid bg-light mt-5 py-5">
          <div className="container pt-5">
            <div className="row g-5">
              <div className="col-lg-4 col-md-6">
                <h5 className="text-uppercase border-start border-5 border-primary ps-3 mb-4">
                  Liên Hệ
                </h5>
                <p className="mb-4">
                  Không có nỗi đau nào lớn hơn việc mất mát. Hãy kết nối với chúng tôi để nhận hỗ trợ tốt nhất.
                </p>
                <p className="mb-2">
                  <i className="bi bi-geo-alt text-primary me-2" />
                   Cần Thơ, Việt Nam
                </p>
                <p className="mb-2">
                  <i className="bi bi-envelope-open text-primary me-2" />
                  CTU@vidu.com
                </p>
                <p className="mb-0">
                  <i className="bi bi-telephone text-primary me-2" />
                  +012 345 67890
                </p>
              </div>
              <div className="col-lg-4 col-md-6">
                <h5 className="text-uppercase border-start border-5 border-primary ps-3 mb-4">
                  Liên Kết Nhanh
                </h5>
                <div className="d-flex flex-column justify-content-start">
                  <a className="text-body mb-2" href="/">
                    <i className="bi bi-arrow-right text-primary me-2" />
                    Trang Chủ
                  </a>
                  <a className="text-body mb-2" href="about">
                    <i className="bi bi-arrow-right text-primary me-2" />
                    Giới Thiệu
                  </a>
                  <a className="text-body mb-2" href="services">
                    <i className="bi bi-arrow-right text-primary me-2" />
                    Dịch Vụ
                  </a>
                  
                  <a className="text-body" href="contact">
                    <i className="bi bi-arrow-right text-primary me-2" />
                    Liên Hệ
                  </a>
                </div>
              </div>
              
              <div className="col-lg-4 col-md-6">
                <h5 className="text-uppercase border-start border-5 border-primary ps-3 mb-4">
                  Bản Tin
                </h5>
                <form action="">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control p-3"
                      placeholder="Email của bạn"
                    />
                    <button className="btn btn-primary">Đăng Ký</button>
                  </div>
                </form>
                <h6 className="text-uppercase mt-4 mb-3">Theo Dõi Chúng Tôi</h6>
                <div className="d-flex">
                  <a className="btn btn-outline-primary btn-square me-2" href="#">
                    <i className="bi bi-twitter" />
                  </a>
                  <a className="btn btn-outline-primary btn-square me-2" href="#">
                    <i className="bi bi-facebook" />
                  </a>
                  <a className="btn btn-outline-primary btn-square me-2" href="#">
                    <i className="bi bi-linkedin" />
                  </a>
                  <a className="btn btn-outline-primary btn-square" href="#">
                    <i className="bi bi-instagram" />
                  </a>
                </div>
              </div>
              <div className="col-12 text-center text-body">
                <a className="text-body" href="">
                  Điều Khoản
                </a>
                <span className="mx-1">|</span>
                <a className="text-body" href="">
                  Chính Sách Bảo Mật
                </a>
                <span className="mx-1">|</span>
                <a className="text-body" href="">
                  Hỗ Trợ Khách Hàng
                </a>
                <span className="mx-1">|</span>
                <a className="text-body" href="">
                  Thanh Toán
                </a>
                <span className="mx-1">|</span>
                <a className="text-body" href="">
                  Trợ Giúp
                </a>
                <span className="mx-1">|</span>
                <a className="text-body" href="">
                  FAQs
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid bg-dark text-white-50 py-4">
         
        </div>
      </>
    </div>
  );
}

export default FooterComponent;
