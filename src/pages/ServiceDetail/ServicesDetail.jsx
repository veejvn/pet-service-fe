// components/ServiceDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { getServiceById } from '../../services/ServiceServce';

function ServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await getServiceById(id);
        setService(response.data.data);
      } catch (err) {
        setError('Không thể tải thông tin dịch vụ');
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>{error}</div>;
  if (!service) return <h2>Dịch vụ không tồn tại</h2>;
  console.log('service',service);
  return (
    <Container className="mt-5">
      <Row>
        <Col md={6}>
          <img 
            src={service.images[0]?.url || '/default-image.jpg'} 
            alt={service.name} 
            className="img-fluid rounded" 
          />
        </Col>
        <Col md={6}>
          <h2 className="text-uppercase">{service.name}</h2>
          <p>{service.description}</p>
          <p><strong>Giá dịch vụ:</strong> {new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
          }).format(service.price)}</p>
          {/* <p><strong>Ngày tạo:</strong> {new Date(service.createAt).toLocaleDateString('vi-VN')}</p> */}
          <Button onClick={() => navigate(-1)} className="mt-3">Quay lại</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default ServiceDetail;
