import React, { useState } from 'react';
import { uploadImage, uploadImages, uploadVideo, deleteFile } from '../services/ImageService';

const FileUpload = ({ onUploadSuccess, type = 'image', serviceId }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFileUpload = async (event) => {
        const files = event.target.files;
        if (!files.length) return;

        const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
        const allowedVideoTypes = ['video/mp4', 'video/webm', 'video/ogg'];

        setLoading(true);
        setError(null);

        const formData = new FormData();
        
        try {
            if (!serviceId) {
                throw new Error('Thiếu serviceId');
            }
            
            let response;
            
            switch(type) {
                case 'image':
                    if (!allowedImageTypes.includes(files[0].type)) {
                        throw new Error('Chỉ chấp nhận file JPG, PNG hoặc GIF');
                    }
                    response = await uploadImage(files[0], serviceId);
                    break;
                    
                case 'images':
                    for (const file of Array.from(files)) {
                        if (!allowedImageTypes.includes(file.type)) {
                            throw new Error('Chỉ chấp nhận file JPG, PNG hoặc GIF');
                        }
                    }
                    response = await uploadImages(files, serviceId);
                    break;
                    
                case 'video':
                    if (!allowedVideoTypes.includes(files[0].type)) {
                        throw new Error('Chỉ chấp nhận file MP4, WebM hoặc OGG');
                    }
                    if (files[0].size > 50 * 1024 * 1024) {
                        throw new Error('File video phải nhỏ hơn 50MB');
                    }
                    response = await uploadVideo(files[0]);
                    break;
                    
                default:
                    throw new Error('Loại file không hợp lệ');
            }

            if (response.data.success) {
                onUploadSuccess(response.data.data);
            } else {
                throw new Error(response.data.message);
            }
            
        } catch (err) {
            setError(err.message || 'Có lỗi xảy ra khi upload file');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (fileUrl) => {
        try {
            const response = await deleteFile(fileUrl);
            if (response.data.success) {
                console.log('File đã được xóa');
            }
        } catch (err) {
            console.error('Lỗi khi xóa file:', err);
        }
    };

    return (
        <div className="upload-container">
            <input 
                type="file" 
                onChange={handleFileUpload}
                accept={type === 'video' ? 'video/*' : 'image/*'}
                multiple={type === 'images'}
                className="form-control"
            />
            
            {loading && (
                <div className="spinner-border text-primary mt-2" role="status">
                    <span className="visually-hidden">Đang tải...</span>
                </div>
            )}
            
            {error && (
                <div className="alert alert-danger mt-2">
                    {error}
                </div>
            )}
        </div>
    );
};

export default FileUpload;