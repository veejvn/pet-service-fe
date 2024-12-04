import React, { useState, useEffect } from "react";
import { Table, Typography, Row, Col, Checkbox, DatePicker } from "antd";
import PetSelector from "../../component/Pet/PetSelector";
import StaffSelector from "../../component/Staff/StaffSelector";
import { Container, StyledSummary } from "./style";
import { StyledButton } from "../../app/global_antd";
import ReceiptReviewPage from "./RecieptReviewPage";
import { useNavigate } from "react-router-dom";
import { getAllCartItem } from "../../services/CartService"; // Import hàm lấy dữ liệu giỏ hàng
import { TimePicker } from "antd";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { createReceipt } from "../../services/RecieptService";
const { Title, Text } = Typography;

function CartPage() {
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [checkedServices, setCheckedServices] = useState([]); // Các dịch vụ được chọn
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isReviewing, setIsReviewing] = useState(false);
  const [selectedTimes, setSelectedTimes] = useState({});
  const navigate = useNavigate();
  const [receiptData, setReceiptData] = useState([]);
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await getAllCartItem();
        setSelectedServices(response[0].data);
      } catch (err) {
        setError("Không thể tải giỏ hàng");
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const handleSelectStaff = (serviceId, staff) => {
    const updatedServices = selectedServices.map((service) =>
      service.id === serviceId ? { ...service, staff } : service
    );
    setSelectedServices(updatedServices);
  };

  const handleCheckboxChange = (serviceId, checked) => {
    if (checked) {
      setCheckedServices((prev) => [...prev, serviceId]);
    } else {
      setCheckedServices((prev) => prev.filter((id) => id !== serviceId));
    }
  };
  const handleTimeChange = (serviceId, dateString) => {
    const updatedServices = selectedServices.map((service) => {
      if (service.id === serviceId) {
        const startTime = dayjs(dateString, "YYYY-MM-DD HH:mm:ss");
        const endTime = startTime.add(2, "hour").toISOString(); // Cộng thêm 2 tiếng cho thời gian bắt đầu
        return { ...service, start: startTime.toISOString(), end: endTime }; // Thêm trường end
      }
      return service;
    });

    setSelectedServices(updatedServices);

    // Định dạng thời gian cho backend theo chuẩn ISO 8601
    const localDateTime = dayjs(
      dateString,
      "YYYY-MM-DD HH:mm:ss"
    ).toISOString();
    console.log("Đã chọn thời gian:", localDateTime);
  };

  const columns = [
    {
      title: "Chọn",
      key: "select",
      render: (_, record) => (
        <Checkbox
          checked={checkedServices.includes(record.id)}
          onChange={(e) => handleCheckboxChange(record.id, e.target.checked)}
        />
      ),
    },
    {
      title: "Tên Dịch Vụ",
      key: "name",
      render: (_, record) => record.petService.name,
    },
    {
      title: "Giá",
      key: "price",
      render: (_, record) =>
        record.petService.price.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        }),
    },
    {
      title: "Hình Ảnh",
      key: "image",
      render: (_, record) => (
        <img
          src={record.petService.image}
          alt="service"
          style={{ width: 50, height: 50 }}
        />
      ),
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
    {
      title: "Thời gian bắt đầu",
      key: "time",
      render: (_, record) => (
        <DatePicker
        value={record.start ? dayjs(record.start) : null}
        onChange={(date, dateString) => handleTimeChange(record.id, dateString)}
        format="YYYY-MM-DD HH:mm:ss"
        showTime={{ format: "HH:mm:ss" }}
        disabledDate={(current) => current && current.isBefore(dayjs(), "day")} // Ngăn chọn ngày trước hôm nay
        disabledTime={(current) => {
          if (!current || !current.isSame(dayjs(), "day")) {
            return {}; // Không áp dụng giới hạn thời gian nếu không phải ngày hôm nay
          }
          const now = dayjs();
          return {
            disabledHours: () =>
              Array.from({ length: 24 }, (_, i) => i).filter((hour) => hour < now.hour()), // Ngăn giờ nhỏ hơn giờ hiện tại
            disabledMinutes: (selectedHour) =>
              selectedHour === now.hour()
                ? Array.from({ length: 60 }, (_, i) => i).filter(
                    (minute) => minute < now.minute()
                  ) // Ngăn phút nhỏ hơn phút hiện tại nếu cùng giờ
                : [],
            disabledSeconds: () => [],
          };
        }}
      />
      

      ),
    },
  ];

  const handleCheckout = () => {
    if (!selectedPet) {
      alert("Vui lòng chọn thú cưng trước khi đặt hẹn.");
      return;
    }

    const unassignedService = selectedServices.find(
      (service) =>
        checkedServices.includes(service.id) &&
        (!service.staff || !service.start) // Kiểm tra xem đã chọn thời gian chưa
    );

    if (unassignedService) {
      alert(
        `Vui lòng chọn nhân viên và thời gian cho dịch vụ: ${unassignedService.petService.name}`
      );
      return;
    }

    const selectedServiceDetails = selectedServices.filter((service) =>
      checkedServices.includes(service.id)
    );

    const receiptDataPayload = {
      items: selectedServiceDetails.map((service) => ({
        ...service,
        start: service.start,
        end: service.end, // Thêm thời gian kết thúc vào payload
      })),
      pet: selectedPet,
    };

    setReceiptData(receiptDataPayload);
    setIsReviewing(true);
  };

  const totalPrice = selectedServices
    .filter((service) => checkedServices.includes(service.id))
    .reduce((total, service) => total + service.petService.price, 0);

  if (loading) return <div>Đang tải giỏ hàng...</div>;
  if (error) return <div>{error}</div>;
  const handleConfirmOrder = async () => {
    
    const receiptRequest = {
      petId: receiptData.pet.id, // Lấy petId từ receiptData
      items: receiptData.items.map(item => ({
        staffId: item.staff.id,
        cartItemId: item.id,
        start: item.start,   // Đảm bảo rằng receiptData có trường start
        end: item.end,       // Đảm bảo rằng receiptData có trường end
      })),
    };
    console.log('recieptRequest',receiptRequest)
    try {
      const response = await createReceipt(receiptRequest);
      toast.success('Đặt hàng thành công!');
      navigate('/myReciept')
    } catch (error) {
      console.log('error',error)
      toast.error('Đặt hàng thất bại. Vui lòng thử lại!');
    }

  };
  console.log("reciepData", receiptData);
  if (isReviewing) {
    return (
      <ReceiptReviewPage
        receiptData={receiptData}
        onConfirmOrder={handleConfirmOrder}
        onCancel={() => setIsReviewing(false)}
      />
    );
  }
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
        <Text>Số dịch vụ: {checkedServices.length}</Text>
        <br />
        <StyledButton
          type="primary"
          onClick={handleCheckout}
          disabled={checkedServices.length === 0}
          style={{ marginTop: "10px" }}
        >
          Đặt hẹn
        </StyledButton>
      </StyledSummary>
    </Container>
  );
}

export default CartPage;
