// components/ServicesComponent.js
import React from 'react';
import { Link } from 'react-router-dom';

function ServicesComponent() {
  const services = [
    { id: '1', name: 'Chăm Sóc Thú Cưng', description: 'Dịch vụ chăm sóc thú cưng tận tình và chu đáo.' },
    { id: '2', name: 'Cho Thú Cưng Ăn', description: 'Chế độ ăn uống cân bằng cho thú cưng.' },
    { id: '3', name: 'Chăm Sóc Sắc Đẹp', description: 'Dịch vụ tắm rửa và cắt tỉa lông.' },
    { id: '4', name: 'Huấn Luyện Thú Cưng', description: 'Khóa huấn luyện phát triển kỹ năng.' },
    { id: '5', name: 'Tập Luyện Thú Cưng', description: 'Giúp thú cưng duy trì sức khỏe.' },
    { id: '6', name: 'Chữa Trị Thú Cưng', description: 'Dịch vụ chăm sóc sức khỏe thú cưng.' },
  ];

  return (
    <div className="container-fluid py-5">
      <div className="container">
        <div
          className="border-start border-5 border-primary ps-5 mb-5"
          style={{ maxWidth: 600 }}
        >
          <h6 className="text-primary text-uppercase">Dịch vụ</h6>
          <h1 className="display-5 text-uppercase mb-0">
            Dịch Vụ Chăm Sóc Thú Cưng Của Chúng Tôi
          </h1>
        </div>
        <div className="row g-5">
          {services.map((service) => (
            <div className="col-md-6" key={service.id}>
              <div className="service-item bg-light d-flex p-4">
                <i className="flaticon-house display-1 text-primary me-4" />
                <div>
                  <h5 className="text-uppercase mb-3">{service.name}</h5>
                  <p>{service.description}</p>
                  <Link to={`/service/${service.id}`} className="text-primary text-uppercase">
                    Đọc Thêm
                    <i className="bi bi-chevron-right" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ServicesComponent;
