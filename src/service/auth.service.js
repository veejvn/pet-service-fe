import axios, { service } from "../tools/axios.tool";
import store from "../redux/store.redux";
const AUTH_URL = import.meta.env.VITE_AUTH_URL;

const AuthService = {
  login({ email, password }) {
    return service(axios.post(`${AUTH_URL}/login`, { email, password }));
  },
  getInfo() {
    return service(axios.get(`${AUTH_URL}/info`));
  },
  refreshToken() {
    const { refreshToken } = store.getState().auth.tokens;
    console.log(refreshToken);
    return service(axios.post(`${AUTH_URL}/refresh-token`, { refreshToken }));
  },
};

export default AuthService;
