<script setup>
import { ref } from 'vue'
import router from '@/router/index'
import { login } from '@/router/authenticate' // 导入登录功能
const adminAccount = {
  username: 'admin',
  password: 'admin181'
}

const formData = ref({
  username: '',
  password: ''
})

const errors = ref({
  username: null,
  password: null
})

const submitForm = () => {
  validateName(true)
  validatePassword(true)
  if (!errors.value.username && !errors.value.password) {
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || []

    if (
      formData.value.username === adminAccount.username &&
      formData.value.password === adminAccount.password
    ) {
      login('admin')
      router.push('/management')
    } else {
      const foundUser = registeredUsers.find(
        (user) =>
          user.username === formData.value.username && user.password === formData.value.password
      )
      if (foundUser) {
        login('user')
        router.push('/myprofile')
      } else {
        errors.value.username = 'Invalid username or password'
      }
    }
  }
}

const validateName = (blur) => {
  if (formData.value.username.length < 3) {
    if (blur) errors.value.username = 'Name must be at least 3 characters'
  } else {
    errors.value.username = null
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
        <div class="form-group mt-3">
          <label for="username" class="form-label">Username</label>
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
  border-radius: 15px; /* 圆角 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 阴影 */
  padding-bottom: 20px;
}
</style>
