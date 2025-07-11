import { get, patch, patchWithFormData, post } from '../utils'

export const getInfo = async (path: string, token: string) => {
  const res = await get(path, token);
  return res.data
}

export const getUsers = async (path: string, token: string) => {
  const res = await get(path, token)
  return res.data;
}

export const changePassword = async (path: string, data: object, token: string) => {
  const res = await patch(path, data, token)
  return res
}

export const updateInfo = async (path: string, data: object, token: string) => {
  const res = await patchWithFormData(path, data, token)
  return res;
}
