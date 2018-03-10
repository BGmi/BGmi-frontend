import Vue from 'vue'
import Vuex from 'vuex'

const localStorage = window.localStorage

Vue.use(Vuex)

const state = {
  bangumi: [],
  hasBangumiIndexFetched: false,
  bangumiOld: [],
  hasBangumiOldFetched: false,
  isLogin: false,
  token: false,
  danmaku_api: '',
  coverRoot: '/bangumi/cover',
  bgmiVersion: '',
  cal: {},
  calFetched: false,
  history: JSON.parse(localStorage.getItem('history')) || {}
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
      state.bgmiVersion = initData.version
    },
    bangumiIndex (state, bangumi) {
      state.bangumi = bangumi
      state.hasBangumiIndexFetched = true
    },
    calendar (state, cal) {
      state.cal = cal
      state.calFetched = true
    },
    saveHistory (state, bangumi) {
      let item = {
        name: bangumi.bangumi_name,
        episode: bangumi.episode
      }
      let history = state.history // type: Object
      if (history.hasOwnProperty(item.name)) {
        history[item.name][item.episode] = true
      } else {
        history[item.name] = {}
        history[item.name][item.episode] = true
      }
      state.history = history // type: Object
      localStorage.setItem('history', JSON.stringify(history))
    }
  },
  actions: {
    getCalendar ({commit, state}, cb) {
      if (state.calFetched) {
        cb(state.cal)
      } else {
        Vue.http.get('api/cal').then(res => {
          commit('calendar', res.body.data)
          cb(res.body.data)
        })
      }
    },
    getIndexBangumi ({commit, state}, cb) {
      // check locally
      if (state.hasBangumiIndexFetched) {
        cb(state.bangumi)
      } else {
        // fetch api/index
        Vue.http.get('api/index').then(
          res => {
            commit('bangumiIndex', res.body.data)
            cb(res.body.data)
          })
      }
    },
    getOldBangumi ({commit}) {
      // fetch api/index
      Vue.http.get('api/old').then(
        res => {
          commit('bangumiIndex', res.body.data)
        })
    }
  }
})

export default store
