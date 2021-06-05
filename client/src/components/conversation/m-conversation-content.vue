<template>
  <div class="chat-content px-lg-8" ref="content">
    <div class="container-xxl py-6 py-lg-10">

      <!-- Divider -->
<!--      <m-message-divider text="Today" />-->
      <!-- Divider -->

      <!-- Message -->
<!--      <div class="message">-->
<!--        &lt;!&ndash; Avatar &ndash;&gt;-->
<!--        <a class="avatar avatar-sm mr-4 mr-lg-5" href="#" data-chat-sidebar-toggle="#chat-2-info">-->
<!--          <img class="avatar-img" :src="avatarFemale" alt="" />-->
<!--        </a>-->

<!--        &lt;!&ndash; Message: body &ndash;&gt;-->
<!--        <div class="message-body">-->
<!--          &lt;!&ndash; Message: row &ndash;&gt;-->
<!--          <div class="message-row">-->
<!--            <div class="d-flex align-items-center">-->
<!--              &lt;!&ndash; Message: content &ndash;&gt;-->
<!--              <div class="message-content bg-light w-100">-->
<!--                <h6 class="mb-2">Anna Bridges shared 3 photos:</h6>-->
<!--                <div class="form-row py-3">-->
<!--                  <div class="col">-->
<!--                    <img-->
<!--                      class="img-fluid rounded"-->
<!--                      src="https://themes.2the.me/Boomerang/1.2/assets/images/team/1.jpg"-->
<!--                      data-action="zoom"-->
<!--                      alt=""-->
<!--                    />-->
<!--                  </div>-->
<!--                  <div class="col">-->
<!--                    <img-->
<!--                      class="img-fluid rounded"-->
<!--                      src="https://themes.2the.me/Boomerang/1.2/assets/images/team/2.jpg"-->
<!--                      data-action="zoom"-->
<!--                      alt=""-->
<!--                    />-->
<!--                  </div>-->
<!--                  <div class="col">-->
<!--                    <img-->
<!--                      class="img-fluid rounded"-->
<!--                      src="https://themes.2the.me/Boomerang/1.2/assets/images/team/3.jpg"-->
<!--                      data-action="zoom"-->
<!--                      alt=""-->
<!--                    />-->
<!--                  </div>-->
<!--                </div>-->

<!--                <div class="mt-1">-->
<!--                  <small class="opacity-65">8 mins ago</small>-->
<!--                </div>-->
<!--              </div>-->
<!--              &lt;!&ndash; Message: content &ndash;&gt;-->

<!--              &lt;!&ndash; Message: dropdown &ndash;&gt;-->
<!--              <div class="dropdown">-->
<!--                <a-->
<!--                  class="text-muted opacity-60 ml-3"-->
<!--                  href="#"-->
<!--                  data-toggle="dropdown"-->
<!--                  aria-haspopup="true"-->
<!--                  aria-expanded="false"-->
<!--                >-->
<!--                  <i class="fe-more-vertical"></i>-->
<!--                </a>-->

<!--                <div class="dropdown-menu">-->
<!--                  <a class="dropdown-item d-flex align-items-center" href="#">-->
<!--                    Edit <span class="ml-auto fe-edit-3"></span>-->
<!--                  </a>-->
<!--                  <a class="dropdown-item d-flex align-items-center" href="#">-->
<!--                    Share <span class="ml-auto fe-share-2"></span>-->
<!--                  </a>-->
<!--                  <a class="dropdown-item d-flex align-items-center" href="#">-->
<!--                    Delete <span class="ml-auto fe-trash-2"></span>-->
<!--                  </a>-->
<!--                </div>-->
<!--              </div>-->
<!--              &lt;!&ndash; Message: dropdown &ndash;&gt;-->
<!--            </div>-->
<!--          </div>-->
<!--          &lt;!&ndash; Message: row &ndash;&gt;-->

<!--          &lt;!&ndash; Message: row &ndash;&gt;-->
<!--          <div class="message-row">-->
<!--            <div class="d-flex align-items-center">-->
<!--              &lt;!&ndash; Message: content &ndash;&gt;-->
<!--              <div class="message-content bg-light">-->
<!--                <div>-->
<!--                  Yeah, I'm going to meet a friend of mine at the department store. I have to buy some presents for my-->
<!--                  parents.-->
<!--                </div>-->

<!--                <div class="mt-1">-->
<!--                  <small class="opacity-65">8 mins ago</small>-->
<!--                </div>-->
<!--              </div>-->
<!--              &lt;!&ndash; Message: content &ndash;&gt;-->

<!--              &lt;!&ndash; Message: dropdown &ndash;&gt;-->
<!--              <div class="dropdown">-->
<!--                <a-->
<!--                  class="text-muted opacity-60 ml-3"-->
<!--                  href="#"-->
<!--                  data-toggle="dropdown"-->
<!--                  aria-haspopup="true"-->
<!--                  aria-expanded="false"-->
<!--                >-->
<!--                  <i class="fe-more-vertical"></i>-->
<!--                </a>-->

<!--                <div class="dropdown-menu">-->
<!--                  <a class="dropdown-item d-flex align-items-center" href="#">-->
<!--                    Edit <span class="ml-auto fe-edit-3"></span>-->
<!--                  </a>-->
<!--                  <a class="dropdown-item d-flex align-items-center" href="#">-->
<!--                    Share <span class="ml-auto fe-share-2"></span>-->
<!--                  </a>-->
<!--                  <a class="dropdown-item d-flex align-items-center" href="#">-->
<!--                    Delete <span class="ml-auto fe-trash-2"></span>-->
<!--                  </a>-->
<!--                </div>-->
<!--              </div>-->
<!--              &lt;!&ndash; Message: dropdown &ndash;&gt;-->
<!--            </div>-->
<!--          </div>-->
<!--          &lt;!&ndash; Message: row &ndash;&gt;-->
<!--        </div>-->
<!--        &lt;!&ndash; Message: body &ndash;&gt;-->
<!--      </div>-->
      <!-- Message -->

      <!-- Message -->

      <template v-for="(message, idx) in messagesList">
        <m-message
          :key="message.id"
          :message="message"
          :avatar-male="avatarMale"
        />

        <template v-if="messagesList[idx + 1]">
          <m-message-divider
            v-if="isDateDividerVisible(message.createdAt, messagesList[idx + 1].createdAt)"
            :text="dateDividerText(messagesList[idx + 1].createdAt)"
          />
        </template>
      </template>

      <!-- Message -->

      <!-- Message: Typing -->
<!--      <m-message-typing :avatar-female="avatarFemale" />-->
      <!-- Message: Typing -->
    </div>

    <!-- Scroll to end -->
    <div class="end-of-chat"></div>
  </div>
</template>

<script>
import MMessageDivider from "@/components/conversation/m-message-divider";
import MMessage        from "@/components/message/m-message";
import MMessageTyping  from "@/components/message/m-message-typing";
import { mapGetters }  from "vuex";
import { areDatesInOneDay, getDateTime } from "@/utils/date-time";

export default {
  name: "m-conversation-content",
  components: { MMessageTyping, MMessage, MMessageDivider },
  props: {
    avatarFemale: {},
    avatarMale: {}
  },
  computed: {
    ...mapGetters('message', ['messages']),
    messagesList() {
      return this.messages
    }
  },
  methods: {
    scrollDown() {
      const el = this.$refs.content;
      el.scrollTop = el.scrollHeight;
    },
    isDateDividerVisible(date1, date2) {
      return !areDatesInOneDay(date1, date2);
    },
    dateDividerText(date) {
      return getDateTime(date, 'Today')
    }
  },
  watch: {
    messagesList() {
      this.scrollDown()
    }
  },
  mounted() {
    this.scrollDown()
  }
};
</script>