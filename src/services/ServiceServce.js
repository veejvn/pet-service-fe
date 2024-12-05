import axios, { service } from "../tools/axios.tool";

const API_URL = `${import.meta.env.VITE_API_URL}/pet-services`;

const getAllPetServices = (page = 0, size = 10) => {
  return service(axios.get(`${API_URL}?page=${page}&size=${size}`));
};

const getPetServiceById = (id) => {
  return service(axios.get(`${API_URL}/${id}`));
};

export {
  getAllPetServices,
  getPetServiceById,
};
