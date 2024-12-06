import axios, { service } from "../tools/axios.tool";
const API_URL = import.meta.env.VITE_API_URL;

const StaffService = {
    async getStaffs(){
        return service(axios.get(`${API_URL}/users/staffs`))
    },
    async getReceiptsByStaff(){
        return service(axios.get(`${API_URL}/receipts/staff`))
    }
}

export default StaffService;