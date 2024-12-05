import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { StyledButton } from '../../app/global_antd';
import { createCartItem } from '../../services/CartService';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setRedirect } from '../../redux/slices/auth.slice';

function ServiceDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { service } = location.state || { service: {} }
  const [loading, setLoading] = useState(true);
  const isLogedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  if (!service) return <h2>Dịch vụ không tồn tại</h2>;

  const handleBooking = async () => {
    if(!isLogedIn){
      dispatch(setRedirect("/service/detail"))
      navigate("/login");
      return;
    }
    const [result, error] = await createCartItem(service.id); // Gọi API để thêm vào giỏ hàng
    console.log(error);
    if (error) {
      toast.error("Dịch vụ đã có trong giỏ hàng")
      return;
    }
    toast.success("Thêm dịch vụ vào giỏ hàng thành công", {
      autoClose: 3000
    })
  };
  return (
    <Container className="mt-5">
      <Row>
        <Col md={6}>
          <img
            src={service?.image || '/default-image.jpg'}
            alt={service?.name}
            className="img-fluid rounded"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </Col>
        <Col md={6}>
          <h2 className="text-uppercase">{service?.name}</h2>
          <p>{service?.description}</p>
          <p><strong>Giá dịch vụ:</strong> {new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
          }).format(service?.price)}</p>
          <div>
            <StyledButton onClick={handleBooking} className="mt-3 me-3">Đặt lịch hẹn</StyledButton>
            <StyledButton onClick={() => navigate("/services")} className="mt-3">Quay lại</StyledButton>
          </div>
          {/* <StyledButton style={{marginLeft:"20px"}} className="mt-3">Đặt lịch hẹn</StyledButton> */}
        </Col>
      </Row>
    </Container>
  );
}

export default ServiceDetail;
