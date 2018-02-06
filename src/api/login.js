import axios from 'axios';
import qs from 'qs';
import base from './api'

let ext_dm ='.dm';

export const requestLogin = params => {
    return axios.post(`${base}/account/signin${ext_dm}`, qs.stringify(params), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(res => {
        console.log(res.data);
        return res.data;
    });
};