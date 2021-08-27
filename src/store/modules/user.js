import storage from '@/common/storage'
import * as LoginApi from '@/api/user/user'
import {SESSION_KEY, USER_INFO} from '@/store/mutation-types'
// 登陆成功后执行
const loginSuccess = (commit, {token, userInfo}) => {
  // 过期时间30天
  const expiryTime = 30 * 86400
  // 保存tokne和userId到缓存
  storage.set(SESSION_KEY, token, expiryTime)
  storage.set(USER_INFO, userInfo, expiryTime)
  // 记录到store全局变量
  commit('SET_TOKEN', token)
  commit('SET_USER', userInfo)
}

//同步用户状态
const statusSync = (commit, {userInfo}) => {
  // 过期时间30天
  const expiryTime = 30 * 86400
  // 保存tokne和userId到缓存
  storage.set(USER_INFO, userInfo, expiryTime)
  // 记录到store全局变量
  commit('SET_USER', userInfo)
}


const user = {
  state: {
    isCustomer: 0, // 是否验证会员
    // 用户认证token
    token: '',
    // 用户ID
    user: ""
  },

  mutations: {
    SET_TOKEN: (state, value) => {
      state.token = value
    },
    SET_USER: (state, value) => {
      let vaild = false
      if (Boolean(value)) {
        vaild = value.vaild
      }
      state.user = value
      state.isCustomer = vaild === true ? 1 : 0
    }
  },

  actions: {
    // 验证码 + 手机号码 普通用户登录
    Login({commit}, data) {
      return new Promise((resolve, reject) => {
        LoginApi.userLogin(data)
          .then(res => {
            const {code, data} = res
            if (code === 1) {
              loginSuccess(commit, {token: data.session_key, userInfo: data})
            }
            resolve(res)
          })
          .catch(reject)
      })
    },

    // 微信小程序code换userInfo
    mpUserInfo({commit}, data) {
      return new Promise((resolve, reject) => {
        LoginApi.getMpUserInfo(data, {isPrompt: false})
          .then(res => {
            const {code, data} = res
            if (code === 1) {
              if (data.session_key) {
                loginSuccess(commit, {token: data.session_key, userInfo: data})
              }
              resolve(res)
            }
          })
          .catch(reject)
      })
    },

    // 微信小程序快捷登录
    userWxLogin({commit}, data) {
      return new Promise((resolve, reject) => {
        LoginApi.userMpLogin(data, {isPrompt: false})
          .then(res => {
            const {code, data} = res
            if (code === 1) {
              loginSuccess(commit, {token: data.session_key, userInfo: data})
            }
            resolve(res)
          })
          .catch(reject)
      })
    },

    // 退出登录
    Logout({commit}, data) {
      const self = this
      return new Promise((resolve, reject) => {
        if (self.getters.user) {
          // 删除缓存中的tokne和userId
          storage.remove(USER_INFO)
          storage.remove(SESSION_KEY)
          // 记录到store全局变量
          commit('SET_TOKEN', '')
          commit('SET_USER', null)
          resolve()
        }
      })
    },
    //同步用户状态信息
    SetUserStatus({commit}, data) {
      return new Promise((resolve, reject) => {
        let now = storage.get(USER_INFO)
        if (now) {
          now.vaild = data.customer_state === 1 ? true : false
          now.apply_state_name = data.apply_state_name
          now.apply_state = data.apply_state
          if (storage.get(USER_INFO).apply_state !== data.apply_state) {
            statusSync(commit, {userInfo: now})
            resolve()
          }
        }
      })
    }
  }
}

export default user
