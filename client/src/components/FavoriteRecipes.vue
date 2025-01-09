<script setup>
import { ref, onMounted } from 'vue'
import { getUser } from '../api/authUserApi'
import { useRouter } from 'vue-router'
import { useLoadingStore } from '../stores/loadingStore'
import Loader from '../components/Loader.vue'

const loadingStore = useLoadingStore()

const props = defineProps({
  userId: {
    type: String,
    required: true,
  },
})
const router = useRouter()
const recipesFav = ref([])
const snackbar = ref({
  show: false,
  message: '',
  color: 'green-darken-4',
})

const fetchRecipesFromUser = async () => {
  try {
    loadingStore.setLoading(true)
    const user = await getUser(props.userId)
    recipesFav.value = user.favorites.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  } catch (error) {
    snackbar.value = {
      show: true,
      message: error.response?.data?.error || error.message,
      color: 'red-darken-4',
    }
  } finally {
    loadingStore.setLoading(false)
  }
}

onMounted(() => {
  fetchRecipesFromUser()
})
</script>

<template>
  <Loader />
   <div>
     <v-card v-for="recipe in recipesFav" :key="recipe._id" class="pa-3">
       <v-row class="align-center">
         <v-col cols="auto" class="d-flex align-center">
           <v-img
             :src="recipe.image ? recipe.image : '/img-placeholder.png'"
             alt="Recipe Image"
             height="65"
             width="65"
           ></v-img>
         </v-col>
         <v-col cols="auto" class="d-flex align-center">
           <v-card-title>
             <h5 class="title-ellipsis">{{ recipe.title }}</h5>
           </v-card-title>
         </v-col>
         <v-col cols="auto" class="d-flex align-center">
           <v-card-subtitle>
             <h4>Type: {{ recipe.type }}</h4>
           </v-card-subtitle>
         </v-col>
         <v-col cols="auto" class="d-flex align-center">
           <v-card-actions>
             <v-btn
               color="amber-darken-1"
               variant="tonal"
               @click="() => router.push({ name: 'view-recipe', params: { id: recipe._id } })"
             >View</v-btn>
           </v-card-actions>
         </v-col>
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
