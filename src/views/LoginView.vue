<script setup>
import { ref } from 'vue'
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
            placeholder="Enter your username"
            required
          />
        </div>
        <div class="form-group mt-3">
          <label for="password" class="form-label">Password</label>
          <input
            type="password"
            id="password"
            class="form-control"
            placeholder="Enter your password"
            required
          />
        </div>
        <div class="form-group mt-3 form-check">
          <input type="checkbox" id="rememberMe" class="form-check-input" />
          <label for="rememberMe" class="form-check-label">Remember me</label>
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
