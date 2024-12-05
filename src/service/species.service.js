import axios, { service } from "../tools/axios.tool";
const API_URL = import.meta.env.VITE_API_URL;

const SpeciesService = {
    async getAll(){
        return service(axios.get(`${API_URL}/species`))
    },
}

export default SpeciesService;