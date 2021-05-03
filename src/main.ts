import Vue from 'vue';
import { AxiosResponse } from 'axios';
// eslint-disable-next-line import/no-named-as-default
import VueCookies from 'vue-cookies';
import Notifications from 'vue-notification';
import 'vuetify/dist/vuetify.min.css'; // Ensure you are using css-loader

import App from './App.vue';
import router from './router';
import store from './store';
import { axiosInstance } from './http';

import vuetify from '@/vuetify';

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
  render: (h) => h(App),
}).$mount('#app');
