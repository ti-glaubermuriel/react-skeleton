import axios from "axios";
import { getToken, logout, setToken } from "./auth";


const api = axios.create({
  baseURL: "https://axreg-server.anestech.com.br"
});

api.interceptors.request.use(async config => {
  let token = getToken();
  if (getToken()) {
    config.headers.Authorization = token;
  }
  return config;
});

api.interceptors.response.use(
  response => {
    let token = getToken();
    if (token) {
      if(token !== response.headers.authorization){
        setToken(response.headers.authorization); // edit new token expire 15 min
      }
    }
    return response;
  },
  error => {
    if (error.response.status === 401 && error.response.config.url !== 'https://axreg-server.anestech.com.br/web/login') {
        logout();
        console.log(error.response);
        
        console.log('Redirect Login');
    }
    return error;
  }
);

export default api;
