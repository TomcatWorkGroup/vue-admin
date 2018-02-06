import axios from 'axios';
import qs from 'qs';
import base from './api'

let ext_dm ='.dm';

export const addMap = params => { return axios.post(`${base}/dem/create${ext_dm}`, qs.stringify(params), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }); };

export const searchByDevice = params => { return axios.post(`${base}/dem/get/device${ext_dm}`, qs.stringify(params), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }); };

export const searchByEmployee = params => { return axios.post(`${base}/dem/get/employee${ext_dm}`, qs.stringify(params), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }); };

export const deleteMap = params => { return axios.post(`${base}/dem/delete${ext_dm}`, qs.stringify(params), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }); };
