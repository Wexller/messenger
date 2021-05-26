import authApi from '@/api/auth';

export default {
  namespaced: true,
  state: () => ({
    isUserLoggedIn: false,
    token: null,
    user: null,
    loginInProcess: false,
  }),
  actions: {
    async SIGN_IN({ commit }, { username, password }) {
      commit('START_LOGIN_PROCESS');
      const result = await authApi.signIn({ username, password });

      if (result.success) {
        commit('LOGIN_USER', result);
      }

      commit('STOP_LOGIN_PROCESS');
    },
    async SIGN_UP({ commit }, { username, password }) {
      commit('START_LOGIN_PROCESS');
      const result = await authApi.signUp({ username, password });

      if (result.success) {
        commit('LOGIN_USER', result);
      }

      commit('STOP_LOGIN_PROCESS');
    },
  },
  mutations: {
    LOGIN_USER(state, { user, token }) {
      state.token = token;
      state.user = user;
      state.isUserLoggedIn = true;
    },
    START_LOGIN_PROCESS(state) {
      state.loginInProcess = true;
    },
    STOP_LOGIN_PROCESS(state) {
      state.loginInProcess = false;
    },
  },
};
