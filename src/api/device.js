import axios from 'axios';
import qs from 'qs';

let base = '/api';

export const all = requestArray =>{ return axios.all(requestArray);}

export const searchDevice = params => { return axios.post(`${base}/device/search`, qs.stringify(params), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }); };

export const addDevice = params => { return axios.post(`${base}/device/create`, qs.stringify(params), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }); };

export const editDevice = params => { return axios.post(`${base}/device/modify`, qs.stringify(params), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }); };