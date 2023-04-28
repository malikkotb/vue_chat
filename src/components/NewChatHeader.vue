<template>
  <div class="chat-header clearfix">
    <div class="row">
      <div class="col-lg-6">
        <!-- <a href="#" data-bs-toggle="modal" data-bs-target="#view_info">
          <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="avatar"/>
        </a> -->

        <!--  receiver -->
        <div class="chat-about">
          <h6 class="mb-0">{{ receiverName }}</h6>
          <small>Last seen: 2 hours ago</small>
        </div>
      
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
    },
  },
  computed: {
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

.chat .chat-header {
  padding: 15px 20px;
  border-bottom: 2px solid #f4f7f6;
  /* justify-content: space-between; */
  /****** */
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

.chat-header .dropdown {
  color: green;
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
