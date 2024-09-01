import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import NewsView from '../views/NewsView.vue'
import RegisterView from '../views/RegisterView.vue'
import ActivitiesView from '@/views/ActivitiesView.vue'
import Myprofile from '@/views/Myprofile.vue'
import ManagementView from '@/views/ManagementView.vue'
import { logstate, systemrole } from '@/router/authenticate'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/news',
    name: 'News',
    component: NewsView
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView
  },
  {
    path: '/activities',
    name: 'Activities',
    component: ActivitiesView
  },
  {
    path: '/myprofile',
    name: 'MyProfile',
    component: Myprofile,
    // reference from https://router.vuejs.org/guide/advanced/navigation-guards.html
    // Route guard to check if the user is logged in and has the 'user' role
    beforeEnter: (to, from, next) => {
      if (logstate.value && systemrole.value === 'user') {
        next()
      } else {
        next('/login')
      }
    }
  },
  {
    path: '/management',
    name: 'Management',
    component: ManagementView,
    // Route guard to check if the user is logged in and has the 'admin' role
    beforeEnter: (to, from, next) => {
      if (logstate.value && systemrole.value === 'admin') {
        next()
      } else {
        next('/login')
      }
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
