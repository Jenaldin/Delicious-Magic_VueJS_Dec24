import { defineStore } from 'pinia';
import { ref } from 'vue';
import { logout as apiLogout } from '../api/authUserApi';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter();
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

    localStorage.setItem('username', user.username);
    localStorage.setItem('userId', user.id);
    document.cookie = `auth=${user.token}; path=/; max-age=${3 * 60 * 60}`;

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
      localStorage.removeItem('username');
      localStorage.removeItem('userId');
      document.cookie = 'auth=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';

      snackbar.value = {
        show: true,
        message: 'Logout successful!',
        color: 'green-darken-4',
      };
      setTimeout(() => {
        router.push('/');
      }, 1000);
    } catch (error) {
      console.error('An error occurred:', error);
      snackbar.value = {
        show: true,
        message: 'Logout failed. Please try again.',
        color: 'red-darken-4'
      };
    }
  }

  function checkAuth() {
    const authCookie = document.cookie.split('; ').find(row => row.startsWith('auth='));
    const usernameStored = localStorage.getItem('username');
    const userIdStored = localStorage.getItem('userId');

    if (authCookie && usernameStored && userIdStored) {
      isAuthenticated.value = true;
      username.value = usernameStored;
      userId.value = userIdStored;
    }
  }

  checkAuth();
  return { isAuthenticated, username, userId, snackbar, login, logout };
});