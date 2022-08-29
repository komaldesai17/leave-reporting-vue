import axios from 'axios';
import config from '@/config';
import { successHandler, errorHandler } from './helper';

export const login = (credentials) => {
    return axios.post(
        `${config.baseUrl}/user/login`,
        credentials,

        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
        .then(successHandler)
        .catch(errorHandler);
};


export const register = (creds) => {
    const response = axios.post(`${config.baseUrl}/user/register`,
        creds,
        {

            headers: {
                'Content-Type': 'application/json'
            }

        })
    return response;
}