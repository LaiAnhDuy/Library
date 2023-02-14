import { dbAdminService } from '../constant/config';
import api from './Api';

export const apiCreateOrder = (data) => {
  let url = dbAdminService + '/borrowing/';
  const response = api.post(url, data);
  return response;
};

export const apiGetAllOrder = (page, size, userCode) => {
  let url =
    dbAdminService +
    '/borrowing/list-all' +
    `?page=${page}&size=${size}&userCode=${userCode}`;
  const response = api.get(url);
  return response;
};

export const apiUpdateOrder = (orderCode) => {
  let url = dbAdminService + '/borrowing/' + orderCode + '/';
  const response = api.put(url);
  return response;
};
