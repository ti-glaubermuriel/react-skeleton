import axios from "axios";
import { getToken, logout } from "./auth";

const api = axios.create({
  baseURL: "https://axreg-server.anestech.com.br"
});

api.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === 401) {
        logout();
        console.log('Redirect Login');
    }
    return error;
  }
);

export default api;
