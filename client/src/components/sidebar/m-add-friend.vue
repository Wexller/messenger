<template>
  <b-modal @ok="handleOk" :id="id">
    <template #modal-header="{ close }">
      <div class="media flex-fill">
        <div class="icon-shape rounded-lg bg-primary text-white mr-5">
          <i class="fe-users"></i>
        </div>
        <div class="media-body align-self-center">
          <h5 class="modal-title">Add friends</h5>
          <p class="small">Add colleagues, clients and friends.</p>
        </div>
      </div>

      <button @click="close()" type="button" class="close" aria-label="Close">
        <span aria-hidden="true">×</span>
      </button>
    </template>

    <ValidationObserver v-slot="{ handleSubmit, reset }">
      <form @submit.prevent="handleSubmit(onSubmit)" @reset.prevent="reset">
        <div class="form-group">
          <ValidationProvider v-slot="{ classes, errors }" name="username" rules="required">
            <label for="add-friend-username" class="small">Username</label>
            <input
              v-model="username"
              :class="classes"
              name="username"
              type="text"
              class="form-control form-control-lg"
              id="add-friend-username"
            />
            <div class="invalid-feedback">{{ errors[0] }}</div>
          </ValidationProvider>
        </div>
        <button v-show="false" ref="submitButton" type="submit" />
        <button v-show="false" ref="resetButton" type="reset" />
      </form>
    </ValidationObserver>

    <template #modal-footer="{ ok }">
      <button
        @click="ok()"
        :disabled="inProcess"
        type="button"
        class="btn btn-lg btn-block btn-primary d-flex align-items-center"
      >
        Add friend
        <b-spinner v-if="inProcess" small type="grow" />
        <i class="fe-user-plus ml-auto"></i>
      </button>
    </template>
  </b-modal>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import { mapActions } from 'vuex';

export default {
  name: 'm-add-friend',
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      username: '',
      inProcess: false,
    };
  },
  methods: {
    ...mapActions('friend', ['addFriend']),
    handleOk(event) {
      event.preventDefault();
      this.submitForm();
    },
    submitForm() {
      this.$refs.submitButton.click();
    },
    resetForm() {
      this.$refs.resetButton.click();
    },
    async onSubmit() {
      this.inProcess = true;
      const result = await this.addFriend(this.username);

      if (result) {
        this.username = '';
        this.resetForm();
      }

      this.inProcess = false;
    },
  },
};
</script>
