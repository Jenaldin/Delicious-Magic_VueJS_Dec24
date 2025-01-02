import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false);

  function login() {
    isAuthenticated.value = true;
    setTimeout(() => {
      logout();
    }, 3 * 60 * 60 * 1000); // 3 hours in milliseconds
  }

  function logout() {
    isAuthenticated.value = false;
    // Clear the cookie by setting the expiration date in the past
    document.cookie = 'auth=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
  }

  // Check for auth cookie on initialization
  function checkAuth() {
    const authCookie = document.cookie.split('; ').find(row => row.startsWith('auth='));
    if (authCookie) {
      isAuthenticated.value = true;
    }
  }

  checkAuth();

  return { isAuthenticated, login, logout };
});
