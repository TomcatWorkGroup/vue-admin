import axios from 'axios';
import qs from 'qs';
import base from './api'

let ext_dm ='.dm';


export const getEndUserList = params => { return axios.get(`${base}/enduser/list${ext_dm}`, { params: params }); };

export const removeEndUser = params => { return axios.post(`${base}/enduser/remove${ext_dm}`, { params: params }); };

export const addEndUser = params => { return axios.post(`${base}/enduser/create${ext_dm}`, qs.stringify(params), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }); };

export const editEndUser = params => { return axios.post(`${base}/enduser/modify${ext_dm}`, qs.stringify(params), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }); };
