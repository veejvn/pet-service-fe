import axios, { service } from "../tools/axios.tool";

// API URL, thay thế bằng URL API của bạn
const API_URL = `${import.meta.env.VITE_API_URL}/receipts`;

// Hàm tạo hóa đơn (Receipt)
const createReceipt = (requestData) => {
  return service(axios.post(API_URL, requestData));
};

// Hàm lấy tất cả hóa đơn
const getAllReceipts = async () => {
  return service(axios.get(API_URL));
};

// Hàm lấy hóa đơn theo nhân viên (staff)
const getReceiptsByStaff = async () => {
  return service(axios.get(`${API_URL}/staff`));
};

// Hàm thay đổi trạng thái mục dịch vụ thú cưng (staff)
const staffChangeStatusPetServiceItem = (id, requestData) => {
  return service(axios.put(`${API_URL}/change-status/staff/${id}`, requestData));
};

// Hàm thay đổi trạng thái mục dịch vụ thú cưng (user)
const userChangeStatusPetServiceItem = (id) => {
  return service(axios.put(`${API_URL}/change-status/user/${id}`));
};

export {
  createReceipt,
  getAllReceipts,
  getReceiptsByStaff,
  staffChangeStatusPetServiceItem,
  userChangeStatusPetServiceItem
};
