// erst mal alle messages hier storen
// und danach exportieren auf firebase
// ich brauch eine reihenfolge der nachrichten irgendwie
// und ein data attribute, dass ich weiß welche messages sent
// bzw received sind und dieses attribute dann binden
// für die styles
import { createStore } from "vuex";

const store = createStore({
  modules: {},
  state() {
    return {
      isLoggedIn: false,
      messages: [
        {
          // need actual id's from firebase i.e.
          id: "m1",
          author: "",
          content: "Hi, there how are you",
          type: "received",
        },
        {
          // need actual id's from firebase i.e.
          id: "m2",
          author: "",
          content: "I am good, you",
          type: "sent",
        },
        {
          // need actual id's from firebase i.e.
          id: "m3",
          author: "",
          content: "Great, me too",
          type: "received",
        },
      ],
    };
  },
  mutations: {
    addMessage(state, payload) {
      state.messages.push(payload);
    },

    login(state) {
      // TODO: have to be added to mutations in vuex store
      state.isLoggedIn = true;
    },
    logout(state) {
      // TODO: have to be added to mutations in vuex store
      state.isLoggedIn = false;
    },
  },

  actions: {
    login(context) {
      context.commit("login");
    },
    logout(context) {
      context.commit("logout");
    },

    addMessageAction(context, payload) {
      // payload = the message      
      context.commit("addMessage", payload);
    },
  },

  getters: {
    currentMessages(state) {
      return state.messages;
    },
  },
});

export default store;
