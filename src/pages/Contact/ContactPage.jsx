// Contact.js
import React, { Fragment } from 'react';

const ContactPage = () => {
    return (
        <Fragment>
            <div className="container-fluid pt-5">
                <div className="container">
                    <div className="border-start border-5 border-primary ps-5 mb-5" style={{ maxWidth: '600px' }}>
                        <h6 className="text-primary text-uppercase">Liên Hệ Với Chúng Tôi</h6>
                        <h1 className="display-5 text-uppercase mb-0">Xin Vui Lòng Liên Hệ Với Chúng Tôi</h1>
                    </div>
                    <div className="row g-5">
                        <div className="col-lg-7">
                            <form>
                                <div className="row g-3">
                                    <div className="col-12">
                                        <input type="text" className="form-control bg-light border-0 px-4" placeholder="Tên Của Bạn" style={{ height: '55px' }} />
                                    </div>
                                    <div className="col-12">
                                        <input type="email" className="form-control bg-light border-0 px-4" placeholder="Email Của Bạn" style={{ height: '55px' }} />
                                    </div>
                                    <div className="col-12">
                                        <input type="text" className="form-control bg-light border-0 px-4" placeholder="Chủ Đề" style={{ height: '55px' }} />
                                    </div>
                                    <div className="col-12">
                                        <textarea className="form-control bg-light border-0 px-4 py-3" rows="8" placeholder="Tin Nhắn"></textarea>
                                    </div>
                                    <div className="col-12">
                                        <button className="btn btn-primary w-100 py-3" type="submit">Gửi Tin Nhắn</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-lg-5">
                            <div className="bg-light mb-5 p-5">
                                <div className="d-flex align-items-center mb-2">
                                    <i className="bi bi-geo-alt fs-1 text-primary me-3"></i>
                                    <div className="text-start">
                                        <h6 className="text-uppercase mb-1">Địa chỉ cửa hàng</h6>
                                        <span>Cần Thơ</span>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center mb-2">
                                    <i className="bi bi-envelope-open fs-1 text-primary me-3"></i>
                                    <div className="text-start">
                                        <h6 className="text-uppercase mb-1">Gửi Email Cho Chúng Tôi</h6>
                                        <span>CTU@example.com</span>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center mb-4">
                                    <i className="bi bi-phone-vibrate fs-1 text-primary me-3"></i>
                                    <div className="text-start">
                                        <h6 className="text-uppercase mb-1">Gọi Cho Chúng Tôi</h6>
                                        <span>+012 345 6789</span>
                                    </div>
                                </div>
                                <div>
                                    <iframe
                                        className="position-relative w-100"
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.84151844203!2d105.76804037590932!3d10.029933690077!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0895a51d60719%3A0x9d76b0035f6d53d0!2zxJDhuqFpIGjhu41jIEPhuqduIFRoxqE!5e0!3m2!1svi!2s!4v1730021321356!5m2!1svi!2s"
                                        frameBorder="0"
                                        style={{ height: '205px', border: '0' }}
                                        allowFullScreen
                                        title="Bản Đồ Google"
                                        aria-hidden="false"
                                        tabIndex="0"
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default ContactPage;
