import React from 'react';
import { Typography, Table, Row, Col, Button, Divider } from 'antd';
import { Container } from './style';

const { Title, Text } = Typography;

const ReceiptReviewPage = ({ receiptData, onConfirmOrder, onCancel }) => {
    const columns = [
        {
            title: 'Dịch vụ',
            dataIndex: 'petService',
            key: 'petService',
            render: (petService) => petService.name,
        },
        {
            title: 'Nhân viên',
            dataIndex: 'staff',
            key: 'staff',
            render: (staff) => staff.displayName,
        },
        {
            title: 'Thời gian bắt đầu',
            dataIndex: 'start',
            key: 'start',
            render: (start) => new Date(start).toLocaleString(),
        },
        {
            title: 'Thời gian kết thúc',
            dataIndex: 'end',
            key: 'end',
            render: (end) => new Date(end).toLocaleString(),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (status === 'PENDING' ? 'Chờ xử lý' : 'Đã xử lý'),
        },
    ];

    return (
        <Container>
            <Title level={2}>Xem lại thông tin đơn hàng</Title>
            <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
                <Col span={12}>
                    <Title level={4}>Thông tin khách hàng</Title>
                    <p>Tên: {receiptData.user.name}</p>
                    <p>Email: {receiptData.user.email}</p>
                    <p>Số điện thoại: {receiptData.user.phoneNumber}</p>
                </Col>
                <Col span={12}>
                    <Title level={4}>Thông tin thú cưng</Title>
                    <p>Tên: {receiptData.pet.name}</p>
                    <p>Loài: {receiptData.pet.species.name}</p>
                    <p>Tuổi: {receiptData.pet.age}</p>
                    <p>Cân nặng: {receiptData.pet.weight} kg</p>
                </Col>
            </Row>
            <Divider />
            <Title level={4}>Chi tiết dịch vụ</Title>
            <Table
                dataSource={receiptData.items}
                columns={columns}
                rowKey={(item) => item.petService.id}
                pagination={false}
            />
            <Divider />
            <Row justify="space-between" style={{ marginTop: '20px' }}>
                <Col>
                    <Text strong>Tổng số dịch vụ: {receiptData.totalItem}</Text>
                    <br />
                    <Text strong>Tổng giá: {receiptData.totalPriceReceipt.toLocaleString()} VNĐ</Text>
                </Col>
                <Col>
                    <Button type="default" onClick={onCancel} style={{ marginRight: '10px' }}>
                        Quay lại
                    </Button>
                    <Button type="primary" onClick={onConfirmOrder}>
                        Hoàn tất đặt hàng
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default ReceiptReviewPage;