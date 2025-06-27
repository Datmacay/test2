import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../components/Auth/Login.vue'
import LayoutDefault from '../layout/layoutDefault/layoutDefault.vue'
import AboutView from '../views/AboutView.vue'
import LayoutAdmin from '../layout/layoutAdmin/LayoutAdmin.vue'
import Dashboard from '../views/Dashboard.vue'
import ProductDetail from '../views/ProductDetail.vue'
import { getRoles } from '../helper/getRoles'
import { isValidToken } from '../helper/isValidToken'
import NotFound from '../views/NotFound.vue'
import Fobiden from '../views/Fobiden.vue'
import OrderManage from '../views/OrderManage.vue'
import ProductManage from '../views/ProductManage.vue'
import CreateProduct from '../views/CreateProduct.vue'
import Cart from '../views/Cart.vue'
import Order from '../views/Order.vue'
import Myinfo from '../views/Myinfo.vue'
import Bill from '../views/Bill.vue'
import Logout from '../views/Logout.vue'
import Test from '../views/Test.vue'
import ChangePassword from '../views/ChangePassword.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'layout-default',
      component: LayoutDefault,
      path: '/',
      children: [
        {
          path: '/',
          name: 'home',
          component: HomeView,
        },
        {
          path: '/test',
          name: 'test',
          component: Test,
        },
        {
          path: '/cart',
          name: 'cart',
          component: Cart,
          meta: {
            requiresAuth: true,
            roles: ['ADMIN', 'USER'],
          },
        },
        {
          path: '/my-info',
          name: 'myInfo',
          component: Myinfo,
          meta: {
            requiresAuth: true,
            roles: ['ADMIN', 'USER'],
          },
        },
        {
          path: '/logout',
          name: 'logout',
          component: Logout,
          meta: {
            requiresAuth: true,
            roles: ['ADMIN', 'USER'],
          },
        },
        {
          path: '/bill',
          name: 'bill',
          component: Bill,
          meta: {
            requiresAuth: true,
            roles: ['ADMIN', 'USER'],
          },
        },
        {
          path: '/order',
          name: 'order',
          component: Order,
          meta: {
            requiresAuth: true,
            roles: ['ADMIN', 'USER'],
          },
        },
        {
          path: '/:pathMatch(.*)*',
          name: 'notfound',
          component: NotFound,
        },
        {
          path: '/about',
          name: 'about',
          component: () => AboutView,
        },
        {
          path: '/fobiden',
          name: 'fobiden',
          component: () => Fobiden,
        },
        {
          path: '/product/:id',
          name: 'productDetail',
          component: () => ProductDetail,
        },
        {
          path: '/reset-password',
          name: 'resetPassword',
          meta: {
            requiresAuth: true,
            roles: ['ADMIN', 'USER'],
          },
          component: () => ChangePassword,
        },
        {
          path: '/login',
          name: 'login',
          component: Login,
        },
      ],
    },
    {
      name: 'layout-admin',
      component: LayoutAdmin,
      path: '/admin',
      meta: {
        requiresAuth: true, // đánh dấu route cần đăng nhập
        roles: ['ADMIN'],
      },
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: Dashboard,
        },
        {
          path: 'orders',
          name: 'orders',
          component: OrderManage,
        },
        {
          path: 'products',
          name: 'products',
          component: ProductManage,
        },
        {
          path: 'products/create',
          name: 'productCreate',
          component: CreateProduct,
        },
      ],
    },
  ],
})

router.beforeEach((to, from, next) => {
  const role = getRoles()
  const isValid = isValidToken()
  if (to.matched.some((item) => item.meta.requiresAuth)) {
    if (!isValid || !role) {
      return next({ name: 'login' })
    }
    const allowedRoles = to.meta.roles as string[]
    if (!allowedRoles.includes(role)) {
      return next({ name: 'fobiden' })
    }
  }
  next()
})

export default router
