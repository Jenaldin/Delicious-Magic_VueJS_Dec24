import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import pinia from "./stores";
import axiosApi from "./axios";
import { useVuelidate } from "@vuelidate/core";

import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const app = createApp(App);
app.config.globalProperties.$axios = axiosApi;

const vuetify = createVuetify({
  components,
  directives,
});

app.use(pinia);
app.use(router);
app.use(useVuelidate);
app.use(vuetify);

app.mount("#app");
