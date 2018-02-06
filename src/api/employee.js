import axios from 'axios';
import qs from 'qs';
import base from './api'

let ext_dm ='.dm';

export const all = requestArray =>{ return axios.all(requestArray);}

export const getEmployeeList = params => { return axios.get(`${base}/employee/list${ext_dm}`, { params: params }); };

export const searchEmployee = params => { return axios.post(`${base}/employee/search${ext_dm}`, qs.stringify(params), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }); };

export const removeEmployee = params => { return axios.post(`${base}/employee/remove${ext_dm}`, { params: params }); };

export const addEmployee = params => { return axios.post(`${base}/employee/create${ext_dm}`, qs.stringify(params), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }); };

export const editEmployee = params => { return axios.post(`${base}/employee/modify${ext_dm}`, qs.stringify(params), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }); };
