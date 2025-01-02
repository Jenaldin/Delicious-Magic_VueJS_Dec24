<script setup>
import { ref, computed } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, minLength, maxLength, email, sameAs, url } from '@vuelidate/validators';
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';

const form = ref({
  username: '',
  email: '',
  password: '',
  repassword: '',
  avatar: ''
});
 
const showPassword = ref(false); 
const showRepassword = ref(false);

const passwordValue = computed(() => form.value.password);

const rules = computed(() => ({
  username: { required, minLength: minLength(3), maxLength: maxLength(10) },
  email: { required, email, minLength: minLength(5), maxLength: maxLength(15) },
  password: { required, minLength: minLength(4), maxLength: maxLength(12) },
  repassword: { required, sameAsPassword: sameAs(passwordValue) },
  avatar: { url }
}));

const v$ = useVuelidate(rules, form);

const authStore = useAuthStore();

const register = async () => {
  v$.value.$touch();

  if (v$.value.$invalid) {
    console.log('Form is invalid');
    return;
  }

  try {
  const response = await axios.post('http://localhost:3000/api/user/register', form.value);
  const { token, username, id } = response.data;

  document.cookie = `auth=${token}; path=/`;
  authStore.login({username, id});

  window.location.href = '/';
} catch (error) {
  console.error('Registration error:', error.response.data.error);
}
};
</script>

<template>
  <v-form @submit.prevent="register">
    <v-text-field
      v-model="form.username"
      :error-messages="v$.username.$errors.map(e => e.$message)"
      label="Username"
      required
    ></v-text-field>

    <v-text-field
      v-model="form.email"
      :error-messages="v$.email.$errors.map(e => e.$message)"
      label="Email"
      required
    ></v-text-field>

    <v-text-field
      v-model="form.password"
      :error-messages="v$.password.$errors.map(e => e.$message)"
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

    <v-text-field
      v-model="form.repassword"
      :error-messages="v$.repassword.$errors.map(e => e.$message)"
      :type="showRepassword ? 'text' : 'password'"
      label="Confirm Password"
      required
    >
      <template #append>
        <v-icon @click="showRepassword = !showRepassword">
          <i :class="showRepassword ? 'mdi mdi-eye-off' : 'mdi mdi-eye'"></i>
        </v-icon>
      </template>
    </v-text-field>

    <v-text-field
      v-model="form.avatar"
      :error-messages="v$.avatar.$errors.map(e => e.$message)"
      label="Avatar URL"
    ></v-text-field>

    <v-btn type="submit" color="amber-darken-1">Register</v-btn>
  </v-form>
</template>

<style scoped>
</style>