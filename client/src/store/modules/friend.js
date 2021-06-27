import { friendApi } from '@/api/Friend.api';

export default {
  namespaced: true,
  state: {
    friends: [],
  },
  actions: {
    async getFriends({ commit }) {
      const { data, success } = await friendApi.getFriends();

      if (success && data) {
        commit('SET_FRIENDS', data);
      }
    },
    async addFriend({ commit, dispatch }, username) {
      const { success } = await friendApi.addFriend(username);

      if (success) {
        dispatch('getFriends');
      }

      return success;
    },
    async deleteFriend({ commit, dispatch }, userId) {
      const { success } = await friendApi.deleteFriend(userId);

      if (success) {
        dispatch('getFriends');
      }

      return success;
    },
  },
  mutations: {
    SET_FRIENDS(state, friends) {
      state.friends = friends;
    },
  },
};
