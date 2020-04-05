import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getItem('user')
  },
  mutations: {
    getToken (state, value) {
      state.user = value
      setItem('user', value)
    }
  },
  actions: {
  },
  getters: {
  },
  modules: {
  }
})
