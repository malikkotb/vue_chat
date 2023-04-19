import { createStore } from "vuex";

import messagesModule from "./messages.js";
// import usersModule from './users.js';

const store = createStore({
  modules: {
    // users: usersModule,
    messagesMod: messagesModule,
  },
  state() {
    return {
      // userId corresponds to currently logged in user
      userId: null,
      token: null,
      tokenExpiration: null,
      isLoggedIn: false,
    };
  },
  mutations: {
    setUser(state, payload) {
      state.token = payload.token;
      state.userId = payload.userId;
      state.tokenExpiration = payload.tokenExpiration;
    },
    setLoggedIn(state) {
      // set isLoggedIn to true 
      state.isLoggedIn = true;
    }
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

      context.commit("setUser", {
        token: responseData.idToken,
        userId: responseData.localId,
        tokenExpiration: responseData.expiresIn,
      });

      context.commit("setLoggedIn");

    },
  },

  getters: {
    getUserId(state) {
      return state.userId;
    },
    getToken(state) {
      return state.token;
    },
    isLoggedInGetter(state) {
      return state.isLoggedIn;
    }
  },
});

export default store;
