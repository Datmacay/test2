<template>
  <el-button @click="handleProcessOrder" type="primary">Mua hàng</el-button>
</template>

<script setup lang="ts">
import { ElNotification } from 'element-plus'
import { createOrder } from '../services/OrderService'
import { Purchase } from '../stores/Order'
import { jwtDecode } from 'jwt-decode'
import { Ref, toRefs, watchEffect } from 'vue'
import { CartFrame } from '../stores/Cart'

const props = defineProps<{
  dataBuy: CartFrame[]
  filterData: number
}>()

const { dataBuy, filterData } = toRefs(props)

const emit = defineEmits<{
  (e: 'handleEmitCart', value: number[]): void
}>()

const token = localStorage.getItem('accessToken')!
const userId = jwtDecode(token).sub!

const handleProcessOrder = async () => {
  const dataPurchase: Purchase[] = []
  const listIdProduct: number[] = []

  dataBuy.value.forEach((item: CartFrame) => {
    dataPurchase.push({
      productId: item.id,
      price: item.price,
      quantity: item.quantity,
    })

    listIdProduct.push(item.id)
  })

  if (dataBuy && token) {
    const res = await createOrder(
      'order',
      {
        userId: parseInt(userId),
        totalAmount: filterData.value,
        purchaseRequests: dataPurchase,
      },
      token,
    )
    if (res.code === 200) {
      ElNotification({
        title: 'Success',
        message: 'Dat hang thanh cong',
        type: 'success',
      })
      emit('handleEmitCart', listIdProduct)
    } else {
      ElNotification({
        title: 'Fail',
        message: 'Dat hang that bai',
        type: 'error',
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
