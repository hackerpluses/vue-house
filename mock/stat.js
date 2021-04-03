const Mock = require('mockjs')

const orderInf = Mock.mock({
  'errno': 0,
  'data': {
    'columns': ['day', 'orders', 'customers', 'amount', 'pcr'],
    'rows': [
      { 'amount': 324.00 / 1000, 'orders': 10, 'customers': 2, 'day': '2021-01-11', 'pcr': 211.00 / 1000 },
      { 'amount': 455.00 / 1000, 'orders': 1, 'customers': 2, 'day': '2021-01-12', 'pcr': 139.00 / 1000 },
      { 'amount': 999.00 / 1000, 'orders': 12, 'customers': 3, 'day': '2021-01-13', 'pcr': 421.00 / 1000 },
      { 'amount': 848.00 / 1000, 'orders': 2, 'customers': 1, 'day': '2021-01-14', 'pcr': 748.00 / 1000 },
      { 'amount': 666.00 / 1000, 'orders': 4, 'customers': 2, 'day': '2021-01-24', 'pcr': 559.00 / 1000 },
      { 'amount': 311.00 / 1000, 'orders': 15, 'customers': 18, 'day': '2021-01-25', 'pcr': 211.00 / 1000 }]
  },
  'errmsg': '成功'
})

const userInf = Mock.mock({
  'errno': 0,
  'data': {
    'columns': ['day', 'users'],
    'rows': [
      { 'day': '2019-04-20', 'users': 1 },
      { 'day': '2019-04-30', 'users': 10 },
      { 'day': '2020-05-20', 'users': 120 },
      { 'day': '2020-01-21', 'users': 100 }
    ] },
  'errmsg': '成功'
})

module.exports = [
  {
    url: '/stat/order',
    type: 'get',
    response: config => {
      const items = orderInf.data
      return {
        code: 20000,
        errno: orderInf.errno,
        data: items,
        errmsg: orderInf.errmsg
      }
    }
  },
  {
    url: '/stat/user',
    type: 'get',
    response: config => {
      const items = userInf.data
      return {
        code: 20000,
        errno: userInf.errno,
        data: items,
        errmsg: userInf.errmsg
      }
    }
  }
]
