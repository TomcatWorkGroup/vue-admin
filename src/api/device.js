import axios from 'axios';
import qs from 'qs';
import base from './api'

let ext_dm ='.dm';

export const all = requestArray =>{ return axios.all(requestArray);}

export const searchDevice = params => { return axios.post(`${base}/device/search${ext_dm}`, qs.stringify(params), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }); };

export const addDevice = params => { return axios.post(`${base}/device/create${ext_dm}`, qs.stringify(params), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }); };

export const editDevice = params => { return axios.post(`${base}/device/modify${ext_dm}`, qs.stringify(params), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }); };