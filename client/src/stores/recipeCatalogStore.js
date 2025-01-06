import { defineStore } from 'pinia';

export const useRecipeStore = defineStore('recipe', {
  state: () => ({
    foodRecipes: [],
    foodTotal: 0,
    drinkRecipes: [],
    drinkTotal: 0
  })
});
