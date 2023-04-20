<template>
  <div class="header">
    <div class="recipient">{{ receiverName }}</div>
    <div class="info">
      <button class="btn btn-unstyled" @click="infoButton">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-info-circle"
          viewBox="0 0 16 16"
        >
          <path
            d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
          />
          <path
            d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  // TODO: get the name of the recipient of the message
  // with computed property and using getCurrentUsers getter
  // as well as getRceiverId getter and compare
  methods: {
    infoButton() {
      console.log("info button");
    },
  },
  computed: {
    receiverName() {
      const receiverId = this.$store.getters.getReceiverId;
      console.log(receiverId);
      // const receiverId = "O1bzuFOvMqMQvP9XQsEkekysDoo2";
      const currentUsers = this.$store.getters.getCurrentUsers;
      const currentReceiver = currentUsers.filter(
        (user) => user.userId === receiverId
      );
      console.log(currentReceiver[0]);
      if (currentReceiver[0]) {
        return currentReceiver[0].username;
      } else {
        return "Select a chat...";
      }
    },
  },
};
</script>

<style scoped>
.info {
  display: flex;
  align-items: center;
}

.header {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
