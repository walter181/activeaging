<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { db } from '../firebase/init.js'
import { query, where, getDocs, collection } from 'firebase/firestore'

const router = useRouter()
const isLoggedIn = ref(false)
const userRole = ref(null)
const auth = getAuth()

onMounted(() => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      isLoggedIn.value = true
      const uid = user.uid

      const q = query(collection(db, 'users'), where('uid', '==', uid))
      const querySnapshot = await getDocs(q)
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0]
        userRole.value = userDoc.data().role
      }
    } else {
      isLoggedIn.value = false
      userRole.value = null
    }
  })
})

const putlogout = async () => {
  await signOut(auth)
  router.push('/login')
}
</script>

<template>
  <div class="container">
    <nav class="navbar navbar-expand-md">
      <a class="navbar-brand" href="#">
        <img src="../images/logo_activeaging.svg" alt="Logo" height="50" />
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon" style="width: 26px"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item" v-if="!isLoggedIn || userRole === 'user'">
            <router-link to="/home" class="nav-link" active-class="nav-active">Home</router-link>
          </li>
          <li class="nav-item" v-if="isLoggedIn && userRole === 'admin'">
            <router-link to="/usermanagement" class="nav-link" active-class="nav-active"
              >User Management</router-link
            >
          </li>
          <li class="nav-item-register" v-if="!isLoggedIn">
            <router-link to="/register" class="nav-link" active-class="nav-active"
              >Register</router-link
            >
          </li>
          <li class="nav-item" v-if="isLoggedIn && userRole === 'user'">
            <router-link to="/myprofile" class="nav-link" active-class="nav-active"
              >MyProfile</router-link
            >
          </li>
          <li class="nav-item" v-if="isLoggedIn && userRole === 'admin'">
            <router-link to="/eventmanagement" class="nav-link" active-class="nav-active"
              >Event Management</router-link
            >
          </li>
          <li class="nav-item-login" v-if="!isLoggedIn">
            <router-link to="/login" class="nav-link" active-class="active">Login</router-link>
          </li>
          <li class="nav-item-logout" v-if="isLoggedIn">
            <button class="nav-link out-btn" @click="putlogout">Logout</button>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.nav-link {
  font-size: 1.2rem;
}
.nav-link.nav-active {
  color: #28a745 !important;
  font-weight: bold;
}
.out-btn {
  text-align: center;
}

.nav-item-login {
  width: 100px;
  border: 1px solid #28a745;
  margin-right: 10px;
  text-align: center;
  border-radius: 5px;
}

.nav-item-logout {
  width: 100px;
  border: 1px solid #28a745;
  margin-right: 10px;
  text-align: center;
  border-radius: 5px;
}

.nav-item-register {
  width: 100px;
  border: 1px solid #28a745;
  margin-right: 10px;
  text-align: center;
  border-radius: 5px;
}
.nav-item {
  margin-right: 40px;
}
.navbar-toggler {
  width: 50px;
}
@media (max-width: 767px) {
  #navbarNav {
    top: calc(100%);
    width: 100%;
    z-index: 100;
    position: absolute;
    background-color: white;
    border-radius: 0 0 10px 10px;
    box-shadow: 0 4px 8px rgba(40, 167, 69, 0.2);
  }
  .nav-item-login {
    background-color: initial;
    border: none;
    width: auto;
    text-align: right;
    border-radius: 0;
    margin-right: 0px;
  }
  .nav-item-register {
    background-color: initial;
    border: none;
    width: auto;
    text-align: right;
    border-radius: 0;
    margin-right: 0px;
  }
  .nav-item {
    margin-right: 0px;
    text-align: right;
  }
  .nav-item:hover {
    background-color: #28a7463e;
  }
  .nav-item-login:hover {
    background-color: #28a7463e;
  }
  .nav-item-register:hover {
    background-color: #28a7463e;
  }
  .nav-link {
    padding-right: 15px;
  }
}
</style>