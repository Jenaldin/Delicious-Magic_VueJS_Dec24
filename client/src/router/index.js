import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/authStore';
import Entry from '../pages/EntryPage.vue';
import Catalog from '../pages/CatalogPage.vue';
import Details from '../pages/DetailsPage.vue';
import User from '../pages/UserPage.vue';
import { getRecipe } from '../api/recipeApi';

const routes = [
  { path: '/', name: 'home', component: () => import('../pages/HomePage.vue') },
  { path: '/about', name: 'about', component: () => import('../pages/AboutPage.vue') },
  { path: '/entry-point', name: 'entry-point', component: Entry },
  { path: '/catalog', name: 'catalog', component: Catalog },
  { path: '/add-recipe', name: 'add-recipe', component: Details, meta: { requiresAuth: true } },
  { path: '/view-recipe/:id', name: 'view-recipe', component: Details },
  { path: '/edit-recipe/:id', name: 'edit-recipe', component: Details, meta: { requiresAuth: true } },
  { path: '/user', name: 'user', component: User, meta: { requiresAuth: true } },
  { path: '/user/:userId', name: 'user-id', component: User },
  { path: '/not-found', name: 'not-found', component: () => import('../pages/NotFoundPage.vue') },
  { path: '/:pathMatch(.*)*', redirect: { name: 'not-found'} },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => { 
  const authStore = useAuthStore(); 
  if (to.name === 'entry-point' && authStore.isAuthenticated) { 
    next({ name: 'home' }); 
  } else if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'entry-point' });
  } else if (to.name === 'edit-recipe') {
    try {
      const recipe = await getRecipe(to.params.id);
      if (authStore.userId === recipe.owner._id) {
        next();
      } else {
        next({ name: 'not-found' });
      }
    } catch (error) {
      console.error('Error fetching recipe details:', error);
    }
  } else { 
    next(); 
  }
});

export default router;