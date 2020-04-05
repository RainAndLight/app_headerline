import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import HomeIndex from '@/components/HomeIndex'
import HomeQusetion from '@/components/HomeQusetion'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        name: 'homeIndex',
        path: '',
        component: HomeIndex
      },
      {
        name: 'homeQuestion',
        path: '/qusetion',
        component: HomeQusetion
      }
    ]
  },
  {
    name: 'loginIndex',
    path: '/login',
    component: () => import('@/views/Login')
  }
  // {
  // path: '/about',
  // name: 'About',

  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.

  // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
