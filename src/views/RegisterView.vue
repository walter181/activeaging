<script setup>
import { ref } from 'vue'
const formData = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})
const submittedCards = ref([])
const errors = ref({
  username: null,
  email: null,
  password: null,
  confirmPassword: null
})
const submitForm = () => {
  validateName(true)
  validatePassword(true)
  validateConfirmPassword(true)
  validateEmail(true)
  if (
    !errors.value.username &&
    !errors.value.password &&
    !errors.value.confirmPassword &&
    !errors.value.email
  ) {
    submittedCards.value.push({ ...formData.value })
    clearForm()
  }
}

const validateName = (blur) => {
  if (formData.value.username.length < 3) {
    if (blur) errors.value.username = 'Name must be at least 3 characters'
  } else {
    errors.value.username = null
  }
}

const validateEmail = (blur) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(formData.value.email)) {
    if (blur) errors.value.email = 'Email must be in the correct email format.'
  } else {
    errors.value.email = null
  }
}

const validatePassword = (blur) => {
  const password = formData.value.password
  const minLength = 8
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)

  if (password.length < minLength) {
    if (blur) errors.value.password = `Password must be at least ${minLength} characters long.`
  } else if (!hasLowercase) {
    if (blur) errors.value.password = 'Password must contain at least one lowercase letter.'
  } else if (!hasNumber) {
    if (blur) errors.value.password = 'Password must contain at least one number.'
  } else {
    errors.value.password = null
  }
}
const validateConfirmPassword = (blur) => {
  if (formData.value.password !== formData.value.confirmPassword) {
    if (blur) errors.value.confirmPassword = 'Passwords do not match.'
  } else {
    errors.value.confirmPassword = null
  }
}

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
        <div class="form-group mt-3">
          <label for="name" class="form-label">Name</label>
          <input
            type="text"
            id="username"
            class="form-control"
            placeholder="Enter your full name"
            v-model="formData.username"
            @blur="validateName(true)"
            @input="() => validateName(false)"
            required
          />
          <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
        </div>
        <div class="form-group mt-3">
          <label for="email" class="form-label">Email</label>
          <input
            type="email"
            id="email"
            class="form-control"
            placeholder="Enter your email"
            v-model="formData.email"
            @blur="validateEmail(true)"
            @input="() => validateEmail(false)"
            required
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
            required
          />
          <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
        </div>
        <div class="form-group mt-3">
          <label for="confirmPassword" class="form-label">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            class="form-control"
            placeholder="Confirm your password"
            v-model="formData.confirmPassword"
            @blur="validateConfirmPassword(true)"
            @input="() => validateConfirmPassword(false)"
            required
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
  border-radius: 15px; /* 圆角 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 阴影 */
  padding-bottom: 20px;
}
</style>
