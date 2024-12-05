import axios, {service} from "../tools/axios.tool";

// API URL, thay thế bằng URL API của bạn
const API_URL = `${import.meta.env.VITE_API_URL}/cart-items`;

// Hàm thêm một mục vào giỏ hàng
const createCartItem = (petServiceId) => {
  return service(axios.post(API_URL, {petServiceId}))
};

// Hàm lấy tất cả các mục trong giỏ hàng
const getAllCartItem = async () => {
      return service(axios.get(API_URL));
  };

// Hàm xóa mục trong giỏ hàng
const deleteCartItem = (id) => {
  return service(axios.delete(`${API_URL}/${id}`));
};

export {
  createCartItem,
  getAllCartItem,
  deleteCartItem
};
