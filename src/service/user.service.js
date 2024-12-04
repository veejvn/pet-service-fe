import axios, { service } from "../tools/axios.tool";
import store from "../redux/store.redux";
const API_URL = import.meta.env.VITE_API_URL;

const UserService = {
    getUser(){
        return service(axios.get(`${API_URL}/users`));
    },
    updateInfo({displayName, dob, phoneNumber, avatar}){
        return service(axios.put(`${API_URL}/users`, {displayName, dob, phoneNumber, avatar}));
    }
}

export default UserService;