import request from '@/utils/request'

export function getAfterSaleList(query) {
  return request({
    url: '/admin/aftersale/list',
    method: 'get',
    params: query
  })
}

export function acceptAfterSale(data) {
  return request({
    url: '/admin/aftersale/recept',
    method: 'post',
    data
  })
}

export function batchAcceptAfterSale(data) {
  return request({
    url: '/admin/aftersale/batch-recept',
    method: 'post',
    data
  })
}

export function rejectAfterSale(data) {
  return request({
    url: '/admin/aftersale/reject',
    method: 'post',
    data
  })
}

export function batchRejectAfterSale(data) {
  return request({
    url: '/admin/aftersale/batch-reject',
    method: 'post',
    data
  })
}

export function refundAfterSale(data) {
  return request({
    url: '/admin/aftersale/refund',
    method: 'post',
    data
  })
}
