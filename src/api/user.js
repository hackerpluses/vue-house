import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/admin/auth/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/admin/auth/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/admin/auth/logout',
    method: 'post'
  })
}

export function getKaptcha() {
  return request({
    url: '/admin/auth/kaptcha',
    method: 'get'
  })
}
