import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Register from '../pages/Register.vue';
import Login from '../pages/Login.vue';

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/register', name: 'register', component: Register},
  { path: '/login', name: 'login', component: Login},
  { path: '/about', name: 'about',
    component: () => import('../pages/About.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
