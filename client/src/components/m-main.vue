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
import avatarMale                            from '@/assets/images/avatar_male.jpg';
import { CONTENT_TYPES, CONVERSATION_TYPES } from '@/constants';
import { mapActions, mapState }              from 'vuex';
import MIntro                   from '@/components/m-intro';

export default {
  name: 'm-main',
  components: { MIntro, MConversation, MSidebar, MNavigation },
  data() {
    return {
      avatarMale,
      contentTypes: CONTENT_TYPES,
    };
  },
  computed: {
    ...mapState(['contentType']),
    ...mapState('conversation', { conversationId: state => state.id, conversationType: state => state.type

}),
    currentContentType() {
      return this.contentType;
    },
  },
  watch: {
    conversationId(id) {
      let contentType = CONTENT_TYPES.INTRO;

      if (id) {
        if (this.conversationType === CONVERSATION_TYPES.PRIVATE) {
          contentType = CONTENT_TYPES.PRIVATE_CONVERSATION
        }

        if (this.conversationType === CONVERSATION_TYPES.GENERAL) {
          contentType = CONTENT_TYPES.GENERAL_CONVERSATION
        }
      }

      this.CHANGE_CONTENT_TYPE(contentType)
    }
  },
  methods: {
    ...mapActions(['CHANGE_CONTENT_TYPE']),
    isContentVisible(contentType) {
      return contentType === this.currentContentType;
    },
  },
};
</script>
