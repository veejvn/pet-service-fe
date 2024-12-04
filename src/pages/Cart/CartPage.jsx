import React, { useState, useEffect } from "react";
import { Table, Typography, Row, Col, Button } from "antd";
import PetSelector from "../../component/Pet/PetSelector";
import StaffSelector from "../../component/Staff/StaffSelector";
import { Container, StyledSummary } from "./style";
import { StyledButton } from "../../app/global_antd";
import ReceiptReviewPage from "./RecieptReviewPage";
import { useNavigate } from "react-router-dom";
import { getAllCartItem } from "../../services/CartService"; // Import hàm lấy dữ liệu giỏ hàng

const { Title, Text } = Typography;

function CartPage() {
  const [selectedServices, setSelectedServices] = useState([]); // Giỏ hàng ban đầu là mảng rỗng
  const [selectedPet, setSelectedPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await getAllCartItem();
        console.log(response);
        setSelectedServices(response.data); // Cập nhật giỏ hàng với dữ liệu từ API
      } catch (err) {
        setError("Không thể tải giỏ hàng");
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const totalPrice = selectedServices.reduce(
    (total, service) => total + service.price,
    0
  );

  const handleSelectStaff = (serviceId, staff) => {
    const updatedServices = selectedServices.map((service) =>
      service.id === serviceId ? { ...service, staff } : service
    );
    setSelectedServices(updatedServices);
  };

  const columns = [
    {
      title: "Tên dịch vụ",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price} VNĐ`,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Nhân viên thực hiện",
      key: "staff",
      render: (_, record) => (
        <>
          {record.staff ? (
            <Text style={{ marginRight: "10px" }}>
              {record.staff.displayName}
            </Text>
          ) : (
            <Text style={{ marginRight: "10px" }}>Chưa chọn</Text>
          )}
          <StaffSelector
            onSelectStaff={(staff) => handleSelectStaff(record.id, staff)}
          />
        </>
      ),
    },
  ];

  const [isReviewing, setIsReviewing] = useState(false);

  const handleCheckout = () => {
    if (!selectedPet) {
      alert("Vui lòng chọn thú cưng trước khi đặt hẹn.");
      return;
    }

    const unassignedService = selectedServices.find(
      (service) => !service.staff
    );
    if (unassignedService) {
      alert(`Vui lòng chọn nhân viên cho dịch vụ: ${unassignedService.name}`);
      return;
    }

    // Chuyển đến trang xem lại thông tin đơn hàng
    setIsReviewing(true);
  };

  const handleConfirmOrder = () => {
    // Gửi thông tin đơn hàng đến backend
    alert("Đặt hàng thành công!");
    navigate("/thank-you"); // Điều hướng đến trang cảm ơn
  };

  const receiptData = {
    id: "123",
    totalItem: selectedServices.length,
    totalPriceReceipt: totalPrice,
    createdAt: new Date().toISOString(),
    items: selectedServices.map((service) => ({
      petService: { id: service.id, name: service.name },
      staff: service.staff,
      start: new Date().toISOString(),
      end: new Date(new Date().getTime() + 3600000).toISOString(),
      status: "PENDING",
    })),
    user: {
      name: "Nguyễn Văn A",
      email: "nguyenvana@example.com",
      phoneNumber: "0123456789",
    },
    pet: selectedPet,
  };

  if (isReviewing) {
    return (
      <ReceiptReviewPage
        receiptData={receiptData}
        onConfirmOrder={handleConfirmOrder}
        onCancel={() => setIsReviewing(false)}
      />
    );
  }

  if (loading) return <div>Đang tải giỏ hàng...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Container>
      <Title level={1}>Giỏ hàng dịch vụ</Title>
      <Row gutter={[16, 16]}>
        <Col span={16}>
          <Table
            dataSource={selectedServices}
            columns={columns}
            rowKey="id"
            pagination={false}
          />
        </Col>
        <Col span={8}>
          <StyledSummary>
            <Title level={4}>Thông tin thú cưng</Title>
            {selectedPet ? (
              <>
                <img
                  src={selectedPet.image}
                  alt={selectedPet.name}
                  style={{ width: "100%", marginBottom: 10 }}
                />
                <p>Tên: {selectedPet.name}</p>
                <p>Loài: {selectedPet.species.name}</p>
                <p>Tuổi: {selectedPet.age}</p>
                <p>Cân nặng: {selectedPet.weight} kg</p>
                <p>Mô tả: {selectedPet.description}</p>
              </>
            ) : (
              <p>Chưa chọn thú cưng</p>
            )}
            <PetSelector onSelectPet={setSelectedPet} />
          </StyledSummary>
        </Col>
      </Row>
      <StyledSummary>
        <Title level={3}>Tổng kết</Title>
        <Text strong>Tổng giá: {totalPrice.toLocaleString()} VNĐ</Text>
        <br />
        <Text>Số dịch vụ: {selectedServices.length}</Text>
        <br />
        <StyledButton
          type="primary"
          onClick={handleCheckout}
          disabled={
            !selectedPet || selectedServices.some((service) => !service.staff)
          }
          style={{ marginTop: "10px" }}
        >
          Đặt hẹn
        </StyledButton>
      </StyledSummary>
    </Container>
  );
}

export default CartPage;
