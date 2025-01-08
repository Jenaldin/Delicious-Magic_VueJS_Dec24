<script setup>
import { ref, computed, onMounted } from 'vue';
import { getUser } from '../api/authUserApi';
import { deleteRecipe } from '../api/recipeApi';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore';

const props = defineProps({
  userId: {
    type: String,
    required: true,
  },
});

const router = useRouter();
const auth = useAuthStore();
const isOwner = computed(() => auth.userId === props.userId);

const recipesOwned = ref([])
const snackbar = ref({
  show: false,
  message: '',
  color: 'green-darken-4',
})

const fetchRecipesFromUser = async () => {
  try {
    const user = await getUser(props.userId)
    recipesOwned.value = user.recipesOwned
  } catch (error) {
    snackbar.value = {
      show: true,
      message: error.response?.data?.error || error.message,
      color: 'red-darken-4',
    }
  }
}

onMounted(() => {
  fetchRecipesFromUser()
});

const del = async (recipeId) => {
  try {
    await deleteRecipe(recipeId)
    snackbar.value.message = 'Recipe deleted successfully!'
    snackbar.value.color = 'green-darken-4'
    snackbar.value.show = true
    await fetchRecipesFromUser()
  } catch (error) {
    snackbar.value.message = error.response?.data?.error || error.message
    snackbar.value.color = 'red-darken-4'
    snackbar.value.show = true
  }
}
</script>

<template>
  <div>
    <v-card v-for="recipe in recipesOwned" :key="recipe._id">
      <v-row
        ><v-col>
          <v-img
            :src="recipe.image ? recipe.image : '/img-placeholder.png'"
            alt="Recipe Image"
            max-height="65"
            max-width="65"
          ></v-img
        ></v-col>
        <v-col
          ><v-card-title>{{ recipe.title }}</v-card-title></v-col
        >
        <v-col
          ><v-card-subtitle>Type: {{ recipe.type }}</v-card-subtitle></v-col
        >
        <div v-if="isOwner">
        <v-col>
          <v-card-actions>
            <v-btn
              color="green-darken-4" 
              variant="tonal"
              @click="() => router.push({ name: 'edit-recipe', params: { id: recipe._id } })"
              >Edit</v-btn
            >
            <v-btn color="red-darken-4" variant="tonal" @click="() => del(recipe._id)">Delete</v-btn>
          </v-card-actions></v-col
        ></div>
      </v-row>
    </v-card>
    <v-snackbar v-model="snackbar.show" :color="snackbar.color">
      {{ snackbar.message }}
    </v-snackbar>
  </div>
</template>

<style scoped>
.v-card {
   margin-bottom: 0.5rem;
}
.v-btn {
  margin-right: 0.5rem;
}
</style>
