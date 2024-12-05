import axios, { service } from "../tools/axios.tool";

const API_URL = `${import.meta.env.VITE_API_URL}/pet-services`;

const getAllServices = (page = 0, size = 10) => {
  return service(axios.get(`${API_URL}?page=${page}&size=${size}`));
};

const getServiceById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

const createService = (data) => {
  return axios.post(API_URL, data);
};

const updateService = (id, data) => {
  return axios.put(`${API_URL}/${id}`, data);
};

const deleteService = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

export {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
};
