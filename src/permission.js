// 路由守卫
import router from './router'
import nprogress from 'nprogress'
import store from './store'

// 路由前置守卫
router.beforeEach(async(to, from, next) => {
  nprogress.start()
  const whiteList = ['/login', '/404']
  const token = store.getters.token
  // 判断token
  if (token) {
    // 有token
    if (to.path === '/login') {
      // 有token 跳转到登录页面 强制跳转到主页
      next('/')
      nprogress.done()
    } else {
      // 有token 跳转到其他页面 放行
      if (!store.getters.userId) {
        await store.dispatch('user/getUserInfo')
      }
      next()
    }
  } else {
    // 没有token
    if (whiteList.includes(to.path)) {
      // 没有token且跳转到白名单 放行
      next()
    } else {
      // 没有token且跳转到其他页面 强制跳转到登录页面
      next('/login')
      nprogress.done()
    }
  }
})

// 路由后置守卫
router.afterEach(() => {
  nprogress.done()
})

