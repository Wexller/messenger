<template>
  <div class="tab-pane fade h-100" role="tabpanel">
    <div class="d-flex flex-column h-100">
      <div class="hide-scrollbar">
        <div class="container-fluid py-6">
          <!-- Title -->
          <h2 class="font-bold mb-6">Friends</h2>
          <!-- Title -->

          <!-- Search -->
          <form class="mb-6">
            <div class="input-group">
              <input
                type="text"
                class="form-control form-control-lg"
                placeholder="Search for messages or users..."
                aria-label="Search for messages or users..."
              />
              <div class="input-group-append">
                <button class="btn btn-lg btn-ico btn-secondary btn-minimal" type="submit">
                  <i class="fe-search"></i>
                </button>
              </div>
            </div>
          </form>
          <!-- Search -->

          <!-- Button -->
          <button
            type="button"
            class="btn btn-lg btn-block btn-secondary d-flex align-items-center mb-6"
            data-toggle="modal"
            data-target="#invite-friends"
          >
            Invite friends
            <i class="fe-users ml-auto"></i>
          </button>

          <!-- Friends -->
          <nav class="mb-n6">
            <template v-for="(friends, group) in friendsGrouped">
              <div class="mb-6">
                <small class="text-uppercase">{{ group }}</small>
              </div>

              <!-- Friend -->
              <m-friend v-for="friend in friends" :key="friend.id" :friend="friend" :avatar="avatarMale" />
              <!-- Friend -->
            </template>

            <!--            <div class="mb-6">-->
            <!--              <small class="text-uppercase">B</small>-->
            <!--            </div>-->

            <!-- Friend -->
            <!--            <div class="card mb-6">-->
            <!--              <div class="card-body">-->
            <!--                <div class="media">-->
            <!--                  <div class="avatar mr-5">-->
            <!--                    <img class="avatar-img" :src="avatarFemale" alt="Brian Dawson" />-->
            <!--                  </div>-->

            <!--                  <div class="media-body align-self-center">-->
            <!--                    <h6 class="mb-0">Brian Dawson</h6>-->
            <!--                    <small class="text-muted">last seen 2 hours ago</small>-->
            <!--                  </div>-->

            <!--                  <div class="align-self-center ml-5">-->
            <!--                    <div class="dropdown z-index-max">-->
            <!--                      <a-->
            <!--                        href="#"-->
            <!--                        class="btn btn-sm btn-ico btn-link text-muted w-auto"-->
            <!--                        data-toggle="dropdown"-->
            <!--                        aria-haspopup="true"-->
            <!--                        aria-expanded="false"-->
            <!--                      >-->
            <!--                        <i class="fe-more-vertical"></i>-->
            <!--                      </a>-->
            <!--                      <div class="dropdown-menu">-->
            <!--                        <a class="dropdown-item d-flex align-items-center" href="#">-->
            <!--                          New chat <span class="ml-auto fe-edit-2"></span>-->
            <!--                        </a>-->
            <!--                        <a class="dropdown-item d-flex align-items-center" href="#">-->
            <!--                          Delete <span class="ml-auto fe-trash-2"></span>-->
            <!--                        </a>-->
            <!--                      </div>-->
            <!--                    </div>-->
            <!--                  </div>-->
            <!--                </div>-->

            <!--                &lt;!&ndash; Link &ndash;&gt;-->
            <!--                <a href="#" class="stretched-link"></a>-->
            <!--              </div>-->
            <!--            </div>-->
            <!-- Friend -->
          </nav>
          <!-- Friends -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import avatarMale from '@/assets/images/avatar_male.jpg';
import avatarFemale from '@/assets/images/avatar_female.jpg';
import MFriend from '@/components/sidebar/m-friend';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'm-friends-list',
  components: { MFriend },
  data() {
    return {
      avatarMale,
      avatarFemale,
    };
  },
  computed: {
    ...mapState('sidebar', ['friends']),
    friendsList() {
      return this.friends;
    },
    friendsGrouped() {
      return this.friendsList.reduce((acc, cur) => {
        const key = cur.username[0].toLowerCase();

        if (!acc[key]) {
          acc[key] = [];
        }

        acc[key].push(cur);

        return acc;
      }, {});
    },
  },
  methods: {
    ...mapActions('sidebar', ['getFriends']),
  },
  created() {
    if (!this.friendsList.length) {
      this.getFriends();
    }
  },
};
</script>
