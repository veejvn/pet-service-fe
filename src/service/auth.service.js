import axios, { service } from "../tools/axios.tool";
import store from "../redux/store.redux";
const AUTH_URL = import.meta.env.VITE_AUTH_URL;

const AuthService = {
  login({ email, password }) {
    return service(axios.post(`${AUTH_URL}/login`, { email, password }));
  },
  register({ email, password }) {
    return service(axios.post(`${AUTH_URL}/register`, { email, password }));
  },
  getInfo() {
    return service(axios.get(`${AUTH_URL}/info`));
  },
  refreshToken() {
    const { refreshToken } = store.getState().auth.tokens;
    return service(axios.post(`${AUTH_URL}/refresh-token`, { refreshToken }));
  },
  forgotPassword({email}) {
    return service(axios.post(`${AUTH_URL}/forgot-password`, { email }));
  },
  forgotPasswordVerify({code, newPassword}) {
    return service(axios.post(`${AUTH_URL}/forgot-password/verify`, { code, newPassword }));
  },
  changePassword({currentPassword, newPassword}) {
    return service(axios.post(`${AUTH_URL}/change-password`, { currentPassword, newPassword }));
  },
};

export default AuthService;
