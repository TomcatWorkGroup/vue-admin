import axios from 'axios';
import qs from 'qs';
import base from './api'

let ext_dm ='.dm';


export const getManufacturerList = params => { return axios.get(`${base}/manufacturer/list${ext_dm}`, { params: params }); };

export const addManufacturer = params => { return axios.post(`${base}/manufacturer/create${ext_dm}`, qs.stringify(params), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }); };

export const editManufacturer = params => { return axios.post(`${base}/manufacturer/modify${ext_dm}`, qs.stringify(params), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }); };
