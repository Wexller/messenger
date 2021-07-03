<template>
  <div class="layout">
    <m-navigation />
    <m-sidebar />

    <div class="main main-visible" data-mobile-height="">
      <m-intro v-if="isContentVisible(contentTypes.INTRO)" />

      <m-conversation v-else />
    </div>
  </div>
</template>

<script>
import MNavigation from '@/components/m-navigation';
import MSidebar from '@/components/sidebar/m-sidebar';
import MConversation from '@/components/conversation/m-conversation';
import avatarMale from '@/assets/images/avatar_male.jpg';
import { CONTENT_TYPES, CONVERSATION_TYPES } from '@/constants';
import { mapActions, mapGetters, mapState } from 'vuex';
import MIntro from '@/components/m-intro';

export default {
  name: 'm-main',
  components: { MIntro, MConversation, MSidebar, MNavigation },
  data() {
    return {
      avatarMale,
      contentTypes: CONTENT_TYPES,
      socket: null,
    };
  },
  computed: {
    ...mapState(['contentType']),
    ...mapState('conversation', ['conversationId']),
    ...mapGetters('conversation', ['conversationType']),
    ...mapState('user', ['token']),
    currentContentType() {
      return this.contentType;
    },
  },
  watch: {
    // TODO: Refactor
    conversationId(conversationId) {
      let contentType = CONTENT_TYPES.INTRO;

      if (conversationId) {
        if (this.conversationType(conversationId) === CONVERSATION_TYPES.PRIVATE) {
          contentType = CONTENT_TYPES.PRIVATE_CONVERSATION;
        }

        if (this.conversationType(conversationId) === CONVERSATION_TYPES.GENERAL) {
          contentType = CONTENT_TYPES.GENERAL_CONVERSATION;
        }
      }

      this.changeContentType(contentType);
    },
    token(token) {
      this.connectToSocket(token);
    },
  },
  methods: {
    ...mapActions(['changeContentType']),
    isContentVisible(contentType) {
      return contentType === this.currentContentType;
    },
    connectToSocket(token) {
      // this.$socket.client.io.opts.transportOptions = {
      //   polling: {
      //     extraHeaders: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   },
      // };
      // this.$socket.client.connect();
    },
  },
  created() {
    this.connectToSocket(this.token);
  },
  destroyed() {
    // this.$socket.client.close();
  },
};
</script>
