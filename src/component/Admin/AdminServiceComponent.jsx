import React, { useState } from 'react';

const AdminServiceComponent = () => {
    const [services, setServices] = useState([]);
    const [serviceName, setServiceName] = useState('');
    const [serviceDescription, setServiceDescription] = useState('');
    const [servicePrice, setServicePrice] = useState('');
    const [editIndex, setEditIndex] = useState(null);

    const handleAddOrEditService = () => {
        if (editIndex !== null) {
            const updatedServices = services.map((service, index) =>
                index === editIndex
                    ? { name: serviceName, description: serviceDescription, price: servicePrice }
                    : service
            );
            setServices(updatedServices);
            setEditIndex(null);
        } else {
            setServices([...services, { name: serviceName, description: serviceDescription, price: servicePrice }]);
        }

        // Clear input fields
        setServiceName('');
        setServiceDescription('');
        setServicePrice('');
    };

    const handleEditService = (index) => {
        setServiceName(services[index].name);
        setServiceDescription(services[index].description);
        setServicePrice(services[index].price);
        setEditIndex(index);
    };

    const handleDeleteService = (index) => {
        const updatedServices = services.filter((_, i) => i !== index);
        setServices(updatedServices);
    };

    return (
        <div>
            <h2>Quản lý Dịch vụ</h2>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Tên Dịch vụ"
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                />
                <textarea
                    className="form-control mt-2"
                    placeholder="Mô tả"
                    value={serviceDescription}
                    onChange={(e) => setServiceDescription(e.target.value)}
                ></textarea>
                <input
                    type="number"
                    className="form-control mt-2"
                    placeholder="Giá"
                    value={servicePrice}
                    onChange={(e) => setServicePrice(e.target.value)}
                />
                <button className="btn btn-primary mt-2" onClick={handleAddOrEditService}>
                    {editIndex !== null ? 'Cập nhật' : 'Thêm Dịch vụ'}
                </button>
            </div>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Tên Dịch vụ</th>
                        <th scope="col">Mô tả</th>
                        <th scope="col">Giá</th>
                        <th scope="col">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {services.map((service, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{service.name}</td>
                            <td>{service.description}</td>
                            <td>{service.price}</td>
                            <td>
                                <button className="btn btn-warning btn-sm" onClick={() => handleEditService(index)}>
                                    Sửa
                                </button>
                                <button className="btn btn-danger btn-sm" onClick={() => handleDeleteService(index)}>
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminServiceComponent;
