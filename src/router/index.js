import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home/Home.vue'
import Detail from '../components/Detail/Detail.vue'
import Hot from '../components/Hot/Hot.vue'
import Assortment from '../components/Assortment/Assortment.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home,
      meta: {
        keepAlive: true
      },
      children: [
        {
          path: '',
          redirect: 'hot'
        },
        {
          path: 'hot',
          name: 'Hot',
          component: Hot,
          meta: {
            keepAlive: true
          }
        },
        {
          path: 'assortment',
          name: 'Assortment',
          component: Assortment,
          meta: {
            keepAlive: true
          }
        }
      ]
    },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail,
      meta: {
        keepAlive: false
      }
    }
  ]
})
