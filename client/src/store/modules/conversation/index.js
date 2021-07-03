import { conversationApi } from '@/api/Conversation.api';
import { CONVERSATION_TYPES } from '@/constants';
import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    conversationId: null,
    lastReadMessage: {},
    firstMessage: {},
    lastMessage: {},
    firstConversationLoad: {},
    conversations: {},
  },
  getters: {
    conversationNames(state, getters, rootState) {
      const userId = rootState.user.userId;

      return getters.conversationList.reduce((prev, cur) => {
        let result;

        if (cur.type === CONVERSATION_TYPES.PRIVATE) {
          const { username, name } = cur.users.find((user) => user.id !== userId);
          result = name || username;
        } else {
          result = cur.name;
        }

        return { ...prev, [cur.id]: result };
      }, {});
    },
    conversationName: (_, getters) => (conversationId) => getters.conversationNames[conversationId],
    lastReadMessageIdInConversation: (state) => state.lastReadMessage[state.id],
    firstMessageIdInConversation: (state) => state.firstMessage[state.id],
    lastMessageIdInConversation: (state) => state.lastMessage[state.id],
    firstConversationLoad: (state) => state.firstConversationLoad[state.id],
    conversationList: (state) => Object.values(state.conversations),
    currentConversation: (state) => state.conversations[state.id] || {},
    conversationType: (state) => (conversationId) => state.conversations[conversationId].type,
  },
  actions: {
    async getConversationList({ commit }) {
      const { data, success } = await conversationApi.getList();

      if (success) {
        commit('SET_CONVERSATIONS', data);
      }
    },
    async startConversation({ commit, dispatch }, friendId) {
      const { data, success } = await conversationApi.startConversation(friendId);

      if (success) {
        commit('SET_CONVERSATION', data);
        commit('SET_FIRST_CONVERSATION_LOAD', { id: data.id, bool: true });
        dispatch('openConversation', data.id);
      }
    },
    async updateLastReadMessage({ commit }, { conversationId, messageId }) {
      const { success } = await conversationApi.updateLastReadMessage(conversationId, messageId);

      // if (success) {
      //   commit('UPDATE_LAST_READ_MESSAGE', { conversationId: data.conversationId, messageId: data.messageId });
      // }

      return success;
    },
    openConversation({ dispatch, commit }, conversationId) {
      dispatch('updateConversationInfo', conversationId);
      dispatch('message/getMessages', conversationId, { root: true });
      commit('SET_CONVERSATION_ID', conversationId);
    },
    async updateConversationInfo({ commit }, conversationId) {
      const { data, success } = await conversationApi.getInfo(conversationId);

      if (success) {
        commit('SET_CONVERSATION', data);
      }
    },
  },
  mutations: {
    SET_CONVERSATION(state, conversation) {
      const conversationResult = state.conversations[conversation.id]
        ? { ...state.conversations[conversation.id], ...conversation }
        : conversation;
      Vue.set(state.conversations, conversation.id, conversationResult);
    },
    SET_CONVERSATIONS(state, conversations) {
      for (const conversation of conversations) {
        const conversationResult = state.conversations[conversation.id]
          ? { ...state.conversations[conversation.id], ...conversation }
          : conversation;
        Vue.set(state.conversations, conversation.id, conversationResult);
      }
    },
    SET_CONVERSATION_ID(state, id) {
      state.conversationId = id;
    },
    UNSET_CONVERSATION_ID(state) {
      state.conversationId = null;
    },
    SET_FIRST_CONVERSATION_LOAD(state, { id, bool }) {
      if (!state.firstConversationLoad[id]) {
        return Vue.set(state.firstConversationLoad, id, bool);
      }

      state.firstConversationLoad[id] = bool;
    },
  },
};
