import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { initializeState } from '@/router/authenticate'

const app = createApp(App)
app.use(router)
initializeState()
app.mount('#app')
