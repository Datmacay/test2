<template>
  <el-button size="small" type="primary" @click="handleClick(row)">Solded</el-button>
  <el-dialog
    v-model="dialogVisible"
    title="Xem chi tiết mặt hàng đã bán"
    width="800"
    :before-close="handleClose"
    append-to-body
  >
    <el-table ref="multipleTableRef" :data="users" row-key="id" style="width: 100%">
      <el-table-column property="fullname" label="Tên khách hàng" />
      <el-table-column property="address" label="Địa chỉ" />
      <el-table-column property="price_at_purchase" label="Giá mua" />
      <el-table-column property="quantity" label="Số lượng" />
      <el-table-column property="phone" label="Số điện thoại" />
      <el-table-column property="email" label="Email" />
    </el-table>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { ElMessageBox } from 'element-plus'
import { getUsersBuyProductId } from '../services/ProductService'

const dialogVisible = ref<boolean>()
const { row } = defineProps(['row'])
const users = ref([])
const token = localStorage.getItem('accessToken')!

const fetchAPI = async (id: number) => {
  const res = await getUsersBuyProductId('product/user/', id, token)
  users.value = res.result
}

const handleClick = (row: any) => {
  dialogVisible.value = true
  fetchAPI(row.id)
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
</script>

<style lang="scss" scoped></style>
