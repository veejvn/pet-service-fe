import React, { useEffect, useState } from 'react';
import { Modal, List, Avatar, Typography, Button } from 'antd';
import { StyledButton } from '../../app/global_antd';
import PetService from '../../service/pet.service';

const { Title, Text } = Typography;

const PetSelector = ({ onSelectPet }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pets, setPets] = useState([]);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleSelectPet = (pet) => {
        onSelectPet(pet);
        handleCloseModal();
    };

    useEffect(() => {
        fetchPets();
    }, []);

    const fetchPets = async () => {
        const [result, error] = await PetService.getAll();
        if (error) {
            console.log(error);
            return;
        }
        setPets(result.data);
    }

    return (
        <>
            <StyledButton type="primary" onClick={handleOpenModal}>
                Chọn thú cưng
            </StyledButton>
            <Modal
                title="Danh sách thú cưng"
                open={isModalOpen}
                onCancel={handleCloseModal}
                footer={null}
            >
                <List
                    itemLayout="vertical"
                    dataSource={pets}
                    renderItem={(pet) => (
                        <List.Item
                            key={pet.id}
                            onClick={() => handleSelectPet(pet)}
                            style={{ cursor: 'pointer', marginBottom: '20px' }}
                        >
                            <List.Item.Meta
                                avatar={<Avatar size={64} src={pet.image} />}
                                title={
                                    <Title level={4}>
                                        {pet.name} ({pet.species.name})
                                    </Title>
                                }
                                description={
                                    <>
                                        <Text>Tuổi: {pet.age}</Text>
                                        <br />
                                        <Text>Cân nặng: {pet.weight} kg</Text>
                                        <br />
                                        <Text>{pet.description}</Text>
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

export default PetSelector;
