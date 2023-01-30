import { KEY } from "../constant/config";

class LocalStorageService {
    getLocalAccessToken() {
        return localStorage.getItem(KEY.ACCESS_TOKEN);
    }
    getLocalRefreshToken() {
        return localStorage.getItem(KEY.REFRESH_TOKEN);
    }
    updateLocalAccessToken(token) {
        localStorage.setItem(KEY.ACCESS_TOKEN, token);
    } 
    updateLocalRefreshToken(token) {
        localStorage.setItem(KEY.REFRESH_TOKEN, token);
    }
}

export default LocalStorage = new LocalStorageService();

