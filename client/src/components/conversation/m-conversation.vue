<template>
  <div class="chat dropzone-form-js" data-dz-url="some.php">
    <!-- Chat: body -->
    <m-conversation-body />
    <!-- Chat: body -->

    <!-- Chat Details -->
    <m-conversation-info />
    <!-- Chat Details -->
  </div>
</template>

<script>
import MConversationInfo from '@/components/conversation/m-conversation-info';
import MConversationBody from '@/components/conversation/m-conversation-body';
import { mapMutations }  from "vuex";

export default {
  name: 'm-conversation',
  components: { MConversationBody, MConversationInfo },
  methods: {
    ...mapMutations("conversation", ['UNSET_CONVERSATION_ID']),
    keyPressListener(e) {
      if (e.code === 'Escape') {
        this.UNSET_CONVERSATION_ID()
      }
    }
  },
  created() {
    window.addEventListener('keydown', this.keyPressListener)
  },
  destroyed() {
    window.removeEventListener('keydown', this.keyPressListener)
  }
};
</script>
