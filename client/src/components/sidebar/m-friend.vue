<template>
  <div class="card mb-6">
    <div class="card-body">
      <div class="media">
        <div class="avatar avatar-online mr-5">
          <img class="avatar-img" :src="avatar" alt="Anna Bridges" />
        </div>

        <div class="media-body align-self-center">
          <h6 class="mb-0">{{ friend.username }}</h6>
          <small class="text-muted">Online</small>
        </div>

        <div class="align-self-center ml-5">
          <div class="dropdown z-index-max">
            <a
              href="#"
              class="btn btn-sm btn-ico btn-link text-muted w-auto"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="fe-more-vertical"></i>
            </a>
            <div class="dropdown-menu">
              <a class="dropdown-item d-flex align-items-center" href="#">
                New chat <span class="ml-auto fe-edit-2"></span>
              </a>
              <a class="dropdown-item d-flex align-items-center" href="#">
                Delete <span class="ml-auto fe-trash-2"></span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Link -->
      <a @click.prevent="friendClickHandler(friend.username)" href="#" class="stretched-link"></a>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  name: 'm-friend',
  props: {
    avatar: {},
    friend: {
      required: true,
      type: Object,
    },
  },
  methods: {
    ...mapActions('conversation', ['startConversation']),
    friendClickHandler(username) {
      this.startConversation(username);
    },
  },
};
</script>
