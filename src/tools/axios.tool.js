import axios from "axios";
import store from "../redux/store.redux";
const API_URL = `${import.meta.env.VITE_API_URL}`;

const axiosInstance = axios.create({
    baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const {accessToken} = store.getState().auth.tokens;
        const isLoggedIn = store.getState().auth.isLoggedIn || false;
        if(isLoggedIn && accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export async function service(axiosPromise) {
    try{
        const response = await axiosPromise;
        const result = {...response.data, status: response.status}
        return [result, null];
    }catch(error){
        const errorResponse = error.response 
        ? {...error.response.data, status: error.response.status}
        : {message: error.message, status: error.code || 500};
        return [null, errorResponse];
    }
}

export default axiosInstance;