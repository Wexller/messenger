<template>
  <div class="message">
    <!-- Avatar -->
    <a class="avatar avatar-sm mr-4 mr-lg-5" href="#" data-chat-sidebar-toggle="#chat-2-info">
      <img class="avatar-img" :src="avatarFemale" alt="" />
    </a>

    <!-- Message: body -->
    <div class="message-body">
      <!-- Message: row -->
      <div class="message-row">
        <div class="d-flex align-items-center">
          <!-- Message: content -->
          <div class="message-content bg-light">
            <div>
              Anna is typing<span class="typing-dots"><span>.</span><span>.</span><span>.</span></span>
            </div>
          </div>
          <!-- Message: content -->
        </div>
      </div>
      <!-- Message: row -->
    </div>
    <!-- Message: body -->
  </div>
</template>

<script>
export default {
  name: "m-message-typing",
  props: {
    avatarFemale: {}
  }
};
</script>