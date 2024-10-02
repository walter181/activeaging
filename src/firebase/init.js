// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
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

// // Initialize Firebase
// initializeApp(firebaseConfig)
// const db = getFirestore()
// export default db
// Initialize Firebase
const app = initializeApp(firebaseConfig) // 初始化 Firebase 应用实例
const db = getFirestore(app) // 将 app 实例传递给 Firestore
export { db }
