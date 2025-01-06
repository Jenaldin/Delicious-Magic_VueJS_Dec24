<script setup>
import { ref, computed } from 'vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';

const tab = ref('login');

const tabs = computed(() => [
  { value: 'login', label: 'Login' },
  { value: 'register', label: 'Register' }
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
              <v-tabs-window-item value="login">
                <Login />
              </v-tabs-window-item>
              <v-tabs-window-item value="register">
                <Register />
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
