import Vue from 'vue'
import { AxiosResponse } from 'axios'
import VueCookies from 'vue-cookies'
import Vuetify from 'vuetify'

import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import App from './App.vue'
import router from './router'
import store from './store'
import Notifications from 'vue-notification'
import { axiosInstance } from './http'
// import './registerServiceWorker'

Vue.config.productionTip = false
// Use Core Components
Vue.use(Vuetify)
Vue.use(VueCookies)
Vue.use(Notifications)

Vue.prototype.$http = axiosInstance
axiosInstance.interceptors.response.use((response: AxiosResponse) => {
  store.commit('init', response.data)
  return response
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
