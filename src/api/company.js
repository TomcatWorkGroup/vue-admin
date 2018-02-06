import axios from 'axios';
import qs from 'qs';
import base from './api'

let ext_dm ='.dm';

export const getCompanyList = params => { return axios.get(`${base}/company/list${ext_dm}`, { params: params }); };

export const removeCompany = params => { return axios.post(`${base}/company/remove${ext_dm}`, { params: params }); };

export const addCompany = params => { return axios.post(`${base}/company/create${ext_dm}`, qs.stringify(params), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }); };

export const editCompany = params => { return axios.post(`${base}/company/modify${ext_dm}`, qs.stringify(params), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }); };