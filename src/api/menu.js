import request from '@/utils/request'

export function fetchList(parentId, params) {
  return request({
    url: '/admin/menu/list/' + parentId,
    method: 'get',
    params: params
  })
}

export function deleteMenu(id) {
  return request({
    url: '/admin/menu/delete/' + id,
    method: 'post'
  })
}

export function createMenu(data) {
  return request({
    url: '/admin/menu/create',
    method: 'post',
    data: data
  })
}

export function updateMenu(id, data) {
  return request({
    url: '/admin/menu/update/' + id,
    method: 'post',
    data: data
  })
}

export function getMenu(id) {
  return request({
    url: '/admin/menu/' + id,
    method: 'get'
  })
}

export function updateHidden(id, params) {
  return request({
    url: '/admin/menu/updateHidden/' + id,
    method: 'post',
    params: params
  })
}

export function fetchTreeList() {
  return request({
    url: '/admin/menu/treeList',
    method: 'get'
  })
}

