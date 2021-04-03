import request from '@/utils/request'

export function statOrder(params) {
  return request({
    url: '/admin/stat/order',
    method: 'get',
    params
  })
}

export function statUser(params) {
  return request({
    url: '/admin/stat/user',
    method: 'get',
    params
  })
}

export function statEmployee(params) {
  return request({
    url: '/admin/stat/emp',
    method: 'get',
    params
  })
}
