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

/**
 * 获取部门详情
 * **/

export function getDepartDetail(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'GET'
  })
}

/**
 * 修改部门详情
 * **/

export function updateDeptDetail(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'PUT',
    data
  })
}

/**
 * 删除部门
 * **/

export function deleteDept(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'DELETE',
    data
  })
}
