import { dbService } from '../constant/config';
import api from './Api';

export const apiGetAnalytic = async() => {
    let url = dbService + '/analytic/';
    const response = await api.get(url);
    return response;
}