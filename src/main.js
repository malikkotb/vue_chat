import { createApp } from "vue";

import App from "./App.vue";
import router from "./router.js";
import store from "./store/index.js";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import TheMessage from "./components/TheMessage.vue";

const app = createApp(App);

app.use(store);
app.use(router);

app.component("the-message", TheMessage);

app.mount("#app");



