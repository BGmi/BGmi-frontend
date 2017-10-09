// Libraries
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueCookie from 'vue-cookie'

import VueMaterial from 'vue-material'
import { sync } from 'vuex-router-sync'
import App from './App.vue'
import store from './store'
import router from './router'
import NotificationPlugin from '@/core/components/mdNotifications/install'
// StyleSheet
import 'vue-material/dist/vue-material.css'
// import 'font-awesome/css/font-awesome.min.css'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'bootstrap/dist/css/bootstrap.css'
import './assets/sass/material-dashboard.scss'

sync(store, router)

Vue.config.productionTip = false

// Use Core Components
Vue.use(VueCookie)
Vue.use(VueResource)
Vue.use(NotificationPlugin)
Vue.use(VueMaterial)

Vue.material.registerTheme('default', {
  primary: {color: 'cyan', hue: 500, textColor: 'white'},
  accent: 'red',
  warn: 'red',
  background: {color: 'grey', hue: 200}
})
Vue.material.registerTheme('white', {
  primary: 'black',
  accent: 'red',
  warn: 'red',
  background: 'white'
})
if (process.env.NODE_ENV === 'development') {
  Vue.http.options.root = 'http://localhost:8888'
} else {
  Vue.http.options.root = '/'
}

Vue.http.headers.common['bgmi-token'] = '233'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
