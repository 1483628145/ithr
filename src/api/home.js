import request from '@/utils/request'

/**
 *首页展示数据
 * **/

export function getHomeData() {
  return request({
    url: '/home/data',
    method: 'GET'
  })
}

