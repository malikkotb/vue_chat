import { createStore } from "vuex";
import { getAuth, onAuthStateChanged } from "firebase/auth";


import messagesModule from "./messages.js";

const store = createStore({
  modules: {
    // users: usersModule,
    messagesMod: messagesModule,
  },
  state() {
    return {
      // userId corresponds to currently logged in user
      userId: null,
      receiverId: null,
      currentUsers: [],
      token: null,
      userEmail: "",
      tokenExpiration: null,
      isLoggedIn: false,
    };
  },
  mutations: {
    setUser(state, payload) {
      state.token = payload.token;
      state.userId = payload.userId;
      state.tokenExpiration = payload.tokenExpiration;
      state.userEmail = payload.email;
    },
    setLoggedIn(state) {
      // set isLoggedIn to true
      state.isLoggedIn = true;
    },
    setUserList(state, payload) {
      console.log("log from mutation to set currentUserList");
      console.log("User-List: " + payload);
      state.currentUsers = payload;
    },
  },
  actions: {
    async signup(context, payload) {
      // this sends the request which creates a new user
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCRa7SaZJW2jxM8eb9xMzXAHYyyU9crHl4",
        {
          method: "POST",
          body: JSON.stringify({
            email: payload.email,
            password: payload.password,
            returnSecureToken: true,
          }),
        }
      );

      const responseData = await response.json();
      if (!response.ok) {
        console.log(responseData);
        const error = new Error(
          responseData.message || "Failed to authenticate"
        );
        throw error;
      }
      console.log("worked");
      console.log(responseData); // = response payload

      context.commit("setUser", {
        token: responseData.idToken,
        userId: responseData.localId,
        tokenExpiration: responseData.expiresIn,
      });
    },
    async login(context, payload) {
      // only thing thats different is url compared to singup method
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCRa7SaZJW2jxM8eb9xMzXAHYyyU9crHl4",
        {
          method: "POST",
          body: JSON.stringify({
            email: payload.email,
            password: payload.password,
            returnSecureToken: true,
          }),
        }
      );

      const responseData = await response.json();
      if (!response.ok) {
        console.log(responseData);
        const error = new Error(
          responseData.message || "Failed to authenticate"
        );
        throw error;
      }
      console.log("worked");
      console.log(responseData); // = response payload

      await context.commit("setUser", {
        token: responseData.idToken,
        userId: responseData.localId,
        tokenExpiration: responseData.expiresIn,
        email: responseData.email,
      });

      context.commit("setLoggedIn");
    },

    async getUsersAction(context, payload) {
      // await fetch();

      const userList = [];

      const auth = getAuth();
      await onAuthStateChanged(auth, user => {
        // Check for user status
        if (user) {
          console.log("User is logged in: "+ user);
          this.userList.push(user);
        } else {
          // user not logged in i guess
          console.log("user not logged in - from inside onAuthStateChanged");
        }
      });

      // Listen for changes to the authentication state
      // await auth.onAuthStateChanged((user) => {
      //   if (user) {
      //     // If the user is signed in, add their information to the list of signed-in users
      //     this.userList.push({
      //       uid: user.uid,
      //       displayName: user.displayName,
      //       email: user.email,
      //     });
      //   } else {
      //     // If the user is signed out, remove their information from the list of signed-in users
      //     this.users = this.users.filter((u) => u.uid !== user.uid);
      //   }
      // });

      console.log("unnecessary log of payload: " + payload);
      context.commit("setUserList", userList);
    },
  },

  getters: {
    getUserId(state) {
      return state.userId;
    },
    getUserMail(state) {
      return state.userEmail;
    },
    getToken(state) {
      return state.token;
    },
    isLoggedInGetter(state) {
      return state.isLoggedIn;
    },
    getReceiverId(state) {
      return state.receiverId;
    },
    getCurrentUsers(state) {
      return state.currentUsers;
    },
  },
});

export default store;
