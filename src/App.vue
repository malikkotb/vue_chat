<template>
  <div>
    <router-view v-slot="slotProps">
      <transition name="route">
        <component :is="slotProps.Component" mode="out-in"></component>
      </transition>
    </router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  computed: {
    loginStatus() {
      return this.$store.getters.isLoggedIn;
    },
  },

  mounted() {
    window.addEventListener("beforeunload", this.confirmReload);
  },

  beforeUnmount() {
    window.removeEventListener("beforeunload", this.confirmReload);
  },

  methods: {
    confirmReload(event) {
      event.preventDefault();
      event.returnValue = "";
      if (window.confirm("Are you sure you want to reload the page?")) {
        location.reload();
      }
    },
  },
};
</script>

<style>
.border-end {
  height: 500px;
}

.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-active {
  transition: all 0.3s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
