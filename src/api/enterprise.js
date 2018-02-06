import axios from 'axios';
import qs from 'qs';
import base from './api'

let ext_dm ='.dm';

export const EnterpriseStatus_Enable=1;

export const EnterpriseStatus_Disable=0;

export const getEnterpriseList = params => { return axios.get(`${base}/enterprise/list${ext_dm}`, { params: params }); };

export const getEnterpriseListByStatus = params => { return axios.post(`${base}/enterprise/status${ext_dm}`, qs.stringify(params), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });  };

export const removeEnterprise = params => { return axios.post(`${base}/enterprise/remove${ext_dm}`, { params: params }); };

export const addEnterprise = params => { return axios.post(`${base}/enterprise/create${ext_dm}`, qs.stringify(params), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }); };

export const editEnterprise = params => { return axios.post(`${base}/enterprise/modify${ext_dm}`, qs.stringify(params), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }); };
