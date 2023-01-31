import axios from "axios";
import LocalStorage from "./LocalStorage";
import { dbService } from "../constant/config";

const instance = axios.create({
  baseURL: dbService,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = LocalStorage.getLocalAccessToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (originalConfig.url !== (dbService + "/signin") && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        localStorage.clear();
        window.location = '/login';
        return instance(originalConfig);
      }
    }
    return Promise.reject(err);
  }
);
export default instance;