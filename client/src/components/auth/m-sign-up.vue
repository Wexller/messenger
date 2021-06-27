<template>
  <div class="col-12 col-md-5 col-lg-4 py-8 py-md-11">
    <h1 class="font-bold text-center">Sign up</h1>

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

        <!--            <div class="form-group">
                <label for="email" class="sr-only">Email Address</label>
                <input
                  type="email"
                  class="form-control form-control-lg"
                  id="email"
                  placeholder="Enter your email"
                />
              </div>-->

        <div class="form-group">
          <ValidationProvider v-slot="{ classes, errors }" name="password" vid="confirmation" rules="required">
            <label for="password" class="sr-only">Password</label>
            <input
              v-model="password"
              :class="classes"
              type="password"
              class="form-control form-control-lg"
              id="password"
              placeholder="Enter your password"
            />
            <div class="invalid-feedback">{{ errors[0] }}</div>
          </ValidationProvider>
        </div>

        <div class="form-group">
          <ValidationProvider
            v-slot="{ classes, errors }"
            name="password_confirmation"
            rules="required|confirmed:confirmation"
          >
            <label for="password" class="sr-only">Confirm password</label>
            <input
              v-model="confirmPassword"
              :class="classes"
              type="password"
              class="form-control form-control-lg"
              id="password_confirmation"
              placeholder="Confirm your password"
            />
            <div class="invalid-feedback">{{ errors[0] }}</div>
          </ValidationProvider>
        </div>

        <button class="btn btn-lg btn-block btn-primary" type="submit">Sign up</button>
      </form>
    </ValidationObserver>

    <p class="text-center">
      Already have an account?
      <a @click.prevent="switchAuth" href="javascript:void(0)">Sign in</a>.
    </p>
  </div>
</template>

<script>
import { AUTH } from '@/constants';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import { mapActions } from 'vuex';

export default {
  name: 'm-sign-up',
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      username: '',
      password: '',
      confirmPassword: '',
    };
  },
  methods: {
    ...mapActions('user', ['register']),
    switchAuth() {
      this.$emit('switch', AUTH.SIGN_IN);
    },
    onSubmit() {
      this.register({
        username: this.username,
        password: this.password,
      });
    },
  },
};
</script>
