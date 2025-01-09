<script setup>
import { computed } from "vue";
import { useAuthStore } from "../stores/authStore";

const authStore = useAuthStore();
const isAuthenticated = computed(() => authStore.isAuthenticated);
const username = computed(() => authStore.username);
</script>

<template>
  <main class="widthMax">
    <div class="centered-content">
      <template v-if="isAuthenticated">
        <h1>Hello, Chef {{ username }}!</h1>
        <h2>Welcome back to the Delicious Magic!</h2>
      </template>
      <template v-else>
        <h1>Hello, Chef!</h1>
        <h2>Welcome to the Delicious Magic!</h2>
      </template>
    </div>
    <div class="main-info">
      <h3>Here is a little bit of information what can you find here:</h3>
      <ul>
        <li>
          <h4>Recipes for food</h4>
          <p>Find what to cook next for yourself or for your loved ones</p>
        </li>
        <li>
          <h4>Recipes for drinks</h4>
          <p>Fancy a drink? We have some of those too</p>
        </li>
        <li>
          <h4>Your Cookbook</h4>
          <p>
            If you become part of our community, add recipes and build your
            Cookbook
          </p>
        </li>
      </ul>
    </div>
    <div class="centered-content">
      <h3>
        If you wish to know more about Delicious Magic, check out the
        <router-link to="/about">About page</router-link>
      </h3>
      <h4>Happy cooking, mixing and delicious magic!</h4>
    </div>
  </main>
</template>

<style scoped>
.widthMax {
  max-width: 1200px;
}
.main-info {
  margin: 3rem;
}
ul {
  padding: 1.5rem;
}
</style>
