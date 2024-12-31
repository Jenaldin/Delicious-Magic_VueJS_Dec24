import './assets/main.css'

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import pinia from './stores';
import axiosApi from './axios';
import { useVuelidate } from '@vuelidate/core';

const app = createApp(App);
app.config.globalProperties.$axios = axiosApi;

app.use(pinia);
app.use(router);
app.use(useVuelidate);

app.mount('#app');