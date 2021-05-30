<template>
  <div class="chat-body">
    <!-- Chat: Header -->
    <m-conversation-header />
    <!-- Chat: Header -->

    <!-- Chat: Search -->
    <m-conversation-search />
    <!-- Chat: Search -->

    <!-- Chat: Content-->
    <m-conversation-content :avatar-female="avatarFemale" :avatar-male="avatarMale" />
    <!-- Chat: Content -->

    <!-- Chat: DropzoneJS container -->
    <div class="chat-files hide-scrollbar px-lg-8">
      <div class="container-xxl">
        <div class="dropzone-previews-js form-row py-4"></div>
      </div>
    </div>
    <!-- Chat: DropzoneJS container -->

    <!-- Chat: Footer -->
    <m-conversation-footer />
    <!-- Chat: Footer -->
  </div>
</template>

<script>
import MConversationFooter  from "@/components/conversation/m-conversation-footer";
import avatarMale           from "@/assets/images/avatar_male.jpg";
import avatarFemale         from "@/assets/images/avatar_female.jpg";
import MConversationHeader  from "@/components/conversation/m-conversation-header";
import MConversationSearch  from "@/components/conversation/m-conversation-search";
import MConversationContent from "@/components/conversation/m-conversation-content";

export default {
  name: 'm-conversation-body',
  components: { MConversationContent, MConversationSearch, MConversationHeader, MConversationFooter},
  data() {
    return {
      avatarMale,
      avatarFemale,
    };
  },
};
</script>
