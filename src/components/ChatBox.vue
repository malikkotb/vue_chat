<template>
  <div>
    <div class="message-box">

    <the-message v-for="msg in currentMessages" :key="msg.id" :message-type="msg.type">
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
      message: ''
    }
  }, 
  computed: {
    currentMessages() {
      return this.$store.getters.currentMessages;
    }
  },
  methods: {
    sendMessage() { // this will add a 'sent' message
      // dispatch the action: addMessageAction(payload is message) 
      // which will commit the mutation to add a message to the store
      const messagePayload = {
        id: 'm4',
        author: 'Make this work with user who is logged in',
        content: this.message.trim(),
        type: 'sent'
      }

      this.$store.dispatch('addMessageAction', messagePayload)
      .then(() => {
        console.log('User updated successfully');
      })
      .catch(error => {
        console.log(error);
      });

      this.message = '';

    }
  }
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
