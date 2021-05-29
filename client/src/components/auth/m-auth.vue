<template>
  <div class="m-auth">
    <div class="container d-flex flex-column">
      <div class="row align-items-center justify-content-center no-gutters min-vh-100">
        <m-sign-in v-if="isSignInForm" @switch="switchForm" />
        <m-sign-up v-else @switch="switchForm" />
      </div>
    </div>
  </div>
</template>

<script>
import MSignUp from './m-sign-up';
import MSignIn from './m-sign-in';
import { AUTH } from '@/constants';

export default {
  name: 'm-auth',
  components: { MSignIn, MSignUp },
  data() {
    return {
      formType: AUTH.SIGN_IN,
    };
  },
  methods: {
    switchForm(type) {
      this.formType = type;
    },
  },
  computed: {
    isSignInForm() {
      return this.formType === AUTH.SIGN_IN;
    },
  },
};
</script>

<style>
.m-auth {
  height: 100%;
}
</style>
