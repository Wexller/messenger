<template>
  <div class="card mb-6">
    <div class="card-body">
      <div class="media">
        <div class="avatar avatar-online mr-5">
          <img class="avatar-img" :src="avatar" alt="Anna Bridges" />
        </div>

        <div class="media-body align-self-center">
          <h6 class="mb-0">{{ friend.name || friend.username }}</h6>
          <small class="text-muted">Online</small>
        </div>

        <div class="align-self-center ml-5">
          <b-dropdown variant="link" class="z-index-max" no-caret>
            <template #button-content>
              <a
                href="#"
                class="btn btn-sm btn-ico btn-link text-muted w-auto"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i class="fe-more-vertical"></i>
              </a>
            </template>

            <b-dropdown-item
              @click="startConversationHandler(friend.id)"
              href="#"
              link-class="d-flex align-items-center"
              >New chat <span class="ml-auto fe-edit-2"></span
            ></b-dropdown-item>

            <b-dropdown-item @click="deleteFriendHandler(friend.id)" href="#" link-class="d-flex align-items-center"
              >Delete <span class="ml-auto fe-trash-2"></span
            ></b-dropdown-item>
          </b-dropdown>

          <!--          <div class="dropdown z-index-max">-->
          <!--            <a-->
          <!--              href="#"-->
          <!--              class="btn btn-sm btn-ico btn-link text-muted w-auto"-->
          <!--              data-toggle="dropdown"-->
          <!--              aria-haspopup="true"-->
          <!--              aria-expanded="false"-->
          <!--            >-->
          <!--              <i class="fe-more-vertical"></i>-->
          <!--            </a>-->
          <!--            <div class="dropdown-menu show">-->
          <!--              <a class="dropdown-item d-flex align-items-center" href="#">-->
          <!--                New chat <span class="ml-auto fe-edit-2"></span>-->
          <!--              </a>-->
          <!--              <a class="dropdown-item d-flex align-items-center" href="#">-->
          <!--                Delete <span class="ml-auto fe-trash-2"></span>-->
          <!--              </a>-->
          <!--            </div>-->
          <!--          </div>-->
        </div>
      </div>

      <!-- Link -->
      <a @click.prevent="startConversationHandler(friend.id)" href="#" class="stretched-link"></a>
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
    ...mapActions('conversation', ['startConversation', 'openConversation']),
    ...mapActions('friend', ['deleteFriend']),
    startConversationHandler(id) {
      this.startConversation(id);
    },
    async deleteFriendHandler(id) {
      try {
        const result = await this.$bvModal.msgBoxConfirm(
          `Please confirm that you want to delete ${this.friend.username}.`,
          {
            title: 'Please Confirm',
            size: 'sm',
            buttonSize: 'sm',
            okVariant: 'danger',
            okTitle: 'YES',
            cancelTitle: 'CANCEL',
            footerClass: 'p-2',
            hideHeaderClose: false,
            centered: true,
          }
        );

        if (result) {
          await this.deleteFriend(id);
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
