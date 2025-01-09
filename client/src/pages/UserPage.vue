<script setup>
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import OwnedRecipes from "../components/OwnedRecipes.vue";
import FavoriteRecipes from "../components/FavoriteRecipes.vue";
import Profile from "../components/Profile.vue";
import { useAuthStore } from "../stores/authStore";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const userId = computed(() => route.params.userId || authStore.userId);

const tab = ref(route.query.tab || "profile");

const tabs = computed(() => [
  { value: "profile", label: "Profile" },
  { value: "owned", label: "My Recipes" },
  { value: "favorites", label: "My Favorites" },
]);

watch(tab, (newTab) => {
  router.push({ path: route.path, query: { ...route.query, tab: newTab } });
});
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="4" md="6">
        <v-card>
          <v-tabs v-model="tab" background-color="#80CBC4">
            <v-tab
              v-for="tabOption in tabs"
              :key="tabOption.value"
              :value="tabOption.value"
            >
              {{ tabOption.label }}
            </v-tab>
          </v-tabs>

          <v-card-text>
            <v-tabs-window v-model="tab">
              <v-tabs-window-item value="profile">
                <Profile :userId="userId" />
              </v-tabs-window-item>
              <v-tabs-window-item value="owned">
                <OwnedRecipes :userId="userId" />
              </v-tabs-window-item>
              <v-tabs-window-item value="favorites">
                <FavoriteRecipes :userId="userId" />
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
  background-color: #ffc107;
}
</style>
