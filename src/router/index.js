import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import HomeView from '@/views/HomeView.vue'
import Myprofile from '@/views/Myprofile.vue'
import EventManagementView from '@/views/EventManagementView.vue'
import UserManagementView from '@/views/UserManagementView.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView
  },
  {
    path: '/home',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/myprofile',
    name: 'MyProfile',
    component: Myprofile
  },
  {
    path: '/eventmanagement',
    name: 'EventManagement',
    component: EventManagementView
  },
  {
    path: '/usermanagement',
    name: 'UserManagement',
    component: UserManagementView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
