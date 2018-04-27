// Libraries
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueCookies from 'vue-cookies'

import VueMaterial from 'vue-material'
import { sync } from 'vuex-router-sync'

import App from './App.vue'
import store from './store'
import router from './router'
import NotificationPlugin from '@/core/components/mdNotifications/install'
// StyleSheet
import 'vue-material/dist/vue-material.css'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'bootstrap/dist/css/bootstrap.css'
import './assets/sass/material-dashboard.scss'

sync(store, router)

Vue.config.productionTip = false

// Use Core Components
Vue.use(VueCookies)
Vue.use(VueResource)
Vue.use(NotificationPlugin)
Vue.use(VueMaterial)

// or with options
// Vue.use(VueLazyload, {
//   preLoad: 1.3,
//   error: 'dist/error.png',
//   loading: 'dist/loading.gif',
//   attempt: 1
// })
Vue.material.registerTheme('default', {
  primary: { color: 'cyan', hue: 500, textColor: 'white' },
  accent: 'red',
  warn: 'white',
  background: { color: 'grey', hue: 200 }
})

Vue.material.registerTheme('white', {
  primary: 'black',
  accent: 'white',
  warn: 'red',
  background: 'white'
})
Vue.http.options.root = './api/'
// /api/-> /api/index
// /dir/api/ -> /dir/api/index

Vue.http.interceptors.push((request, next) => {
  // console.log(this)
  // continue to next interceptor
  next((response) => {
    store.commit('init', response.body)
    return response
  })
})

// Vue.http.headers.common['bgmi-token'] = '233'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
