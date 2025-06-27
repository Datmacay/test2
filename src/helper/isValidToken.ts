import { jwtDecode } from 'jwt-decode'
import { RefreshToken } from './refreshToken'

export const isValidToken = () => {
  const token = localStorage.getItem('accessToken')
  if (!token) {
    return false
  }
  const tokenDecode = jwtDecode(token)
  const expiryTimeSeconds = tokenDecode.exp!
  const currentTimeSeconds = Math.floor(new Date().getTime() / 1000)
  if (currentTimeSeconds > expiryTimeSeconds) {
    localStorage.removeItem('accessToken')
    return false
  } else {
    if (currentTimeSeconds > expiryTimeSeconds - 120) {
      RefreshToken()
    }
    return true
  }
}
