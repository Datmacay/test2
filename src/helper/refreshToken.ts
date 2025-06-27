import { jwtDecode } from 'jwt-decode'
import { post } from '../utils'
import { useRouter } from 'vue-router'

export const RefreshToken = async () => {
  const router = useRouter()
  const refreshToken: any = localStorage.getItem('refreshToken')
  const accessToken: any = localStorage.getItem('accessToken')
  if (!refreshToken) {
    router.push('/login')
  }
  const refreshTokenExp = jwtDecode(refreshToken).exp
  const accessTokenExp = jwtDecode(accessToken).exp
  const currentTime = Math.floor(new Date().getTime() / 1000)

  if (refreshTokenExp && currentTime > refreshTokenExp) {
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('accessToken')
    router.push('/login')
  }

  if (accessTokenExp && currentTime > accessTokenExp - 120) {
    const res = await post('auth/refresh', { refreshToken: refreshToken })
    localStorage.setItem('accessToken', res.data)
  }
}
