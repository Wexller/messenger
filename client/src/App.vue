<template>
  <div id="app">
    <m-main v-if="isLoggedIn" />
    <m-login-form v-else />
  </div>
</template>

<script>
import MLoginForm from './components/auth/m-auth';
import { mapState } from 'vuex';
import toast from '@/ui/toast';
import MMain from '@/components/m-main';
import Api from '@/api/Api';

export default {
  name: 'App',
  components: { MMain, MLoginForm },
  computed: {
    ...mapState('user', ['isUserLoggedIn', 'token']),
    isLoggedIn() {
      return this.isUserLoggedIn;
    },
  },
  methods: {
    updateToken(token) {
      if (Api.jwtToken !== token) {
        Api.jwtToken = token;
      }
    },
  },
  watch: {
    token(token) {
      this.updateToken(token);
    },
  },
  created() {
    this.updateToken(this.token);
    toast(this);
  },
};
</script>
