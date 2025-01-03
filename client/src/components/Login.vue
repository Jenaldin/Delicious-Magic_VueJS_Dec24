<script setup>
import { ref, computed } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import { login } from '@/api/authUser';

const form = ref({
  username: '',
  password: ''
});

const showPassword = ref(false);

const rules = {
  username: { required },
  password: { required }
};

const v$ = useVuelidate(rules, form);

const authStore = useAuthStore();
const router = useRouter();

const snackbar = ref({
  show: false,
  message: '',
  color: 'success'
});

const usernameErrors = computed(() => v$.value.username.$errors.map(e => e.$message));
const passwordErrors = computed(() => v$.value.password.$errors.map(e => e.$message));

const loginUser = async () => {
  v$.value.$touch();
  if (v$.value.$invalid) {
    snackbar.value = {
      show: true,
      message: 'Please fill in all fields.',
      color: 'error'
    };
    return;
  }

  try {
    const data = await login(form.value);
    const { token, username, id } = data;

    document.cookie = `auth=${token}; path=/`;
    authStore.login({ username, id });

    snackbar.value = {
      show: true,
      message: 'Login successful!',
      color: 'success'
    };

    setTimeout(() => {
      router.push('/');
    }, 1000);
  } catch (error) {
    snackbar.value = {
      show: true,
      message: error.response.data.error || 'Login failed. Please try again.',
      color: 'error'
    };
  }
};
</script>

<template>
  <v-form @submit.prevent="loginUser">
    <v-text-field
      v-model.trim="form.username"
      label="Username"
      :error-messages="usernameErrors"
      required
    ></v-text-field>

    <v-text-field
      v-model.trim="form.password"
      :error-messages="passwordErrors"
      :type="showPassword ? 'text' : 'password'"
      label="Password"
      required
    >
      <template #append>
        <v-icon @click="showPassword = !showPassword">
          <i :class="showPassword ? 'mdi mdi-eye-off' : 'mdi mdi-eye'"></i>
        </v-icon>
      </template>
    </v-text-field>

    <v-btn type="submit" color="amber">Login</v-btn>
  </v-form>

  <v-snackbar v-model="snackbar.show" :color="snackbar.color" top>
    {{ snackbar.message }}
  </v-snackbar>
</template>

<style scoped>
</style>