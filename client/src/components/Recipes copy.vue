<script setup>
import { ref, onMounted, computed, watch, nextTick } from 'vue';
import { useRecipeStore } from '@/stores/recipe';
import { useRouter } from 'vue-router';
import { getAllRecipes } from '@/api/recipes';

const recipeStore = useRecipeStore();
const router = useRouter();

const currentPage = ref(1);
const pageSize = 10

const fetchRecipes = async (page) => {
  console.log(`Fetching recipes for page: ${page}`);
  try {
    const data = await getAllRecipes(page, pageSize);
    recipeStore.setRecipes(data.recipes);
    recipeStore.setTotal(data.total);
    console.log('Fetched recipes:', data.recipes);
    await nextTick();
    console.log('Recipes in store after nextTick:', recipeStore.recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error.message);
  }
};

onMounted(() => fetchRecipes(currentPage.value));
watch(currentPage, async (newPage) => {
  console.log(`Page changed to: ${newPage}`);
  await fetchRecipes(newPage);
});

watch(() => recipeStore.recipes, (newRecipes) => {
  console.log('Recipes in store updated:', newRecipes);
}, { deep: true });

const foodRecipes = computed(() => {
  const filtered = recipeStore.recipes.filter(recipe => recipe.type === 'food');
  console.log('Food Recipes:', filtered);
  return filtered;
});

const drinkRecipes = computed(() => {
  const filtered = recipeStore.recipes.filter(recipe => recipe.type === 'drink');
  console.log('Drink Recipes:', filtered);
  return filtered;
});
</script>

<template>
  <div>
    <v-row>
      <v-col>
        <h3>Served at the table</h3>
        <v-row>
          <v-col v-for="recipe in foodRecipes" :key="recipe._id" cols="12" sm="6" md="4">
            <v-card>
              <v-card-item>
                <v-img :src="recipe.image" alt="Recipe Image" width="75" height="75"></v-img>
              </v-card-item>
              <v-card-title>{{ recipe.title }}</v-card-title>
              <v-card-subtitle>Prep Time: {{ recipe.prepTime }} mins</v-card-subtitle>
              <v-card-actions>
                <v-btn color="amber-darken-1" variant="tonal" @click="() => router.push({ name: 'ViewRecipe', params: { id: recipe._id } })">
                  View Recipe
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>

      <v-col>
        <h3>Served at the bar</h3>
        <v-row>
          <v-col v-for="recipe in drinkRecipes" :key="recipe._id" cols="12" sm="6" md="4">
            <v-card>
              <v-card-item>
                <v-img :src="recipe.image" alt="Recipe Image" width="75" height="75"></v-img>
              </v-card-item>
              <v-card-title>{{ recipe.title }}</v-card-title>
              <v-card-subtitle>Prep Time: {{ recipe.prepTime }} mins</v-card-subtitle>
              <v-card-actions>
                <v-btn color="amber-darken-1" variant="tonal" @click="() => router.push({ name: 'ViewRecipe', params: { id: recipe._id } })">
                  View Recipe
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <div class="pagination">
      <v-pagination
        v-model="currentPage"
        :length="Math.ceil(recipeStore.total / pageSize)"
      />
    </div>
  </div>
</template>

<style scoped>
h2, h3 {
  text-align: center;
  margin-bottom: 1.5rem;
}
.v-card-item {
  display: flex;
  align-items: center;
  justify-content: center;
}

.pagination {
   padding: 1.5rem;
}
</style>