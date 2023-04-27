<template>
  <div class="header">
    <div class="recipient">{{ receiverName }}</div>
    <div class="info">
      <div class="dropdown">
        <a
          href="#"
          class="d-flex align-items-center link-dark text-decoration-none dropdown-toggle"
          id="dropdownUser2"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src="https://github.com/mdo.png"
            alt=""
            width="32"
            height="32"
            class="rounded-circle me-2"
          />
          <strong>{{ loggedInUser }}</strong>
        </a>
        <ul
          class="dropdown-menu text-small shadow"
          aria-labelledby="dropdownUser2"
        >
          <li><a class="dropdown-item" href="#">New project...</a></li>
          <li><a class="dropdown-item" href="#">Settings</a></li>
          <li><a class="dropdown-item" href="#">Profile</a></li>
          <li><hr class="dropdown-divider" /></li>
          <li @click="signOut"><a class="dropdown-item" href="#">Sign out</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    infoButton() {
      console.log("info button");
    },
    signOut() {
      this.$store.dispatch("logout");
      this.$router.replace("/login");
    }
  },
  computed: {
    loggedInUser() {
      const loggedInUserID = this.$store.getters.getUserId;
      const currentUsers = this.$store.getters.getCurrentUsers;
      const activeUser = currentUsers.filter(
        (user) => user.userId === loggedInUserID
      )[0];
      if (activeUser) {
        return activeUser.username;
      } else {
        return "loading..."; // or some other default value
      }
    },
    receiverName() {
      const receiverId = this.$store.getters.getReceiverId;
      // console.log(receiverId);
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
