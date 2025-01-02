<script setup>
   import { ref } from 'vue';
   import Login from '@/components/Login.vue';
   import Register from '@/components/Register.vue';

   const tab = ref('login');
</script>

<template>
   <v-container>
     <v-row justify="center">
       <v-col cols="12" md="8">
         <v-card>
           <v-tabs v-model="tab">
             <v-tab value="login">Login</v-tab>
             <v-tab value="register">Register</v-tab>
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
</style>
