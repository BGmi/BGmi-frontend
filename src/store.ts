import Vue from 'vue';
import Vuex from 'vuex';
import { AxiosResponse } from 'axios';

import { axiosInstance } from '@/http';
import { Calendar } from '@/typings/calendar';

Vue.use(Vuex);

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
  history: JSON.parse(localStorage.getItem('history') || '{}'),
};

/* eslint-disable no-new */
const store = new Vuex.Store({
  state,
  // 定义状态
  /* eslint-disable no-param-reassign,no-shadow */
  mutations: {
    login(state, token) {
      state.isLogin = true;
      state.token = token;
    },
    storeBangumi(state, { category, bangumi }) {
      if (category === 'index') {
        state.bangumi = bangumi;
        state.hasBangumiIndexFetched = true;
      } else if (category === 'old') {
        state.bangumiOld = bangumi;
        state.hasBangumiOldFetched = true;
      }
    },
    init(state, initData) {
      state.coverRoot = initData.cover_url;
      state.danmaku_api = initData.danmaku_api;
      state.bgmiVersion = initData.version;
    },
    bangumiIndex(state, bangumi) {
      state.bangumi = bangumi;
      state.hasBangumiIndexFetched = true;
    },
    clearBangumiIndex(state) {
      state.bangumi = [];
      state.hasBangumiIndexFetched = false;
    },
    calendar(state, cal) {
      state.cal = cal;
      state.calFetched = true;
    },
    saveHistory(state, bangumi) {
      const item = {
        name: bangumi.bangumi_name,
        episode: bangumi.episode.toString(),
      };
      const history = state.history; // type: Object
      if (Object.prototype.hasOwnProperty.call(history, item.name)) {
        history[item.name][item.episode] = true;
      } else {
        history[item.name] = {};
        history[item.name][item.episode] = true;
      }
      state.history = history; // type: Object
      localStorage.setItem('history', JSON.stringify(history));
    },
  },
  actions: {
    getCalendar({ commit, state }, cb) {
      if (state.calFetched) {
        cb(state.cal);
      } else {
        axiosInstance.get('cal').then((res: AxiosResponse<{ data: Calendar }>) => {
          commit('calendar', res.data.data);
          cb(res.data.data);
        });
      }
    },
    getBangumi({ commit, state }, { category, cb }) {
      // check locally
      if (category === 'index') {
        if (state.hasBangumiIndexFetched) {
          cb(state.bangumi);
          return;
        }
      } else if (category === 'old') {
        if (state.hasBangumiOldFetched) {
          cb(state.bangumiOld);
          return;
        }
      } else {
        throw new Error('wrong bangumi category');
      }
      axiosInstance.get(category).then((res) => {
        commit('storeBangumi', { category, bangumi: res.data.data });
        cb(res.data.data);
      });
    },
  },
});

export default store;
