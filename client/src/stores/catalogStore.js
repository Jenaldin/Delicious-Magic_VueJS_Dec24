import { defineStore } from 'pinia';

export const useCatalogStore = defineStore('recipe', {
  state: () => ({
    foodRecipes: [],
    foodTotal: 0,
    drinkRecipes: [],
    drinkTotal: 0
  })
});
