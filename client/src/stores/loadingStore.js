import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLoadingStore = defineStore('loadingStore', () => {
  const isLoading = ref(false);

  const setLoading = (loading) => {
    isLoading.value = loading;
  };

  return {
    isLoading,
    setLoading
  };
});
