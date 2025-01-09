<script setup>
import { ref, computed, onMounted } from "vue";
import { getUser } from "../api/authUserApi";
import { deleteRecipe } from "../api/recipeApi";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/authStore";
import { useLoadingStore } from "../stores/loadingStore";
import Loader from "../components/Loader.vue";

const props = defineProps({
  userId: {
    type: String,
    required: true,
  },
});

const router = useRouter();
const auth = useAuthStore();
const loadingStore = useLoadingStore();
const isOwner = computed(() => auth.userId === props.userId);

const recipesOwned = ref([]);
const snackbar = ref({
  show: false,
  message: "",
  color: "green-darken-4",
});

const fetchRecipesFromUser = async () => {
  try {
    loadingStore.setLoading(true);
    const user = await getUser(props.userId);
    recipesOwned.value = user.recipesOwned.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );
  } catch (error) {
    console.error("An error occurred:", error);
    snackbar.value = {
      show: true,
      message: error.response?.data?.error || error.message,
      color: "red-darken-4",
    };
  } finally {
    loadingStore.setLoading(false);
  }
};

onMounted(() => {
  fetchRecipesFromUser();
});

const del = async (recipeId) => {
  try {
    await deleteRecipe(recipeId);
    snackbar.value.message = "Recipe deleted successfully!";
    snackbar.value.color = "green-darken-4";
    snackbar.value.show = true;
    await fetchRecipesFromUser();
  } catch (error) {
    console.error("An error occurred:", error);
    snackbar.value.message = error.response?.data?.error || error.message;
    snackbar.value.color = "red-darken-4";
    snackbar.value.show = true;
  }
};
</script>

<template>
  <Loader />
  <div>
    <v-card v-for="recipe in recipesOwned" :key="recipe._id" class="pa-3">
      <v-row class="align-center">
        <v-col cols="auto" class="d-flex align-center">
          <v-img
            :src="recipe.image ? recipe.image : '/recipe-img.png'"
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
        <v-card-actions>
          <v-btn
            color="amber-darken-2"
            variant="tonal"
            @click="
              () =>
                router.push({ name: 'view-recipe', params: { id: recipe._id } })
            "
            >View</v-btn
          >

          <v-btn
            v-if="isOwner"
            color="green-darken-4"
            variant="tonal"
            @click="
              () =>
                router.push({ name: 'edit-recipe', params: { id: recipe._id } })
            "
            >Edit</v-btn
          >

          <v-btn
            v-if="isOwner"
            color="red-darken-4"
            variant="tonal"
            @click="() => del(recipe._id)"
            >Delete</v-btn
          >
        </v-card-actions>
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
</style>
