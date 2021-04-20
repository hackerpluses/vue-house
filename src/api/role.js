import request from '@/utils/request'

export function getRoutes() {
  return request({
    url: '/vue-element-admin/routes',
    method: 'get'
  })
}

export function getRoles(query) {
  return request({
    url: '/admin/role/list',
    method: 'get',
    params: query
  })
}

export function addRole(data) {
  return request({
    url: '/admin/role/create',
    method: 'post',
    data
  })
}

export function readRole(data) {
  return request({
    url: '/role/read',
    method: 'get',
    data
  })
}

// export function updateRole(data) {
//   return request({
//     url: '/admin/role/update',
//     method: 'post',
//     data
//   })
// }
//
// export function deleteRole(data) {
//   return request({
//     url: '/admin/role/delete',
//     method: 'post',
//     data
//   })
// }

export function getPermission(query) {
  return request({
    url: '/admin/role/permissions',
    method: 'get',
    params: query
  })
}

export function updatePermission(data) {
  return request({
    url: '/admin/role/permissions',
    method: 'post',
    data
  })
}

export function roleOptions(query) {
  return request({
    url: '/admin/category/options',
    method: 'get',
    params: query
  })
}

// mall里面的接口
export function fetchList(params) {
  return request({
    url: '/role/listAll',
    method: 'get',
    params: params
  })
}

export function createRole(data) {
  return request({
    url: '/role/create',
    method: 'post',
    data: data
  })
}

export function updateRole(id, data) {
  return request({
    url: '/role/update/' + id,
    method: 'post',
    data: data
  })
}

export function updateStatus(id, params) {
  return request({
    url: '/role/updateStatus/' + id,
    method: 'post',
    params: params
  })
}

export function deleteRole(data) {
  return request({
    url: '/role/delete',
    method: 'post',
    data: data
  })
}

export function fetchAllRoleList() {
  return request({
    url: '/role/listAll',
    method: 'get'
  })
}

export function listMenuByRole(roleId) {
  return request({
    url: '/role/listMenu/' + roleId,
    method: 'get'
  })
}

export function listResourceByRole(roleId) {
  return request({
    url: '/role/listResource/' + roleId,
    method: 'get'
  })
}

export function allocMenu(data) {
  return request({
    url: '/role/allocMenu',
    method: 'post',
    data: data
  })
}

export function allocResource(data) {
  return request({
    url: '/role/allocResource',
    method: 'post',
    data: data
  })
}
