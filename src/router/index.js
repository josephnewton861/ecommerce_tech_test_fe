import { createRouter, createWebHistory } from '@ionic/vue-router';

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: () => import ('../views/HomePage.vue')

  },
  {
    path: '/basket',
    name: 'ProductBasket',
    component: () => import ('../views/products/ProductBasket.vue')
  },

  {
    path: '/register',
    name: 'RegisterUser',
    component: () => import ('../views/customer/RegisterUser.vue')
  },
  {
    path: '/login',
    name: 'LoginUser',
    component: () => import ('../views/customer/LoginUser.vue')
  },
  {
    path: '/contact',
    name: 'ContactPoint',
    component: () => import ('../views/ContactPoint.vue')
  },

  {
    path: '/product/:category/:slug',
    name: 'SingleProduct',
    component: () => import ('../views/products/SingleProduct.vue')
  },
  {
    path: '/orders',
    name: 'CustomerOrders',
    component: () => import ('../views/orders/CustomerOrders.vue')
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
