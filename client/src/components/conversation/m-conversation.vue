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

export default {
  name: 'm-conversation',
  components: { MConversationBody, MConversationInfo },
};
</script>
