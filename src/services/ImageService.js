import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/uploads`;

export const uploadImage = (file) => {
    const formData = new FormData();
    formData.append('image', file);
    
    return axios.post(`${API_URL}/image`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

export const uploadImages = (files) => {
    const formData = new FormData();
    Array.from(files).forEach(file => {
        formData.append('images', file);
    });
    
    return axios.post(`${API_URL}/images`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

export const uploadVideo = (file) => {
    const formData = new FormData();
    formData.append('video', file);
    
    return axios.post(`${API_URL}/video`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

export const deleteFile = (fileUrl) => {
    return axios.delete(`${API_URL}`, {
        params: {
            file_url: fileUrl
        }
    });
};

