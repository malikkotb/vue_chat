export default {
  namespaced: true,
  state() {
    return {
      messages: [],
    };
  },
  mutations: {
    addMessage(state, payload) {
      state.messages.push(payload);
    },
    setMessages(state, payload) {
        state.messages = payload;
    }
  },

  actions: {

    async loadMessages(context) {
        const userId = context.rootGetters.getUserId; 
        // TODO: load messages between 2 users
        // so somehow store messages of a conversation
        // instead of storing messages only for a single user
        // so they can actually communicate

        const token = context.rootGetters.getToken;
        const response = await fetch(`https://chat-app-b3645-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/messages.json?auth=` + token);
        const responseData = await response.json();

        if (!response.ok) { 
            const error = new Error(responseData.message || "Failed to fetch");
            throw error;
        }
        const messages = [];
  
        for (const key in responseData) {
            console.log(responseData[key].content);
            const message = {
                id: responseData[key].id,
                author: userId,
                content: responseData[key].content,
                type: responseData[key].type,
            }
            messages.push(message);
        }
        
        context.commit("setMessages", messages);

    },

    async addMessageAction(context, payload) {
      const messageData = {
        id: payload.id,
        author: payload.author,
        content: payload.content,
        type: payload.type
      }

      const userId = context.rootGetters.getUserId; 
      // payload = the message  
      const token = context.rootGetters.getToken;    
      const response = await fetch(`https://chat-app-b3645-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/messages.json?auth=` + token, {
        method: 'POST',
        body: JSON.stringify(payload)
      });

    //   const responseData = await response.json();
      if (!response.ok) {
        // error handling
      }
      context.commit("addMessage", {
        ...messageData,
        id: userId
      });
    },

  },

  getters: {
    currentMessages(state) {
      return state.messages;
    },
  },
};
