import { ref } from 'vue'

export const logstate = ref(localStorage.getItem('logstate') === 'true')
export const systemrole = ref(localStorage.getItem('systemrole') || null)
// reference https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
// reference https://dev.to/haquedot/state-management-in-modern-web-applications-50d6
export const initializeState = () => {
  logstate.value = false
  systemrole.value = null
  localStorage.removeItem('logstate')
  localStorage.removeItem('systemrole')
}

export const login = (role) => {
  logstate.value = true
  systemrole.value = role
  localStorage.setItem('logstate', 'true')
  localStorage.setItem('systemrole', role)
}

export const logout = () => {
  localStorage.removeItem('logstate')
  localStorage.removeItem('systemrole')
  logstate.value = false
  systemrole.value = null
}
