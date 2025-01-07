<script setup>
</script>

<template>
   <p>Favorites here</p>
</template>

<!-- <script setup>
import { ref, onMounted } from 'vue';
import { getFavoriteRecipes } from '../api/userApi';

const props = defineProps({ userId: String });

const recipesFavorite = ref([]);
const snackbar = ref({
  show: false,
  message: '',
  color: 'green-darken-4'
});

const fetchRecipes = async () => {
  try {
    recipesFavorite.value = await getFavoriteRecipes(props.userId);
  } catch (error) {
    snackbar.value = {
      show: true,
      message: error.response?.data?.error || error.message,
      color: 'red-darken-4'
    };
  }
};

onMounted(() => {
  fetchRecipes();
});
</script> 

<template>
  <div>
    <v-card v-for="recipe in recipesFavorite" :key="recipe._id">
      <v-card-title>{{ recipe.title }}</v-card-title>
      <v-card-subtitle>Type: {{ recipe.type }}</v-card-subtitle>
    </v-card>
    <v-snackbar v-model="snackbar.show" :color="snackbar.color">
      {{ snackbar.message }}
    </v-snackbar>
  </div>
</template> -->

<style scoped>
</style>
