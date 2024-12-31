import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/register', name: 'register', component: Register},
  { path: '/login', name: 'login', component: Login},
  { path: '/about', name: 'about',
    component: () => import('../views/About.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
