import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/authStore';
import Entry from '../pages/Entry.vue';
import Catalog from '../pages/Catalog.vue';
import Details from '../pages/Details.vue';

const routes = [
  { path: '/', name: 'home', component: () => import('../pages/Home.vue') },
  { path: '/about', name: 'about', component: () => import('../pages/About.vue') },
  { path: '/register-login', name: 'register-login', component: Entry },
  { path: '/catalog', name: 'catalog', component: Catalog },
  { path: '/add-recipe', name: 'add-recipe', component: Details, meta: { requiresAuth: true } },
  { path: '/view-recipe/:id', name: 'view-recipe', component: Details },
  { path: '/edit-recipe/:id', name: 'edit-recipe', component: Details, meta: { requiresAuth: true } },
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
  } else if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'register-login' });
  } else { 
    next(); 
  }
});

export default router;