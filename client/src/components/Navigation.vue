<script setup>
import { computed } from "vue";
import { useAuthStore } from "../stores/authStore";

const authStore = useAuthStore();
const isAuthenticated = computed(() => authStore.isAuthenticated);
const snackbar = computed(() => authStore.snackbar);
</script>

<template>
  <v-toolbar>
    <v-row>
      <v-col>
        <v-img src="/fav-large.png" class="nav-img"></v-img>
      </v-col>
    </v-row>
    <v-toolbar-title>Delicious Magic</v-toolbar-title>
    <v-btn color="amber-darken-2" text to="/">Home</v-btn>
    <v-btn color="amber-darken-2" text to="/about">About</v-btn>
    <v-btn color="amber-darken-2" text to="/catalog">All Recipes</v-btn>
    <template v-if="!isAuthenticated">
      <v-btn color="amber-darken-2" text to="/entry-point"
        >Login/Register</v-btn
      >
    </template>
    <template v-else>
      <v-btn color="amber-darken-2" text to="/add-recipe">Add Recipe</v-btn>
      <v-btn color="amber-darken-2" text to="/user"
        >My Cookbook & Profile</v-btn
      >
      <v-btn color="amber-darken-2" text @click="authStore.logout"
        >Logout</v-btn
      >
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

.nav-img {
  max-width: 65px;
  max-height: 65px;
  width: auto;
  height: auto;
}

.v-toolbar-title {
  margin: auto;
  font-style: italic;
  font-weight: bold;
  font-size: 26px;
}

.v-btn {
  margin: 0;
}
</style>
