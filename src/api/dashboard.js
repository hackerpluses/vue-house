import request from '@/utils/request'

export function getInfo() {
  return request({
    url: '/admin/dashboard',
    method: 'get'
  })
}
