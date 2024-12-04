import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllServices } from '../../services/ServiceServce';

function ServicesComponent({ limit = 20 }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0); // Trạng thái trang hiện tại
  const [totalPages, setTotalPages] = useState(0); // Tổng số trang

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getAllServices(currentPage, limit);
        console.log('API Response:', response.data.data); // Xem dữ liệu API trả về
        const { services, totalPages } = response.data.data;
  
        // Kiểm tra nếu services hoặc totalPages bị undefined
        if (!services || !totalPages) {
          throw new Error('Dữ liệu không hợp lệ');
        }
  
        setServices(services);
        setTotalPages(totalPages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchServices();
  }, [currentPage, limit]);
  

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Lỗi: {error}</div>;
console.log(services)
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
          {services.length > 0 ? (
            services.map((service) => (
              <div className="col-lg-4 col-md-6" key={service.id}>
                <div className="card h-100 shadow-sm d-flex flex-column">
                  <img 
                    src={service.image|| '/images/default-service.jpg'} 
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
        
        <div className="d-flex justify-content-center mt-4">
          <nav>
            <ul className="pagination">
              {[...Array(totalPages)].map((_, index) => (
                <li
                  key={index}
                  className={`page-item ${currentPage === index ? 'active' : ''}`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(index)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default ServicesComponent;
