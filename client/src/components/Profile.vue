<script setup>
import { ref, computed, onMounted } from 'vue';
import { getUser, editUser } from '../api/authUserApi';
import { useAuthStore } from '../stores/authStore';

const props = defineProps({ userId: String });
const userInfo = ref({});
const auth = useAuthStore();
const isOwner = computed(() => auth.userId === props.userId);

const isEditMode = ref(false);
const snackbar = ref({
   show: false,
   message: '',
   color: 'green-darken-4'
});

const fetchInfo = async () => {
   try {
      userInfo.value = await getUser(props.userId);
   } catch (error) {
      snackbar.value = {
         show: true,
         message: error.response?.data?.error || error.message,
         color: 'red-darken-4'
      };
   }
};

const editProfile = async () => {
   try {
      await editUser(props.userId, userInfo.value);
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
   fetchInfo();
});
</script>

<template>
   <div>
      <div v-if="isOwner">
         <v-switch  v-model="isEditMode" color="amber-darken-1" label="Edit Profile" class="switch" />
      </div>
         <div v-if="isEditMode">
            <v-form>
               <v-text-field v-model="userInfo.username" label="Username"></v-text-field>
               <v-text-field v-model="userInfo.email" label="Email"></v-text-field>
               <v-btn color="amber" @click="editProfile">Save</v-btn>
            </v-form>
         </div>
         <div v-else>
            <p>Username: {{ userInfo.username }}</p>
            <p>Email: {{ userInfo.email }}</p>
      </div>
      <v-snackbar v-model="snackbar.show" :color="snackbar.color">
         {{ snackbar.message }}
      </v-snackbar>
   </div>
</template>

<style scoped>
.switch {
   margin-left: 0.7rem
}
</style>
