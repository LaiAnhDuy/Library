import api from './Api';
import { dbAdminService, dbService } from '../constant/config';

export const apiGetAllCategory = async () => {
  let url = dbService + '/category/list-all';
  const response = await api.get(url);
  return response;
};

export const apiGetCategory = async (code) => {
  let url = dbService + '/category/' + code;
  const response = await api.get(url);
  return response;
};

export const apiCreateCategory = async (data) => {
  let url = dbAdminService + '/category/';
  const response = await api.post(url, data);
  return response;
};

export const apiUpdateCategory = async (data) => {
  let url = dbAdminService + '/category/';
  const response = await api.put(url, data);
  return response;
};

export const apiDeleteCategory = async (code) => {
  let url = dbAdminService + '/category/' + code;
  const response = await api.delete(url);
  return response;
};
