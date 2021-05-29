import { conversationApi } from '@/api';

export default {
  namespaced: true,
  actions: {
    async START_CONVERSATION({ commit }, username) {
      const result = await conversationApi.startConversation(username);
    },
  },
};
