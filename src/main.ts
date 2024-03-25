import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import { pinia } from './stores'

import { Icon } from '@iconify/vue'

// base styles
import './assets/styles/app.css'

const app = createApp(App)

app
  .use(router)
  .use(pinia)
  .component('Icon', Icon)
  .mount('#app')
