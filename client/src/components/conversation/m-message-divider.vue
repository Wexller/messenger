<template>
  <div class="message-divider my-9 mx-lg-5">
    <div class="row align-items-center">
      <div class="col">
        <hr />
      </div>

      <div class="col-auto">
        <small class="text-muted">{{ text }}</small>
      </div>

      <div class="col">
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'm-message-divider',
  props: {
    text: {
      required: true,
      type: String,
    },
  },
};
</script>
