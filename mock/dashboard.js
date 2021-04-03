const Mock = require('mockjs')

const inf = Mock.mock({
  userTotal: 3,
  goodsTotal: 4,
  productTotal: 1,
  orderTotal: 2
})

module.exports = [
  {
    url: '/dashboard/information',
    type: 'get',
    response: config => {
      const items = inf
      return {
        code: 20000,
        data: items
      }
    }
  }
]
