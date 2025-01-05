import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import Entry from '../pages/Entry.vue';
import Catalog from '../pages/Catalog.vue';

const routes = [
  { path: '/', name: 'home', component: () => import('../pages/Home.vue') },
  { path: '/about', name: 'about', component: () => import('../pages/About.vue') },
  { path: '/register-login', name: 'register-login', component: Entry },
  { path: '/catalog', name: 'catalog', component: Catalog },
  { path: '/:pathMatch(.*)*', name: '404', component: () => import('../pages/PageNotFound.vue') },
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