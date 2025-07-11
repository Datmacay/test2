import { post } from "../utils";

export const chat = async (path: string, data: object) => {
  const result = await post(path, data)
  return result;
}
