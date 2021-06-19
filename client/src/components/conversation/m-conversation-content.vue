<template>
  <div class="chat-content px-lg-8">
    <div class="container-xxl py-6 py-lg-10">
      <!-- Message -->
      <!--            <div class="message">
              &lt;!&ndash; Avatar &ndash;&gt;
              <a class="avatar avatar-sm mr-4 mr-lg-5" href="#" data-chat-sidebar-toggle="#chat-2-info">
                <img class="avatar-img" :src="avatarFemale" alt="" />
              </a>

              &lt;!&ndash; Message: body &ndash;&gt;
              <div class="message-body">
                &lt;!&ndash; Message: row &ndash;&gt;
                <div class="message-row">
                  <div class="d-flex align-items-center">
                    &lt;!&ndash; Message: content &ndash;&gt;
                    <div class="message-content bg-light w-100">
                      <h6 class="mb-2">Anna Bridges shared 3 photos:</h6>
                      <div class="form-row py-3">
                        <div class="col">
                          <img
                            class="img-fluid rounded"
                            src="https://themes.2the.me/Boomerang/1.2/assets/images/team/1.jpg"
                            data-action="zoom"
                            alt=""
                          />
                        </div>
                        <div class="col">
                          <img
                            class="img-fluid rounded"
                            src="https://themes.2the.me/Boomerang/1.2/assets/images/team/2.jpg"
                            data-action="zoom"
                            alt=""
                          />
                        </div>
                        <div class="col">
                          <img
                            class="img-fluid rounded"
                            src="https://themes.2the.me/Boomerang/1.2/assets/images/team/3.jpg"
                            data-action="zoom"
                            alt=""
                          />
                        </div>
                      </div>

                      <div class="mt-1">
                        <small class="opacity-65">8 mins ago</small>
                      </div>
                    </div>
                    &lt;!&ndash; Message: content &ndash;&gt;

                    &lt;!&ndash; Message: dropdown &ndash;&gt;
                    <div class="dropdown">
                      <a
                        class="text-muted opacity-60 ml-3"
                        href="#"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i class="fe-more-vertical"></i>
                      </a>

                      <div class="dropdown-menu">
                        <a class="dropdown-item d-flex align-items-center" href="#">
                          Edit <span class="ml-auto fe-edit-3"></span>
                        </a>
                        <a class="dropdown-item d-flex align-items-center" href="#">
                          Share <span class="ml-auto fe-share-2"></span>
                        </a>
                        <a class="dropdown-item d-flex align-items-center" href="#">
                          Delete <span class="ml-auto fe-trash-2"></span>
                        </a>
                      </div>
                    </div>
                    &lt;!&ndash; Message: dropdown &ndash;&gt;
                  </div>
                </div>
                &lt;!&ndash; Message: row &ndash;&gt;

                &lt;!&ndash; Message: row &ndash;&gt;
                <div class="message-row">
                  <div class="d-flex align-items-center">
                    &lt;!&ndash; Message: content &ndash;&gt;
                    <div class="message-content bg-light">
                      <div>
                        Yeah, I'm going to meet a friend of mine at the department store. I have to buy some presents for my
                        parents.
                      </div>

                      <div class="mt-1">
                        <small class="opacity-65">8 mins ago</small>
                      </div>
                    </div>
                    &lt;!&ndash; Message: content &ndash;&gt;

                    &lt;!&ndash; Message: dropdown &ndash;&gt;
                    <div class="dropdown">
                      <a
                        class="text-muted opacity-60 ml-3"
                        href="#"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i class="fe-more-vertical"></i>
                      </a>

                      <div class="dropdown-menu">
                        <a class="dropdown-item d-flex align-items-center" href="#">
                          Edit <span class="ml-auto fe-edit-3"></span>
                        </a>
                        <a class="dropdown-item d-flex align-items-center" href="#">
                          Share <span class="ml-auto fe-share-2"></span>
                        </a>
                        <a class="dropdown-item d-flex align-items-center" href="#">
                          Delete <span class="ml-auto fe-trash-2"></span>
                        </a>
                      </div>
                    </div>
                    &lt;!&ndash; Message: dropdown &ndash;&gt;
                  </div>
                </div>
                &lt;!&ndash; Message: row &ndash;&gt;
              </div>
              &lt;!&ndash; Message: body &ndash;&gt;
            </div>-->
      <!-- Message -->

      <!-- Message -->

      <div
        v-if="isTopSpinnerVisible"
        class="d-flex justify-content-center py-5"
        v-observe-visibility="topVisibilityChanged"
      >
        <b-spinner />
      </div>

      <template v-for="(message, idx) in messagesList">
        <m-message
          @messageVisible="messageVisibleHandler"
          :key="message.id"
          :message="message"
          :avatar-male="avatarMale"
          :idx="idx"
          :is-read-observable="isReadObservable(message.id, idx)"
          :ref="'message#' + message.id"
        />

        <template v-if="messagesList[idx + 1]">
          <m-message-divider
            v-if="isDateDividerVisible(message.createdAt, messagesList[idx + 1].createdAt)"
            :text="dateDividerText(messagesList[idx + 1].createdAt)"
          />
        </template>

        <m-message-divider v-if="isNewMessagesDividerVisible(message, idx)" text="New Messages" />
        <span v-if="isLastReadElementVisible(message)" ref="lastReadMessage"></span>
      </template>

      <!-- Message -->

      <!-- Message: Typing -->
      <!--      <m-message-typing :avatar-female="avatarFemale" />-->
      <!-- Message: Typing -->
    </div>

    <!-- Scroll to end -->
    <div
      v-if="isBottomSpinnerVisible"
      class="d-flex justify-content-center py-5"
      v-observe-visibility="bottomVisibilityChanged"
    >
      <b-spinner />
    </div>
  </div>
</template>

<script>
import MMessageDivider from '@/components/conversation/m-message-divider';
import MMessage from '@/components/message/m-message';
import MMessageTyping from '@/components/message/m-message-typing';
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';
import { areDatesInOneDay, getDateTime } from '@/utils/date-time';
import { LOAD_MESSAGES, MESSAGE_READ_TIMEOUT } from '@/constants';

let keepScrollPosition = false;

export default {
  name: 'm-conversation-content',
  components: { MMessageTyping, MMessage, MMessageDivider },
  props: {
    avatarFemale: {},
    avatarMale: {},
  },
  data() {
    return {
      readMessages: [],
      timeout: null,
      atStartOfConversation: false,
      atEndOfConversation: false,
      oldMessagesAreLoading: false,
      newMessagesAreLoading: false,
      containerHeight: 0,
      keepScrollPosition: false,
    };
  },
  computed: {
    ...mapGetters('message', ['messages', 'lastReadMessageIdx', 'isFirstMessageExists', 'isLastMessageExists']),
    ...mapGetters('conversation', ['lastReadMessageIdInConversation', 'firstConversationLoad']),
    ...mapState('conversation', { conversationId: (state) => state.id }),
    messagesList() {
      return this.messages;
    },
    isLastReadMessageExists() {
      return this.lastReadMessageIdx !== -1;
    },
    isTopSpinnerVisible() {
      return !this.isFirstMessageExists;
    },
    isBottomSpinnerVisible() {
      return !this.isLastMessageExists;
    },
    lastReadMessageEl() {
      const el = this.$refs[`message#${this.lastReadMessageIdInConversation}`];

      if (!el) {
        return null;
      }

      return el[0].$el;
    },
  },
  methods: {
    ...mapActions('conversation', ['updateLastReadMessage']),
    ...mapActions('message', ['getMessages', 'loadMoreMessages']),
    ...mapMutations('conversation', ['SET_FIRST_CONVERSATION_LOAD']),
    scrollToLastRead() {
      if (this.messages.length && this.lastReadMessageEl) {
        this.lastReadMessageEl.scrollIntoView();
      }
    },
    isDateDividerVisible(date1, date2) {
      return !areDatesInOneDay(date1, date2);
    },
    dateDividerText(date) {
      return getDateTime(date, 'Today');
    },
    isNewMessagesDividerVisible(message, idx) {
      if (!this.isLastReadMessageExists || this.messagesList.length - 1 === idx) {
        return false;
      }

      return this.lastReadMessageIdInConversation === message.id;
    },
    isLastReadElementVisible(message) {
      if (!this.isLastReadMessageExists) {
        return false;
      }

      return this.lastReadMessageIdInConversation === message.id;
    },
    isReadObservable(id, idx) {
      return idx > this.lastReadMessageIdx && !this.readMessages.includes(id);
    },
    messageVisibleHandler(id) {
      if (!this.readMessages.includes(id)) {
        this.readMessages.push(id);
      }
    },
    topVisibilityChanged(isVisible) {
      this.atStartOfConversation = isVisible;
    },
    bottomVisibilityChanged(isVisible) {
      this.atEndOfConversation = isVisible;
    },
  },
  watch: {
    readMessages() {
      clearTimeout(this.timeout);

      if (!this.readMessages.length) {
        return;
      }

      const conversationId = this.conversationId;
      const messageId = this.readMessages[this.readMessages.length - 1];

      this.timeout = setTimeout(() => {
        this.updateLastReadMessage({
          conversationId,
          messageId,
        });
      }, MESSAGE_READ_TIMEOUT);
    },
    async atStartOfConversation(value) {
      if (this.messages.length && value && !this.oldMessagesAreLoading) {
        this.oldMessagesAreLoading = true;
        await this.loadMoreMessages(LOAD_MESSAGES.OLD);
        keepScrollPosition = true;
        this.oldMessagesAreLoading = false;
      }
    },
    async atEndOfConversation(value) {
      if (this.messages.length && value && !this.newMessagesAreLoading) {
        this.newMessagesAreLoading = true;
        await this.loadMoreMessages(LOAD_MESSAGES.NEW);
        this.newMessagesAreLoading = false;
      }
    },
  },
  async created() {
    if (this.conversationId) {
      await this.getMessages();
    }
  },
  mounted() {
    if (this.messages.length) {
      this.scrollToLastRead();
    }
  },
  beforeUpdate() {
    this.containerHeight = this.$el.scrollHeight;
  },
  updated() {
    if (this.containerHeight !== this.$el.scrollHeight && this.$el.scrollTop && this.$el.scrollTop < 300) {
      this.$el.scrollTop = this.$el.scrollHeight - this.containerHeight;
    } else if (this.firstConversationLoad) {
      this.scrollToLastRead();
      this.SET_FIRST_CONVERSATION_LOAD({ bool: false, id: this.conversationId });
    }
  },
};
</script>
