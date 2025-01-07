<script setup>
</script>

<template>
   <p>Owned here</p>
</template>

<!-- <script setup>
import { ref, onMounted } from 'vue';
import { getUserRecipes } from '../api/userApi';
import { deleteRecipe } from '../api/recipeApi';
import { useRouter } from 'vue-router';

const props = defineProps({ userId: String });
const router = useRouter();

const recipesOwned = ref([]);
const snackbar = ref({
  show: false,
  message: '',
  color: 'green-darken-4'
});

const fetchRecipes = async () => {
  try {
    recipesOwned.value = await getUserRecipes(props.userId);
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

const del = async (recipeId) => {
  try {
    await deleteRecipe(recipeId);
    snackbar.value.message = 'Recipe deleted successfully!';
    snackbar.value.color = 'green-darken-4';
    snackbar.value.show = true;
    await fetchRecipes();
  } catch (error) {
    snackbar.value.message = error.response?.data?.error || error.message;
    snackbar.value.color = 'red-darken-4';
    snackbar.value.show = true;
  }
};
</script>

<template>
  <div>
    <v-card v-for="recipe in recipesOwned" :key="recipe._id">
      <v-card-title>{{ recipe.title }}</v-card-title>
      <v-card-subtitle>Type: {{ recipe.type }}</v-card-subtitle>
      <v-card-actions>
        <v-btn color="green-darken-4" @click="() => router.push({ name: 'edit-recipe', params: { id: recipe._id } })">Edit</v-btn>
        <v-btn color="red-darken-4" @click="() => del(recipe._id)">Delete</v-btn>
      </v-card-actions>
    </v-card>
    <v-snackbar v-model="snackbar.show" :color="snackbar.color">
      {{ snackbar.message }}
    </v-snackbar>
  </div>
</template> -->

<style scoped>
.v-btn {
  margin-right: 0.5rem;
}
</style>