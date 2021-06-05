import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import sidebar from './modules/sidebar';
import conversation from './modules/conversation';
import message from './modules/message';
import { CONTENT_TYPES } from '@/constants';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    contentType: CONTENT_TYPES.INTRO,
  },
  actions: {
    changeContentType({ commit }, type) {
      commit('SET_CONTENT_TYPE', type);
    },
  },
  mutations: {
    SET_CONTENT_TYPE(state, type) {
      state.contentType = type;
    },
  },
  modules: { user, sidebar, conversation, message },
});
