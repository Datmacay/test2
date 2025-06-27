import axios from 'axios'
import { useAuthStore } from '../stores/Auth'
import { useRouter } from 'vue-router'

export const API_DOMAIN = 'http://localhost:8080/'

const getHeaders = (accessToken?: string) => {
  let headers: any = {
    'Content-Type': 'application/json',
  }
  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`
  }
  return { headers }
}

const getHeadersWithFormData = (accessToken?: string) => {
  let headers: any = {
    'Content-Type': 'multipart/form-data',
  }
  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`
  }
  return { headers }
}

export const get = async (path: string, token?: string) => {
  const { handleLogout } = useAuthStore()
  const router = useRouter()
  try {
    const res = await axios.get(API_DOMAIN + path, getHeaders(token))
    return res.data
  } catch (error: any) {
    const errRes = error?.response?.data
    if (errRes?.code === 401) {
      handleLogout()
      window.location.href = '/login'
    }
    return errRes
  }
}

export const post = async (path: string, data: object, token?: string) => {
  const { handleLogout } = useAuthStore()
  try {
    const res = await axios.post(API_DOMAIN + path, data, getHeaders(token))
    return res.data
  } catch (error: any) {
    const errRes = error?.response?.data
    if (errRes?.code === 401) {
      handleLogout()
      window.location.href = '/login'
    }
    return errRes
  }
}

export const patch = async (path: string, data: object, token?: string) => {
  const { handleLogout } = useAuthStore()
  try {
    const res = await axios.patch(API_DOMAIN + path, data, getHeaders(token))
    return res.data
  } catch (error: any) {
    const errRes = error?.response?.data
    if (errRes?.code === 401) {
      handleLogout()
      window.location.href = '/login'
    } else {
      return errRes
    }
  }
}

export const put = async (path: string, data: object, id: any, token?: string) => {
  const { handleLogout } = useAuthStore()
  try {
    const res = await axios.put(`${API_DOMAIN + path}/${id}`, data, getHeaders(token))
    return res.data
  } catch (error: any) {
    const errRes = error?.response?.data
    if (errRes?.code === 401) {
      handleLogout()
      window.location.href = '/login'
    }
    return errRes
  }
}

export const Delete = async (path: string, id: any, token?: string) => {
  const { handleLogout } = useAuthStore()
  try {
    const res = await axios.delete(`${API_DOMAIN + path}/${id}`, getHeaders(token))
    return res.data
  } catch (error: any) {
    const errRes = error?.response?.data
    if (errRes?.code === 401) {
      handleLogout()
      window.location.href = '/login'
    }
    return errRes
  }
}

export const postWithFormData = async (path: string, data: any, token?: string) => {
  const { handleLogout } = useAuthStore()
  try {
    const res = await axios.post(API_DOMAIN + path, data, getHeadersWithFormData(token))
    return res.data
  } catch (error: any) {
    const errRes = error?.response?.data
    if (errRes?.code === 401) {
      handleLogout()
      window.location.href = '/login'
    }
    return errRes
  }
}

export const patchWithFormData = async (path: string, data: any, token?: string) => {
  const { handleLogout } = useAuthStore()
  try {
    const res = await axios.patch(API_DOMAIN + path, data, getHeadersWithFormData(token))
    return res.data
  } catch (error: any) {
    const errRes = error?.response?.data
    if (errRes?.code === 401) {
      handleLogout()
      window.location.href = '/login'
    }
    return errRes
  }
}

export const putWithFormData = async (path: string, data: any, id: any, token?: string) => {
  const { handleLogout } = useAuthStore()
  try {
    const res = await axios.put(`${API_DOMAIN + path}/${id}`, data, getHeadersWithFormData(token))
    return res.data
  } catch (error: any) {
    const errRes = error?.response?.data
    if (errRes?.code === 401) {
      handleLogout()
      window.location.href = '/login'
    }
    return errRes
  }
}
