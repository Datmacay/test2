import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface CartFrame {
  id: number
  title: string
  description: string
  price: number
  quantity: number
  picture: string
}
export const useCartStore = defineStore('cart', () => {
  const cartStored = ref<CartFrame[]>([])

  const handleAddProduct = (value: CartFrame) => {
    const indexItem = cartStored.value.findIndex((item) => item.id === value.id)
    if (indexItem !== -1) {
      cartStored.value[indexItem] = {
        ...value,
        quantity: value.quantity + cartStored.value[indexItem].quantity,
      }
    } else {
      cartStored.value.push(value)
    }
  }

  const handleDelete = (value: number) => {
    return (cartStored.value = cartStored.value.filter((item) => item.id !== value))
  }

  return { cartStored, handleAddProduct, handleDelete }
})
