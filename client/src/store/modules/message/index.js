import { messageApi } from '@/api/Message.api';
import Vue from 'vue';
import { LOAD_MESSAGES } from '@/constants';

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
    currentFirstMessage: (state, getters) => getters.messages[0],
    currentLastMessage: (state, getters) => getters.messages[getters.messages.length - 1],
    isFirstMessageExists(state, getters, rootState, rootGetters) {
      const messageId = rootGetters['conversation/firstMessageIdInConversation'];
      return getters.currentFirstMessage?.id === messageId;
    },
    isLastMessageExists(state, getters, rootState, rootGetters) {
      const messageId = rootGetters['conversation/lastMessageIdInConversation'];
      return getters.currentLastMessage?.id === messageId;
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
    APPEND_MESSAGES(state, { messages, conversationId }) {
      if (!state.messagesData[conversationId] || !Array.isArray(state.messagesData[conversationId])) {
        Vue.set(state.messagesData, key, []);
      }

      state.messagesData[conversationId].push(...messages);
    },
    PREPEND_MESSAGES(state, { messages, conversationId }) {
      if (!state.messagesData[conversationId] || !Array.isArray(state.messagesData[conversationId])) {
        Vue.set(state.messagesData, key, []);
      }

      const oldMessages = state.messagesData[conversationId];

      state.messagesData[conversationId] = [...messages, ...oldMessages];
    },
  },
  actions: {
    async sendMessage({ commit, rootState }, text) {
      const conversation = rootState['conversation'];

      const { data, success } = await messageApi.sendMessage(text, conversation.id);
    },
    async getMessages({ state, commit, rootState }, conversationId) {
      if (state.messagesData[conversationId]) {
        return;
      }

      const { data, success } = await messageApi.getMessages(conversationId);

      if (success) {
        commit('SET_MESSAGES', { messages: data, key: conversationId });
      }
    },
    async loadMoreMessages({ commit, getters, rootState }, loadType) {
      const { NEW, OLD } = LOAD_MESSAGES;

      const conversation = rootState['conversation'];

      if (loadType === NEW) {
        const { success, data: messages } = await messageApi.getNewMessages(
          conversation.id,
          getters.currentLastMessage.id
        );

        if (success) {
          commit('APPEND_MESSAGES', { messages, conversationId: conversation.id });
        }
      }

      if (loadType === OLD) {
        const { success, data: messages } = await messageApi.getOldMessages(
          conversation.id,
          getters.currentFirstMessage.id
        );

        if (success) {
          commit('PREPEND_MESSAGES', { messages, conversationId: conversation.id });
        }
      }
    },
    socket_newMessage({ commit }, message) {
      commit('APPEND_MESSAGE', message);
    },
  },
};
