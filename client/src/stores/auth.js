import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false);
  const username = ref('');
  const userId = ref('');

  function login(user) {
    isAuthenticated.value = true;
    username.value = user.username;
    userId.value = user.id;
    setTimeout(() => {
      logout();
    }, 3 * 60 * 60 * 1000);
  }

  function logout() {
    isAuthenticated.value = false;
    username.value = '';
    userId.value = '';
    document.cookie = 'auth=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
  }

  function checkAuth() {
    const authCookie = document.cookie.split('; ').find(row => row.startsWith('auth='));
    if (authCookie) {
      isAuthenticated.value = true;
    }
  }
  checkAuth();

  return { isAuthenticated, username, userId, login, logout };
});
