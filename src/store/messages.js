import { getDatabase, ref, get, update, child } from "firebase/database";

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

      const messages = [];
      const dbRef = await ref(getDatabase());
      try {
        const snapshot = await get(child(dbRef, `users/messages/${userId}`));
        if (snapshot.exists()) {
          const responseData = snapshot.val();
          for (const key in responseData) {
            if (
              responseData[key].receiver_id === receiverId ||
              responseData[key].sender_id === receiverId
            ) {
              const message = {
                id: responseData[key].message_id,
                content: responseData[key].content,
                type: responseData[key].type,
              };
              messages.push(message);
            }
          }
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error(error);
      }

      // console.log("Messages:");
      // messages.forEach((item) => console.log(item));
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
      const currentUser_username = currentUsers.find(
        (user) => user.userId === userId
      ).username;

      let date = new Date(payload.id);
      const options = { timeZone: "Europe/Berlin" };
      let formattedDate = date.toLocaleString("de-DE", options);
      formattedDate = formattedDate.replace("AM", "");
      formattedDate = formattedDate.replaceAll(".", "-");
      // console.log(formattedDate); // "4/21/2023, 9:32:32 "
      formattedDate = formattedDate.replaceAll("/", "-");
      formattedDate = formattedDate.replaceAll(",", "|");
      const message_id_unique = formattedDate.replace(/\s/g, "");

      const db = getDatabase();
      // sender message Write to DB
      update(ref(db, "users/messages/" + userId + "/" + message_id_unique), {
        username_chatWith: receiverUsername,
        message_id: message_id_unique,
        content: payload.content,
        type: "sent",
        sender_id: userId,
        receiver_id: receiverId,
      });

      // receiver message Write to DB
      update(
        ref(db, "users/messages/" + receiverId + "/" + message_id_unique),
        {
          username_chatWith: currentUser_username, // userID-userName of sender
          message_id: message_id_unique,
          content: payload.content,
          type: "received",
          sender_id: userId, // sender_id in this case is the userId and not the receiverId, as the user is the sender of the message
          receiver_id: receiverId,
        }
      );

      context.commit("addMessage", {
        ...messageData,
        id: userId,
      });

      // call loadMessages
      //now calling loadmessages as soon as there is a new message
      context.dispatch("loadMessages");
    },
  },

  getters: {
    currentMessages(state) {
      return state.messages;
    },
  },
};
