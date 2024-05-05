import { Login } from '@/api/user'
import { removeToken, setToken } from '@/utils/auth'

const state = {
  token: null
}

// 修改status数据
const mutations = {
  setToken(state, token) {
    // 先将数据存在VueX中
    state.token = token
    // 将数据存在本地中
    setToken(token)
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
  logout() {
    removeToken()
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
