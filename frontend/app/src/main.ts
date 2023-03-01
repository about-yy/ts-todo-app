import { createApp } from 'vue'
import AppVue from './App.vue';
import router from "./router";

const app  = createApp(AppVue);
app.use(router);
app.mount('#app');