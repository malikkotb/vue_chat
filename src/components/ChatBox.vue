<template>
  <div>
    <div v-if="error">Something went wrong:{{ error }}</div>
    <div v-else class="message-box">
      <the-message
        v-for="msg in currentMessages"
        :key="msg.id"
        :message-type="msg.type"
      >
        <p>{{ msg.content }}</p>
      </the-message>
    </div>
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
</template>

<script>
import TheMessage from "./TheMessage.vue";
export default {
  components: { TheMessage },
  data() {
    return {
      message: "",
      error: null,
      
    };
  },
  computed: {
    currentMessages() {
      return this.$store.getters["messagesMod/currentMessages"];
    },
    receiverIdValue() {
      return this.$store.getters.getReceiverId;
    }
  },
  watch: {
    receiverIdValue(newVal) {
      if (newVal !== null) {
        this.loadMessagesWhenReceiverIdNotNull();
      }
    }
  },
  mounted() {
    if (this.$store.getters.getReceiverId === null) {
      console.log("\n\n\n\n receiver id is thill null \n\n\n\n");
    }
    // this.loadMessages();
  },
  methods: {
    loadMessagesWhenReceiverIdNotNull() {
      this.loadMessages();
    },
    async loadMessages() {
      //TODO: load messages between the userId and the receiverId

      try {
        await this.$store.dispatch("messagesMod/loadMessages");
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
        // author: "Make this work with user who is logged in",
        content: this.message.trim(),
        // TODO: check here if currently logged in user
        // is equal to author -> then type='sent'
        // else: type = 'received'        

        type: "sent",
      };

      await this.$store.dispatch(
        "messagesMod/addMessageAction",
        messagePayload
      );
      this.message = "";
      this.loadMessages();
    },
  },
};
</script>

<style scoped>
.message-box {
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  padding: 10px;
  width: 100%;
  height: 400px;
  overflow-y: scroll;
  position: relative;
}

#message-form {
  display: flex;
  margin-top: 10px;
}

#message-input {
  flex-grow: 1;
  border: none;
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
</style>
