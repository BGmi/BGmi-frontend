// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'
import router from './router'
import store from './store'
// Libraries
import 'font-awesome/css/font-awesome.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import './assets/sass/material-dashboard.scss'
import 'es6-promise/auto'
import Chartist from 'chartist'
import CoreComponents from '@/core/components'
import NotificationPlugin from '@/core/components/mdNotifications/install'
import vClickOutside from 'v-click-outside'
import VueCookie from 'vue-cookie'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'

Vue.config.productionTip = false

// global library setup
Object.defineProperty(Vue.prototype, '$Chartist', {
  get () {
    return this.$root.Chartist
  }
})

// Use Core Components
Vue.use(VueCookie)
Vue.use(VueResource)
Vue.use(CoreComponents)
Vue.use(NotificationPlugin)
Vue.use(vClickOutside)
Vue.use(VueMaterial)
Vue.material.registerTheme('default', {
  primary: {color: 'cyan', hue: 500, textColor: 'white'},
  accent: 'red',
  warn: 'red',
  background: {color: 'grey', hue: 200}
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
  components: {App},
  data: {
    Chartist
  }
})
