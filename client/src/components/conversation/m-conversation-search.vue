<template>
  <div class="collapse border-bottom px-lg-8" id="chat-2-search">
    <div class="container-xxl py-4 py-lg-6">
      <div class="input-group">
        <input
          type="text"
          class="form-control form-control-lg"
          placeholder="Search this chat"
          aria-label="Search this chat"
        />

        <div class="input-group-append">
          <button class="btn btn-lg btn-ico btn-secondary btn-minimal" type="submit">
            <i class="fe-search"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'm-conversation-search',
};
</script>
