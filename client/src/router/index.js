import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/authStore';
import Entry from '../pages/EntryPage.vue';
import Catalog from '../pages/CatalogPage.vue';
import Details from '../pages/DetailsPage.vue';
import User from '../pages/UserPage.vue';

const routes = [
  { path: '/', name: 'home', component: () => import('../pages/HomePage.vue') },
  { path: '/about', name: 'about', component: () => import('../pages/AboutPage.vue') },
  { path: '/register-login', name: 'register-login', component: Entry },
  { path: '/catalog', name: 'catalog', component: Catalog },
  { path: '/add-recipe', name: 'add-recipe', component: Details, meta: { requiresAuth: true } },
  { path: '/view-recipe/:id', name: 'view-recipe', component: Details },
  { path: '/edit-recipe/:id', name: 'edit-recipe', component: Details, meta: { requiresAuth: true } },
  { path: '/user', name: 'user', component: User, meta: { requiresAuth: true } },
  { path: '/user/:userId', name: 'user-id', component: User },
  { path: '/:pathMatch(.*)*', name: '404', component: () => import('../pages/PageNotFoundPage.vue') },
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