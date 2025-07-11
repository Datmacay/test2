import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Purchase {
  productId: number
  price: number
  quantity: number
}
export interface Order {
  userId: number
  totalAmount: number
  purchaseRequests: Purchase[]
}
export const useOrderCart = defineStore('order', () => {
  const order = ref<Order>()
  const handleOrder = (value: Order) => {
    order.value = value
  }
  return { order, handleOrder }
});

export const usePaymentOrder = defineStore('payment', () => {
  const payment = ref();
  const handleProcessPayment = (value: any) => {
    payment.value = value;
  }
  return { payment, handleProcessPayment }
});

