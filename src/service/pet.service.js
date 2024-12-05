import axios, { service } from "../tools/axios.tool";
const API_URL = import.meta.env.VITE_API_URL;

const PetService = {
    async getAll(){
        return service(axios.get(`${API_URL}/pets`))
    },
    async create({name, weight, age, description, image, species_id}){
        return service(axios.post(`${API_URL}/pets`, {name, weight, age, description, image, species_id}))
    },
    async update({id, name, weight, age, description, image, species_id}){
        return service(axios.put(`${API_URL}/pets/${id}`, {name, weight, age, description, image, species_id}))
    },
    async delete(id){
        return service(axios.delete(`${API_URL}/pets/${id}`))
    },
}
 
export default PetService;