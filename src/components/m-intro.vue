<template>
  <div class="chat flex-column justify-content-center text-center">
    <div class="container-xxl">
      <div class="avatar avatar-lg mb-5">
        <img class="avatar-img" :src="avatarMale" alt="" />
      </div>

      <h6>Hey, Matthew!</h6>
      <p>Please select a chat to start messaging.</p>
    </div>
  </div>
</template>

<script>
import avatarMale from '@/assets/images/avatar_male.jpg';

export default {
  name: 'm-intro',
  data() {
    return {
      avatarMale,
    };
  },
};
</script>
