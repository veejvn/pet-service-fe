import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FileUpload from './FileUpload';
import * as ServiceService from '../services/ServiceServce';
import { toast } from 'react-toastify';
import axios from 'axios';

const ServiceImages = ({ serviceId, onClose }) => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchImages();
    }, [serviceId]);

    const fetchImages = async () => {
        try {
            setLoading(true);
            const response = await ServiceService.getServiceById(serviceId);
            const imageUrls = response.data.data.images || [];
            setImages(imageUrls.map(url => ({ url })));
        } catch (error) {
            toast.error('Không thể tải danh sách ảnh');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleUploadSuccess = async (imageUrls) => {
        try {
            setLoading(true);
            const urlArray = Array.isArray(imageUrls) ? imageUrls : [imageUrls];
            
            // Lấy thông tin service hiện tại
            const response = await ServiceService.getServiceById(serviceId);
            const currentService = response.data.data;
            
            // Đảm bảo mảng images hiện tại là mảng các URL string
            const existingImages = currentService.images?.map(img => 
                typeof img === 'object' ? img.url : img
            ) || [];
            
            // Cập nhật service với danh sách ảnh mới
            await ServiceService.updateService(serviceId, {
                ...currentService,
                images: [...existingImages, ...urlArray]
            });
            
            // Cập nhật state với định dạng hiển thị
            setImages([...existingImages, ...urlArray].map(url => ({ url })));
            toast.success('Tải ảnh lên thành công');
        } catch (error) {
            toast.error('Lỗi khi tải ảnh lên');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteImage = async (imageToDelete) => {
        try {
            setLoading(true);
            
            // Lấy thông tin service hiện tại
            const response = await ServiceService.getServiceById(serviceId);
            const currentService = response.data.data;
            
            // Chuyển đổi tất cả images thành URL string và lọc bỏ ảnh cần xóa
            const updatedImages = currentService.images
                .map(img => typeof img === 'object' ? img.url : img)
                .filter(url => url !== imageToDelete.url);
            
            // Cập nhật service với danh sách ảnh mới
            await ServiceService.updateService(serviceId, {
                ...currentService,
                images: updatedImages
            });
            
            // Cập nhật state với định dạng hiển thị
            setImages(updatedImages.map(url => ({ url })));
            toast.success('Xóa ảnh thành công');
            
            // Xóa file từ server
            await axios.delete(`${import.meta.env.VITE_API_URL}/uploads`, {
                params: { file_url: imageToDelete.url }
            });
        } catch (error) {
            toast.error('Lỗi khi xóa ảnh');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Quản lý ảnh dịch vụ</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <FileUpload 
                            type="images"
                            onUploadSuccess={handleUploadSuccess}
                            serviceId={serviceId}
                        />

                        <div className="row g-3 mt-3">
                            {images.map((image, index) => (
                                <div key={image.id || index} className="col-md-4">
                                    <div className="position-relative">
                                        <img 
                                            src={image.url} 
                                            alt={`Service image ${index + 1}`}
                                            className="img-fluid rounded"
                                            style={{ height: '200px', objectFit: 'cover', width: '100%' }}
                                        />
                                        <button
                                            className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2"
                                            onClick={() => handleDeleteImage(image)}
                                            disabled={loading}
                                        >
                                            <i className="fas fa-times"></i>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Đóng
                        </button>
                    </div>
                </div>
            </div>
            
            {loading && (
                <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-white bg-opacity-75" style={{zIndex: 1000}}>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Đang xử lý...</span>
                    </div>
                </div>
            )}
        </div>
    );
};

ServiceImages.propTypes = {
    serviceId: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired
};

export default ServiceImages; 