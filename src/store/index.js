import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    children: null,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setChildren(state, payload) {
      state.children = payload;
    },
  },
  actions: {},
  modules: {},
});
