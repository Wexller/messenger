import authApi from '@/api/auth';
import { clearToken, getToken, setToken } from '@/local-storage';

export default {
  namespaced: true,
  state: () => {
    const token = getToken();

    return {
      isUserLoggedIn: !!token,
      token,
      user: null,
      loginInProcess: false,
    };
  },
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
    LOGOUT({ commit }) {
      commit('LOGOUT_USER');
    },
  },
  mutations: {
    LOGIN_USER(state, { user, token }) {
      state.token = token;
      state.user = user;
      state.isUserLoggedIn = true;

      setToken(token);
    },
    LOGOUT_USER(state) {
      state.token = null;
      state.user = null;
      state.isUserLoggedIn = false;

      clearToken();
    },
    START_LOGIN_PROCESS(state) {
      state.loginInProcess = true;
    },
    STOP_LOGIN_PROCESS(state) {
      state.loginInProcess = false;
    },
  },
};
