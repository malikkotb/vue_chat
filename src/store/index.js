import { createStore } from 'vuex';

import messagesModule from './messages.js';
// import usersModule from './users.js';

const store = createStore({
  modules: {
    // users: usersModule,
    messagesMod: messagesModule,
  },
  state() {
    return {
      // TODO: get actual userId from firebase
      // TODO: userId should correspond to currently logged in user
      userId: 'u1' 
    };
  },
  getters: {
    getUserId(state) {
      return state.userId;
    }
  }
});

export default store;

