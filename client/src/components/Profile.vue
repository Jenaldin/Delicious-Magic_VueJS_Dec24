<script setup>
import { ref, computed, onMounted } from 'vue'
import { getUser, editUser } from '../api/authUserApi'
import { useAuthStore } from '../stores/authStore'
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, maxLength, url } from '@vuelidate/validators'

const props = defineProps({
   userId: {
      type: String,
      required: true,
   },
})
const user = ref({
   email: '',
   avatar: '',
   aboutMe: '',
})
const rules = computed(() => ({
   email: { required, email, minLength: minLength(5), maxLength: maxLength(50) },
   avatar: { url },
   aboutMe: { maxLength: maxLength(500) },
}))
const v$ = useVuelidate(rules, user)
const auth = useAuthStore()
const isOwner = computed(() => auth.userId === props.userId)
const isEditMode = ref(false)
const snackbar = ref({
   show: false,
   message: '',
   color: 'green-darken-4',
})

const emailErrors = computed(() => v$.value.email.$errors.map((e) => e.$message))
const avatarErrors = computed(() => v$.value.avatar.$errors.map((e) => e.$message))
const aboutMeErrors = computed(() => v$.value.aboutMe.$errors.map((e) => e.$message))

const fetchInfo = async () => {
   try {
      user.value = await getUser(props.userId)
   } catch (error) {
      snackbar.value = {
         show: true,
         message: error.response?.data?.error || error.message,
         color: 'red-darken-4',
      }
   }
}

const editProfile = async () => {
   v$.value.$touch()
   if (v$.value.$invalid) {
      snackbar.value = {
         show: true,
         message: 'Please fill in all fields correctly.',
         color: 'red-darken-4',
      }
      return
   }
   const userData = {
      email: user.value.email.trim(),
      avatar: user.value.avatar.trim(),
      aboutMe: user.value.aboutMe.trim(),
   }
   try {
      await editUser(props.userId, userData)
      snackbar.value.message = 'Profile updated successfully!'
      snackbar.value.color = 'green-darken-4'
      snackbar.value.show = true
      isEditMode.value = false
   } catch (error) {
      snackbar.value.message = error.response?.data?.error || error.message
      snackbar.value.color = 'red-darken-4'
      snackbar.value.show = true
   }
}

onMounted(() => {
   fetchInfo()
})
</script>

<template>
   <div>
      <div v-if="isOwner">
         <v-switch v-model="isEditMode" color="amber-darken-1" label="Edit Profile" class="switch" />
      </div>
      <div v-if="isEditMode">
         <v-form @submit.prevent="editProfile">
            <v-text-field v-model.trim="user.email" :error-messages="emailErrors" label="Email"
               required></v-text-field>
            <v-text-field v-model.trim="user.avatar" :error-messages="avatarErrors"
               label="Avatar URL"></v-text-field>
            <v-textarea v-model.trim="user.aboutMe" :error-messages="aboutMeErrors" label="About me"></v-textarea>
            <v-btn color="amber" type="submit">Update Profile</v-btn>
         </v-form>
      </div>
      <div v-else>
         <v-card class="mx-auto">
            <v-row>
               <v-col>
                  <v-card-title>
                     <h2>Hi, you can call me {{ user.username }}</h2>
                  </v-card-title>
                  <v-card-subtitle>
                     <h3>You can contact me at {{ user.email }}</h3>
                  </v-card-subtitle>
                  <v-card-text><h4>Here is a little bit more about me:</h4><p>{{ user.aboutMe }}</p></v-card-text>
               </v-col>
               <v-col>
                  <v-img :src="user.avatar ? user.avatar : '/img-placeholder.png'" alt="Avatar" max-height="300"
                     max-width="300"></v-img></v-col>
            </v-row>
         </v-card>
      </div>
      <v-snackbar v-model="snackbar.show" :color="snackbar.color">
         {{ snackbar.message }}
      </v-snackbar>
   </div>
</template>

<style scoped>
h4 {
   margin-bottom: 0.5rem;
}
.switch {
   margin-left: 0.7rem;
}
</style>
