import axios from 'axios';
import qs from 'qs';

let base = '/api';


export const getManufacturerList = params => { return axios.get(`${base}/manufacturer/list`, { params: params }); };

export const addManufacturer = params => { return axios.post(`${base}/manufacturer/create`, qs.stringify(params), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }); };

export const editManufacturer = params => { return axios.post(`${base}/manufacturer/modify`, qs.stringify(params), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }); };
