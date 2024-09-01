<script setup>
import router from '@/router/index'
import { ref } from 'vue'
import { login } from '@/router/authenticate'
// Reactive reference for form data
const formData = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})
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
  // If there are no errors, handle user registration
  if (
    !errors.value.username &&
    !errors.value.password &&
    !errors.value.confirmPassword &&
    !errors.value.email
  ) {
    //reference from https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
    //reference from https://dev.to/iarchitsharma/web-storage-in-javascript-mbi
    // Retrieve registered users data from localStorage
    const users = JSON.parse(localStorage.getItem('registeredUsers')) || []
    // saving user information to localStorage
    const newUser = {
      username: formData.value.username,
      email: formData.value.email,
      password: formData.value.password
    }
    //add the newuser information in the array
    users.push(newUser)
    localStorage.setItem('registeredUsers', JSON.stringify(users))
    //  set user role to 'user'
    login('user')
    clearForm()
    //push to the 'MyProfile' page
    router.push('/myprofile')
  }
}
// validate username field
const validateName = (blur) => {
  //check the username contain to prevent injection
  const isform = /^[a-zA-Z0-9]+$/.test(formData.value.username)
  if (formData.value.username.length < 3) {
    if (blur) errors.value.username = 'Name must be at least 3 characters'
  } else if (formData.value.username.length > 20) {
    if (blur) errors.value.username = 'Name must not be at longer than 20 characters'
  } else if (!isform) {
    if (blur) errors.value.username = 'username can only contained by letters and numbers.'
  } else {
    errors.value.username = null
  }
}
// validate email
const validateEmail = (blur) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(formData.value.email)) {
    if (blur) errors.value.email = 'Email must be in the correct email format.'
  } else {
    errors.value.email = null
  }
}
// validate password
const validatePassword = (blur) => {
  const password = formData.value.password
  const minLength = 8
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const maxLength = 20
  //check the passward contain to prevent injection
  const isform = /^[a-zA-Z0-9]+$/.test(password)

  if (password.length < minLength) {
    if (blur) errors.value.password = 'Password must be at least 3 characters long.'
  } else if (password.length > maxLength) {
    if (blur) errors.value.password = 'Password must be no longer than 20 characters long.'
  } else if (!hasLowercase) {
    if (blur) errors.value.password = 'Password must contain at least one lowercase letter.'
  } else if (!hasNumber) {
    if (blur) errors.value.password = 'Password must contain at least one number.'
  } else if (!isform) {
    if (blur) errors.value.password = 'Password can only contained by letters and numbers.'
  } else {
    errors.value.password = null
  }
}
// validate confirm password
const validateConfirmPassword = (blur) => {
  if (formData.value.password !== formData.value.confirmPassword) {
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
  <!-- reference the class sample -->
  <div class="container">
    <div class="row justify-content-center" style="margin-bottom: 10px">
      <div class="weclome-words mt-5 col-lg-6">
        <div class="row">
          <div class="col-md-2 d-flex justify-content-center align-items-center">
            <img src="../images/logo2.svg" alt="" height="80px" />
          </div>
          <div class="col-md-10">
            <div>
              <h1 style="color: #28a745; font-weight:">Register your account</h1>
            </div>
            <div style="color: #28a745">
              At activeaging, we bring seniors together with vibrant activities, making every day
              joyful and full of life!
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-center" style="margin-bottom: 120px">
      <form @submit.prevent="submitForm" class="i-form col-lg-6">
        <div class="mt-3">
          <label for="name" class="form-label">Name</label>
          <input
            type="text"
            id="username"
            class="form-control"
            placeholder="Enter your full name"
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
