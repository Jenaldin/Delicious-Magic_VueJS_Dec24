<script>
export default {
   name: 'Footer',
};
</script>

<template>
   <v-footer>
      <v-col class="text-center">
         © {{ new Date().getFullYear() }} Delicious Magic Recipes, Jenny Guteva, SoftUni VueJS Exam Project
      </v-col>
   </v-footer>
</template>