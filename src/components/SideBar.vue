<template>
  <div>
    
    <div
      class="d-flex flex-column flex-shrink-0 p-3 bg-light"
      style="width: 100%"
    >
      <button class="btn-primary">Search</button>
      <hr />
      <div class="userList">
        <ul class="nav flex-column mb-auto">
          <li class="nav-item" v-for="user in listOfUsers" :key="user.userId">
            <button
              @click="setReceiverId(user.userId)"
              :class="activeButton(user.userId)"
            >
              {{ user.username }}
            </button>
          </li>
        </ul>
      </div>
      <hr />
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
  data() {
    return {
      activeButtonID: null,
    };
  },
  computed: {
    listOfUsers() {
      const currentUsers = this.$store.getters.getCurrentUsers;
      const loggedInUserID = this.$store.getters.getUserId;
      const usersWithoutLoggedInUser = currentUsers.filter(
        (user) => user.userId !== loggedInUserID
      );
      return usersWithoutLoggedInUser;
    },
    loggedInUser() {
      const loggedInUserID = this.$store.getters.getUserId;
      const currentUsers = this.$store.getters.getCurrentUsers;
      const activeUser = currentUsers.filter(
        (user) => user.userId === loggedInUserID
      )[0];
      // return activeUser.username;
      if (activeUser) {
        return activeUser.username;
      } else {
        return "loading..."; // or some other default value
      }
    },
    activeButton() {
      return (userId) => {
        if (userId === this.activeButtonID) {
          return "active-button";
        } else {
          return "inactive-button";
        }
      };
    },
  },
  methods: {
    //TODO: display last sent message beneath username
    // on sidebar

    setActiveButton(userId) {
      this.activeButtonID = userId;
    },
    setReceiverId(receiverId) {
      // set the receiver id on click of chat on sidebar
      this.activeButtonID = receiverId;
      console.log("activeButtonId: " + this.activeButtonID);
      console.log("receiverId" + receiverId);
      this.$store.dispatch("setReceiverIdAction", receiverId);
    },
    searchFunction() {
      // TODO: use v-model to bind the input box and make the searchbar search instantaeneausly
    },
    signOut() {
      this.$store.dispatch("logout");
      this.$router.replace("/login");
    }
  },
};
</script>

<style scoped>
.userList {
  height: 350px;
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: scroll;
}

.userList li {
  /* margin: 5px; */
}

.userList ul li button {
  display: inline-block;
  padding: 8px 12px;
  /* border-radius: 5px; */
  border: none;
 
  cursor: pointer;
  width: 100%;
}

.active-button {
  background-color: #007afe;
  color: white;
  outline: none;
}
.inactive-button {
   background-color: white; 
   color: black;
}

</style>
