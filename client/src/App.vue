<script setup>
import Navigation from './components/Navigation.vue';
import Footer from './components/Footer.vue';
</script>

<template>
  <v-app>
    <v-app-bar app>
      <Navigation />
    </v-app-bar>
    
    <v-main>
      <router-view />
    </v-main>

    <v-footer app>
      <Footer></Footer>
    </v-footer>
  </v-app>
</template>

<style scoped>
main {
  padding: 16px;
}

footer {
  background-color: #f8f8f8;
  text-align: center;
  padding: 16px;
  border-top: 1px solid #e7e7e7;
}
</style>