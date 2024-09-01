import { ref } from 'vue'
// the login state
export const logstate = ref(localStorage.getItem('logstate') === 'true')
// the user role, initialized from localStorage
export const systemrole = ref(localStorage.getItem('systemrole') || null)
// reference https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
// reference https://dev.to/haquedot/state-management-in-modern-web-applications-50d6

//when the i close to initialize or reset the authentication state
export const initializeState = () => {
  logstate.value = false
  systemrole.value = null
  localStorage.removeItem('logstate')
  localStorage.removeItem('systemrole')
}
// Function to handle user login
// seting logstate to true, updates systemrole with the provided role,
// saveing these values to localStorage
export const login = (role) => {
  logstate.value = true
  systemrole.value = role
  localStorage.setItem('logstate', 'true')
  localStorage.setItem('systemrole', role)
}
// Function to handle user logout
// It clear the logstate and systemrole
export const logout = () => {
  localStorage.removeItem('logstate')
  localStorage.removeItem('systemrole')
  logstate.value = false
  systemrole.value = null
}
