import axios from 'axios';
import qs from 'qs';

let base = '/api';

export const all = requestArray =>{ return axios.all(requestArray);}

export const getEmployeeList = params => { return axios.get(`${base}/employee/list`, { params: params }); };

export const searchEmployee = params => { return axios.post(`${base}/employee/search`, qs.stringify(params), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }); };

export const removeEmployee = params => { return axios.post(`${base}/employee/remove`, { params: params }); };

export const addEmployee = params => { return axios.post(`${base}/employee/create`, qs.stringify(params), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }); };

export const editEmployee = params => { return axios.post(`${base}/employee/modify`, qs.stringify(params), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }); };
