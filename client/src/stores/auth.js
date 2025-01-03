import { defineStore } from 'pinia';
import { ref } from 'vue';
import { logout as apiLogout } from '@/api/authUser';

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false);
  const username = ref('');
  const userId = ref('');

  const snackbar = ref({
    show: false,
    message: '',
    color: 'green-darken-4'
  });

  function login(user) {
    isAuthenticated.value = true;
    username.value = user.username;
    userId.value = user.id;
    setTimeout(() => {
      logout();
    }, 3 * 60 * 60 * 1000);
  }

  async function logout() {
    try {
      await apiLogout();

      isAuthenticated.value = false;
      username.value = '';
      userId.value = '';
      document.cookie = 'auth=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
      
      snackbar.value = {
        show: true,
        message: 'Logout successful!',
        color: 'green-darken-4'
      };
    } catch (error) {
      snackbar.value = {
        show: true,
        message: 'Logout failed. Please try again.',
        color: 'red-darken-4'
      };
    }
  }

  function checkAuth() {
    const authCookie = document.cookie.split('; ').find(row => row.startsWith('auth='));
    if (authCookie) {
      isAuthenticated.value = true;
    }
  }
  checkAuth();
  return { isAuthenticated, username, userId, snackbar, login, logout };
});