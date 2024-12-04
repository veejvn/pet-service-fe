import React, { useState } from 'react';
import { Modal, List, Avatar, Button, Typography } from 'antd';

const { Text } = Typography;

// Dữ liệu mẫu của nhân viên
const sampleStaff = [
    {
        id: '1',
        displayName: 'Nguyễn Văn A',
        phoneNumber: '0123456789',
        avatar: 'https://example.com/avatar1.jpg',
        jobPosition: 'Chuyên viên tắm thú cưng',
    },
    {
        id: '2',
        displayName: 'Trần Thị B',
        phoneNumber: '0987654321',
        avatar: 'https://example.com/avatar2.jpg',
        jobPosition: 'Chuyên viên cắt tỉa lông',
    },
];

const StaffSelector = ({ onSelectStaff }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleSelectStaff = (staff) => {
        onSelectStaff(staff);
        handleCloseModal();
    };

    return (
        <>
            <Button onClick={handleOpenModal}>Chọn nhân viên</Button>
            <Modal
                title="Danh sách nhân viên"
                visible={isModalOpen}
                onCancel={handleCloseModal}
                footer={null}
            >
                <List
                    itemLayout="horizontal"
                    dataSource={sampleStaff}
                    renderItem={(staff) => (
                        <List.Item onClick={() => handleSelectStaff(staff)} style={{ cursor: 'pointer' }}>
                            <List.Item.Meta
                                avatar={<Avatar src={staff.avatar} />}
                                title={staff.displayName}
                                description={
                                    <>
                                        <Text>{staff.jobPosition}</Text>
                                        <br />
                                        <Text>Số điện thoại: {staff.phoneNumber}</Text>
                                    </>
                                }
                            />
                        </List.Item>
                    )}
                />
            </Modal>
        </>
    );
};

export default StaffSelector;
