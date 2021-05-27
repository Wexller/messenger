<template>
  <div class="sidebar">
    <div class="tab-content h-100" role="tablist">
      <m-create-conversation :class="tabsState[tabs.CREATE_CONVERSATION]" />

      <m-friends-list :class="tabsState[tabs.FRIENDS_LIST]" />

      <m-conversations :class="tabsState[tabs.CONVERSATIONS]" />

      <m-profile :class="tabsState[tabs.PROFILE]" />
    </div>
  </div>
</template>

<script>
import MCreateConversation from '@/components/sidebar/m-create-conversation';
import MFriendsList from '@/components/sidebar/m-friends-list';
import MConversations from '@/components/sidebar/m-conversations';
import MProfile from '@/components/sidebar/m-profile';
import { TABS } from '@/constants';
import { mapState } from 'vuex';

const activeClass = 'active';
const showClass = 'show';

export default {
  name: 'm-sidebar',
  components: { MProfile, MConversations, MFriendsList, MCreateConversation },
  data() {
    const tabsState = Object.values(TABS).reduce((acc, cur) => ({ ...acc, [cur]: '' }), {});

    return {
      val: true,
      tabs: TABS,
      tabsState,
    };
  },
  computed: {
    ...mapState('sidebar', ['currentTab']),
  },
  watch: {
    currentTab(newTabName, oldTabName) {
      this.tabsState[oldTabName] = activeClass;
      this.tabsState[newTabName] = activeClass;

      setTimeout(() => {
        this.tabsState[oldTabName] = '';
        this.tabsState[newTabName] = `${activeClass} ${showClass}`;
      }, 150);
    },
  },
  methods: {
    isTabActive(tabName) {
      return tabName === this.currentTab;
    },
  },
  created() {
    this.tabsState[this.currentTab] = `${activeClass} ${showClass}`;
  },
};
</script>
