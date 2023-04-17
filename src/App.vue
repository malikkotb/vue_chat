<template>
  <div>
    <router-view></router-view>
  </div>
</template>

//TODO: RENDER A LOADING SPINNER 
// WHEN GOING FROM LOGIN TO CHAT APP 
// FOR ABOUT 2-3 SECONDS

<script>
export default {
  name: "App",
  data() {
    return {
    }
  },

};
</script>

<style>
.border-end {
  height: 500px;
}

</style>
