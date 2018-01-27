import axios from 'axios';
import qs from 'qs';

let base = '/api';

export const EnterpriseStatus_Enable=1;

export const EnterpriseStatus_Disable=0;

export const getEnterpriseList = params => { return axios.get(`${base}/enterprise/list`, { params: params }); };

export const getEnterpriseListByStatus = params => { return axios.post(`${base}/enterprise/status`, qs.stringify(params), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });  };

export const removeEnterprise = params => { return axios.post(`${base}/enterprise/remove`, { params: params }); };

export const addEnterprise = params => { return axios.post(`${base}/enterprise/create`, qs.stringify(params), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }); };

export const editEnterprise = params => { return axios.post(`${base}/enterprise/modify`, qs.stringify(params), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }); };
