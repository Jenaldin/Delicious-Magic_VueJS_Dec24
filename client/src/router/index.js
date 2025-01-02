import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Entry from '../pages/Entry.vue';

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/register-login', name: 'register-login', component: Entry},
  { path: '/about', name: 'about',
    component: () => import('../pages/About.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
