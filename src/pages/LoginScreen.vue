<template>
    <div>
        <div class="login-dark">
        <form @submit.prevent>
            <div class="illustration"><i class="icon ion-ios-locked-outline"></i></div>
            <div class=""><input class="form-control" type="email" name="email" placeholder="Email"></div>
            <div class=""><input class="form-control" type="password" name="password" placeholder="Password"></div>
            <div class="center-button"><button @click="goToChat" class="btn btn-primary">Log In</button></div>
            <a href="#" class="forgot">No account? Register?</a>
            <!-- TODO: make this a router-link to a register page -->
            <a href="#" class="forgot">Forgot your email or password?</a>
        </form>
        </div>
    </div>
</template>

<script>
export default {
  methods: {
    goToChat() {
      //TODO: verify login details (with firebase)
      // and authenticate the user to then go back
      // use .replace -> so user cant just go back to login screen
      this.$router.replace('/chat');
    }
  }
}
</script>


<style scoped>
.login-dark {
  height:1000px;
  background:#475d62 url(../assets/stars.jpg);
  background-size:cover;
  position:relative;
}

.center-button {
    text-align: center;
    padding-bottom: 10px;
}

button {
    width: 100%;
}

.login-dark form {
  max-width:320px;
  width:90%;
  background-color:#1e2833;
  padding:40px;
  border-radius:4px;
  transform:translate(-50%, -50%);
  position:absolute;
  top:50%;
  left:50%;
  color:#fff;
  box-shadow:3px 3px 4px rgba(0,0,0,0.2);
}

.login-dark .illustration {
  text-align:center;
  padding:15px 0 20px;
  font-size:100px;
  color:#2980ef;
}

.login-dark form .form-control {
  background:none;
  border:none;
  border-bottom:1px solid #434a52;
  border-radius:0;
  box-shadow:none;
  outline:none;
  color:inherit;
}

.login-dark form .btn-primary {
  background:#214a80;
  border:none;
  border-radius:4px;
  padding:11px;
  box-shadow:none;
  margin-top:26px;
  text-shadow:none;
  outline:none;
}

.login-dark form .btn-primary:hover, .login-dark form .btn-primary:active {
  background:#214a80;
  outline:none;
}

.login-dark form .forgot {
  display:block;
  text-align:center;
  font-size:12px;
  color:#6f7a85;
  opacity:0.9;
  text-decoration:none;
}

.login-dark form .forgot:hover, .login-dark form .forgot:active {
  opacity:1;
  text-decoration:none;
}

.login-dark form .btn-primary:active {
  transform:translateY(1px);
}
</style>