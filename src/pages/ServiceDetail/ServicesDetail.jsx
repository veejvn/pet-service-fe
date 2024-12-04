import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { getServiceById } from '../../services/ServiceServce';
import { StyledButton } from '../../app/global_antd';
import { createCartItem } from '../../services/CartService';
import { toast } from 'react-toastify';

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
        console.log(response.data.data);
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
  const handleBooking = async () => {
    // Đảm bảo có thông tin dịch vụ và người dùng đã đăng nhập (nếu cần)
    if (!service) {
      alert('Dịch vụ không hợp lệ');
      return;
    }

    const [result, error] = await createCartItem(service.id); // Gọi API để thêm vào giỏ hàng
    if(error.code="cart-item-e-01"){
      // console.log(error);
      toast.error("Dịch vụ đã có trong giỏ hàng")
      return;
    }
    toast.success("Thêm dịch vụ vào giỏ hàng thành công",{
      autoClose: 3000
    })
  };
  return (
    <Container className="mt-5">
      <Row>
        <Col md={6}>
          <img 
            src={service.image || '/default-image.jpg'} 
            alt={service.name} 
            className="img-fluid rounded" 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover' 
            }} 
          />
        </Col>
        <Col md={6}>
          <h2 className="text-uppercase">{service.name}</h2>
          <p>{service.description}</p>
          <p><strong>Giá dịch vụ:</strong> {new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
          }).format(service.price)}</p>
          <div>
            <StyledButton onClick={handleBooking} className="mt-3">Đặt lịch hẹn</StyledButton>
            {/* <StyledButton onClick={() => navigate(-1)} className="mt-3">Quay lại</StyledButton> */}
          </div>
          {/* <StyledButton style={{marginLeft:"20px"}} className="mt-3">Đặt lịch hẹn</StyledButton> */}
        </Col>
      </Row>
    </Container>
  );
}

export default ServiceDetail;
