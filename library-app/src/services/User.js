import { dbAdminService } from '../constant/config';
import api from './Api';

export const apiGetAllUser = async(page, size) => {
    let url = dbAdminService + '/user/list-all' + `?page=${page}&size=${size}`;
    const response = await api.get(url);
    return response;
}

export const apiUpdateUser = async(data) => {
    let url = dbAdminService + '/user/';
    const response = await api.put(url, data);
    return response;
}