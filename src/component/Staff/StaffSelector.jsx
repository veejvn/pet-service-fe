import React, { useEffect, useState } from 'react';
import { Modal, List, Avatar, Button, Typography } from 'antd';
import StaffService from '../../service/staff.service';

const { Text } = Typography;

const StaffSelector = ({ onSelectStaff }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [staffs, setStaffs] = useState([]);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleSelectStaff = (staff) => {
        onSelectStaff(staff);
        handleCloseModal();
    };

    useEffect(() => {
        fetchStaffs();
    }, []);

    const fetchStaffs = async () => {
        const [result, error] = await StaffService.getStaffs();
        if (error) {
            console.log(error);
            return;
        }
        setStaffs(result.data);
    }

    return (
        <>
            <Button onClick={handleOpenModal}>Chọn nhân viên</Button>
            <Modal
                title="Danh sách nhân viên"
                open={isModalOpen}
                onCancel={handleCloseModal}
                footer={null}
            >
                <List
                    itemLayout="horizontal"
                    dataSource={staffs}
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
