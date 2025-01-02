<script setup>
</script>

<template>
   <v-toolbar>
      <v-img src="magic_large.png"></v-img>
      <v-toolbar-title>Delicious Magic</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="amber-darken-1" text to="/">Home</v-btn>
      <v-btn color="amber-darken-1" text to="/*">All Recipes</v-btn>
      <v-btn color="amber-darken-1" text to="/*">My Cookbook</v-btn>
      <v-btn color="amber-darken-1" text to="/*">Register</v-btn>
      <v-btn color="amber-darken-1" text to="/*">Login</v-btn>
      <v-btn color="amber-darken-1" text to="/*">Logout</v-btn>
      <v-btn color="amber-darken-1" text to="/about">About</v-btn>
   </v-toolbar>
</template>

<style scoped>
.v-toolbar {
   padding: 0;
   background-color: #FAFAFA;
}

.v-toolbar-title {
   padding: 1rem;
}

.v-btn {
   margin: 0;
}
</style>
