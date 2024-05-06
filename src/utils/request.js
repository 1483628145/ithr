import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'

// 创建axios实例
const service = axios.create({
  baseURL: '/api', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 发请求之前
    if (store.getters.token) {
      // 有token的情况 添加请求头
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    return config
  },
  error => {
    // 请求失败的情况
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(async(response) => {
  const { data, message, success } = response.data // 默认json格式
  // 成功
  if (success) {
    return data
  } else {
    Message({ type: 'error', message })
    return Promise.reject(new Error(message))
  }
},
// 失败
async(error) => {
  // token失效的情况
  if (error.response.status === 401) {
    Message({ type: 'error', message: 'Token超时' })
    // 删除本地token
    await store.dispatch('user/logout')
    router.push('/login')
    return Promise.reject(error)
  }
  // error.message
  Message({ type: 'error', message: error.message })
  return Promise.reject(error)
})

export default service
