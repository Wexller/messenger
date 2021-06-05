<template>
  <div class="chat-header border-bottom py-4 py-lg-6 px-lg-8">
    <div class="container-xxl">
      <div class="row align-items-center">
        <!-- Close chat(mobile) -->
        <div class="col-3 d-xl-none">
          <ul class="list-inline mb-0">
            <li class="list-inline-item">
              <a class="text-muted px-0" href="#" data-chat="open">
                <i class="icon-md fe-chevron-left"></i>
              </a>
            </li>
          </ul>
        </div>

        <!-- Chat photo -->
        <div class="col-6 col-xl-6">
          <div class="media text-center text-xl-left">
            <div class="avatar avatar-sm avatar-online d-none d-lg-inline-block mr-5">
              <img :src="avatarFemale" class="avatar-img" alt="" />
            </div>

            <div class="media-body align-self-center text-truncate">
              <h6 class="text-truncate mb-n1">{{ conversationName }}</h6>
              <span class="badge badge-dot badge-success d-inline-block d-xl-none mr-1"></span>
              <small class="text-muted">Online</small>
            </div>
          </div>
        </div>

        <!-- Chat toolbar -->
        <div class="col-3 col-xl-6 text-right">
          <ul class="nav justify-content-end">
            <li class="nav-item list-inline-item d-none d-xl-block mr-3">
              <a
                class="nav-link text-muted px-3"
                data-toggle="collapse"
                data-target="#chat-2-search"
                href="#"
                title="Search this chat"
              >
                <i class="icon-md fe-search"></i>
              </a>
            </li>

            <li class="nav-item list-inline-item d-none d-xl-block mr-0">
              <a class="nav-link text-muted px-3" href="#" data-chat-sidebar-toggle="#chat-2-info" title="Details">
                <i class="icon-md fe-more-vertical"></i>
              </a>
            </li>

            <!-- Mobile nav -->
            <li class="nav-item list-inline-item d-block d-xl-none">
              <div class="dropdown">
                <a
                  class="nav-link text-muted px-0"
                  href="#"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i class="icon-md fe-more-vertical"></i>
                </a>
                <div class="dropdown-menu">
                  <a
                    class="dropdown-item d-flex align-items-center"
                    data-toggle="collapse"
                    data-target="#chat-2-search"
                    href="#"
                  >
                    Search <span class="ml-auto pl-5 fe-search"></span>
                  </a>

                  <a class="dropdown-item d-flex align-items-center" href="#" data-chat-sidebar-toggle="#chat-2-info">
                    Chat Info <span class="ml-auto pl-5 fe-more-horizontal"></span>
                  </a>
                </div>
              </div>
            </li>
            <!-- Mobile nav -->
          </ul>
        </div>
      </div>
      <!-- .row -->
    </div>
  </div>
</template>
<script>
import avatarFemale           from '@/assets/images/avatar_female.jpg';
import { mapState }           from "vuex";
import { CONVERSATION_TYPES } from "@/constants";

export default {
  name: 'm-conversation-header',
  data() {
    return {
      avatarFemale,
    };
  },
  computed: {
    ...mapState('conversation', ['users', 'type', 'name']),
    ...mapState('user', ['userId']),
    conversationName() {
      let name;

      if (this.type === CONVERSATION_TYPES.PRIVATE) {
        const { username } = this.users.find((user) => user.id !== this.userId);
        name = username;
      } else {
        name = this.name
      }

      return name
    }
  }
};
</script>
