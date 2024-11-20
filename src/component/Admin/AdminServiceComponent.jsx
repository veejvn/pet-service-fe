import React, { useState, useEffect } from 'react';
import { getAllServices, createService, updateService, deleteService,  } from '../../services/ServiceServce';
import { toast } from 'react-toastify';
import ServiceImages from '../ServiceImages';
import axios from 'axios';

const AdminServiceComponent = () => {
    const [services, setServices] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        images: []
    });
    const [editId, setEditId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedServiceId, setSelectedServiceId] = useState(null);
    const [showImageModal, setShowImageModal] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            setLoading(true);
            const response = await getAllServices();
            setServices(response.data.data.services);
        } catch (error) {
            toast.error('Không thể tải danh sách dịch vụ');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const resetForm = () => {
        setFormData({
            name: '',
            description: '',
            price: '',
            images: []
        });
        setEditId(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const serviceData = {
                ...formData,
                price: parseFloat(formData.price)
            };

            if (selectedFiles.length > 0) {
                const uploadPromises = selectedFiles.map(file => {
                    const formData = new FormData();
                    formData.append('image', file);
                    return axios.post(`${import.meta.env.VITE_API_URL}/uploads/image`, formData);
                });
                const uploadResults = await Promise.all(uploadPromises);
                console.log('uploadResults',uploadResults);
                const imageUrls = uploadResults.map(result => result.data.data);
                console.log('imageUrls',imageUrls);
                serviceData.images = imageUrls;
            }

            if (editId) {
                await updateService(editId, serviceData);
                toast.success('Cập nhật dịch vụ thành công');
            } else {
                await createService(serviceData);
                toast.success('Thêm dịch vụ thành công');
            }

            await fetchServices();
            resetForm();
            setSelectedFiles([]);
        } catch (error) {
            toast.error(editId ? 'Không thể cập nhật dịch vụ' : 'Không thể thêm dịch vụ');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (service) => {
        setFormData({
            name: service.name,
            description: service.description,
            price: service.price.toString()
        });
        setEditId(service.id);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa dịch vụ này?')) {
            try {
                setLoading(true);
                await deleteService(id);
                toast.success('Xóa dịch vụ thành công');
                await fetchServices();
            } catch (error) {
                toast.error('Không thể xóa dịch vụ');
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleManageImages = (service) => {
        setSelectedServiceId(service.id);
        setShowImageModal(true);
    };

    const handleFileChange = (e) => {
        setSelectedFiles(Array.from(e.target.files));
    };

    const handleImageUpload = async (serviceId) => {
        if (selectedFiles.length === 0) {
            toast.warning('Vui lòng chọn ít nhất một ảnh');
            return;
        }

        try {
            setLoading(true);
            // Upload ảnh lên server trước
            const uploadPromises = selectedFiles.map(file => {
                const formData = new FormData();
                formData.append('image', file);
                return axios.post(`${import.meta.env.VITE_API_URL}/uploads/image`, formData);
            });
            
            const uploadResults = await Promise.all(uploadPromises);
            // Lấy chỉ URL từ response
            const newImageUrls = uploadResults.map(result => result.data.url);

            // Lấy thông tin service hiện tại
            const serviceResponse = await getAllServices();
            const currentService = serviceResponse.data.data.services.find(s => s.id === serviceId);
            
            // Tạo mảng ảnh mới, đảm bảo mỗi phần tử là string URL
            const existingImages = currentService.images?.map(img => 
                typeof img === 'object' ? img.url : img
            ) || [];
            
            // Cập nhật service với danh sách ảnh mới
            const updatedService = {
                ...currentService,
                images: [...existingImages, ...newImageUrls]
            };
            
            await updateService(serviceId, updatedService);
            toast.success('Tải ảnh lên thành công');
            setSelectedFiles([]);
            await fetchServices();
        } catch (error) {
            toast.error('Không thể tải ảnh lên');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteImage = async (serviceId, imageUrl) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa ảnh này?')) {
            try {
                setLoading(true);
                // Lấy thông tin service hiện tại
                const serviceResponse = await getAllServices();
                const currentService = serviceResponse.data.data.services.find(s => s.id === serviceId);
                
                // Đảm bảo so sánh đúng định dạng URL
                const updatedService = {
                    ...currentService,
                    images: currentService.images
                        .map(img => typeof img === 'object' ? img.url : img)
                        .filter(url => url !== imageUrl)
                };
                
                await updateService(serviceId, updatedService);
                
                // Xóa file ảnh từ server
                await axios.delete(`${import.meta.env.VITE_API_URL}/uploads`, {
                    params: { file_url: imageUrl }
                });
                
                toast.success('Xóa ảnh thành công');
                await fetchServices();
            } catch (error) {
                toast.error('Không thể xóa ảnh');
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Quản lý Dịch vụ</h2>
            
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="row">
                    <div className="col-md-4 mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Tên Dịch vụ"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="col-md-4 mb-3">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Giá"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="col-md-12 mb-3">
                        <textarea
                            className="form-control"
                            placeholder="Mô tả"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                            rows="3"
                        ></textarea>
                    </div>
                    <div className="col-md-12 mb-3">
                        <div className="d-flex align-items-center gap-2">
                            <input
                                type="file"
                                className="form-control"
                                onChange={handleFileChange}
                                accept="image/*"
                                multiple
                            />
                            {selectedFiles.length > 0 && (
                                <span className="text-muted">
                                    Đã chọn {selectedFiles.length} ảnh
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="col-12">
                        <button 
                            type="submit" 
                            className="btn btn-primary me-2"
                            disabled={loading}
                        >
                            {loading ? 'Đang xử lý...' : (editId ? 'Cập nhật' : 'Thêm Dịch vụ')}
                        </button>
                        {editId && (
                            <button 
                                type="button" 
                                className="btn btn-secondary"
                                onClick={resetForm}
                            >
                                Hủy
                            </button>
                        )}
                    </div>
                    {editId && (
                        <div className="col-md-12 mb-3">
                            <div className="d-flex align-items-center gap-2">
                                <input
                                    type="file"
                                    className="form-control"
                                    onChange={handleFileChange}
                                    accept="image/*"
                                    multiple
                                />
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={() => handleImageUpload(editId)}
                                    disabled={selectedFiles.length === 0 || loading}
                                >
                                    {loading ? 'Đang tải...' : 'Tải ảnh lên'}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </form>

            {loading && <div className="text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Đang tải...</span>
                </div>
            </div>}

            <div className="table-responsive">
                <table className="table table-striped table-hover">
                    <thead className="table-light">
                        <tr>
                            <th>STT</th>
                            <th>Tên Dịch vụ</th>
                            <th>Mô tả</th>
                            <th>Giá</th>
                            <th>Hình ảnh</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map((service, index) => (
                            <tr key={service.id}>
                                <td>{index + 1}</td>
                                <td>{service.name}</td>
                                <td>{service.description}</td>
                                <td>{service.price.toLocaleString('vi-VN')} đ</td>
                                <td>
                                    <div className="image-gallery d-flex gap-2 flex-wrap">
                                        {service.images && service.images.map((image) => (
                                            <div key={image.id} className="image-container position-relative">
                                                <img 
                                                    src={image.url} 
                                                    alt={service.name}
                                                    className="service-thumbnail"
                                                    style={{ 
                                                        width: '80px',
                                                        height: '80px',
                                                        objectFit: 'cover',
                                                        borderRadius: '8px',
                                                        cursor: 'pointer',
                                                        transition: 'transform 0.2s'
                                                    }}
                                                    onClick={() => window.open(image.url, '_blank')}
                                                    onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                                                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                                                />
                                                <button
                                                    className="btn btn-danger btn-sm position-absolute delete-btn"
                                                    style={{
                                                        top: -8,
                                                        right: -8,
                                                        padding: '2px 6px',
                                                        fontSize: '14px',
                                                        borderRadius: '50%',
                                                        minWidth: '24px',
                                                        minHeight: '24px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center'
                                                    }}
                                                    onClick={() => handleDeleteImage(service.id, image.url)}
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </td>
                                <td>
                                    <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(service)}>
                                        Sửa
                                    </button>
                                    <button className="btn btn-danger btn-sm me-2" onClick={() => handleDelete(service.id)}>
                                        Xóa
                                    </button>
                                    <button 
                                        className="btn btn-info btn-sm" 
                                        onClick={() => handleManageImages(service)}
                                    >
                                        {service.images?.length > 0 ? (
                                            <span>Ảnh ({service.images.length})</span>
                                        ) : (
                                            'Thêm ảnh'
                                        )}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showImageModal && (
                <ServiceImages
                    serviceId={selectedServiceId}
                    onClose={() => {
                        setShowImageModal(false);
                        fetchServices();
                    }}
                />
            )}
        </div>
    );
};

export default AdminServiceComponent;
