import axios from 'axios';
import qs from 'qs';

let base = '/api';


export const getCustomerList = params => { return axios.get(`${base}/customer/list`, { params: params }); };

export const removeCustomer = params => { return axios.post(`${base}/customer/remove`, { params: params }); };

export const addCustomer = params => { return axios.post(`${base}/customer/create`, qs.stringify(params), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }); };

export const editCustomer = params => { return axios.post(`${base}/customer/modify`, qs.stringify(params), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }); };
