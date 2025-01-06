<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import NewRecipe from '../components/NewRecipe.vue';
import EditRecipe from '../components/EditRecipe.vue';
import ViewRecipe from '../components/ViewRecipe.vue';

const route = useRoute();

const isNew = computed(() => route.name === 'add-recipe');
const isEdit = computed(() => route.name === 'edit-recipe');
const isView = computed(() => route.name === 'view-recipe');
</script>

<template>
  <div class="centered-content">
    <h1>Recipe Scroll</h1>
    <template v-if="isNew">
      <NewRecipe />
    </template>
    <template v-if="isEdit">
      <EditRecipe />
    </template>
    <template v-if="isView">
      <ViewRecipe />
    </template>
  </div>
</template>
