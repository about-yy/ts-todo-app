import { createApp } from 'vue'
import App from './App.vue'
import router from './app/router'
import { key, store } from './app/store'
import { loadFonts } from './plugins/webfontloader'
import 'v-calendar/dist/style.css';
loadFonts()

createApp(App)
  .use(router)
  .use(store, key)
  .mount('#app')
