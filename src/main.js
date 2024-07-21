import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import { createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
});

const app = createApp(App);

// Using the router middleware for navigation
app.use(router);

// Using Toastification middleware for toast notifications
app.use(Toast);

// Using Vuetify middleware for material design components
app.use(vuetify);

app.mount("#app");
