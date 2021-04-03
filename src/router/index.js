import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: '档案', icon: 'user', noCache: true }
      },
      {
        path: 'notice',
        component: () => import('@/views/profile/notice'),
        name: 'notice',
        meta: { title: '通知中心', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/person',
    component: Layout,
    redirect: '/person/admin',
    alwaysShow: true,
    name: 'person',
    meta: { title: '人员管理', icon: 'el-icon-s-help', roles: ['超级管理员', 'editor'] },
    children: [
      {
        path: 'admin',
        name: 'admins',
        component: () => import('@/views/person/admin'),
        meta: { title: '管理员', icon: 'table', roles: ['超级管理员'] }
      },
      {
        path: 'employee',
        name: 'employees',
        component: () => import('@/views/person/employee'),
        meta: { title: '雇员', icon: 'tree', roles: ['超级管理员', 'editor'] }
      }
    ]
  },

  {
    path: '/employee',
    component: Layout,
    redirect: '/employee/index',
    alwaysShow: true,
    name: 'employee',
    meta: { title: '雇员服务信息', icon: 'stat' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/employee/index'),
        name: 'employee-index',
        meta: {
          title: '雇员服务汇总',
          noCache: true
        }
      },
      {
        path: 'comment',
        component: () => import('@/views/employee/comment'),
        name: 'employee-comment',
        meta: {
          title: '雇员评价',
          noCache: true
        }
      },
      {
        path: 'footprint',
        component: () => import('@/views/employee/footprint'),
        name: 'employee-footprint',
        meta: {
          title: '雇员足迹',
          noCache: true
        }
      },
      {
        path: 'address',
        component: () => import('@/views/employee/address'),
        name: 'employee-address',
        meta: {
          title: '雇员住址',
          noCache: true
        }
      },
      {
        path: 'category',
        component: () => import('@/views/employee/category'),
        name: 'employee-category',
        meta: {
          title: '雇员种类',
          noCache: true
        }
      }
    ]
  },

  {
    path: '/customer',
    component: Layout,
    redirect: '/customer/index',
    alwaysShow: true,
    name: 'custom',
    meta: { title: '用户管理', icon: 'stat' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/customer/index'),
        name: 'customer-index',
        meta: {
          title: '用户信息',
          noCache: true
        }
      },
      {
        path: 'address',
        component: () => import('@/views/customer/address'),
        name: 'customer-address',
        meta: {
          title: '用户地址',
          noCache: true
        }
      },
      {
        path: 'comment',
        component: () => import('@/views/customer/feedback'),
        name: 'customer-feedback',
        meta: {
          title: '用户反馈',
          noCache: true
        }
      },
      {
        path: 'footprint',
        component: () => import('@/views/customer/collection'),
        name: 'customer-collection',
        meta: {
          title: '用户收藏',
          noCache: true
        }
      },
      {
        path: 'after-service',
        component: () => import('@/views/customer/aftersale'),
        name: 'after-service',
        meta: {
          title: '用户售后',
          noCache: true
        }
      },
      {
        path: 'issue',
        component: () => import('@/views/customer/issue'),
        name: 'issue',
        meta: {
          title: '通用问题',
          noCache: true
        }
      }
    ]
  },

  {
    path: '/order',
    component: Layout,
    redirect: '/order/index',
    name: 'order',
    meta: { title: '订单管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'index',
        name: 'order-index',
        component: () => import('@/views/order/index'),
        meta: { title: '概况', icon: 'table' }
      },
      {
        path: 'orders',
        name: 'orders',
        component: () => import('@/views/order/orders'),
        meta: { title: '订单', icon: 'tree' }
      }
    ]
  },

  {
    path: '/exercise',
    component: Layout,
    redirect: '/exercise/index',
    name: 'exam',
    meta: { title: '题目管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'index',
        name: 'exam-index',
        component: () => import('@/views/exercise/index'),
        meta: { title: '概况', icon: 'table' }
      },
      {
        path: 'questions',
        name: 'questions',
        component: () => import('@/views/exercise/testBank'),
        meta: { title: '题库', icon: 'tree' }
      }
    ]
  },

  {
    path: '/stat',
    component: Layout,
    redirect: '/stat/user',
    alwaysShow: true,
    name: 'statManage',
    meta: { title: '统计报表', icon: 'stat' },
    children: [
      {
        path: 'user',
        component: () => import('@/views/stat/user'),
        name: 'statUser',
        meta: {
          perms: ['GET /admin/stat/user'],
          title: '用户统计',
          noCache: true
        }
      },
      {
        path: 'order',
        component: () => import('@/views/stat/order'),
        name: 'statOrder',
        meta: {
          perms: ['GET /admin/stat/order'],
          title: '订单统计',
          noCache: true
        }
      },
      {
        path: 'employee',
        component: () => import('@/views/stat/employee'),
        name: 'statEmployee',
        meta: {
          title: '雇员统计',
          noCache: true
        }
      }
    ]
  },

  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: '权限测试',
      icon: 'lock',
      roles: ['超级管理员', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'Page Permission',
          roles: ['超级管理员'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: 'Directive Permission'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: '角色管理',
          roles: ['超级管理员']
        }
      }
    ]
  },

  {
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    meta: {
      title: '错误页面',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401'),
        name: 'Page401',
        meta: { title: '401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404'),
        name: 'Page404',
        meta: { title: '404', noCache: true }
      }
    ]
  },

  {
    path: '/error-log',
    component: Layout,
    children: [
      {
        path: 'log',
        component: () => import('@/views/error-log/index'),
        name: 'ErrorLog',
        meta: { title: '错误日志', icon: 'bug' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'external-link',
    meta: {
      title: '外链',
      icon: 'link'
    },
    children: [
      {
        path: 'https://www.baidu.com',
        meta: { title: '百度', icon: 'link' }
      },
      {
        path: 'https://cloud.tencent.com/product/sms',
        meta: { title: '腾讯云短信', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
