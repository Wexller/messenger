import { conversationApi } from '@/api';
import { CONVERSATION_TYPES } from '@/constants';

export default {
  namespaced: true,
  state: {
    id: null,
    name: null,
    users: null,
    type: CONVERSATION_TYPES.PRIVATE,
  },
  actions: {
    async startConversation({ commit }, username) {
      const { data, success } = await conversationApi.startConversation(username);

      if (success) {
        commit('SET_CONVERSATION', data);
      }
    },
  },
  mutations: {
    SET_CONVERSATION(state, { id, name, users }) {
      state.id = id;
      state.name = name;
      state.users = users;
    },
    UNSET_CONVERSATION_ID(state) {
      state.id = null;
      state.name = null;
      state.users = null;
    },
  },
};
