import { conversationApi } from '@/api';
import { CONVERSATION_TYPES } from '@/constants';

export default {
  namespaced: true,
  state: {
    id: null,
    type: CONVERSATION_TYPES.PRIVATE,
  },
  actions: {
    async START_CONVERSATION({ commit }, username) {
      const { data, success } = await conversationApi.startConversation(username);

      if (success) {
        commit('SET_CONVERSATION_ID', data.conversationId);
      }
    },
  },
  mutations: {
    SET_CONVERSATION_ID(state, conversationId) {
      state.id = conversationId;
    },
    UNSET_CONVERSATION_ID(state) {
      state.id = null;
    },
  },
};
