import { TABS } from '@/constants';

export default {
  namespaced: true,
  state: () => {
    return {
      currentTab: TABS.CONVERSATIONS,
    };
  },
  actions: {
    CHANGE_TAB({ commit }, tab) {
      commit('SET_TAB', tab);
    },
  },
  mutations: {
    SET_TAB(state, tab) {
      state.currentTab = tab;
    },
  },
};
