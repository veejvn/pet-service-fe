import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import ImgProfession1 from '../../assets/img/testimonial-1.jpg';
import ImgProfession2 from '../../assets/img/testimonial-2.jpg';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

function TestimonialComponent() {
    const options = {
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>',
        ],
    };

    return (
        <div>
            <div className="container-fluid bg-testimonial py-5" style={{ margin: "45px 0" }}>
                <div className="container py-5">
                    <div className="row justify-content-end">
                        <div className="col-lg-7">
                            <OwlCarousel {...options} className="owl-carousel testimonial-carousel bg-white p-5">
                                <div className="testimonial-item text-center">
                                    <div className="position-relative mb-4">
                                        <img className="img-fluid mx-auto" src={ImgProfession1} alt="" />
                                        <div
                                            className="position-absolute top-100 start-50 translate-middle d-flex align-items-center justify-content-center bg-white"
                                            style={{ width: 45, height: 45 }}
                                        >
                                            <i className="bi bi-chat-square-quote text-primary" />
                                        </div>
                                    </div>
                                    <p>
                                        Tôi rất hài lòng với dịch vụ chăm sóc thú cưng tại đây. Nhân viên rất nhiệt tình và tận tâm. Chú mèo của tôi đã được chăm sóc chu đáo và trở nên vui vẻ hơn rất nhiều!
                                    </p>
                                    <hr className="w-25 mx-auto" />
                                    <h5 className="text-uppercase">Nguyễn Văn A</h5>
                                    <span>Chủ Thú Cưng</span>
                                </div>
                                <div className="testimonial-item text-center">
                                    <div className="position-relative mb-4">
                                        <img className="img-fluid mx-auto" src={ImgProfession2} alt="" />
                                        <div
                                            className="position-absolute top-100 start-50 translate-middle d-flex align-items-center justify-content-center bg-white"
                                            style={{ width: 45, height: 45 }}
                                        >
                                            <i className="bi bi-chat-square-quote text-primary" />
                                        </div>
                                    </div>
                                    <p>
                                        Dịch vụ tuyệt vời! Tôi đã đưa chú chó của mình đến đây để tắm và cắt tỉa lông. Kết quả thật hoàn hảo, tôi rất hài lòng và chắc chắn sẽ quay lại lần sau!
                                    </p>
                                    <hr className="w-25 mx-auto" />
                                    <h5 className="text-uppercase">Trần Thị B</h5>
                                    <span>Người Yêu Thú Cưng</span>
                                </div>
                            </OwlCarousel>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TestimonialComponent;
