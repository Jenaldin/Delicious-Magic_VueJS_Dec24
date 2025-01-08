<script setup>
import { computed } from 'vue';
import { useAuthStore } from '../stores/authStore';

const authStore = useAuthStore();
const isAuthenticated = computed(() => authStore.isAuthenticated);
const snackbar = computed(() => authStore.snackbar);
</script>

<template>
  <v-toolbar>
    <v-img src="magic_large.png"></v-img>
    <v-toolbar-title>Delicious Magic</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn color="amber-darken-1" text to="/">Home</v-btn>
    <v-btn color="amber-darken-1" text to="/about">About</v-btn>
    <v-btn color="amber-darken-1" text to="/catalog">All Recipes</v-btn>
    <template v-if="!isAuthenticated">
      <v-btn color="amber-darken-1" text to="/entry-point">Login or Register</v-btn>
    </template>
    <template v-else>
      <v-btn color="amber-darken-1" text to="/add-recipe">Add Recipe</v-btn>
      <v-btn color="amber-darken-1" text to="/user">My Cookbook & Profile</v-btn>
      <v-btn color="amber-darken-1" text @click="authStore.logout">Logout</v-btn>
    </template>
  </v-toolbar>

  <v-snackbar v-model="snackbar.show" :color="snackbar.color" top>
    {{ snackbar.message }}
  </v-snackbar>
</template>

<style scoped>
.v-toolbar {
  padding: 0;
  background-color: #fafafa;
}

.v-toolbar-title {
  padding: 1rem;
}

.v-btn {
  margin: 0;
}
</style>