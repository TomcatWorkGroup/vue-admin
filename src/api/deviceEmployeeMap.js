import axios from 'axios';
import qs from 'qs';

let base = '/api';

export const addMap = params => { return axios.post(`${base}/dem/create`, qs.stringify(params), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }); };

export const searchByDevice = params => { return axios.post(`${base}/dem/get/device`, qs.stringify(params), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }); };

export const searchByEmployee = params => { return axios.post(`${base}/dem/get/employee`, qs.stringify(params), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }); };

export const deleteMap = params => { return axios.post(`${base}/dem/delete`, qs.stringify(params), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }); };
