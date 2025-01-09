<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import { getRecipe, rateRecipe, deleteRecipe } from '../api/recipeApi'
import { addFavorite } from '../api/authUserApi'
import { formatDate } from '../utils/formatDates'
import CommentPage from '../pages/CommentPage.vue'
import { useLoadingStore } from '../stores/loadingStore'
import Loader from '../components/Loader.vue'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const loadingStore = useLoadingStore()

const recipeId = route.params.id
const recipe = ref(null)
const isOwner = computed(() => auth.userId === recipe.value?.owner._id)
const isLoggedIn = computed(() => auth.isAuthenticated)
const drawer = ref(route.query.comments === 'true' )

const snackbar = ref({
  show: false,
  message: '',
  color: 'green-darken-4',
})

const fetchRecipe = async (id) => {
  try {
    loadingStore.setLoading(true)
    recipe.value = await getRecipe(id)
  } catch (error) {
    snackbar.value.message = error.response?.data?.error || error.message
    snackbar.value.color = 'red-darken-4'
    snackbar.value.show = true
  } finally {
    loadingStore.setLoading(false)
  }
}

onMounted(() => {
  fetchRecipe(recipeId)
})

watch(drawer, (newDrawerState) => { 
  router.push({ path: route.path, query: { ...route.query, comments: newDrawerState } });
});

const rate = async (rating) => {
  try {
    await rateRecipe(recipeId, auth.userId, rating)
    await fetchRecipe(recipeId)
    snackbar.value.message = 'Recipe rated successfully!'
    snackbar.value.color = 'green-darken-4'
    snackbar.value.show = true
  } catch (error) {
    snackbar.value.message = error.response?.data?.error || error.message
    snackbar.value.color = 'red-darken-4'
    snackbar.value.show = true
  }
}

const toFavorite = async () => {
  try {
    await addFavorite(auth.userId, recipeId)
    snackbar.value.message = 'Recipe added to favorites successfully!'
    snackbar.value.color = 'green-darken-4'
    snackbar.value.show = true
  } catch (error) {
    snackbar.value.message = error.response?.data?.error || error.message
    snackbar.value.color = 'red-darken-4'
    snackbar.value.show = true
  }
}

const del = async () => {
  try {
    await deleteRecipe(recipeId)
    snackbar.value.message = 'Recipe deleted successfully!'
    snackbar.value.color = 'green-darken-4'
    snackbar.value.show = true
    setTimeout(() => {
      router.push('/catalog')
    }, 1000)
  } catch (error) {
    snackbar.value.message = error.response?.data?.error || error.message
    snackbar.value.color = 'red-darken-4'
    snackbar.value.show = true
  }
}
</script>

<template>
  <Loader />
  <div v-if="recipe">
  <v-card class="recipe-card">
    <v-card-title>
      <h2>{{ recipe.title }}</h2>
    </v-card-title>
    <v-card-title
      >Added by
      <router-link :to="{ name: 'user-id', params: { userId: recipe.owner._id } }">
        {{ recipe.owner.username }}
      </router-link>
      on {{ formatDate(recipe.createdAt) }}</v-card-title
    >
    <v-card-subtitle>
      <h4>Time to prepare: {{ recipe.prepTime }}</h4>
    </v-card-subtitle>
    <v-card-subtitle>
      <h4>Portions: {{ recipe.portions }}</h4>
    </v-card-subtitle>
    <v-card-actions>
      <div class="btns">
        <div v-if="isLoggedIn && !isOwner">
          <v-row>
            <v-col>
              <v-btn color="amber-darken-1" variant="tonal" @click="toFavorite"
                >Add to Favorites</v-btn
              >
            </v-col>
            <v-col>
              <v-rating
                half-increments
                hover
                :length="5"
                :size="32"
                active-color="teal-darken-3"
                @update:modelValue="rate"
                :modelValue="recipe.averageRating"
              />
            </v-col>
          </v-row>
        </div>
        <div v-if="isOwner">
          <v-row>
            <v-col>
              <v-btn
                color="green-darken-4"
                variant="tonal"
                @click="() => router.push({ name: 'edit-recipe', params: { id: recipeId } })"
                >Edit</v-btn
              >
            </v-col>
            <v-col>
              <v-btn color="red-darken-4" variant="tonal" @click="del">Delete</v-btn>
            </v-col>
          </v-row>
        </div>
      </div>
    </v-card-actions>
    <img
      :src="recipe.image ? recipe.image : '/img-placeholder.png'"
      alt="Recipe Image"
      class="rec-img"
    />
    <v-card-text>
      <v-row>
        <v-col style="flex-grow: 3">
          <h2>Ingredients</h2>
          <ul>
            <li v-for="ingredient in recipe.ingredients" :key="ingredient">{{ ingredient }}</li>
          </ul>
        </v-col>
        <v-divider :thickness="2" color="teal-darken-3" vertical class="div-space"></v-divider>
        <v-col style="flex-grow: 7">
          <h2>Steps</h2>
          <ol>
            <li v-for="step in recipe.steps" :key="step">{{ step }}</li>
          </ol>
        </v-col>
      </v-row>
    </v-card-text>
    <div v-if="isLoggedIn" class="comms">
      <v-btn color="amber-darken-1" variant="tonal" @click="drawer = !drawer">
        {{ drawer ? 'Hide Comments' : 'Show Comments' }}
      </v-btn>
      <v-navigation-drawer v-model="drawer" location="right" permanent width="450">
        <CommentPage />
      </v-navigation-drawer>
    </div>
  </v-card>
  <v-snackbar v-model="snackbar.show" :color="snackbar.color">
    {{ snackbar.message }}
  </v-snackbar>
</div>
</template>

<style scoped>
ul,
ol {
  text-align: left;
  margin: 1.5rem;
}

li {
  margin-bottom: 0.3rem;
}

.recipe-card {
  width: 900px;
}

.v-btn {
  margin-right: 0.5rem;
}

.div-space {
  margin-top: 1.5rem;
}

.btns {
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.rec-img {
  max-width: 350px;
  max-height: 350px;
  width: auto;
  height: auto;
}

.comms {
  margin: 0.5rem;
}
</style>
