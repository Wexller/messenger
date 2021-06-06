<template>
  <div :class="{ 'message-right': isCurrentUserMessage }" class="message">
    <!-- Avatar -->
    <div :class="avatarClasses" class="avatar avatar-sm">
      <img class="avatar-img" :src="avatarMale" alt="" />
    </div>

    <!-- Message: body -->
    <m-message-body :is-current-user-message="isCurrentUserMessage">
      <template v-slot:dropdown>
        <div @click="dropdownClickHandler" :class="{ show: showDropdown }" class="dropdown">
          <a
            :class="isCurrentUserMessage ? 'mr-3' : 'ml-3'"
            class="text-muted opacity-60"
            href="#"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i class="fe-more-vertical"></i>
          </a>

          <div :class="{ show: showDropdown }" class="dropdown-menu">
            <a class="dropdown-item d-flex align-items-center" href="#">
              Edit <span class="ml-auto fe-edit-3"></span>
            </a>
            <a class="dropdown-item d-flex align-items-center" href="#">
              Share <span class="ml-auto fe-share-2"></span>
            </a>
            <a class="dropdown-item d-flex align-items-center" href="#">
              Delete <span class="ml-auto fe-trash-2"></span>
            </a>
          </div>
        </div>
      </template>

      <template v-slot:content>
        <div :class="isCurrentUserMessage ? 'bg-primary text-white' : 'bg-light'" class="message-content">
          <div>
            {{ message.text }}
          </div>

          <div class="mt-1">
            <small class="opacity-65">{{ dateFormat(message.createdAt) }}</small>
          </div>

          <div v-if="isReadObservable" v-observe-visibility="visibilityChanged"></div>
        </div>
      </template>
    </m-message-body>
    <!-- Message: body -->
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import MMessageBody from '@/components/message/m-message-body';
import { getDateTime } from '@/utils/date-time';

export default {
  name: 'm-message',
  components: { MMessageBody },
  props: {
    avatarMale: {},
    message: {
      required: true,
      type: Object,
    },
    idx: {
      required: true,
      type: Number,
    },
    isReadObservable: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      showDropdown: false,
    };
  },
  computed: {
    ...mapState('user', ['userId']),
    isCurrentUserMessage() {
      return this.message.userId === this.userId;
    },
    avatarClasses() {
      return this.isCurrentUserMessage ? 'd-none d-lg-block ml-4 ml-lg-5' : 'mr-4 mr-lg-5';
    },
  },
  methods: {
    dropdownClickHandler() {
      this.showDropdown = !this.showDropdown;
    },
    dateFormat(timestamp) {
      return getDateTime(timestamp);
    },
    visibilityChanged(isVisible) {
      if (isVisible) {
        this.$emit('messageVisible', this.message.id);
      }
    },
  },
  mounted() {},
};
</script>
