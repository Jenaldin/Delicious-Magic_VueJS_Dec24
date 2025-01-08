<script setup>
import { ref, computed, onMounted } from 'vue'
import { getUser } from '../api/authUserApi'
import { deleteRecipe } from '../api/recipeApi'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const props = defineProps({
  userId: {
    type: String,
    required: true,
  },
})

const router = useRouter()
const auth = useAuthStore()
const isOwner = computed(() => auth.userId === props.userId)

const recipesOwned = ref([])
const snackbar = ref({
  show: false,
  message: '',
  color: 'green-darken-4',
})

const fetchRecipesFromUser = async () => {
  try {
    const user = await getUser(props.userId)
    recipesOwned.value = user.recipesOwned.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    )
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
})

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
        ><v-col style="flex-grow: 1">
          <v-img
            :src="recipe.image ? recipe.image : '/img-placeholder.png'"
            alt="Recipe Image"
            max-height="65"
            max-width="65"
          ></v-img
        ></v-col>
        <v-col style="flex-grow: 7"
          ><v-card-title
            ><h5 class="title-ellipsis">{{ recipe.title }}</h5></v-card-title
          ></v-col
        >
        <v-col style="flex-grow: 1"
          ><v-card-subtitle>Type: {{ recipe.type }}</v-card-subtitle></v-col
        >
        
          <v-col style="flex-grow: 3">
            <v-card-actions>
              <v-btn
                size="small"
                color="amber-darken-1"
                variant="tonal"
                @click="() => router.push({ name: 'view-recipe', params: { id: recipe._id } })"
                >View</v-btn
              >
              <div v-if="isOwner">
              <v-btn
                size="small"
                color="green-darken-4"
                variant="tonal"
                @click="() => router.push({ name: 'edit-recipe', params: { id: recipe._id } })"
                >Edit</v-btn
              >
              <v-btn
                size="small"
                color="red-darken-4"
                variant="tonal"
                @click="() => del(recipe._id)"
                >Delete</v-btn
              ></div>
            </v-card-actions></v-col
          >
        
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

.title-ellipsis { 
   width: 30ch;
   white-space: normal; 
}
.v-btn {
  margin-right: 0.05rem;
}
</style>
