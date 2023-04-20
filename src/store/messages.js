import { getDatabase, ref, get, set, child } from "firebase/database";

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
    },
  },

  actions: {
    async loadMessages(context) {
      const userId = context.rootGetters.getUserId;
      const receiverId = context.rootGetters.getReceiverId;
      const currentUsers = context.rootGetters.getCurrentUsers;
      // console.log("userId: " + userId + "\nreceiverId: " + receiverId + "\ncurrentUsers: " + currentUsers);

      if (currentUsers.length === 0) {
        console.log("AHHHHHH No USERS");
      }
      if (receiverId === null) {
        console.log("AHHH NO RECIEVER ID");
      }

      const receiverUsername = currentUsers.find(
        (user) => user.userId === receiverId
      ).username;
      console.log("RECEIVER USERNAME: " + receiverUsername);

      ///////////////////


      // TODO: get type: here from database and set it here somehow
      // because it always depends on who is reading the data

      const dbRef = ref(getDatabase());
      //       set(ref(db, "users/messages/" + userId), {
      get(child(dbRef, `users/messages/${userId}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            console.log("SNAPSHOT: " + data);
            const keys = Object.keys(data);
            const values = Object.values(data);
            console.log("Keys: " + keys + "\n\nValues: " + values);
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });

        ////////////////

      const token = context.rootGetters.getToken;
      const response = await fetch(
        `https://chat-app-b3645-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/messages/chatWith:${receiverUsername}.json?auth=` +
          token
      );
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
          content: responseData[key].content,
      // TODO: get type: here from database and set it here somehow
      // because it always depends on who is reading the data
          type: responseData[key].type,
          // TODO: hier abgleichen ob 
        };
        messages.push(message);
      }
      console.log("after messages loop");
      context.commit("setMessages", messages);
    },

    async addMessageAction(context, payload) {
      const messageData = {
        id: payload.id,
        // author: payload.author,
        content: payload.content,
        type: payload.type,
      };

      const userId = context.rootGetters.getUserId;
      const receiverId = context.rootGetters.getReceiverId;
      const currentUsers = context.rootGetters.getCurrentUsers;

      const receiverUsername = currentUsers.find(
        (user) => user.userId === receiverId
      ).username;
      console.log("RECEIVER USERNAME" + receiverUsername);

      // payload = the message
      // const token = context.rootGetters.getToken;
      // const response = await fetch(
      //   `https://chat-app-b3645-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/messages/chatWith:${receiverUsername}.json?auth=` +
      //     token,
      //   {
      //     method: "POST",
      //     body: JSON.stringify(payload),
      //   }
      // );

      // const responseData = await response.json();
      // if (!response.ok) {
      //   const error = new Error(responseData.message || "Failed to fetch");
      //   throw error;
      // }

      const db = getDatabase();
      // sender message Write to DB
      set(ref(db, "users/messages/" + userId), {
        username: receiverUsername,
        message_id: payload.id,
        content: payload.content,
        type: "sent",
        sender_id: userId
      });

      // receiver message Write to DB
      set(ref(db, "users/messages/" + receiverId), {
        username: receiverUsername,
        message_id: payload.id,
        content: payload.content,
        type: 'received',
        sender_id: userId, // sender_id in this case is the userId and not the receiverId, as the user is the sender of the message
      });



      // write same data to path of recipient user

      context.commit("addMessage", {
        ...messageData,
        id: userId,
      });
    },
  },

  getters: {
    currentMessages(state) {
      return state.messages;
    },
  },
};
