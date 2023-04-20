import { createRouter, createWebHistory } from 'vue-router';
import store from './store/index.js';

import LoginScreen from './pages/LoginScreen.vue';
import ChatPage from './pages/ChatPage.vue';
import NotFound from './pages/NotFound.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: LoginScreen },
    {
      path: '/chat',
      component: ChatPage,
      beforeEnter: (to, from, next) => {
        if (store.getters.isLoggedIn) {
          next();
        } else {
          next('/');
        }
      }
    },
    { path: '/:notFound(.*)', component: NotFound }
  ]
});

export default router;
