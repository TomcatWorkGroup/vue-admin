import axios from 'axios';
import qs from 'qs';

let base = '/api';

export const getCompanyList = params => { return axios.get(`${base}/company/list`, { params: params }); };

export const removeCompany = params => { return axios.post(`${base}/company/remove`, { params: params }); };

export const addCompany = params => { return axios.post(`${base}/company/create`, qs.stringify(params), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }); };

export const editCompany = params => { return axios.post(`${base}/company/modify`, qs.stringify(params), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }); };