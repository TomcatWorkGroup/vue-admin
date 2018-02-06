import axios from 'axios';
import qs from 'qs';
import base from './api'

let ext_dm ='.dm';


export const getCustomerList = params => { return axios.get(`${base}/customer/list${ext_dm}`, { params: params }); };

export const removeCustomer = params => { return axios.post(`${base}/customer/remove${ext_dm}`, { params: params }); };

export const addCustomer = params => { return axios.post(`${base}/customer/create${ext_dm}`, qs.stringify(params), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }); };

export const editCustomer = params => { return axios.post(`${base}/customer/modify${ext_dm}`, qs.stringify(params), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }); };
