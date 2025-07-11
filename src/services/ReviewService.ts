import { get, post } from "../utils"

export const getReviews = async (path: string) => {
  const res = await get(path);
  return res
}

export const postReview = async (path: string,data:object,token:string) => {
  const res = await post(path,data,token);
  return res
}
