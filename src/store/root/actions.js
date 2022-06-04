import { http, expressHttp } from '@/common/index';
import Vue from 'vue'

Vue.config.productionTip = false;
Vue.prototype.$http = http; 

http.defaults.timeout = 10000;
http.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.common["Authorization"] = 'Bearer ' + token 
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default {
  expressPost(_, { data, url }) {
    return new Promise((resolve, reject) => expressHttp.post(`${url}`, data)
      .then((response) => { resolve(response.data); })
      .catch((err) => { reject(err); }));
  },
  expressGet(_, url) {
    return new Promise((resolve, reject) => expressHttp.get(`${url}`)
      .then(({ data }) => {
        resolve(data);
      })
      .catch(err => reject(err)));
  },
  expressRemove(_, url) {
    return new Promise((resolve, reject) => expressHttp.delete(`${url}`)
      .then((response) => { resolve(response.data); })
      .catch((err) => { reject(err); }));
  },
  expressPut(_, { data, url }) {
    return new Promise((resolve, reject) => http.put(`${url}`, data)
      .then((response) => { resolve(response.data); })
      .catch((err) => { reject(err); }));
  },
  expressPut1(_, { data, url }) {
    return new Promise((resolve, reject) => http.put(`${url}`, data,{'Content-Type': 'multipart/form-data'})
      .then((response) => { resolve(response.data); })
      .catch((err) => { reject(err); }));
  },
  post(_, { data, url }) {
    return new Promise((resolve, reject) => http.post(`${url}`, data)
      .then((response) => { resolve(response.data); })
      .catch((err) => { reject(err); }));
  },
  get(_, url) {
    return new Promise((resolve, reject) => http.get(`${url}`)
      .then(({ data }) => {
        resolve(data);
      })
      .catch(err => reject(err)));
  },
  put(_, { data, url }) {
    return new Promise((resolve, reject) => http.put(`${url}`, data)
      .then((response) => { resolve(response.data); })
      .catch((err) => { reject(err); }));
  },
  remove(_, url) {
    return new Promise((resolve, reject) => http.delete(`${url}`)
      .then((response) => { resolve(response.data); })
      .catch((err) => { reject(err); }));
  },


};
