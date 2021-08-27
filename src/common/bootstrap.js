import store from '@/store'
import storage from '@/common/storage'
import { SESSION_KEY, USER_INFO } from '@/store/mutation-types'
export default function Initializer() {
  // 用户认证token
  store.commit('SET_TOKEN', storage.get(SESSION_KEY))
  // 当前用户ID
  store.commit('SET_USER', storage.get(USER_INFO))
}
