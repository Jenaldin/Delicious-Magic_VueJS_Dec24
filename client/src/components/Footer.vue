<script setup>
import { computed } from 'vue';

const currentYear = computed(() => new Date().getFullYear());
</script>

<template>
  <v-footer>
    <v-col class="text-center">
      © {{ currentYear }} Delicious Magic, SoftUni VueJS Exam Project
    </v-col>
  </v-footer>
</template>

<style scoped>
</style>