import axios from 'axios';

// API URL, thay thế bằng URL API của bạn
const API_URL = `${import.meta.env.VITE_API_URL}/cart-items`;

// Hàm thêm một mục vào giỏ hàng
const createCartItem = (data) => {
  return axios.post(API_URL, data)
};

// Hàm lấy tất cả các mục trong giỏ hàng
const getAllCartItem = async () => {
    try {
      const response = await axios.get(API_URL); // Lấy tất cả các cart items
      return response.data; // Trả về dữ liệu từ API
    } catch (error) {
      console.error('Error fetching cart items:', error);
      throw error; // Ném lỗi nếu không lấy được dữ liệu
    }
  };
  

// Hàm xóa mục trong giỏ hàng
const deleteCartItem = (id) => {
  return axios.delete(`${API_URL}/${id}`)
};

export {
  createCartItem,
  getAllCartItem,
  deleteCartItem
};
