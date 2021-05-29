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
import { CONTENT_TYPES } from '@/constants';
import { mapState } from 'vuex';
import MIntro from '@/components/m-intro';

export default {
  name: 'm-main',
  components: { MIntro, MConversation, MSidebar, MNavigation },
  data() {
    return {
      avatarMale,
      contentTypes: CONTENT_TYPES,
    };
  },
  methods: {
    isContentVisible(contentType) {
      return contentType === this.currentContentType;
    },
  },
  computed: {
    ...mapState(['contentType']),
    currentContentType() {
      return this.contentType;
    },
  },
};
</script>
