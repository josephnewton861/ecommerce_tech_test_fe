import { createRouter, createWebHistory } from '@ionic/vue-router';
// import { RouteRecordRaw } from 'vue-router';

const routes = [
  // {
  //   path: '',
  //   component: () => import ('../views/HomePage.vue')
  // },
  // {
  //   path: '/',
  //   component: () => import ('../views/FolderPage.vue')

  // },

  {
    path: '/',
    name: 'HomPage',
    component: () => import ('../views/HomePage.vue')

  },


  // {
  //   path: '/folder/:id',
  //   component: () => import ('../views/FolderPage.vue')
  // },
  {
    path: '/product/:category/:slug',
    name: 'SingleProduct',
    component: () => import ('../views/SingleProduct.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
