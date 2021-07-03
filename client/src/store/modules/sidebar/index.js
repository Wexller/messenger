import { TABS } from '@/constants';

export default {
  namespaced: true,
  state: () => {
    return {
      currentTab: TABS.CONVERSATIONS,
    };
  },
  actions: {
    changeTab({ commit }, tab) {
      commit('SET_TAB', tab);
    },
  },
  mutations: {
    SET_TAB(state, tab) {
      state.currentTab = tab;
    },
  },
};
