<template>
  <div class="manageProduct">
    <el-card>
      <template #header>
        <div class="card-header">
          <div style="display: flex; align-items: center; justify-content: space-between">
            <div></div>
            <div style="display: flex; align-items: center">
              <CreateMultiProduct />
              <!-- <UpdateMultiProduct :listIdProductUpdate="listIdProductUpdate" /> -->
            </div>
          </div>
        </div>
      </template>
      <div class="manageProduct__table">
        <el-table
          ref="multipleTableRef"
          :data="resultFinal?.result"
          row-key="id"
          style="width: 100%"
          v-loading="loading"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column property="id" label="ID" />
          <el-table-column property="title" label="Name" width="120" />
          <el-table-column property="price" label="Price" />
          <el-table-column property="quantity" label="Quantity" />
          <el-table-column property="_delete" label="Status">
            <template #default="{ row }">
              <el-tag :type="row._delete ? 'danger' : 'success'">
                {{ row._delete ? 'Inactive' : 'Active' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column property="image" label="Picture">
            <template #default="scope">
              <img
                :src="scope.row.picture"
                alt="Product Image"
                style="width: 60px; height: auto; border-radius: 6px"
              />
            </template>
          </el-table-column>
          <el-table-column label="Actions" width="160" align="center">
            <template #default="{ row }">
              <ProductSold :row="row" />
              <UpdateProduct :row="row" :status="status" @resetList="onResetList" />
              <DeleteProduct :row="row" :status="status" @resetList="onResetList" />
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
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import type { TableInstance } from 'element-plus'
import { getProducts } from '../services/ProductService'
import DeleteProduct from './DeleteProduct.vue'
import UpdateProduct from './UpdateProduct.vue'
import ProductSold from './ProductSold.vue'
import CreateMultiProduct from './ViewAdmin/CreateMultiProduct.vue'
import { ProductResponse } from '../common/Common'

const multipleTableRef = ref<TableInstance>()
const multipleSelection = ref<ProductResponse[]>([])
const loading = ref<boolean>(false)
const listIdProductUpdate = ref<number[]>([])

const fetchAPI = async () => {
  loading.value = true
  const res = await getProducts(`product?page=${currentPage.value}&size=${pageSize.value}`)
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

onMounted(async () => {
  fetchAPI()
})

const handleSelectionChange = (val: any) => {
  multipleSelection.value = val

  for (let i = 0; i < val.length; i++) {
    if (!listIdProductUpdate.value.includes(val[i].id)) {
      listIdProductUpdate.value.push(val[i].id)
    }
  }
}

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

const status = ref<boolean>(false)
const onResetList = (valueState: boolean) => {
  status.value = valueState
}

watch(status, () => {
  fetchAPI()
})
</script>

<style lang="scss"></style>
