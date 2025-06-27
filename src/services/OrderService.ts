import { get, post } from '../utils'

export const createOrder = async (path: string, data: object, token: string) => {
  const res = await post(path, data, token)
  return res
}

export const getOrders = async (path: string, token: string) => {
  const res = await get(path, token)
  return res
}

export const getPurchaseInfoByUserId = async (path: string, token: string) => {
  const res = await get(path, token)
  return res
}
