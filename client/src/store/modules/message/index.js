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
  },
  mutations: {
    SET_MESSAGES(state, { messages, key }) {
      Vue.set(state.messagesData, key, messages);
      // state.messagesData = { ...state.messagesData, [key]: messages };
    },
  },
  actions: {
    async SEND_MESSAGE({ commit, rootState }, text) {
      const conversation = rootState['conversation'];

      const { data, success } = await messageApi.sendMessage(text, conversation.id);
    },
    async GET_MESSAGES({ commit, rootState }) {
      const conversation = rootState['conversation'];

      const { data, success } = await messageApi.getMessages(conversation.id);

      if (success) {
        commit('SET_MESSAGES', { messages: data, key: conversation.id });
      }
    },
  },
};
