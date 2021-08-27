import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import qs from 'qs'
import config from "@/api/config.js"
import {showErrorModel, islogin, getAgentId, textIsEmpty} from "@/common/common.js"
import md from "@/common/md5.js"

let BASE_API = process.uniEnv.BASE_API;
const service = axios.create({
  withCredentials: true, //Access-Control-Allow-Origin不能为 " * "
  crossDomain: true, //允许跨域
  baseURL: BASE_API, // api 的 base_url
  timeout: 60000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    if (store.state.user.token) {
      config.headers["session"] = getToken()
    }
    let timestamp = Date.parse(new Date())
    const agentId = getAgentId()
    config.data = qs.stringify(config.data, {arrayFormat: 'brackets'});
    config.headers["content-type"] = "application/x-www-form-urlencoded"
    if (agentId === 3) {
      let appVersion = uni.getStorageSync('appVersion');
      if (!textIsEmpty(appVersion)) {
        config.headers['app-ver-id'] = appVersion;
      }
    }
    return config
  },
  error => {
    console.log('请求拦截失败')
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
);

// 响应拦截器
service.interceptors.response.use(response => {
  const {code, data, message} = response.data
  if (code === -1) {
    showErrorModel(message)
    setTimeout(() => {
      store.dispatch('Logout')
      islogin()
    }, 1500)
    return false
  }
  return response.data;
}, error => {
  console.log('err' + error);
  let message = "系统繁忙，稍后再试!"
  // showError(message);
  return Promise.reject(error)
})

//定义个适配器，小程序用
axios.defaults.adapter = function (config) {
  return new Promise((resolve, reject) => {
    var settle = require('axios/lib/core/settle');
    var buildURL = require('axios/lib/helpers/buildURL');
    uni.request({
      method: config.method.toUpperCase(),
      url: config.baseURL + buildURL(config.url, config.params, config.paramsSerializer),
      header: config.headers,
      data: config.data,
      dataType: config.dataType,
      responseType: config.responseType,
      sslVerify: config.sslVerify,
      complete: function complete(response) {
        if (response.statusCode === 200) {
          response = {
            data: response.data,
            status: response.statusCode,
            errMsg: response.errMsg,
            header: response.header,
            config: config
          };
          settle(resolve, reject, response);
        } else {
          console.log(response)
        }
      }
    })
  }).catch((e) => {
    console.log(e)
  })
}
export default service
