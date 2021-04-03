import request from '@/utils/request'

export function searchExercise(params) {
  return request({
    url: '/testBank/list',
    method: 'get',
    params
  })
}

export function updateExercise(data) {
  return request({
    url: '/testBank/editTestBank',
    method: 'post',
    data
  })
}

export function addExercise(data) {
  return request({
    url: '/testBank/addTestBank',
    method: 'post',
    data
  })
}

export function deleteExercise(data) {
  return request({
    url: '/testBank/batch-delTestBank',
    method: 'post',
    data
  })
}
