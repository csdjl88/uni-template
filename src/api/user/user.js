import request from '../request'

//获取微信用户信息
export function getMpUserInfo(data) {
  return request({
    url: 'user/',
    method: 'post',
    data
  })
}

export function userMpLogin(data) {
  return request({
    url: 'auth/',
    method: 'post',
    data
  })
}

export function userRegister(data) {
  return request({
    url: 'register/',
    method: 'post',
    data
  })
}

export function userLogin(data) {
  return request({
    url: 'login/',
    method: 'post',
    data
  })
}

export function userLoginOut() {
  return request({
    url: 'login-out/',
    method: 'get',
  })
}

