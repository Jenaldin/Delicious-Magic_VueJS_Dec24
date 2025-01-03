<script setup>
import { ref, computed } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, minLength, maxLength, email, sameAs, url } from '@vuelidate/validators';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import { register } from '@/api/authUser';

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
const router = useRouter();

const snackbar = ref({
  show: false,
  message: '',
  color: 'success'
});

const registerUser = async () => {
  v$.value.$touch();

  if (v$.value.$invalid) {
    snackbar.value = {
      show: true,
      message: 'Please fill in all fields correctly.',
      color: 'error'
    };
    return;
  }

  try {
    const data = await register(form.value);
    const { token, username, id } = data;

    document.cookie = `auth=${token}; path=/`;
    authStore.login({ username, id });

    snackbar.value = {
      show: true,
      message: 'Registration successful!',
      color: 'success'
    };

    setTimeout(() => {
      router.push('/');
    }, 1000);
  } catch (error) {
    snackbar.value = {
      show: true,
      message: error.response.data.error || 'Registration failed. Please try again.',
      color: 'error'
    };
  }
};
</script>

<template>
  <v-form @submit.prevent="registerUser">
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

  <v-snackbar v-model="snackbar.show" :color="snackbar.color" top>
    {{ snackbar.message }}
  </v-snackbar>
</template>

<style scoped>
</style>