import React, { useEffect, useState } from "react";
import { Descriptions, Modal, Table, Typography, } from "antd";
import axios from "axios";
import { StyledButton } from "../../app/global_antd";

const { Title } = Typography;
const sampleReceipts = [
  {
    id: "R12345",
    totalItem: 2,
    totalPriceReceipt: 500000,
    createdAt: "2024-12-01T14:30:00",
    items: [
      {
        status: "PENDING",
        start: "2024-12-05T10:00:00",
        end: "2024-12-05T11:00:00",
        staff: { name: "Nguyễn Văn B" },
        petService: { name: "Dịch vụ tắm thú cưng", price: 300000 },
      },
    ],
    pet: { name: "Milu", species: { name: "Chó" } },
  },
];


function MyReceiptPage({userId}) {

  const [receipts, setReceipts] = useState([]);
  const [selectedReceipt, setSelectedReceipt] = useState(null); // Lưu hóa đơn được chọn
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        const response = await axios.get(`/api/receipts/user/${userId}`);
        setReceipts(response.data);
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
    { title: "Ngày tạo", dataIndex: "createdAt", key: "createdAt" },
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
        dataSource={sampleReceipts}
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
                    - {item.petService.name} ({item.staff.name || "Chưa chọn"})
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