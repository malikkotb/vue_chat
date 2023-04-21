import { createStore } from "vuex";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, get, set } from "firebase/database";

import messagesModule from "./messages.js";

const store = createStore({
  modules: {
    messagesMod: messagesModule,
  },
  state() {
    return {
      // userId corresponds to currently logged in user
      userId: null,
      // receiverId: 'D0GWrwmZGnPAQm2HRLFZf1LPRvH3',
      receiverId: null, // is set by clicking on recipient in SideBar
      currentUsers: [],
      token: null,
      userEmail: "",
      userUsername: "",
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
      state.userUsername = payload.userUsername;
    },
    setLoggedIn(state) {
      // set isLoggedIn to true
      state.isLoggedIn = true;
    },
    setUserList(state, payload) {
      console.log("payload: inside setUserList: " + payload);
      state.currentUsers = payload;
    },
    setReceiverId(state, payload) {
      state.receiverId = payload;
    },
  },
  actions: {
    setReceiverIdAction(context, payload) {
      context.commit("setReceiverId", payload);
    },
    async signup(context, payload) {
      // this sends the request which creates a new user
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCRa7SaZJW2jxM8eb9xMzXAHYyyU9crHl4",
        {
          method: "POST",
          body: JSON.stringify({
            username: payload.username,
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
        userUsername: payload.username,
      });

      // add firebase UID of newly registered user to extra Reiter in Realtime Database
      // to then display all users
      const db = getDatabase();
      // set(ref(db, 'userIds/' + payload.username), {
      set(ref(db, "userIds/" + responseData.localId), {
        username: payload.username,
        email: payload.email,
        userId: responseData.localId, // store the userId in the realtime db
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

    async getUsersAction(context) {
      const userList = [];

      const db = getDatabase(); // realtime db from firebase
      const userListRef = ref(db, "userIds/");

      const snapshot = await get(userListRef);

      const data = snapshot.val();

      for (let key in data) {
        const user = {
          userId: data[key].userId,
          username: data[key].username, // don't need email here
        };
        userList.push(user);
      }

      console.log("userList inside action: ", userList);
      context.commit("setUserList", userList);
      // TODO: use this data to display the list of users to access individual chats
      // between 2 users
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
    isLoggedIn(state) {
      return state.isLoggedIn;
    },
    getReceiverId(state) {
      return state.receiverId;
    },
    getCurrentUsers(state) {
      return state.currentUsers;
    },
    getUserUsername(state) {
      return state.userUsername;
    }
  },
});

export default store;
