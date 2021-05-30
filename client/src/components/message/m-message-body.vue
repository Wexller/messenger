<template>
  <div class="message-body">
    <!-- Message: row -->
    <div class="message-row">
      <div :class="{'justify-content-end': isCurrentUserMessage}" class="d-flex align-items-center">
        <template v-if="isCurrentUserMessage">
          <slot name="dropdown" />
          <slot name="content" />
        </template>

        <template v-else>
          <slot name="content" />
          <slot name="dropdown" />
        </template>
      </div>
    </div>
    <!-- Message: row -->
  </div>
</template>
<script>
export default {
  name: "m-message-body",
  props: {
    isCurrentUserMessage: {}
  }
};
</script>