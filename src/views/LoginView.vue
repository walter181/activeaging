<script setup>
import { ref } from 'vue'
import router from '@/router/index'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { query, where, getDocs, collection } from 'firebase/firestore'
import { db } from '../firebase/init.js'
const auth = getAuth()
// the admin information hardcode
// const adminAccount = {
//   username: 'admin',
//   password: 'admin181'
// }
// Reactive reference for form data
const formData = ref({
  email: '',
  password: ''
})
// Reactive reference for error messages
const errors = ref({
  email: null,
  password: null
})
// Function to handle form submission
const submitForm = () => {
  // Validate username and password
  validateEmail(true)
  validatePassword(true)
  if (!errors.value.email && !errors.value.password) {
    signInWithEmailAndPassword(auth, formData.value.email, formData.value.password)
      .then(async (data) => {
        const uid = data.user.uid
        console.log('Login Successful!')
        const q = query(collection(db, 'users'), where('uid', '==', uid))
        const querySnapshot = await getDocs(q)

        if (!querySnapshot.empty) {
          // 获取第一个匹配的文档
          const userDoc = querySnapshot.docs[0]
          const userData = userDoc.data()
          if (userData.role === 'admin') {
            router.push('/Management')
          } else {
            router.push('/myprofile')
          }
          console.log('Current User:', auth.currentUser)
        } else {
          console.log('No such user document found!')
        }
      })
      .catch((error) => {
        console.log('Error code:', error.code) // 打印登录时遇到的错误
        // 处理登录错误，例如显示错误消息
      })
  }
}
const validateEmail = (blur) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!formData.value.email) {
    if (blur) errors.value.email = 'Email is required.'
  } else if (!emailPattern.test(formData.value.email)) {
    if (blur) errors.value.email = 'Email must be in the correct format.'
  } else {
    errors.value.email = null
  }
}

// Validate password
const validatePassword = (blur) => {
  const password = formData.value.password
  const minLength = 8
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const maxLength = 20
  const isform = /^[a-zA-Z0-9]+$/.test(password)

  if (!formData.value.password) {
    if (blur) errors.value.password = 'Password is required.'
  } else if (password.length < minLength) {
    if (blur) errors.value.password = 'Password must be at least 8 characters long.'
  } else if (password.length > maxLength) {
    if (blur) errors.value.password = 'Password must not exceed 20 characters.'
  } else if (!hasLowercase) {
    if (blur) errors.value.password = 'Password must contain at least one lowercase letter.'
  } else if (!hasNumber) {
    if (blur) errors.value.password = 'Password must contain at least one number.'
  } else if (!isform) {
    if (blur) errors.value.password = 'Password can only contain letters and numbers.'
  } else {
    errors.value.password = null
  }
}
</script>

<template>
  <div class="container">
    <div class="row justify-content-center" style="margin-bottom: 10px">
      <div class="weclome-words mt-5 col-lg-6">
        <div class="row">
          <div class="col-md-2 d-flex justify-content-center align-items-center">
            <img src="../images/logo2.svg" alt="" height="80px" />
          </div>
          <div class="col-md-10">
            <div>
              <h1 style="color: #28a745; font-weight:">Welcome to ActiveAging</h1>
            </div>
            <div style="color: #28a745">
              We're glad you're back! Log in to enjoy activities designed just for you and make
              every day joyful.
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-center" style="margin-bottom: 120px">
      <form @submit.prevent="submitForm" class="col-lg-6">
        <div class="mt-3">
          <label for="email" class="form-label">Email</label>
          <input
            type="email"
            id="email"
            class="form-control"
            placeholder="Enter your email"
            v-model="formData.email"
            @blur="validateEmail(true)"
            @input="() => validateEmail(false)"
          />
          <div v-if="errors.email" class="text-danger">{{ errors.email }}</div>
        </div>
        <div class="form-group mt-3">
          <label for="password" class="form-label">Password</label>
          <input
            type="password"
            id="password"
            class="form-control"
            placeholder="Enter your password"
            v-model="formData.password"
            @blur="validatePassword(true)"
            @input="() => validatePassword(false)"
          />
          <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
        </div>
        <div class="mt-4 text-center">
          <button type="submit" class="btn btn-success w-100">Log In</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
form {
  border: 2px solid #28a746ae;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding-bottom: 20px;
}
</style>
