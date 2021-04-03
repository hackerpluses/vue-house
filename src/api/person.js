import request from '@/utils/request'

export function getAdmins(params) {
  return request({
    url: '/admin/admin/list',
    method: 'get',
    params
  })
}

export function updateAdmin(data) {
  return request({
    url: '/admin/admin/update',
    method: 'post',
    data
  })
}

export function addAdmin(data) {
  return request({
    url: '/admin/admin/create',
    method: 'post',
    data
  })
}

export function deleteAdmin(data) {
  return request({
    url: '/admin/admin/delete',
    method: 'post',
    data
  })
}

export function searchAdmin(params) {
  return request({
    url: '/admin/admin/read',
    method: 'get',
    params
  })
}

export function getEmployees(params) {
  return request({
    url: '/admin/employee/list',
    method: 'get',
    params
  })
}

export function updateEmployee(data) {
  return request({
    url: '/admin/employee/update',
    method: 'post',
    data
  })
}

export function addEmployee(data) {
  return request({
    url: '/admin/employee/create',
    method: 'post',
    data
  })
}

export function deleteEmployee(data) {
  return request({
    url: '/admin/employee/delete',
    method: 'post',
    data
  })
}

export function searchEmployee(params) {
  return request({
    url: '/admin/employee/read',
    method: 'get',
    params
  })
}
