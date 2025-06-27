import { jwtDecode, JwtPayload } from 'jwt-decode'

interface CustomJwtPayload {
  scope: string
  [key: string]: any
}

export const getRoles = () => {
  const accessToken = localStorage.getItem('accessToken')
  if (accessToken) {
    try {
      const tokenDecode = jwtDecode<CustomJwtPayload>(accessToken)
      return tokenDecode.scope
    } catch (error) {
      console.log(error)
    }
  }
}
