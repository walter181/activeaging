<template>
  <nav class="navbar navbar-expand-md">
    <div class="container">
      <a class="navbar-brand" href="#">Logo</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Activities</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">News</a>
          </li>
          <div class="separator"></div>
          <li class="nav-item">
            <a class="btn btn-register" href="#">Register</a>
          </li>
          <li class="nav-item">
            <a class="btn btn-login" href="#">Log In</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  height: 80px;
}
.navbar-brand,
.nav-link,
.btn {
  font-size: 1.2rem; /* 增大文字大小以提高可读性 */
}
.nav-item {
  margin-right: 26px;
}

.btn-login {
  background-color: #28a745;
  border-color: #28a745;
  padding-left: 20px;
  padding-right: 20px;
  color: aliceblue;
}
.nav-item .btn-register {
  margin-right: -14px;
}
.btn-login {
  background-color: #28a745; /* Bootstrap的默认绿色 */
  border-color: #28a745;
  padding-left: 20px;
  padding-right: 20px;
  color: aliceblue;
}
.nav-link:hover {
  color: #28a745;
}

.btn-register:hover {
  background-color: #28a7463e;
  color: #28a745;
}
.btn-login:hover {
  background-color: #218838;
  border-color: #218838;
  box-shadow: 0px 4px 8px rgba(40, 167, 69, 0.5);
  color: aliceblue;
}
.separator {
  width: 2px;
  height: 18px;
  background-color: #d3d3d3;
  margin-top: 13px;
  margin-right: 10px;
}
</style>
