// components/ServiceDetail.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

function ServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Dữ liệu mẫu 
  const services = [
    {
      id: '1',
      name: 'Chăm Sóc Thú Cưng',
      details: 'Dịch vụ chăm sóc thú cưng tận tình và chu đáo, đảm bảo chúng luôn an toàn và hạnh phúc.',
      time: '1 giờ',
      price: '200,000 VNĐ',
      image: 'https://petservicehcm.com/wp-content/uploads/2020/01/team-Petservice-HCM-02.jpg' 
    },
    {
      id: '2',
      name: 'Cho Thú Cưng Ăn',
      details: 'Dịch vụ cung cấp chế độ ăn uống cân bằng và phù hợp với nhu cầu dinh dưỡng của thú cưng.',
      time: '30 phút',
      price: '100,000 VNĐ',
      image: 'https://via.placeholder.com/300'
    },
    // Các dịch vụ khác...
  ];

//   const service = services.find((s) => s.id === id);
  const service = services.find((s) => s.id === '1');

  if (!service) {
    return <h2>Dịch vụ không tồn tại</h2>;
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col md={6}>
          <img src={service.image} alt={service.name} className="img-fluid rounded" />
        </Col>
        <Col md={6}>
          <h2 className="text-uppercase">{service.name}</h2>
          <p>{service.details}</p>
          <p><strong>Thời gian thực hiện:</strong> {service.time}</p>
          <p><strong>Giá dịch vụ:</strong> {service.price}</p>
          <Button onClick={() => navigate(-1)}>Quay lại</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default ServiceDetail;
