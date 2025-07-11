export interface Product {
  id: number | null
  title: string
  quantity: number
  price: number
  description: string
  picture: File | null
  size:string
  color:string
  categoryId:number
}

export interface ProductResponse {
  id: number
  title: string
  price: number
  quantity: number
  _delete: boolean
  image: string
}
