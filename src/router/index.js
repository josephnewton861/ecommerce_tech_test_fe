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
    component: () => import ('../views/ProductBasket.vue')
  },

  {
    path: '/register',
    name: 'RegisterUser',
    component: () => import ('../views/RegisterUser.vue')
  },
  {
    path: '/login',
    name: 'LoginUser',
    component: () => import ('../views/LoginUser.vue')
  },

  {
    path: '/product/:category/:slug',
    name: 'SingleProduct',
    component: () => import ('../views/SingleProduct.vue')
  },
  {
    path: '/orders',
    name: 'CustomerOrders',
    component: () => import ('../views/CustomerOrders.vue')
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
