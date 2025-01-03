import { createRouter, createWebHistory } from 'vue-router';
import Entry from '../pages/Entry.vue';
import { useAuthStore } from '../stores/auth';

const routes = [
  { path: '/', name: 'home', component: () => import('../pages/Home.vue') },
  { path: '/about', name: 'about', component: () => import('../pages/About.vue') },
  { path: '/register-login', name: 'register-login', component: Entry },
];


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => { 
  const authStore = useAuthStore(); 
  if (to.name === 'register-login' && authStore.isAuthenticated) { 
    next({ name: 'home' }); 
  } else { 
    next(); 
  }
});

export default router;
