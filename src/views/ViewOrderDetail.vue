<template>
  <el-button size="small" type="primary" @click="handleClick(row)">Detail</el-button>
  <el-dialog
    v-model="dialogVisible"
    title="Xem chi tiet don hang"
    width="800"
    :before-close="handleClose"
    append-to-body
  >
    <el-table ref="multipleTableRef" :data="orderDetailData" row-key="id" style="width: 100%">
      <el-table-column property="title" label="Tên sản phẩm" />
      <el-table-column property="quantity" label="Số lượng" />
      <el-table-column property="priceAtPurchase" label="Giá mua" />
      <el-table-column property="productId" label="ProductId">
        <template #default="{ row }">
          <Router-link :to="`/product/${row.productId}`">
            <el-button type="primary">Sản phẩm</el-button>
          </Router-link>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { getOrderDetails } from '../services/OrderDetailService'
import { ElMessageBox } from 'element-plus'
interface OrderDetail {
  quantity: number
  priceAtPurchase: number
  productId: number
  title: string
}
const dialogVisible = ref<boolean>()
const { row } = defineProps(['row'])
const orderDetailData = ref<OrderDetail[]>([])

const token = localStorage.getItem('accessToken')!

const fetchAPI = async (id: number) => {
  const res = await getOrderDetails('order/purchase/', id, token)
  console.log(res)
  orderDetailData.value = res.data.result
}

const handleClick = (row: any) => {
  dialogVisible.value = true
  fetchAPI(row.orderId)
}

const handleClose = (done: () => void) => {
  ElMessageBox.confirm('Ban co chac muon dong khong?')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}

// watchEffect(() => {
//   console.log(orderDetailData.value)
// })
</script>

<style lang="scss" scoped></style>
