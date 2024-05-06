
import { Login, getUserInfo } from '@/api/user'
import { getToken, removeToken, setToken } from '@/utils/auth'

const state = {
  token: null || getToken(),
  userInfo: {}
}

// 修改status数据
const mutations = {
  // 保存Token
  setToken(state, token) {
    // 先将数据存在VueX中
    state.token = token
    // 将数据存在本地中
    setToken(token)
  },
  // 保存用户信息
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
  },
  // 删除token
  delToken(state) {
    removeToken()
    state.token = null
    state.userInfo = null
  }
}

// 发请求
const actions = {
  // 登录
  async login(context, data) {
    const token = await Login(data)
    context.commit('setToken', token)
  },
  // 退出登录
  logout(context) {
    context.commit('delToken')
  },
  // 获取用户信息
  async getUserInfo(context) {
    const userInfo = await getUserInfo()
    context.commit('setUserInfo', userInfo)
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
