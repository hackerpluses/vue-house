import request from '@/utils/request'

export function getCustomers(params) {
  return request({
    url: '/user/list',
    method: 'get',
    params
  })
}

export function updateCustomer(data) {
  return request({
    url: '/user/update',
    method: 'post',
    data
  })
}

export function addCustomer(data) {
  return request({
    url: '/user/create',
    method: 'post',
    data
  })
}

export function deleteCustomer(data) {
  return request({
    url: '/user/delete',
    method: 'post',
    data
  })
}

export function searchCustomer(params) {
  return request({
    url: '/user/read',
    method: 'get',
    params
  })
}

export function getAddressList(params) {
  return request({
    url: '/admin/userAddress/list',
    method: 'get',
    params
  })
}

export function getCollectionList(query) {
  return request({
    url: '/admin/userCollect/list',
    method: 'get',
    params: query
  })
}

export function getFeedbackList(query) {
  return request({
    url: '/userFeedback/list',
    method: 'get',
    params: query
  })
}

export function getFootprintList(query) {
  return request({
    url: '/userFootprint/list',
    method: 'get',
    params: query
  })
}

export function getHistoryList(query) {
  return request({
    url: '/history/list',
    method: 'get',
    params: query
  })
}
