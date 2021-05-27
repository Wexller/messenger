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

export default {
  name: 'App',
  components: { MMain, MLoginForm },
  computed: {
    ...mapState('auth', ['isUserLoggedIn']),
    isLoggedIn() {
      return this.isUserLoggedIn;
    },
  },
  created() {
    toast(this);
  },
};
</script>
