import Vue from 'vue'
import Router from 'vue-router'
import Player from '@/components/Bangumi/Player'
import Bangumi from '@/components/Bangumi'
import Calendar from '@/components/Calendar'
import Typography from '@/components/Typography'
import Subscribe from '@/components/Subscribe'
import Filter from '@/components/Filter' // todo: api front
import Search from '@/components/Search' // todo: api front
import Config from '@/components/Config'
// hr
import About from '@/components/About'
// GeneralViews
import NotFound from '@/components/GeneralViews/NotFound.vue'
import AskForToken from '@/components/AskForToken'
// vuex
import store from '@/store'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/player/:bangumi_name/:episode',
      name: 'Player',
      component: Player
    }, {
      path: '/calendar',
      name: 'Calendar',
      component: Calendar
    }, {
      path: '/ask-for-token',
      name: 'Auth',
      component: AskForToken
    },
    {
      path: '/filter',
      name: 'Filter',
      component: Filter
    },
    {
      path: '/search',
      name: 'Search',
      component: Search,
      meta: {requiresAuth: true}
    },
    {
      path: '/subscribe',
      name: 'Subscribe',
      component: Subscribe,
      meta: {requiresAuth: true}
    },
    {
      path: '/typography',
      name: 'Typography',
      component: Typography
    },
    {
      path: '/',
      name: 'Bangumi',
      component: Bangumi
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/config',
      name: 'Config',
      component: Config,
      meta: {requiresAuth: true}
    },
    {path: '*', component: NotFound}
  ],
  linkActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.isLogin) {
      next({
        path: '/ask-for-token',
        query: {redirect: to.fullPath}
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})

// router.afterEach(route => {
//   route.app.
// })

export default router
