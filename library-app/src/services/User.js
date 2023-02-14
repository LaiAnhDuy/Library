import { dbAdminService, dbService } from '../constant/config';
import api from './Api';

export const apiGetAllUser = async (page, size) => {
  let url = dbAdminService + '/user/list-all' + `?page=${page}&size=${size}`;
  const response = await api.get(url);
  return response;
};

export const apiUpdateUser = async (data) => {
  let url = dbAdminService + '/user/';
  const response = await api.put(url, data);
  return response;
};

export const apiGetAllOrder = async (page, size) => {
  let url = dbService + '/borrowing/list-all' + `?page=${page}&size=${size}`;
  const response = await api.get(url);
  return response;
};

export const apiToggleUser = async (userCode) => {
  let url = dbAdminService + '/user/' + userCode;
  const response = await api.delete(url);
  return response;
};
