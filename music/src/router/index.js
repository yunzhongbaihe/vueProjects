import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Home from '@/components/Home'
import Search from '@/components/Search'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/',
      name: 'main',
      component: Main,
      children: [
        {
          path: '/main',
          redirect: '/main/home'
        },
        {
          path: '/main/home',
          name: 'home',
          component: Home
        },
        {
          path: '/main/search',
          name: 'search',
          component: Search
        }
      ]
    }
  ]
})
