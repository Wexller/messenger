<template>
  <div class="chat-footer border-top py-4 py-lg-6 px-lg-8">
    <div class="container-xxl">
      <form @submit.prevent="submitHandler" data-emoji-form="">
        <div class="form-row align-items-center">
          <div class="col">
            <div class="input-group">
              <!-- Textarea -->
              <textarea
                v-model="text"
                class="form-control bg-transparent border-0"
                placeholder="Type your message..."
                rows="1"
                data-emoji-input=""
                data-autosize="true"
                style="overflow: hidden; overflow-wrap: break-word; resize: none; height: 46px"
              ></textarea>

              <!-- Emoji button -->
              <div class="input-group-append">
                <button
                  class="btn btn-ico btn-secondary btn-minimal bg-transparent border-0"
                  type="button"
                  data-emoji-btn=""
                >
                  <m-emoji-icon />
                </button>
              </div>

              <!-- Upload button -->
              <div class="input-group-append">
                <button
                  id="chat-upload-btn-2"
                  class="btn btn-ico btn-secondary btn-minimal bg-transparent border-0 dropzone-button-js dz-clickable"
                  type="button"
                >
                  <m-paperclip-icon />
                </button>
              </div>
            </div>
          </div>

          <!-- Submit button -->
          <div class="col-auto">
            <button class="btn btn-ico btn-primary rounded-circle" type="submit">
              <span class="fe-send"></span>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import MEmojiIcon     from '@/components/icons/m-emoji-icon';
import MPaperclipIcon from '@/components/icons/m-paperclip-icon';
import { mapActions } from "vuex";

export default {
  name: 'm-conversation-footer',
  components: { MPaperclipIcon, MEmojiIcon },
  data() {
    return {
      text: ''
    }
  },
  methods: {
    ...mapActions('message', ['SEND_MESSAGE']),
    async submitHandler() {
      await this.SEND_MESSAGE(this.text)
      this.text = ''
    }
  }
};
</script>
