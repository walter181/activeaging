import { ref } from 'vue'
export const isAuthenticated = ref(localStorage.getItem('isAuthenticated') === 'true');
export const userRole = ref(localStorage.getItem('userRole') || null);
export const login = (role) => {
  isAuthenticated.value = true;
  userRole.value = role;
  localStorage.setItem('isAuthenticated', 'true');
  localStorage.setItem('userRole', role);
};
export const logout = () => {
  localStorage.removeItem('isAuthenticated');
  localStorage.removeItem('userRole');
  isAuthenticated.value = false;
  userRole.value = null;
};