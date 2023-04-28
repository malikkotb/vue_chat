<template>
  <div>
    <!-- original messageBox -->
    <div v-if="error">Something went wrong:{{ error }}</div>
    <div v-else class="messageBox" id="list-div">
      <div class="chat-history">
        <ul class="mb-0">
          <li class="clearfix" v-for="msg in currentMessages" :key="msg.id">
            <div
              class="message-data"
              :class="msg.type === 'sent' ? 'text-end' : ''"
            >
              <span class="message-data-time"
                >{{ msg.id }}</span
              >
            </div>
            <div
              class="message"
              :class="
                msg.type === 'received'
                  ? 'other-message'
                  : 'my-message float-end'
              "
            >
              {{ msg.content }}
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="outer">
      <!-- this is the message input form-->
      <div class="chat-history inputBox">
        <form id="message-form" @submit.prevent>
          <input
            type="text"
            id="message-input"
            placeholder="Type your message..."
            v-model="message"
          />
          <button type="submit" @click="sendMessage">Send</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
// import TheMessage from "./TheMessage.vue";
export default {
  // components: { TheMessage },
  data() {
    return {
      message: "",
      error: null,
      intervalId: null,
    };
  },
  computed: {
    currentMessages() {
      return this.$store.getters["messagesMod/currentMessages"];
    },
    receiverIdValue() {
      return this.$store.getters.getReceiverId;
    },
    
  },
  watch: {
    receiverIdValue(newVal, oldVal) {
      if (newVal !== null || newVal !== oldVal) {
        this.loadMessagesWhenReceiverIdNotNull();
        // this.scrollToBottom();
      }
    },
  },
  mounted() {
    this.scrollToBottom();
  },
  beforeUnmount() {
    clearInterval(this.intervalId); // clear the interval when the component is destroyed
  },
  methods: {
    loadMessagesWhenReceiverIdNotNull() {
      console.log(
        "right now, as you can see messages are only being refreshed once the receiverId has a new value"
      );
      if (this.$store.getters.getReceiverId !== null) {
        this.intervalId = setInterval(this.loadMessages, 1000); // call myMethod every second
      }
    },
    async loadMessages() {
      try {
        await this.$store.dispatch("messagesMod/loadMessages");
        // this.scrollToBottom();
      } catch (error) {
        console.log("inside loadMessages");
        this.error = error.message || "Something went wrong.";
      }
    },
    async sendMessage() {
      // this will add a 'sent' message
      // dispatch the action: addMessageAction(payload is message)
      // which will commit the mutation to add a message to the store
      const messagePayload = {
        id: new Date().toISOString(),
        content: this.message.trim(),
        type: "sent",
      };

      await this.$store.dispatch(
        "messagesMod/addMessageAction",
        messagePayload
      );
      this.message = "";
      this.loadMessages();
      this.scrollToBottom();
    },
    scrollToBottom() {
      const el = document.getElementById("list-div");
      if (el) {
        el.scrollTop = el.scrollHeight;
      }
    },
  },
};
</script>

<style scoped>
.messageBox {
  /* background-color: #f5f5f5; */
  /* border-radius: 10px; */
  /* box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1); */
  padding: 10px;
  width: 100%;
  height: 550px;
  overflow-y: scroll;
  position: relative;
  scroll-behavior: smooth;
}

#message-form {
  display: flex;
  /* margin-top: 10px; */
}

#message-input {
  flex-grow: 1;
  font-size: 1em;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  padding: 10px;
  margin-right: 10px;
}

#message-input:focus {
  outline: none;
}

button[type="submit"] {
  border: none;
  background-color: #007aff;
  color: #ffffff;
  border-radius: 20px;
  padding: 10px 20px;
  cursor: pointer;
}

.outer {
  /* background-color: green; */
}

body {
  background-color: #f4f7f6;
  margin-top: 20px;
}
.card {
  background: #fff;
  transition: 0.5s;
  border: 0;
  margin-bottom: 30px;
  border-radius: 0.55rem;
  position: relative;
  width: 100%;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 10%);
}
.chat-app .people-list {
  width: 280px;
  position: absolute;
  left: 0;
  top: 0;
  padding: 20px;
  z-index: 7;
}

.chat-app .chat {
  margin-left: 280px;
  border-left: 1px solid #eaeaea;
}

.people-list {
  -moz-transition: 0.5s;
  -o-transition: 0.5s;
  -webkit-transition: 0.5s;
  transition: 0.5s;
}

.people-list .chat-list li {
  padding: 10px 15px;
  list-style: none;
  border-radius: 3px;
}

.people-list .chat-list li:hover {
  background: #efefef;
  cursor: pointer;
}

.people-list .chat-list li.active {
  background: #efefef;
}

.people-list .chat-list li .name {
  font-size: 15px;
}

.people-list .chat-list img {
  width: 45px;
  height: 45px;
  border-radius: 50%;
}

.people-list img {
  float: left;
  border-radius: 50%;
}

.people-list .about {
  float: left;
  padding-left: 8px;
}

.people-list .status {
  color: #999;
  font-size: 13px;
}

.chat .chat-header {
  padding: 15px 20px;
  border-bottom: 2px solid #f4f7f6;
}

.chat .chat-header img {
  float: left;
  border-radius: 40px;
  width: 40px;
}

.chat .chat-header .chat-about {
  float: left;
  padding-left: 10px;
}

.chat .chat-history {
  padding: 20px;
  border-bottom: 2px solid #fff;
}

.chat .chat-history ul {
  padding: 0;
}

.chat .chat-history ul li {
  list-style: none;
  margin-bottom: 30px;
}

.chat .chat-history ul li:last-child {
  margin-bottom: 0px;
}

.chat .chat-history .message-data {
  margin-bottom: 15px;
}

.chat .chat-history .message-data img {
  border-radius: 40px;
  width: 40px;
}

.chat .chat-history .message-data-time {
  color: #434651;
  padding-left: 6px;
}

.chat .chat-history .message {
  color: #444;
  padding: 10px 20px;
  line-height: 26px;
  font-size: 16px;
  border-radius: 15px;
  display: inline-block;
  position: relative;
}

/* .chat .chat-history .message:after {
  bottom: 100%;
  left: 7%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
  border-bottom-color: #fff;
  border-width: 10px;
  margin-left: -10px;
} */

.chat .chat-history .my-message {
  background: #007aff;
  color: white;
}

/* .chat .chat-history .my-message:after {
  bottom: 100%;
  left: 30px;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
  border-bottom-color: #007aff;
  border-width: 10px;
  margin-left: -10px;
} */

.chat .chat-history .other-message {
  background: #efefef;
  /* background: #efefef; */
  text-align: right;
}

/* .chat .chat-history .other-message:after {
  border-bottom-color: #efefef;
  left: 93%;
} */

.chat .chat-message {
  padding: 20px;
}

.online,
.offline,
.me {
  margin-right: 2px;
  font-size: 8px;
  vertical-align: middle;
}

@media only screen and (max-width: 767px) {
  .chat-app .people-list {
    height: 465px;
    width: 100%;
    overflow-x: auto;
    background: #fff;
    left: -400px;
    display: none;
  }
  .chat-app .people-list.open {
    left: 0;
  }
  .chat-app .chat {
    margin: 0;
  }
  .chat-app .chat .chat-header {
    border-radius: 0.55rem 0.55rem 0 0;
  }
  .chat-app .chat-history {
    height: 800px;
    overflow-x: auto;
  }
}

@media only screen and (min-width: 768px) and (max-width: 992px) {
  .chat-app .chat-list {
    height: 650px;
    overflow-x: auto;
  }
  .chat-app .chat-history {
    height: 600px;
    overflow-x: auto;
  }
}

@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) and (-webkit-min-device-pixel-ratio: 1) {
  .chat-app .chat-list {
    height: 480px;
    overflow-x: auto;
  }
  .chat-app .chat-history {
    height: calc(100vh - 350px);
    overflow-x: auto;
  }
}

.float-right {
  float: right;
}

.clearfix:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: " ";
  clear: both;
  height: 0;
}

.online {
  color: #86c541;
}

.offline {
  color: #e47297;
}

.me {
  color: #1d8ecd;
}
</style>
