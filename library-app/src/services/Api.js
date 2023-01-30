import axios from "axios";
import TokenService from "./TokenService";
import { dbService } from "../constant/config";

const instance = axios.create({
  baseURL: dbService,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken();
    if (token) {
      config.headers["Authorization"] = token;
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
    if (originalConfig.url !== (dbService + "/login") && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const rs = await axios.post(dbService + "/refresh-token", {
            refreshToken: TokenService.getLocalRefreshToken(),
          }, {
            headers: { 'Content-Type': 'application/json' }
          });
          if (rs.data.status === 0) {
            const accessToken = rs.data.data.accessToken;
            const refreshToken = rs.data.data.refreshToken;
            TokenService.updateLocalAccessToken(`Bearer ${accessToken}`);
            TokenService.updateLocalRefreshToken(refreshToken);
          } else {
            console.log("Refresh token api was wrong!");
            localStorage.clear();
            window.location = '/login';
          }
          return instance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(err);
  }
);
export default instance;