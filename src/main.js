import { createApp } from "vue";

import App from "./App.vue";
import router from "./router.js";
import store from "./store/index.js";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import TheMessage from "./components/TheMessage.vue";

// firebase 
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCRa7SaZJW2jxM8eb9xMzXAHYyyU9crHl4",
  authDomain: "chat-app-b3645.firebaseapp.com",
  databaseURL: "https://chat-app-b3645-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "chat-app-b3645",
  storageBucket: "chat-app-b3645.appspot.com",
  messagingSenderId: "348160066722",
  appId: "1:348160066722:web:9448cad9ff1c43a13883fb"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);

export default auth;

// end of firebase initialization


const app = createApp(App);

app.use(store);
app.use(router);

app.component("the-message", TheMessage);

app.mount("#app");



