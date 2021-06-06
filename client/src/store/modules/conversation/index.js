import { conversationApi } from '@/api';
import { CONVERSATION_TYPES } from '@/constants';
import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    id: null,
    name: null,
    users: null,
    type: CONVERSATION_TYPES.PRIVATE,
    lastReadMessage: {},
  },
  getters: {
    conversationName(state, getters, rootState) {
      if (!state.id) {
        return null;
      }

      let name;
      const userId = rootState.user.userId;

      if (state.type === CONVERSATION_TYPES.PRIVATE) {
        const { username } = state.users.find((user) => user.id !== userId);
        name = username;
      } else {
        name = state.name;
      }

      return name;
    },
    lastReadMessageIdInConversation: (state) => state.lastReadMessage[state.id],
  },
  actions: {
    async startConversation({ commit }, username) {
      const { data, success } = await conversationApi.startConversation(username);

      if (success) {
        commit('SET_CONVERSATION', data);
      }
    },
    async updateLastReadMessage({ commit }, { conversationId, messageId }) {
      const { data, success } = await conversationApi.updateLastReadMessage(conversationId, messageId);

      if (success) {
        commit('UPDATE_LAST_READ_MESSAGE', { conversationId: data.conversationId, messageId: data.messageId });
      }

      return success;
    },
  },
  mutations: {
    SET_CONVERSATION(state, { id, name, users, lastReadMessageId }) {
      state.id = id;
      state.name = name;
      state.users = users;
      Vue.set(state.lastReadMessage, id, lastReadMessageId);
    },
    UNSET_CONVERSATION_ID(state) {
      state.id = null;
      state.name = null;
      state.users = null;
    },
    UPDATE_LAST_READ_MESSAGE(state, { conversationId, messageId }) {
      Vue.set(state.lastReadMessage, conversationId, messageId);
    },
  },
};
