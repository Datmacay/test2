<template>
  <div class="manageProduct">
    <div class="manageProduct__table">
      <el-table
        ref="multipleTableRef"
        :data="resultFinal?.result"
        row-key="id"
        style="width: 100%"
        v-loading="loading"
      >
        <el-table-column property="orderId" label="ID" />
        <el-table-column property="fullName" label="Tên khách hàng" />
        <el-table-column property="phone" label="Số điện thoại" />
        <el-table-column property="email" label="Email" />
        <el-table-column property="address" label="Địa chỉ" />
        <el-table-column property="totalAmount" label="Tổng tiền" />
        <el-table-column property="createdDate" label="Ngày đặt" />
        <el-table-column label="Actions">
          <template #default="{ row }">
            <ViewProduct :row="row" />
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="manageProduct__pagination">
      <div class="pagination-wrapper">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :current-page="currentPage"
          :page-size="pageSize"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watchEffect } from 'vue'
import type { TableInstance } from 'element-plus'
import ViewProduct from './ViewOrderDetail.vue'
import { getOrders } from '../services/OrderService'

interface Order {
  orderId: number
  totalAmount: number
  createdDate: String
  lastModifiedDate: Date
  fullName: String
  phone: String
  email: String
  address: String
  customerId: number
}

const data = ref<Order[]>([])
const multipleTableRef = ref<TableInstance>()
const token = localStorage.getItem('accessToken')!
const loading = ref<boolean>(false)

const fetchAPI = async () => {
  loading.value = true
  const res = await getOrders(`order?page=${currentPage.value}&size=${pageSize.value}`, token)
  if (res) {
    loading.value = false
    resultFinal.value = res.data
    total.value = res.data.totalItem
  }
}

interface pagiType {
  result: any
  currentPage: number
  pageSize: number
  totalItem: number
  totalPages: number
}

const resultFinal = ref<pagiType>()

onMounted(() => {
  fetchAPI()
})

const currentPage = ref(1)
const pageSize = ref(4)
const total = ref(0)

const handleCurrentChange = (page: number) => {
  currentPage.value = page
  fetchAPI()
}

const handleSizeChange = (size: number) => {
  pageSize.value = size
  fetchAPI()
}

watchEffect(() => {
  console.log(data.value)
})
</script>
