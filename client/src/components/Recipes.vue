<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRecipeStore } from '@/stores/recipe';
import { useRouter } from 'vue-router';
import { getAllRecipes } from '@/api/recipes';
import { formatDate } from '@/utils/formatDates';

const recipeStore = useRecipeStore();
const router = useRouter();

const foodPage = ref(1);
const drinkPage = ref(1);
const pageSize = 6;

const snackbar = ref({
  show: false,
  message: '',
  color: 'red-darken-4'
});

const fetchRecipes = async (type, page) => {
  try {
    const data = await getAllRecipes(type, page, pageSize);
    if (type === 'food') {
      recipeStore.foodRecipes = data.recipes;
      recipeStore.foodTotal = data.total;
    } else {
      recipeStore.drinkRecipes = data.recipes;
      recipeStore.drinkTotal = data.total;
    }
  } catch (error) {
    snackbar.value = {
      show: true,
      message: 'Error fetching recipes: ' + error.message,
      color: 'red-darken-4'
    };
  }
};

onMounted(() => {
  fetchRecipes('food', foodPage.value);
  fetchRecipes('drink', drinkPage.value);
});
watch(foodPage, (newPage) => {
  fetchRecipes('food', newPage);
});
watch(drinkPage, (newPage) => {
  fetchRecipes('drink', newPage);
});

const foodRecipes = computed(() => recipeStore.foodRecipes);
const drinkRecipes = computed(() => recipeStore.drinkRecipes);
</script>

<template>
  <div class="recipes-all">
    <v-row>
      <v-col>
        <h3>Served at the table</h3>
        <v-row>
          <template v-if="foodRecipes.length">
            <v-col v-for="recipe in foodRecipes" :key="recipe._id" cols="12" sm="6" md="4">
              <v-card>
                <v-card-item>
                  <v-img :src="recipe.image" alt="Recipe Image" width="65" height="65"></v-img>
                </v-card-item>
                <v-card-title>{{ recipe.title }}</v-card-title>
                <v-card-subtitle>Time to make: {{ recipe.prepTime }} mins</v-card-subtitle>
                <v-card-subtitle>Added on {{ formatDate(recipe.createdAt) }} by {{ recipe.owner.username }}</v-card-subtitle>
                <v-card-actions>
                  <v-btn color="amber-darken-1" variant="tonal" @click="() => router.push({ name: 'ViewRecipe', params: { id: recipe._id } })">
                    View Recipe Scroll
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </template>
          <template v-else>
            <h4>No food scrolls yet</h4>
          </template>
        </v-row>
        <v-pagination
          v-model="foodPage"
          :length="Math.ceil(recipeStore.foodTotal / pageSize)"
          color="teal-darken-3"
          class="pagin"
        />
      </v-col>
      <v-divider :thickness="2" color="teal-darken-3" vertical class="div-space"></v-divider>
      <v-col>
        <h3>Served at the bar</h3>
        <v-row>
          <template v-if="drinkRecipes.length">
            <v-col v-for="recipe in drinkRecipes" :key="recipe._id" cols="12" sm="6" md="4">
              <v-card>
                <v-card-item>
                  <v-img :src="recipe.image" alt="Recipe Image" width="65" height="65"></v-img>
                </v-card-item>
                <v-card-title>{{ recipe.title }}</v-card-title>
                <v-card-subtitle>Time to make: {{ recipe.prepTime }} mins</v-card-subtitle>
                <v-card-subtitle>Added on {{ formatDate(recipe.createdAt) }} by {{ recipe.owner.username }}</v-card-subtitle>
                <v-card-actions>
                  <v-btn color="amber-darken-1" variant="tonal" @click="() => router.push({ name: 'ViewRecipe', params: { id: recipe._id } })">
                    View Recipe
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </template>
          <template v-else>
            <h4>No drink scrolls yet</h4>
          </template>
        </v-row>
        <v-pagination
          v-model="drinkPage"
          :length="Math.ceil(recipeStore.drinkTotal / pageSize)"
          color="teal-darken-3"
          class="pagin"
        />
      </v-col>
    </v-row>

    <v-snackbar v-model="snackbar.show" :color="snackbar.color" top>
      {{ snackbar.message }}
    </v-snackbar>
  </div>
</template>

<style scoped>
h2, h3, h4 {
  text-align: center;
  margin-bottom: 1.5rem;
}

.v-card-item {
  display: flex;
  align-items: center;
  justify-content: center;
}

.v-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.div-space { 
   margin-top: 1.5rem; 
}

.pagin {
  padding-top: 0.3rem;
}
</style>