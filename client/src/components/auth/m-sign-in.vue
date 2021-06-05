<template>
  <div class="m-sign-up col-12 col-md-5 col-lg-4 py-8 py-md-11">
    <h1 class="font-bold text-center">Sign in</h1>

    <p class="text-center mb-6">Welcome to the official Chat web-client.</p>

    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(onSubmit)" class="mb-6">
        <div class="form-group">
          <ValidationProvider v-slot="{ classes, errors }" name="username" rules="required">
            <label for="username" class="sr-only">Username</label>
            <input
              v-model="username"
              :class="classes"
              type="text"
              class="form-control form-control-lg"
              id="username"
              placeholder="Enter your username"
            />
            <div class="invalid-feedback">{{ errors[0] }}</div>
          </ValidationProvider>
        </div>

        <div class="form-group">
          <ValidationProvider v-slot="{ classes, errors }" name="password" rules="required">
            <label for="password" class="sr-only">Password</label>
            <input
              v-model="password"
              :class="classes"
              type="password"
              class="form-control form-control-lg"
              id="password"
              name="password"
              placeholder="Enter your password"
            />
            <div class="invalid-feedback">{{ errors[0] }}</div>
          </ValidationProvider>
        </div>

        <!--              <div class="form-group d-flex justify-content-between">
                <div class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    checked=""
                    id="checkbox-remember"
                  />
                  <label class="custom-control-label" for="checkbox-remember"
                    >Remember me</label
                  >
                </div>
                <a href="./password-reset.html">Reset password</a>
              </div>-->

        <button :disabled="inProcess" class="btn btn-lg btn-block btn-primary" type="submit">
          Sign in
          <b-spinner v-if="inProcess" small type="grow" />
        </button>
      </form>
    </ValidationObserver>

    <p class="text-center">
      Don't have an account yet
      <a @click.prevent="switchAuth" href="javascript:void(0)">Sign up</a>.
    </p>
  </div>
</template>

<script>
import { AUTH } from '@/constants';
import { mapActions, mapState } from 'vuex';
import { ValidationProvider, ValidationObserver } from 'vee-validate';

export default {
  name: 'm-sign-in',
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      username: '',
      password: '',
    };
  },
  computed: {
    ...mapState('user', ['loginInProcess']),
    inProcess() {
      return this.loginInProcess;
    },
  },
  methods: {
    ...mapActions('user', ['signIn']),
    switchAuth() {
      this.$emit('switch', AUTH.SIGN_UP);
    },
    onSubmit() {
      this.signIn({
        username: this.username,
        password: this.password,
      });
    },
  },
};
</script>
