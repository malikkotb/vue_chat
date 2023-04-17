import { createRouter, createWebHistory } from 'vue-router';

import LoginScreen from './pages/LoginScreen.vue';
import ChatPage from './pages/ChatPage.vue';
import NotFound from './pages/NotFound.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: LoginScreen },
    { path: '/chat', component: ChatPage },
    { path: '/:notFound(.*)', component: NotFound }
  ]
});

export default router;