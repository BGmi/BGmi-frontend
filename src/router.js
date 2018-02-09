import Vue from 'vue'
import Router from 'vue-router'
import Player from './pages/Player.vue'
import Bangumi from './pages/Bangumi.vue'
import Old from './pages/Old/index.vue'
import Calendar from './pages/Calendar.vue'
import Resource from './pages/Resource.vue'
// import Search from '@/pages/Search' // todo: api front
import Config from './pages/Config/index.vue'
import Subscribe from './pages/Subscribe/index.vue'
// hr
import About from './pages/About.vue'
// GeneralViews
import NotFound from './pages/GeneralViews/NotFound.vue'
import AskForToken from './pages/AskForToken.vue'
// Vuex
import store from './store'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/old',
      name: 'Old',
      component: Old
    },
    {
      path: '/player/:bangumi_name(.*)/:episode',
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
      path: '/resource',
      name: 'Resource',
      component: Resource
    },
    // {
    //   path: '/search',
    //   name: 'Search',
    //   component: Search,
    //   meta: {requiresAuth: true}
    // },
    {
      path: '/subscribe',
      name: 'Subscribe',
      component: Subscribe,
      meta: {requiresAuth: true}
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

export default router
