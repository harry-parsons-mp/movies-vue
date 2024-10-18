import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import '@/styles/custom.scss'

import App from './App.vue'
import router from './router'
import Vue3Toastify, { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const app = createApp(App)

app.use(createPinia())
app.use(Vue3Toastify, {
  autoClose: 2000,
  theme: 'dark',
  position: toast.POSITION.BOTTOM_LEFT,
  hideProgressBar: true
})
app.use(router)
app.mount('#app')
