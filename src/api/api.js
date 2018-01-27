import axios from 'axios';
import qs from 'qs';

let base = '/api';

export const requestLogin = params => {
    return axios.post(`${base}/account/signin`, qs.stringify(params), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(res => {
        console.log(res.data);
        return res.data;
    });
};

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };

export const getCompanyList = params => { return axios.get(`${base}/company/list`, { params: params }); };

export const removeCompany = params => { return axios.get(`${base}/company/remove`, { params: params }); };

export const addCompany = params => { return axios.post(`${base}/company/create`, qs.stringify(params), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }); };

export const editCompany = params => { return axios.post(`${base}/company/modify`, qs.stringify(params), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }); };

export const getEnterpriseList = params => { return axios.get(`${base}/enterprise/list`, { params: params }); };

export const removeEnterprise = params => { return axios.get(`${base}/enterprise/remove`, { params: params }); };

export const addEnterprise = params => { return axios.post(`${base}/enterprise/create`, qs.stringify(params), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }); };

export const editEnterprise = params => { return axios.post(`${base}/enterprise/modify`, qs.stringify(params), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }); };


export const test = params => { return axios.get('/api/company/list', { params: params }); };