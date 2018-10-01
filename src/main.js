// Libraries
import Vue from 'vue'
// import VueResource from 'vue-resource'
import VueCookies from 'vue-cookies'
import Vuetify from 'vuetify'

import App from './App.vue'
import store from './store'
import router from './router'
import { axiosInstance } from './http'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Notifications from 'vue-notification'

Vue.config.productionTip = false

// Use Core Components
Vue.use(Vuetify)
Vue.use(VueCookies)
// Vue.use(VueResource)
Vue.use(Notifications)

Vue.prototype.$http = axiosInstance

axiosInstance.interceptors.response.use((response) => {
  store.commit('init', response.data)
  return response
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
