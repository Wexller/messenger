import { authApi } from '@/api';
import { localStorageToken, localStorageUserId } from '@/local-storage';

export default {
  namespaced: true,
  state: () => {
    const token = localStorageToken.get();
    const userId = localStorageUserId.get();

    return {
      isUserLoggedIn: !!token,
      token,
      userId,
      loginInProcess: false,
    };
  },
  actions: {
    async SIGN_IN({ commit }, { username, password }) {
      commit('START_LOGIN_PROCESS');
      const { data, success } = await authApi.signIn({ username, password });

      if (success) {
        commit('LOGIN_USER', data);
      }

      commit('STOP_LOGIN_PROCESS');
    },
    async SIGN_UP({ commit }, { username, password }) {
      commit('START_LOGIN_PROCESS');
      const { data, success } = await authApi.signUp({ username, password });

      if (success) {
        commit('LOGIN_USER', data);
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
      state.userId = user.id;
      state.isUserLoggedIn = true;

      localStorageToken.set(token);
      localStorageUserId.set(user.id);
    },
    LOGOUT_USER(state) {
      state.token = null;
      state.userId = null;
      state.isUserLoggedIn = false;

      localStorageToken.clear();
      localStorageUserId.clear();
    },
    START_LOGIN_PROCESS(state) {
      state.loginInProcess = true;
    },
    STOP_LOGIN_PROCESS(state) {
      state.loginInProcess = false;
    },
  },
};
