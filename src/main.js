import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { initializeState } from '@/router/authenticate'

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC0r9k1NvpC3NII3j3hTuJK7ftvK_nFL_k',
  authDomain: 'activeaging-d4831.firebaseapp.com',
  projectId: 'activeaging-d4831',
  storageBucket: 'activeaging-d4831.appspot.com',
  messagingSenderId: '1066801534611',
  appId: '1:1066801534611:web:d7239257c469b4f2821f66'
}

// Initialize Firebase
initializeApp(firebaseConfig)
const app = createApp(App)
app.use(router)
initializeState()
app.mount('#app')
