import { get, post } from '../utils'

export const login = async (path: string, data: object) => {
  const result = await post(path, data)
  return result;
}


export const register = async (path: string, data: object) => {
  const result = await post(path, data)
  return result;
}

export const loginGoogle=async(authCode:string)=>{
    const res=await get(`auth/google?code=${authCode}`);
    return res;
}
