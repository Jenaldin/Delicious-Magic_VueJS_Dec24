<script setup>
   import { useAuthStore } from '@/stores/auth'

   const authStore = useAuthStore()
</script>

<template>
   <v-toolbar>
      <v-img src="magic_large.png"></v-img>
      <v-toolbar-title>Delicious Magic</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="amber-darken-1" text to="/">Home</v-btn>
      <v-btn color="amber-darken-1" text to="/*">All Recipes</v-btn>
      <template v-if="!authStore.isAuthenticated">
         <v-btn color="amber-darken-1" text to="/register-login">Login or Register</v-btn>
      </template>
      <template v-else>
         <v-btn color="amber-darken-1" text to="/*">My Cookbook</v-btn>
         <v-btn color="amber-darken-1" text @click="authStore.logout">Logout</v-btn>
      </template>
      <v-btn color="amber-darken-1" text to="/about">About</v-btn>
   </v-toolbar>
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
