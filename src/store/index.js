import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import sidebar from './modules/sidebar';
import conversation from './modules/conversation';
import { CONTENT_TYPES } from '@/constants';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    contentType: CONTENT_TYPES.INTRO,
  },
  actions: {
    CHANGE_CONTENT_TYPE({ commit }, type) {
      commit('SET_CONTENT_TYPE', type);
    },
  },
  mutations: {
    SET_CONTENT_TYPE(state, type) {
      state.contentType = type;
    },
  },
  modules: { auth, sidebar, conversation },
});
