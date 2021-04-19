import Vue from 'vue';
import { AxiosResponse } from 'axios';
import VueCookies from 'vue-cookies';
import Notifications from 'vue-notification';
import 'vuetify/dist/vuetify.min.css'; // Ensure you are using css-loader

import vuetify from '@/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';
import { axiosInstance } from './http';

Vue.config.productionTip = false;
// Use Core Components
Vue.use(VueCookies);
Vue.use(Notifications);

Vue.prototype.$http = axiosInstance;
axiosInstance.interceptors.response.use((response: AxiosResponse) => {
  store.commit('init', response.data);
  return response;
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
