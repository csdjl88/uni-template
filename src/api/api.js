import request from './request'

//APP端检测版本
export function checkVersion() {
  return request({
    url: 'app-version/',
    method: 'get'
  })
}

