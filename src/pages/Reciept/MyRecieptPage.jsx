import React, { useEffect, useState } from "react";
import { Descriptions, Modal, Table, Typography, } from "antd";
import { StyledButton } from "../../app/global_antd";
import { getAllReceipts } from "../../services/RecieptService";

const { Title } = Typography;

const formatDateTime = (datetime) => {
  const date = new Date(datetime);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng trong JS bắt đầu từ 0
  const year = String(date.getFullYear()).slice(-2);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};
function MyReceiptPage({ userId }) {

  const [receipts, setReceipts] = useState([]);
  const [selectedReceipt, setSelectedReceipt] = useState(null); // Lưu hóa đơn được chọn
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        const response = await getAllReceipts()
        setReceipts(response[0].data);
      } catch (error) {
        console.error("Failed to fetch receipts:", error);
      }
    };

    fetchReceipts();
  }, [userId]);

  const handleViewDetails = (receipt) => {
    setSelectedReceipt(receipt);
    setIsModalVisible(true);
  };

  const columns = [
    { title: "Mã hóa đơn", dataIndex: "id", key: "id" },
    { title: "Ngày tạo", dataIndex: "createdAt", key: "createdAt", 
      render: (createdAt) => formatDateTime(createdAt), 
    },
    {
      title: "Tổng số dịch vụ",
      dataIndex: "totalItem",
      key: "totalItem",
    },
    {
      title: "Tổng giá",
      dataIndex: "totalPriceReceipt",
      key: "totalPriceReceipt",
      render: (price) => `${price.toLocaleString()} VNĐ`,
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <StyledButton onClick={() => handleViewDetails(record)}>Xem chi tiết</StyledButton>
      ),
    },
  ];

  return (
    <div>
      <Title level={1}>Lịch sử đặt lịch</Title>
      <Table
        dataSource={receipts}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />

      <Modal
        title="Chi tiết hóa đơn"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {selectedReceipt && (
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Mã hóa đơn">
              {selectedReceipt.id}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày tạo">
              {new Date(selectedReceipt.createdAt).toLocaleString()}
            </Descriptions.Item>
            <Descriptions.Item label="Thú cưng">
              {selectedReceipt.pet.name} ({selectedReceipt.pet.species.name})
            </Descriptions.Item>
            <Descriptions.Item label="Tổng giá">
              {selectedReceipt.totalPriceReceipt.toLocaleString()} VNĐ
            </Descriptions.Item>
            <Descriptions.Item label="Dịch vụ">
              {selectedReceipt.items.map((item, index) => (
                <div key={index}>
                  <p>
                    Dịch vụ: {item.petService.name} <br />
                    - Nhân viên: {item.staff.displayName || "Chưa chọn"} <br />
                    - Bắt đầu: {formatDateTime(item.start)} <br />- Kết thúc: {formatDateTime(item.end)}
                  </p>
                </div>
              ))}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
};

export default MyReceiptPage;
