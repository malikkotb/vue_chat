<template>
  <div class="chat-app">
    <div id="plist" class="people-list">
      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text"><i class="fa fa-search"></i></span>
        </div>
        <input type="text" class="form-control" placeholder="Search..." />
      </div>
      <ul class="list-unstyled chat-list mt-2 mb-0">
         
        <a role="button" @click="setReceiverId(user.userId)"
        v-for="user in listOfUsers" :key="user.userId"
        ><li class="clearfix"
        :class="activeButton(user.userId)">
          <img
          src="https://www.thestreet.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTg5OTE4ODcwNTYyMTU0MjM4/lebron-james3.jpg"
            alt="avatar"
          />
          <div class="about">
            <div class="name">{{ user.username }}</div>
            <div class="status"><i class="fa fa-circle online"></i> online</div>
          </div>
        </li></a>
        <li class="clearfix">
          <img
            src="https://bootdey.com/img/Content/avatar/avatar3.png"
            alt="avatar"
          />
          <div class="about">
            <div class="name">Mike Thomas</div>
            <div class="status"><i class="fa fa-circle online"></i> online</div>
          </div>
        </li>
        <li class="clearfix">
          <img
            src="https://bootdey.com/img/Content/avatar/avatar7.png"
            alt="avatar"
          />
          <div class="about">
            <div class="name">Christian Kelly</div>
            <div class="status">
              <i class="fa fa-circle offline"></i> left 10 hours ago
            </div>
          </div>
        </li>
        <li class="clearfix">
          <img
            src="https://bootdey.com/img/Content/avatar/avatar8.png"
            alt="avatar"
          />
          <div class="about">
            <div class="name">Monica Ward</div>
            <div class="status"><i class="fa fa-circle online"></i> online</div>
          </div>
        </li>
      </ul>
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
          return "active";
        }
        //  else {
        //   return "inactive-button";
        // }
      };
    },
  },
  methods: {
    handleClick() {
        console.log("button clicked");
    },
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
    },
    
  },
};
</script>

<style scoped>
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


/** new styling for button */
/* .people-list .chat-list button {
  background-color: transparent;
  border: none;
  padding: 0;
  margin: 0;
}

.people-list .chat-list button:hover {
  background: #efefef;
  cursor: pointer;
}

.people-list .chat-list button:focus {
  outline: none;
}

.people-list .chat-list button.active {
  background: #efefef;
}

.people-list .chat-list button .name {
  font-size: 15px;
} */
/** */





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

/*
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
*/
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
