import { messageApi } from '@/api';
import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    messagesData: {},
  },
  getters: {
    messages(state, getters, rootState) {
      const conversationId = rootState.conversation.id;

      return state.messagesData[conversationId] || [];
    },
    lastReadMessageIdx(state, getters, rootState, rootGetters) {
      const lastReadMessageId = rootGetters['conversation/lastReadMessageIdInConversation'];

      return getters.messages.findIndex((m) => m.id === lastReadMessageId);
    },
  },
  mutations: {
    SET_MESSAGES(state, { messages, key }) {
      Vue.set(state.messagesData, key, messages);
      // state.messagesData = { ...state.messagesData, [key]: messages };
    },
    APPEND_MESSAGE(state, message) {
      const key = message.conversationId;

      if (!state.messagesData[key] || !Array.isArray(state.messagesData[key])) {
        Vue.set(state.messagesData, key, []);
      }

      state.messagesData[key].push(message);
    },
  },
  actions: {
    async sendMessage({ commit, rootState }, text) {
      const conversation = rootState['conversation'];

      const { data, success } = await messageApi.sendMessage(text, conversation.id);
    },
    async getMessages({ state, commit, rootState }) {
      const conversation = rootState['conversation'];

      if (state.messagesData[conversation.id]) {
        return;
      }

      const { data, success } = await messageApi.getMessages(conversation.id);

      if (success) {
        commit('SET_MESSAGES', { messages: data, key: conversation.id });
      }
    },
    socket_newMessage({ commit }, message) {
      commit('APPEND_MESSAGE', message);
    },
  },
};
