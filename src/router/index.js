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
        meta: { title: '??????', icon: 'dashboard', affix: true }
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
        meta: { title: '??????', icon: 'user', noCache: true }
      },
      {
        path: 'notice',
        component: () => import('@/views/profile/notice'),
        name: 'notice',
        meta: { title: '????????????', noCache: true }
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
    path: '/system',
    component: Layout,
    redirect: '/system/admin',
    alwaysShow: true,
    name: 'system',
    meta: { title: '????????????', icon: 'peoples' },
    children: [
      {
        path: 'admin',
        name: 'admins',
        component: () => import('@/views/system/admin'),
        meta: { title: '?????????', icon: 'ums-admin' }
      },
      {
        path: 'notice',
        name: 'notice',
        component: () => import('@/views/system/notice'),
        meta: { title: '????????????', icon: 'tree' }
      },
      {
        path: 'os',
        name: 'os',
        component: () => import('@/views/system/os'),
        meta: { title: '????????????', icon: 'tree' }
      }
    ]
  },

  {
    path: '/employee',
    component: Layout,
    redirect: '/employee/index',
    alwaysShow: true,
    name: 'employee',
    meta: { title: '????????????', icon: 'people' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/employee/index'),
        name: 'employee-index',
        meta: {
          title: '????????????',
          noCache: true,
          icon: 'tree'
        }
      },
      {
        path: 'employee',
        name: 'employees',
        component: () => import('@/views/employee/employee'),
        meta: { title: '????????????', icon: 'tree', roles: ['???????????????', 'editor'] }
      },
      {
        path: 'add',
        name: 'employeeAdd',
        hidden: true,
        component: () => import('@/views/employee/product/add'),
        meta: { title: '????????????', icon: 'tree', roles: ['???????????????', 'editor'] }
      },
      {
        path: 'feedback',
        component: () => import('@/views/employee/feedback'),
        name: 'employee-feedback',
        meta: {
          title: '????????????',
          icon: 'tree',
          noCache: true
        }
      },
      {
        path: 'category',
        component: () => import('@/views/employee/category'),
        name: 'employee-category',
        meta: {
          title: '????????????',
          icon: 'tree',
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
    meta: { title: '????????????', icon: 'people' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/customer/index'),
        name: 'customer-index',
        meta: {
          title: '????????????',
          noCache: true
        }
      },
      {
        path: 'address',
        component: () => import('@/views/customer/address'),
        name: 'customer-address',
        meta: {
          title: '????????????',
          noCache: true
        }
      },
      {
        path: 'feedback',
        component: () => import('@/views/customer/feedback'),
        name: 'customer-feedback',
        meta: {
          title: '????????????',
          noCache: true
        }
      },
      {
        path: 'footprint',
        component: () => import('@/views/customer/collection'),
        name: 'customer-collection',
        meta: {
          title: '????????????',
          noCache: true
        }
      },
      {
        path: 'issue',
        component: () => import('@/views/customer/issue'),
        name: 'issue',
        meta: {
          title: '????????????',
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
    meta: { title: '????????????', icon: 'money' },
    children: [
      {
        path: 'index',
        name: 'order-index',
        component: () => import('@/views/order/index'),
        meta: { title: '??????', icon: 'table' }
      },
      {
        path: 'orders',
        name: 'orders',
        component: () => import('@/views/order/orders'),
        meta: { title: '????????????', icon: 'tree' }
      },
      {
        path: 'after-service',
        component: () => import('@/views/order/aftersale'),
        name: 'after-service',
        meta: {
          title: '????????????',
          noCache: true,
          icon: 'tree'
        }
      },
      {
        path: 'comment',
        component: () => import('@/views/order/comment'),
        name: 'customer-comment',
        meta: {
          title: '????????????',
          noCache: true,
          icon: 'tree'
        }
      }
    ]
  },

  {
    path: '/exercise',
    component: Layout,
    redirect: '/exercise/index',
    name: 'exam',
    meta: { title: '????????????', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'index',
        name: 'exam-index',
        component: () => import('@/views/exercise/index'),
        meta: { title: '??????', icon: 'table' }
      },
      {
        path: 'questions',
        name: 'questions',
        component: () => import('@/views/exercise/testBank'),
        meta: { title: '??????', icon: 'tree' }
      }
    ]
  },

  {
    path: '/stat',
    component: Layout,
    redirect: '/stat/user',
    alwaysShow: true,
    name: 'statManage',
    meta: { title: '????????????', icon: 'stat' },
    children: [
      {
        path: 'user',
        component: () => import('@/views/stat/user'),
        name: 'statUser',
        meta: {
          perms: ['GET /admin/stat/user'],
          title: '????????????',
          noCache: true
        }
      },
      {
        path: 'order',
        component: () => import('@/views/stat/order'),
        name: 'statOrder',
        meta: {
          perms: ['GET /admin/stat/order'],
          title: '????????????',
          noCache: true
        }
      },
      {
        path: 'employee',
        component: () => import('@/views/stat/employee'),
        name: 'statEmployee',
        meta: {
          title: '????????????',
          noCache: true
        }
      }
    ]
  },

  {
    path: '/resource',
    name: 'resource',
    component: Layout,
    children: [
      {
        path: 'log',
        component: () => import('@/views/resource/index'),
        name: 'ErrorLog',
        meta: { title: '????????????', icon: 'star' }
      }
    ]
  },

  {
    path: '/promotion',
    component: Layout,
    redirect: '/promotion/hot',
    name: 'promotion',
    meta: { title: '??????', icon: 'sms' },
    children: [
      {
        path: 'hot',
        name: 'homeHot',
        component: () => import('@/views/promotion/hot/index'),
        meta: { title: '????????????', icon: 'sms-hot' }
      },
      {
        path: 'advertise',
        name: 'homeAdvertise',
        component: () => import('@/views/promotion/advertise/index'),
        meta: { title: '????????????', icon: 'sms-ad' }
      },
      {
        path: 'addAdvertise',
        name: 'addHomeAdvertise',
        component: () => import('@/views/promotion/advertise/add'),
        meta: { title: '????????????' },
        hidden: true
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
      title: '????????????',
      icon: 'lock'
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: '????????????'
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: '????????????'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'role',
        name: 'role',
        component: () => import('@/views/permission/role/index'),
        meta: { title: '????????????', icon: 'ums-role' }
      },
      {
        path: 'allocMenu',
        name: 'allocMenu',
        component: () => import('@/views/permission/role/allocMenu'),
        meta: { title: '????????????' },
        hidden: true
      },
      {
        path: 'allocResource',
        name: 'allocResource',
        component: () => import('@/views/permission/role/allocResource'),
        meta: { title: '????????????' },
        hidden: true
      },
      {
        path: 'menu',
        name: 'menu',
        component: () => import('@/views/permission/menu/index'),
        meta: { title: '????????????', icon: 'ums-menu' }
      },
      {
        path: 'addMenu',
        name: 'addMenu',
        component: () => import('@/views/permission/menu/add'),
        meta: { title: '????????????' },
        hidden: true
      },
      {
        path: 'updateMenu',
        name: 'updateMenu',
        component: () => import('@/views/permission/menu/update'),
        meta: { title: '????????????' },
        hidden: true
      },
      {
        path: 'resource',
        name: 'resource',
        component: () => import('@/views/permission/resource/index'),
        meta: { title: '????????????', icon: 'ums-resource' }
      },
      {
        path: 'resourceCategory',
        name: 'resourceCategory',
        component: () => import('@/views/permission/resource/categoryList'),
        meta: { title: '????????????' },
        hidden: true
      }
    ]
  },

  {
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    hidden: true,
    meta: {
      title: '????????????',
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
        meta: { title: '????????????', icon: 'bug' }
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
      title: '??????',
      icon: 'link'
    },
    children: [
      {
        path: 'https://tieba.baidu.com/f?kw=%BC%D2%D5%FE&fr=ala0&tpl=5',
        meta: { title: '????????????', icon: 'link' }
      },
      {
        path: 'https://baike.baidu.com/item/%E5%AE%B6%E6%94%BF/2605587?fr=aladdin',
        meta: { title: '????????????', icon: 'link' }
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
