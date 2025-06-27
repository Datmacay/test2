import { get } from '../utils'

export const getOrderDetails = async (path: string, id: number, token: string) => {
  const res = await get(path + id, token)
  return res
}
