import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const authenticate = ref<boolean>(false)

  const handleLogin = (accessToken: string, refreshToken: string) => {
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
    authenticate.value = true
  }
  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    authenticate.value = false
  }

  return { authenticate, handleLogin, handleLogout }
})
