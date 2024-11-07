import React from 'react'
import AboutImg from '../../assets/img/about.jpg'
function AboutComponent() {
  return (
    <div>
  <div className="container-fluid py-5">
    <div className="container">
      <div className="row gx-5">
        <div className="col-lg-5 mb-5 mb-lg-0" style={{ minHeight: 500 }}>
          <div className="position-relative h-100">
            <img
              className="position-absolute w-100 h-100 rounded"
              src={AboutImg}
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
        <div className="col-lg-7">
          <div className="border-start border-5 border-primary ps-5 mb-5">
            <h6 className="text-primary text-uppercase">Về chúng tôi</h6>
            <h1 className="display-5 text-uppercase mb-0">
            Chúng tôi luôn mang đến niềm vui cho thú cưng của bạn
            </h1>
          </div>
          <h4 className="text-body mb-4">
          Câu slogan "Chúng tôi luôn mang đến niềm vui cho thú cưng của bạn!" thể hiện cam kết của chúng tôi trong việc chăm sóc và làm hài lòng thú cưng. Đội ngũ của chúng tôi luôn tận tâm, mang đến những sản phẩm và dịch vụ tốt nhất để thú cưng luôn khỏe mạnh và hạnh phúc.
          </h4>
          <div className="bg-light p-4">
            <ul
              className="nav nav-pills justify-content-between mb-3"
              id="pills-tab"
              role="tablist"
            >
              <li className="nav-item w-50" role="presentation">
                <button
                  className="nav-link text-uppercase w-100 active"
                  id="pills-1-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-1"
                  type="button"
                  role="tab"
                  aria-controls="pills-1"
                  aria-selected="true"
                >
                  Trách Nhiệm
                </button>
              </li>
              <li className="nav-item w-50" role="presentation">
                <button
                  className="nav-link text-uppercase w-100"
                  id="pills-2-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-2"
                  type="button"
                  role="tab"
                  aria-controls="pills-2"
                  aria-selected="false"
                >
                  Mục Tiêu
                </button>
              </li>
            </ul>
            <div className="tab-content" id="pills-tabContent">
              <div
                className="tab-pane fade show active"
                id="pills-1"
                role="tabpanel"
                aria-labelledby="pills-1-tab"
              >
                <p className="mb-0">
                Nhiệm vụ của cửa hàng chúng tôi là cung cấp các dịch vụ chăm sóc chuyên nghiệp cho thú cưng, bao gồm tắm rửa, cắt tỉa lông và tư vấn sức khỏe. Chúng tôi cam kết mang đến trải nghiệm tốt nhất cho thú cưng của bạn, giúp chúng luôn sạch sẽ, khỏe mạnh và vui vẻ. Đội ngũ nhân viên tận tâm của chúng tôi sẽ luôn sẵn sàng hỗ trợ, đảm bảo mỗi thú cưng đều được chăm sóc như thành viên trong gia đình.
                </p>
              </div>
              <div
                className="tab-pane fade"
                id="pills-2"
                role="tabpanel"
                aria-labelledby="pills-2-tab"
              >
                <p className="mb-0">
                Mục Tiêu của chúng tôi là trở thành địa chỉ tin cậy hàng đầu trong lĩnh vực chăm sóc thú cưng, nơi mọi thú cưng đều được yêu thương và chăm sóc tận tình. Chúng tôi hướng tới việc xây dựng một cộng đồng gắn bó giữa các chủ nuôi và thú cưng, mang lại niềm vui và hạnh phúc cho cả hai.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    </div>
  )
}

export default AboutComponent