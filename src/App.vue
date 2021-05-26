<template>
  <div id="app">
    <m-login-form v-if="!isLoggedIn" />
  </div>
</template>

<script>
import MLoginForm from './components/auth/m-auth';
import { mapState } from 'vuex';
import toast from '@/ui/toast';

export default {
  name: 'App',
  components: { MLoginForm },
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
