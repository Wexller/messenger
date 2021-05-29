import { TABS } from '@/constants';
import { userApi } from '@/api';

export default {
  namespaced: true,
  state: () => {
    return {
      currentTab: TABS.CONVERSATIONS,
      friends: [],
    };
  },
  actions: {
    CHANGE_TAB({ commit }, tab) {
      commit('SET_TAB', tab);
    },
    async GET_FRIENDS({ commit }) {
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
