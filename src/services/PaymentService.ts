import { get } from '../utils'

export const paymentOnline = async (path: string, token: string) => {
  const res = await get(path, token)
  return res
}
