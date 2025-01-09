<script setup>
import { computed } from 'vue';
import { useLoadingStore } from '../stores/loadingStore';

const isLoading = computed(() => useLoadingStore().isLoading);
</script>

<template>
  <div v-if="isLoading" class="loader-container">
    <v-overlay
      :model-value="isLoading"
      class="align-center justify-center"
    >
   <v-progress-circular
      :size="85"
      :width="7"
      color="teal-darken-3"
      indeterminate
    ></v-progress-circular></v-overlay>
  </div>
</template>

<style scoped>
.loader-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
</style>





<!-- <script setup>
import { computed } from 'vue';
import { useLoadingStore } from '../stores/loadingStore'

const isLoading = computed(() => useLoadingStore().isLoading)
</script>

<template>
  <v-overlay v-if="isLoading">
    <v-progress-circular
      :size="75"
      :width="7"
      color="teal-darken-3"
      indeterminate
    ></v-progress-circular>
  </v-overlay>
</template>

<style scoped>
.v-overlay {
  background-color: rgba(66, 66, 66, 0.8);
}
</style> -->
