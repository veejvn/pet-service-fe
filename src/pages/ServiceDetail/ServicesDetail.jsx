import React, { useEffect, useState } from 'react';
import { redirect, useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { StyledButton } from '../../app/global_antd';
import { createCartItem } from '../../services/CartService';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setRedirect } from '../../redux/slices/auth.slice';
import { getPetServiceById } from '../../services/ServiceServce';
import { Spin } from 'antd';

function ServiceDetail() {
  const { id } = useParams();
  const [petService, setPetService] = useState({});
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const isLogedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true)
    fecthPetServiceById(id);
    setLoading(false)
  }, []);

  const fecthPetServiceById = async (id) => {
    const [result, error] = await getPetServiceById(id);
    if (error) {
      setError(true)
    }
    setPetService(result.data);
  }

  const handleBooking = async () => {
    if (!isLogedIn) {
      dispatch(setRedirect(`/service/${id}`))
      navigate("/login");
      return;
    }
    const [result, error] = await createCartItem(petService.id);
    if (error) {
      toast.error("Dịch vụ đã có trong giỏ hàng")
      return;
    }
    toast.success("Thêm dịch vụ vào giỏ hàng thành công", {
      autoClose: 3000
    })
  };

  if (!petService || error) return <h2>Dịch vụ không tồn tại</h2>;

  return (
    <Spin spinning={loading}>
      <Container className="mt-5">
        <Row>
          <Col md={6}>
            <img
              src={petService?.image || '/default-image.jpg'}
              alt={petService?.name}
              className="img-fluid rounded"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </Col>
          <Col md={6}>
            <h2 className="text-uppercase">{petService?.name}</h2>
            <p>{petService?.description}</p>
            <p><strong>Giá dịch vụ:</strong> {new Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND'
            }).format(petService?.price)}</p>
            <div>
              <StyledButton onClick={handleBooking} className="mt-3 me-3">Đặt lịch hẹn</StyledButton>
              <StyledButton onClick={() => navigate("/services")} className="mt-3">Quay lại</StyledButton>
            </div>
            {/* <StyledButton style={{marginLeft:"20px"}} className="mt-3">Đặt lịch hẹn</StyledButton> */}
          </Col>
        </Row>
      </Container>
    </Spin>
  );
}

export default ServiceDetail;
