import axios from 'axios';
import qs from 'qs';

let base = '/api';

export const requestLogin = params => {
    return axios.post(`${base}/account/signin`, qs.stringify(params), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(res => {
        console.log(res.data);
        return res.data;
    });
};