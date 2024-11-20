// components/ServicesComponent.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllServices } from '../../services/ServiceServce';

function ServicesComponent({ limit }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getAllServices();
        const limitedServices = response.data.data.services.slice(0, limit);
        setServices(limitedServices);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [limit]);
console.log('services',services);
  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Lỗi: {error}</div>;

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
        <div className="row g-4">
          {Array.isArray(services) && services.length > 0 ? (
            services.map((service) => (
              <div className="col-lg-4 col-md-6" key={service.id}>
                <div className="card h-100 shadow-sm d-flex flex-column">
                  <img 
                    src={service.images[0]?.url || '/images/default-service.jpg'} 
                    className="card-img-top" 
                    alt={service.name}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-uppercase mb-3">{service.name}</h5>
                    <p className="card-text flex-grow-1" 
                      style={{
                        display: '-webkit-box',
                        WebkitLineClamp: '2',
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        minHeight: '48px'  // Đảm bảo chiều cao cho 2 dòng
                      }}>
                      {service.description}
                    </p>
                    <div className="d-flex justify-content-between align-items-center mt-auto">
                      <span className="text-primary fw-bold">{service.price.toLocaleString('vi-VN')} VNĐ</span>
                      <Link 
                        to={`/service/${service.id}`} 
                        className="btn btn-primary text-uppercase"
                      >
                        Đọc Thêm <i className="bi bi-chevron-right"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <p>Không có dịch vụ nào được tìm thấy.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

ServicesComponent.defaultProps = {
  limit: 100
};

export default ServicesComponent;
