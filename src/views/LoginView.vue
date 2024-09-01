<script setup>
import { ref } from 'vue'
import router from '@/router/index'
import { login } from '@/router/authenticate' // Import the login function from authenticate to identify the roll.
// the admin information hardcode
const adminAccount = {
  username: 'admin',
  password: 'admin181'
}
// Reactive reference for form data
const formData = ref({
  username: '',
  password: ''
})
// Reactive reference for error messages
const errors = ref({
  username: null,
  password: null
})
// Function to handle form submission
const submitForm = () => {
  // Validate username and password
  validateName(true)
  validatePassword(true)
  if (!errors.value.username && !errors.value.password) {
    // get registered users data from localStorage
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || []
    //identify the user role
    if (
      formData.value.username === adminAccount.username &&
      formData.value.password === adminAccount.password
    ) {
      //put the admin user role ,and then push to the management page
      login('admin')
      router.push('/management')
    } else {
      //reference from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
      //reference from https://www.smashingmagazine.com/2020/10/authentication-in-vue-js/
      // Find the user in the registered users array
      const foundUser = registeredUsers.find(
        (user) =>
          user.username === formData.value.username && user.password === formData.value.password
      )
      // log in as  user and then push to the myprofile page
      if (foundUser) {
        login('user')
        router.push('/myprofile')
      } else {
        errors.value.username = 'Invalid username or password'
      }
    }
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
    if (blur) errors.value.password = `Password must be at least ${minLength} characters long.`
  } else if (password.length > maxLength) {
    if (blur) errors.value.password = 'Password must be no longer than 20 characters long.'
  } else if (!hasLowercase) {
    if (blur) errors.value.password = 'Password must contain at least one lowercase letter.'
  } else if (!isform) {
    if (blur) errors.value.password = 'Password can only contained by letters and numbers.'
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
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding-bottom: 20px;
}
</style>
