import { userApi } from '@/api/User.api';
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
    async login({ commit }, { username, password }) {
      commit('START_LOGIN_PROCESS');
      const { data, success } = await userApi.login({ username, password });

      if (success) {
        commit('LOGIN_USER', data);
      }

      commit('STOP_LOGIN_PROCESS');
    },
    async register({ commit }, { username, password }) {
      commit('START_LOGIN_PROCESS');
      const { data, success } = await userApi.register({ username, password });

      if (success) {
        commit('LOGIN_USER', data);
      }

      commit('STOP_LOGIN_PROCESS');
    },
    logout({ commit }) {
      commit('LOGOUT_USER');
    },
  },
  mutations: {
    LOGIN_USER(state, { id, accessToken }) {
      state.token = accessToken;
      state.userId = id.id;
      state.isUserLoggedIn = true;

      localStorageToken.set(accessToken);
      localStorageUserId.set(id.id);
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
