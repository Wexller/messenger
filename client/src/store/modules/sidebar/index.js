import { TABS } from '@/constants';
import { userApi } from '@/api';

export default {
  namespaced: true,
  state: () => {
    return {
      currentTab: TABS.FRIENDS_LIST,
      friends: [],
    };
  },
  actions: {
    changeTab({ commit }, tab) {
      commit('SET_TAB', tab);
    },
    async getFriends({ commit }) {
      const { data, success } = await userApi.getUsers();

      if (success && data) {
        commit('SET_FRIENDS', data);
      }
    },
  },
  mutations: {
    SET_TAB(state, tab) {
      state.currentTab = tab;
    },
    SET_FRIENDS(state, friends) {
      state.friends = friends;
    },
  },
};
