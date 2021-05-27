import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import sidebar from './modules/sidebar';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { auth, sidebar },
});
