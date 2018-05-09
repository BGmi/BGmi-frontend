// Libraries
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueCookies from 'vue-cookies'
import Vuetify from 'vuetify'

import App from './App.vue'
import store from './store'
import router from './router'

import NotificationPlugin from '@/core/components/mdNotifications/install'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false

// Use Core Components
Vue.use(Vuetify)
Vue.use(VueCookies)
Vue.use(VueResource)
Vue.use(NotificationPlugin)
// Vue.use(VueMaterial)

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
