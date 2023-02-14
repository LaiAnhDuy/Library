import api from './Api';
import { dbService } from '../constant/config';

export const apiSignIn = async (data) => {
  let url = dbService + '/signin';
  const response = await api.post(url, data);
  return response;
};

export const apiSignUp = async (data) => {
  let url = dbService + '/signup';
  const response = await api.post(url, data);
  return response;
};
