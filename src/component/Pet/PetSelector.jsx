import React, { useState } from 'react';
import { Modal, List, Avatar, Typography, Button } from 'antd';
import { StyledButton } from '../../app/global_antd';

const { Title, Text } = Typography;
// Dữ liệu PetResponse mẫu
const samplePets = [
    {
        id: '1',
        name: 'Mèo Mun',
        weight: 3.5,
        age: '2 năm',
        description: 'Mèo nhà, hiền lành và thích được vuốt ve.',
        species: { id: '1', name: 'Mèo' },
        image: 'https://example.com/cat1.jpg',
    },
    {
        id: '2',
        name: 'Chó Husky',
        weight: 15.2,
        age: '3 năm',
        description: 'Năng động, thông minh, thân thiện.',
        species: { id: '2', name: 'Chó' },
        image: 'https://example.com/dog1.jpg',
    },
];

const PetSelector = ({ onSelectPet }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleSelectPet = (pet) => {
        onSelectPet(pet);
        handleCloseModal();
    };

    return (
        <>
            <StyledButton type="primary" onClick={handleOpenModal}>
                Chọn thú cưng
            </StyledButton>
            <Modal
                title="Danh sách thú cưng"
                visible={isModalOpen}
                onCancel={handleCloseModal}
                footer={null}
            >
                <List
                    itemLayout="vertical"
                    dataSource={samplePets}
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
