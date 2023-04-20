<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-sm-2 border-end">
          <!-- content of first section -->
          <side-bar class="side-bar"></side-bar>
        </div>
        <div class="col-sm-10">
          <chat-header></chat-header>
          <div class="border-bottom w-100"></div>
          <chat-box></chat-box>
          <!-- content of second section -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChatHeader from "@/components/ChatHeader.vue";
import ChatBox from "@/components/ChatBox.vue";
import SideBar from "@/components/SideBar.vue";
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
  },

};
</script>

<style scoped>
</style>