<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import OwnedRecipes from '../components/OwnedRecipes.vue';
import FavoriteRecipes from '../components/FavoriteRecipes.vue';
import Profile from '../components/Profile.vue';

const route = useRoute();
const router = useRouter();

const tab = ref('owned');

const tabs = computed(() => [
  { value: 'owned', label: 'Owned Recipes' },
  { value: 'favorites', label: 'Favorite Recipes' },
  { value: 'profile', label: 'Profile' }
]);
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card>
          <v-tabs v-model="tab" background-color="#80CBC4">
            <v-tab v-for="tabOption in tabs" :key="tabOption.value" :value="tabOption.value">
              {{ tabOption.label }}
            </v-tab>
          </v-tabs>

          <v-card-text>
            <v-tabs-window v-model="tab">
              <v-tabs-window-item value="owned">
                <!-- <OwnedRecipes :userId="route.params.userId || auth.userId" /> -->
                 <OwnedRecipes />
              </v-tabs-window-item>
              <v-tabs-window-item value="favorites">
                <!-- <FavoriteRecipes :userId="route.params.userId || auth.userId" /> -->
                 <FavoriteRecipes />
              </v-tabs-window-item>
              <v-tabs-window-item value="profile">
                <!-- <Profile :userId="route.params.userId || auth.userId" /> -->
                 <Profile />
              </v-tabs-window-item>
            </v-tabs-window>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.v-tabs {
  background-color: #FFC107;
}
</style>
