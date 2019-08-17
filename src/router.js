import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Main
    },
    {
      path: '/goodsList',
      name: 'goodsList',
      component: () => import('./views/GoodsList.vue')
    },
    {
      path: '/gooddetails',
      name: 'goodsDetails',
      component: () => import('./views/GoodsDetails.vue')
    },
    {
      path: '/buy',
      name: 'buy',
      component: () => import('./views/Buy.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register.vue')
    }
  ]
})
