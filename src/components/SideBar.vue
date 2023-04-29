<template>
  <div class="removeOuterDIVBRUH">
    <div id="sidebar" class="people-list">
      <div class="input-group mb-3">
        <span class="input-group-text"><i class="fa fa-search"></i></span>
        <input
          type="text"
          class="form-control"
          placeholder="Search..."
          v-model="searchQuery"
          ref="searchInput"
          @focus="checkSearchActive"
          @blur="checkSearchActive"
        />
      </div>
      <!-- actual list elements-->
      <ul class="list-unstyled chat-list mt-2 mb-0">
        <a
          role="button"
          @click="setReceiverId(user.userId)"
          v-for="(user, index) in filteredUsers"
          :key="user.userId"
          ><li class="clearfix" :class="activeButton(user.userId)">
            <!-- <img :src="pic" alt="avatar" /> -->
            <img
              v-if="user.userId !== '404'"
              :src="profile(index)"
              alt="avatar"
            />
            <div class="about">
              <div class="name">{{ user.username }}</div>
              <div class="status" v-if="user.userId !== '404'">
                <i class="fa fa-circle online"></i> online
              </div>
            </div>
          </li>
        </a>
      </ul>

      <!-- footer -->
      <ul class="list-unstyled chat-list profileUl" id="footerProfile">
        <li class="clearfix no-hover">
          <img src="https://github.com/mdo.png" alt="" />
          <div class="about">
            <div class="name">
              <strong>{{ loggedInUser }}</strong>
            </div>
            <div class="status">
              <button class="signOutBtn" @click="signOut">Sign Out</button>
            </div>
            <div></div>
          </div>
        </li>
      </ul>

      <!-- <div class="footer">
        <div class="dropdown ml-auto justify-content-end">
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
              width="40"
              height="40"
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
            <li @click="signOut">
              <a class="dropdown-item" href="#">Sign out</a>
            </li>
          </ul>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      counter: 0,
      activeButtonID: null,
      profilePics: [],
      searchQuery: "",
    };
  },
  computed: {
    filteredUsers() {
      const currentUsers = this.listOfUsers;
      if (!this.searchQuery) {
        return currentUsers;
      } else {
        console.log("searching...");
        const query = this.searchQuery.toLowerCase();
        const queriedList = currentUsers.filter((user) =>
          user.username.toLowerCase().includes(query)
        );
        if (queriedList.length === 0) {
          const noUser = [
            {
              username: `Sorry, no results for '${query}'`,
              userId: "404",
            },
          ];
          return noUser;
        }
        return queriedList;
      }
    },
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
          return "active";
        }
      };
    },
  },

  methods: {
    buttonEvent() {
      console.log("BUTTON CLICKED");
    },
    checkSearchActive() {
      if (this.$refs.searchInput === document.activeElement) {
        console.log("Input focussed");
      } else {
        console.log("not focused right now");
        this.searchQuery = "";
      }
    },
    setActiveButton(userId) {
      this.activeButtonID = userId;
    },
    profile(index) {
      return `https://bootdey.com/img/Content/avatar/avatar${index + 1}.png`;
    },
    setReceiverId(receiverId) {
      // set the receiver id on click of chat on sidebar
      this.activeButtonID = receiverId;
      console.log("activeButtonId: " + this.activeButtonID);
      console.log("receiverId" + receiverId);
      this.$store.dispatch("setReceiverIdAction", receiverId);
    },
    signOut() {
      this.$store.dispatch("logout");
      this.$router.replace("/login");
    },
    // async getProfilePic() {
    //   const keyword = "nature";
    //   const apiKey = "4YvuMDn8NnQ0n73D0jPOGVfeoHnCHwO5iOFUyTyU45nfyt3MIjEHOiNo";
    //   const url = `https://api.pexels.com/v1/search?query=${keyword}&per_page=10&page=1`;
    //   await fetch(url, {
    //     headers: {
    //       Authorization: apiKey,
    //     },
    //   })
    //     .then((response) => response.json())
    //     .then((data) => {
    //       console.log("data.photos: " + data.photos.length);
    //       this.profilePics = data.photos;
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    // },
  },
};
</script>

<style scoped>
body {
  background-color: #f4f7f6;
  margin-top: 20px;
}
/* .footer {
  position: relative;
  bottom: 0;
  margin-top: 250px;
  margin-left: 25px;
} */
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
  height: 100%;
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

.profileUl {
  position: absolute;
  bottom: 2%;
  width: 100%;
  padding: 0;
  margin: 0;
}

#footerProfile li:hover {
  background-color: white !important;
}

button.signOutBtn {
  border: none;
  background-color: transparent;
  color: black;
  text-decoration: none;
  padding: 0;
  font-size: inherit;
  cursor: pointer;
  pointer-events: all;
}

button.signOutBtn:hover {
  opacity: 80%;
  color: #999;
}

li.no-hover {
  pointer-events: none;
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
  padding: 18px 20px;
  line-height: 26px;
  font-size: 16px;
  border-radius: 7px;
  display: inline-block;
  position: relative;
}

.chat .chat-history .message:after {
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
}

.chat .chat-history .my-message {
  background: #efefef;
}

.chat .chat-history .my-message:after {
  bottom: 100%;
  left: 30px;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
  border-bottom-color: #efefef;
  border-width: 10px;
  margin-left: -10px;
}

.chat .chat-history .other-message {
  background: #e8f1f3;
  text-align: right;
}

.chat .chat-history .other-message:after {
  border-bottom-color: #e8f1f3;
  left: 93%;
}

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
    height: 300px;
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
