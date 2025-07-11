import {
  Delete,
  get,
  patchWithFormData,
  post,
  postWithFormData,
  putWithFormData,
} from '../utils/index'

export const getProducts = async (path: string) => {
  const res = await get(path)
  return res
}

export const getCategories = async (path: string) => {
  const res = await get(path)
  return res;
}

export const search = async (path: string) => {
  const res = await get(path)
  return res;
}


export const getProductById = async (path: string) => {
  const res = await get(path)
  return res
}

export const createProduct = async (path: string, data: object, token: string) => {
  const res = await post(path, data, token)
  return res.data
}

export const createMultiProduct = async (path: string, data: any, token: string) => {
  const res = await postWithFormData(path, data, token)
  return res
}

export const updateMultiProduct = async (path: string, data: any, token: string) => {
  const res = await patchWithFormData(path, data, token)
  return res
}

export const getMultiProduct = async (path: string, token: string) => {
  const res = await get(path, token)
  return res
}

export const updateProduct = async (path: string, data: any, id: number, token: string) => {
  const res = await putWithFormData(path, data, id, token)
  return res
}

export const deleteProducts = async (path: string, id: number, token: string) => {
  const res = await Delete(path, id, token)
  return res
}

export const deleteMultiProducts = async (path: string, id: string, token: string) => {
  const res = await Delete(path, id, token)
  return res
}

export const getUsersBuyProductId = async (path: string, id: number, token: string) => {
  const res = await get(path + id, token)
  return res.data
}
