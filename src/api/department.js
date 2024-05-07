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

/**
 * 获取部门负责人列表
 * **/

export function getManagerList() {
  return request({
    url: '/sys/user/simple',
    method: 'GET'
  })
}

/**
 * 新增部门
 * **/

export function addDepart(data) {
  return request({
    url: '/company/department',
    method: 'POST',
    data
  })
}
