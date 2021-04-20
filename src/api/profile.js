import request from '@/utils/request'

export function changePassword(data) {
  return request({
    url: '/admin/profile/password',
    method: 'post',
    data
  })
}

export function updateAccount(data) {
  return request({
    url: '/admin/profile/account',
    method: 'post',
    data
  })
}

export function nNotice() {
  return request({
    url: '/admin/profile/unread',
    method: 'get'
  })
}

export function listNotice(query) {
  return request({
    url: '/admin/profile/list',
    method: 'get',
    params: query
  })
}

export function catNotice(data) {
  return request({
    url: '/admin/profile/read',
    method: 'post',
    data
  })
}

export function bcatNotice(data) {
  return request({
    url: '/admin/profile/read',
    method: 'post',
    data
  })
}

export function rmNotice(data) {
  return request({
    url: '/admin/profile/remove',
    method: 'post',
    data
  })
}

export function brmNotice(data) {
  return request({
    url: '/admin/profile/brmnotice',
    method: 'post',
    data
  })
}

