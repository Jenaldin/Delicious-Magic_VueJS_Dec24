<script setup>
import { ref, computed } from "vue";
import useVuelidate from "@vuelidate/core";
import {
  required,
  minLength,
  maxLength,
  email,
  sameAs,
  url,
} from "@vuelidate/validators";
import { useAuthStore } from "../stores/authStore";
import { useRouter } from "vue-router";
import { register } from "../api/authUserApi";

const form = ref({
  username: "",
  email: "",
  password: "",
  repassword: "",
  avatar: "",
});

const showPassword = ref(false);
const showRepassword = ref(false);

const passwordValue = computed(() => form.value.password);

const rules = computed(() => ({
  username: { required, minLength: minLength(3), maxLength: maxLength(10) },
  email: { required, email, minLength: minLength(5), maxLength: maxLength(15) },
  password: { required, minLength: minLength(4), maxLength: maxLength(12) },
  repassword: { required, sameAsPassword: sameAs(passwordValue) },
  avatar: { url },
}));

const v$ = useVuelidate(rules, form);

const authStore = useAuthStore();
const router = useRouter();

const snackbar = ref({
  show: false,
  message: "",
  color: "green-darken-4",
});

const usernameErrors = computed(() =>
  v$.value.username.$errors.map((e) => e.$message),
);
const emailErrors = computed(() =>
  v$.value.email.$errors.map((e) => e.$message),
);
const passwordErrors = computed(() =>
  v$.value.password.$errors.map((e) => e.$message),
);
const repasswordErrors = computed(() =>
  v$.value.repassword.$errors.map((e) => e.$message),
);
const avatarErrors = computed(() =>
  v$.value.avatar.$errors.map((e) => e.$message),
);

const registerUser = async () => {
  v$.value.$touch();

  if (v$.value.$invalid) {
    snackbar.value = {
      show: true,
      message: "Please fill in all fields correctly.",
      color: "red-darken-4",
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
      message: "Registration successful!",
      color: "green-darken-4",
    };

    setTimeout(() => {
      router.push("/");
    }, 1000);
  } catch (error) {
    console.error("An error occurred:", error);
    snackbar.value = {
      show: true,
      message:
        error.response.data.error || "Registration failed. Please try again.",
      color: "red-darken-4",
    };
  }
};
</script>

<template>
  <v-form @submit.prevent="registerUser">
    <v-text-field
      v-model.trim="form.username"
      :error-messages="usernameErrors"
      label="Username"
      required
    ></v-text-field>

    <v-text-field
      v-model.trim="form.email"
      :error-messages="emailErrors"
      label="Email"
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

    <v-text-field
      v-model.trim="form.repassword"
      :error-messages="repasswordErrors"
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
      v-model.trim="form.avatar"
      :error-messages="avatarErrors"
      label="Avatar URL"
    ></v-text-field>

    <v-btn type="submit" color="amber">Register</v-btn>
  </v-form>

  <v-snackbar v-model="snackbar.show" :color="snackbar.color" top>
    {{ snackbar.message }}
  </v-snackbar>
</template>

<style scoped></style>
