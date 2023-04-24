<template>
  <div class="outer">
    <div class="message" :style="{ justifyContent: messageType === 'received' ? 'flex-end' : 'felx-start' }" >
      <p class="message-text" v-bind:class="messageType"><slot></slot></p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    messageType: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped>

.outer {
  display: flex;
  flex-direction: column;
}
.sent {
  background-color: rgb(0, 123, 255);
  color: white;
}

.received {
  background-color: white;
  color: black;

}

.message {
  display: flex;
  margin-bottom: 10px;
  /* justify-content: flex-end; */
}

.message-text {
  /* background-color: #ffffff; */
  border-radius: 10px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  padding: 10px;
  max-width: 200px;
}
</style>
