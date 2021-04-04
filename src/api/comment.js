import request from '@/utils/request'

export function listComment(query) {
  return request({
    url: '/userComment/list',
    method: 'get',
    params: query
  })
}

export function deleteComment(data) {
  return request({
    url: '/userComment/delete',
    method: 'post',
    data
  })
}
