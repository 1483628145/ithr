import request from '@/utils/request'

/**
 * 获取组织列表
 * **/

export function getDepartList() {
  return request({
    url: '/company/department',
    method: 'GET'
  })
}
