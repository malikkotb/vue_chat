<template>
  <div>
    <router-view></router-view>
    <login-screen v-if="!loggedIn"></login-screen>
    <!-- if logged in show this div if not show div above
    = login screen -->
    
  </div>
</template>



<script>
import LoginScreen from "./components/LoginScreen.vue";
import ChatBox from "./components/ChatBox.vue";
import SideBar from "./components/SideBar.vue";
import ChatHeader from './components/ChatHeader.vue';
export default {
  name: "App",
  data() {
    return {
      loggedIn: false,
    }
  },
  components: {
    SideBar,
    ChatHeader,
    ChatBox,
    LoginScreen
  },
};
</script>

<style>
.border-end {
  height: 500px;
}

</style>
