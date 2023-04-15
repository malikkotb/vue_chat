<template>
  <div>
    <div class="message-box">
    
    <!-- use the message.type attribute to pass down as a prop
    or combine that with a check
    of: is author: logged in -> then he is the sender
    if not then he is the receiver -->

    <the-message :message-class="myMessageClass">
        <p>message in child component.</p>
    </the-message>
      <!-- TODO: need to bind the message, I send down via slots 
    to the actual messages-->
      <the-message :message-class="myMessageClass">
        I'm good, thanks. How about you?
      </the-message>
    
    </div>
    <form id="message-form">
      <input
        type="text"
        id="message-input"
        placeholder="Type your message..."
      />
      <button type="submit">Send</button>
    </form>
  </div>
</template>

<script>
import TheMessage from "./TheMessage.vue";
export default {
  components: { TheMessage },
  data() {
    return {
      myMessageClass: 'sent',
      // myMessageClass: 'sent' or 'received'
    }
  }, methods: {
    // sent or received styling 
    // TODO: should prolly be a computed property
    // use this method or computed property
    messageType(typeOfMessage) {
        if (typeOfMessage === 'sent') {
            this.myMessageClass = 'sent';
        } else {
            this.myMessageClass = 'reveived';
        }
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
  width: 900px;
  height: 400px;
  overflow-y: scroll;
  position: relative;
  /* overflow-y scroll important*/
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
