import axios from './axios';
window.axios = axios;
export default {
  async signIn({ username, password }) {
    return await axios({
      method: 'POST',
      url: '/api/auth/login',
      data: {
        username,
        password,
      },
    });
  },
  async signUp({ username, password }) {
    return await axios({
      method: 'POST',
      url: '/api/auth/signup',
      data: {
        username,
        password,
      },
    });
  },
};
