import axios from 'axios';
import qs from 'qs';

let base = '/api';


export const getEndUserList = params => { return axios.get(`${base}/enduser/list`, { params: params }); };

export const removeEndUser = params => { return axios.post(`${base}/enduser/remove`, { params: params }); };

export const addEndUser = params => { return axios.post(`${base}/enduser/create`, qs.stringify(params), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }); };

export const editEndUser = params => { return axios.post(`${base}/enduser/modify`, qs.stringify(params), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }); };
