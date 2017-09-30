import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state = {
  bangumi: {},
  isLogin: false,
  token: false,
  danmaku_api: '',
  coverRoot: '/bangumi/cover'
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
    },
    storeBangumi (state, bangumi) {
      state.bangumi = bangumi
    },
    init (state, initData) {
      state.coverRoot = initData.cover_url
      state.danmaku_api = initData.danmaku_api
      state.bangumi = initData.data
    }
  }
})

export default store
