import api from './Api';
import { dbAdminService, dbService } from '../constant/config';

export const apiGetAllBook = async(page, size, title, categoryId) => {
    let url = dbAdminService + `/book/list-all?page=${page}&size=${size}&title=${title}&categoryCode=${categoryId}`;
    let response = await api.get(url);
    return response;
}

export const apiCreateBook = async(data) => {
    let url = dbAdminService + '/book/';
    const response = await api.post(url, data);
    return response;
}

export const apiGetBook = async(code) => {
    let url = dbAdminService + '/book/' + code;
    const response = await api.get(url);
    return response;
}

export const apiUpdateBook = async(data) => {
    let url = dbAdminService + '/book/';
    const response = await api.put(url, data);
    return response;
}

export const apiDeleteBook = async(code) => {
    let url = dbAdminService + '/book/' + code;
    const response = await api.delete(url);
    return response;
}