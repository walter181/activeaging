import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import NewsView from '../views/NewsView.vue'
import RegisterView from '../views/RegisterView.vue'
import ActivitiesView from '@/views/ActivitiesView.vue'
import Myprofile from '@/views/Myprofile.vue'
import ManagementView from '@/views/ManagementView.vue'

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
    component: Myprofile
  },
  {
    path: '/management',
    name: 'Management',
    component: ManagementView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
