<script setup>
import { ref, computed, onMounted } from 'vue';
import { getUser, editUser } from '../api/authUserApi';
import { useAuthStore } from '../stores/authStore';
import { required, email, minLength, maxLength, url } from '@vuelidate/validators'

const props = defineProps({
   userId: {
      type: String,
      required: true
   }
});

const userForm = ref({
   username: '',
   email: '',
   avatar: '',
   aboutMe: '',
});
const rules = computed(() => ({
   email: { required, email, minLength: minLength(5), maxLength: maxLength(50) },
   avatar: { url },
   aboutMe: { maxLength: maxLength(500) },
}));
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
      userForm.value = await getUser(props.userId);
   } catch (error) {
      snackbar.value = {
         show: true,
         message: error.response?.data?.error || error.message,
         color: 'red-darken-4'
      };
   }
};

const editProfile = async () => {
   const userData = {
      email: userForm.value.email, 
      avatar: userForm.value.avatar, 
      aboutMe: userForm.value.aboutMe,
   };
   try {
      await editUser(props.userId, userData);
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
         <v-switch v-model="isEditMode" color="amber-darken-1" label="Edit Profile" class="switch" />
      </div>
      <div v-if="isEditMode">
         <v-form> 
            <v-text-field v-model="userForm.email" :rules="[rules.email]" label="Email"></v-text-field>
            <v-text-field v-model="userForm.avatar" :rules="[rules.avatar]" label="Avatar URL"></v-text-field>
            <v-textarea v-model="userForm.aboutMe" :rules="[rules.aboutMe]" label="About me"></v-textarea> 
            <v-btn color="amber" @click="editProfile">Save Changes</v-btn> 
         </v-form>
      </div>
      <div v-else>
         <p>Username: {{ userForm.username }}</p>
         <p>Email: {{ userForm.email }}</p>
         <p>Avatar url: {{ userForm.avatar }}</p>
         <p>About me: {{ userForm.aboutMe }}</p>
      </div>
      <v-snackbar v-model="snackbar.show" :color="snackbar.color">
         {{ snackbar.message }}
      </v-snackbar>
   </div>
</template>

<style scoped>
.switch {
   margin-left: 0.7rem;
}
</style>
