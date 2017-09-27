import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state = {
  isLogin: false,
  token: false
}

/* eslint-disable no-new */
const store = new Vuex.Store({
  state,
  // 定义状态
  /* eslint-disable no-param-reassign,no-shadow */
  mutations: {
    login (state, token) {
      state.isLogin = true
      state.token = token
    }
  }
})

export default store
