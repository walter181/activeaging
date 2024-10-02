<script setup>
import router from '@/router/index'
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

const formData = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})
const auth = getAuth()
// Reactive reference for error messages
const errors = ref({
  username: null,
  email: null,
  password: null,
  confirmPassword: null
})

// Function to handle form submission
const submitForm = () => {
  validateName(true)
  validatePassword(true)
  validateConfirmPassword(true)
  validateEmail(true)

  // Check if fields are empty
  if (!formData.value.username) {
    errors.value.username = 'Username is required.'
  }
  if (!formData.value.email) {
    errors.value.email = 'Email is required.'
  }
  if (!formData.value.password) {
    errors.value.password = 'Password is required.'
  }
  if (!formData.value.confirmPassword) {
    errors.value.confirmPassword = 'Confirm password is required.'
  }

  // If there are no errors, proceed with registration
  if (
    !errors.value.username &&
    !errors.value.password &&
    !errors.value.confirmPassword &&
    !errors.value.email
  ) {
    createUserWithEmailAndPassword(auth, formData.value.email, formData.value.password)
      .then((data) => {
        console.log('Firebase registration successful!')
        router.push('/myprofile')
        clearForm() // Clear form only after successful registration
      })
      .catch((error) => {
        console.log(error.code)
      })
  }
}

// Validate username
const validateName = (blur) => {
  const isform = /^[a-zA-Z0-9]+$/.test(formData.value.username)
  if (!formData.value.username) {
    if (blur) errors.value.username = 'Username is required.'
  } else if (formData.value.username.length < 3) {
    if (blur) errors.value.username = 'Username must be at least 3 characters.'
  } else if (formData.value.username.length > 20) {
    if (blur) errors.value.username = 'Username must not exceed 20 characters.'
  } else if (!isform) {
    if (blur) errors.value.username = 'Username can only contain letters and numbers.'
  } else {
    errors.value.username = null
  }
}

// Validate email
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

// Validate confirm password
const validateConfirmPassword = (blur) => {
  if (!formData.value.confirmPassword) {
    if (blur) errors.value.confirmPassword = 'Confirm password is required.'
  } else if (formData.value.password !== formData.value.confirmPassword) {
    if (blur) errors.value.confirmPassword = 'Passwords do not match.'
  } else {
    errors.value.confirmPassword = null
  }
}

// Clear form fields
const clearForm = () => {
  formData.value.username = ''
  formData.value.email = ''
  formData.value.password = ''
  formData.value.confirmPassword = ''
}
</script>

<template>
  <div class="container">
    <div class="row justify-content-center" style="margin-bottom: 10px">
      <div class="welcome-words mt-5 col-lg-6">
        <div class="row">
          <div class="col-md-2 d-flex justify-content-center align-items-center">
            <img src="../images/logo2.svg" alt="" height="80px" />
          </div>
          <div class="col-md-10">
            <h1 style="color: #28a745">Register your account</h1>
            <div style="color: #28a745">
              At ActiveAging, we bring seniors together with vibrant activities, making every day
              joyful and full of life!
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-center" style="margin-bottom: 120px">
      <form @submit.prevent="submitForm" @keydown.enter.prevent class="i-form col-lg-6">
        <div class="mt-3">
          <label for="username" class="form-label">Username</label>
          <input
            type="text"
            id="username"
            class="form-control"
            placeholder="Enter your username"
            v-model="formData.username"
            @blur="validateName(true)"
            @input="() => validateName(false)"
          />
          <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
        </div>
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
        <div class="mt-3">
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
        <div class="mt-3">
          <label for="confirmPassword" class="form-label">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            class="form-control"
            placeholder="Confirm your password"
            v-model="formData.confirmPassword"
            @blur="validateConfirmPassword(true)"
            @input="() => validateConfirmPassword(false)"
          />
          <div v-if="errors.confirmPassword" class="text-danger">{{ errors.confirmPassword }}</div>
        </div>
        <div class="mt-4 text-center">
          <button type="submit" class="btn btn-success w-100">Register</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.i-form {
  border: 2px solid #28a746ae;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding-bottom: 20px;
}
</style>
