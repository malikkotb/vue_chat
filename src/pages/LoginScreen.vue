<template>
  <div>
    <div class="login-dark">
      <form @submit.prevent>
        <div class="illustration">
          <i class="icon ion-ios-locked-outline"></i>
        </div>
        <div class="">
          <input
            v-if="mode === 'signup'"
            class="form-control"
            type="text"
            id="username"
            placeholder="Username"
            v-model.trim="username"
          />
          <input
            class="form-control"
            type="email"
            id="email"
            placeholder="Email"
            v-model.trim="email"
          />
        </div>
        <div class="">
          <input
            class="form-control"
            type="password"
            id="password"
            placeholder="Password"
            v-model.trim="password"
          />
        </div>
        <p v-if="!formValid" class="errorMsg">
          Please enter a valid email / password (min 6 chars).
        </p>
        <div class="center-button">
          <button @click="submitDetails" class="btn btn-primary">
            {{ submitBtnCaption }}
          </button>
        </div>
        <button @click="switchAuthMode" class="forgot">
          {{ switchModeBtnCaption }}
        </button>
      </form>
    </div>
    <div class="dialog-backdrop" v-if="isloading">
      <div class="dialog">
        <div class="loading-spinner"></div>
        <p>Authenticating...</p>
      </div>
    </div>
    <div class="dialog-backdrop" v-if="!!error" @click="dismissDialog">
      <div class="dialog">
        <!-- <i class="icon ion-ios-ban-outline"></i> -->
        <p>🛑</p>
        <p>An error occured.</p>
        <p>{{ error }}</p>
      </div>
    </div>
  </div>
</template>

// TODO: add Username input field to signup prompt and display that username in
the

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      username: "",
      formValid: true,
      mode: "login", // login or signup
      isloading: false,
      error: null,
    };
  },
  computed: {
    submitBtnCaption() {
      if (this.mode === "login") {
        return "Log in";
      } else {
        return "Signup";
      }
    },
    switchModeBtnCaption() {
      if (this.mode === "login") {
        return "No account? Signup instead";
      } else {
        return "Login instead";
      }
    },
    isLoggedInState() {
      return this.$store.getters.isLoggedIn;
    },
  },
  methods: {
    async submitDetails() {
      // verify login details (with firebase)
      this.formValid = true;
      if (
        this.email === "" ||
        !this.email.includes("@") ||
        this.password.length < 6
      ) {
        this.formValid = false;
        return;
      }

      this.isloading = true;
      try {
        // send http request to login / signup
        if (this.mode === "login") {
          // dispatch login action
          await this.$store.dispatch("login", {
            email: this.email,
            password: this.password,
          });
        } else {
          //dispatch signup action
          await this.$store.dispatch("signup", {
            username: this.username,
            email: this.email,
            password: this.password,
          });
          this.mode = "login";
        }
      } catch (err) {
        this.error = err.message || "Failed to authenticate user, try again";
      }

      this.$store.dispatch("getUsersAction");

      while (
        this.$store.gettersgetUserId === null ||
        this.$store.getters.getCurrentUsers === null
      ) {
        console.log("still null");
        this.isloading = true;
      }

      this.isloading = false;
      if (this.isLoggedInState) {
        console.log("logged in");
        // use .replace -> so user cant just go back to login screen
        this.$router.replace("/chat");
      } else {
        this.username = "";
        this.email = "";
        this.password = "";
      }
    },
    switchAuthMode() {
      if (this.mode === "login") {
        this.mode = "signup";
      } else {
        this.mode = "login";
      }
    },

    dismissDialog() {
      this.error = null;
      this.username = "";
      this.email = "";
      this.password = "";
    },
  },
};
</script>

<style scoped>
/* dialog with backdrop */

.dialog-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog {
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  max-width: 500px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center; /* centers child elements vertically */
  align-items: center; /* centers child elements horizontally */
}

.dialog p {
  font-size: 16px;
  margin: 0;
}

/* loading spinner */
.loading-spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.errorMsg {
  text-align: center; /* centers the paragraph */
  font-size: 12px; /* sets the font size to 12 pixels */
  padding-top: 5px; /* adds 5 pixels of padding on the top */
  margin-bottom: 0;
  color: darkred;
}
.login-dark {
  height: 1000px;
  background: #475d62 url(../assets/stars.jpg);
  background-size: cover;
  position: relative;
}

.center-button {
  text-align: center;
  padding-bottom: 10px;
}

button {
  width: 100%;
}

.login-dark form {
  max-width: 320px;
  width: 90%;
  background-color: #1e2833;
  padding: 40px;
  border-radius: 4px;
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
  color: #fff;
  box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.2);
}

.login-dark .illustration {
  text-align: center;
  padding: 15px 0 20px;
  font-size: 100px;
  color: #2980ef;
}

.login-dark form .form-control {
  background: none;
  border: none;
  border-bottom: 1px solid #434a52;
  border-radius: 0;
  box-shadow: none;
  outline: none;
  color: inherit;
}

.login-dark form .btn-primary {
  background: #214a80;
  border: none;
  border-radius: 4px;
  padding: 11px;
  box-shadow: none;
  margin-top: 26px;
  text-shadow: none;
  outline: none;
}

.login-dark form .btn-primary:hover,
.login-dark form .btn-primary:active {
  background: #214a80;
  outline: none;
}

.login-dark form button.forgot {
  display: block;
  text-align: center;
  font-size: 12px;
  color: #6f7a85;
  opacity: 0.9;
  text-decoration: none;
  border: none;
  background-color: transparent;
}

.login-dark form .forgot:hover,
.login-dark form .forgot:active {
  opacity: 1;
  text-decoration: none;
}

.login-dark form .btn-primary:active {
  transform: translateY(1px);
}
</style>
