const Mock = require('mockjs')

const admins = Mock.mock({
  'items|3': [{
    addTime: '2019-04-21 06:17:43',
    avatar: 'http://pics0.baidu.com/feed/a686c9177f3e6709665d2ed0c933213bf9dc55bf.jpeg?token=c923a2fa85ba4a5283ebede1db712492',
    deleted: false,
    gender: 1,
    'id|+1': 100,
    lastLoginIp: '221.231.13.42',
    lastLoginTime: '2021-01-30 10:31:01',
    mobile: '13800138000',
    'nickname|1-10': '1',
    password: 'user123',
    sessionKey: '',
    status: 0,
    updateTime: '2021-03-26 21:59:14',
    userLevel: 0,
    username: 'user123',
    weixinOpenid: ''
  }]
})
const employees = Mock.mock({
  'items|5': [{
    addTime: '2023-04-21 06:17:43',
    avatar: '',
    deleted: false,
    gender: 1,
    'id|+1': 100,
    lastLoginIp: '221.231.13.42',
    lastLoginTime: '2021-01-30 10:31:01',
    mobile: '13854667000',
    'nickname|1-10': '1',
    password: 'user123',
    sessionKey: '',
    status: 0,
    updateTime: '2021-03-26 21:59:14',
    userLevel: 0,
    username: 'user123',
    weixinOpenid: ''
  }]
})

module.exports = [
  {
    url: '/admin/admin/list',
    type: 'get',
    response: config => {
      const items = admins.items
      return {
        code: 20000,
        data: {
          total: items.length,
          records: items
        }
      }
    }
  },
  {
    url: '/admin/admin/update',
    type: 'post',
    response: config => {
      const { id } = config.body
      for (let i = 0; i < admins.items.length; i++) {
        if (admins.items[i].id === id) { admins.items[i] = config.body; break }
      }
      return {
        code: 20000
      }
    }
  },
  {
    url: '/admin/admin/create',
    type: 'post',
    response: config => {
      let id = Math.max.apply(Math, admins.items.map(function(o) { return o.id }))
      if (id === -Infinity) id = 1
      config.body.id = id + 1
      admins.items = admins.items.concat(config.body)
      return {
        code: 20000
      }
    }
  },
  {
    url: '/admin/admin/delete',
    type: 'post',
    response: config => {
      const { id } = config.body
      for (let i = 0; i < admins.items.length; i++) {
        if (admins.items[i].id === id) { admins.items.splice(i, 1); break }
      }
      return {
        code: 20000
      }
    }
  },
  {
    url: '/admin/admin/read',
    type: 'get',
    response: config => {
      const id = config.query.id
      let items = []
      for (let i = 0; i < admins.items.length; i++) {
        if (admins.items[i].id === parseInt(id)) { items.push(admins.items[i]); break }
      }

      return {
        code: 20000,
        data: {
          total: items.length,
          records: items
        }
      }
    }
  },
  {
    url: '/admin/employee/list',
    type: 'get',
    response: config => {
      const items = employees.items
      return {
        code: 20000,
        data: {
          total: items.length,
          records: items
        }
      }
    }
  },
  {
    url: '/admin/employee/update',
    type: 'post',
    response: config => {
      const { id } = config.body
      for (let i = 0; i < employees.items.length; i++) {
        if (employees.items[i].id === id) { employees.items[i] = config.body; break }
      }
      console.log(employees.items)
      return {
        code: 20000
      }
    }
  }
]
