<script setup>
</script>

<template>
   <p>Profile here</p>
</template>

<!-- <script setup>
import { ref, onMounted } from 'vue';
import { getUserInfo, updateUserInfo } from '../api/userApi';

const props = defineProps({ userId: String });

const userInfo = ref({});
const isEditMode = ref(false);
const snackbar = ref({
  show: false,
  message: '',
  color: 'green-darken-4'
});

const fetchUserInfo = async () => {
  try {
    userInfo.value = await getUserInfo(props.userId);
  } catch (error) {
    snackbar.value = {
      show: true,
      message: error.response?.data?.error || error.message,
      color: 'red-darken-4'
    };
  }
};

const saveProfile = async () => {
  try {
    await updateUserInfo(props.userId, userInfo.value);
    snackbar.value.message = 'Profile updated successfully!';
    snackbar.value.color = 'green-darken-4';
    snackbar.value.show = true;
    isEditMode.value = false;
  } catch (error) {
    snackbar.value.message = error.response?.data?.error || error.message;
    snackbar.value.color = 'red-darken-4';
    snackbar.value.show = true;
  }
};

onMounted(() => {
  fetchUserInfo();
});
</script>

<template>
  <div>
    <v-switch v-model="isEditMode" label="Edit Profile" />
    <div v-if="isEditMode">
      <v-form>
        <v-text-field v-model="userInfo.name" label="Name"></v-text-field>
        <v-text-field v-model="userInfo.email" label="Email"></v-text-field>
        <v-btn color="amber" @click="saveProfile">Save</v-btn>
      </v-form>
    </div>
    <div v-else>
      <p>Name: {{ userInfo.name }}</p>
      <p>Email: {{ userInfo.email }}</p>
    </div>
    <v-snackbar v-model="snackbar.show" :color="snackbar.color">
      {{ snackbar.message }}
    </v-snackbar>
  </div>
</template> -->

<style scoped>
</style>
