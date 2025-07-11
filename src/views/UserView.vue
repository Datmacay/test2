<template>
  <div class="manageProduct">
    <el-card>
      <div class="manageProduct__table">
        <el-table
          ref="multipleTableRef"
          :data="resultFinal"
          row-key="id"
          style="width: 100%"
          v-loading="loading"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column property="id" label="ID" />
          <el-table-column property="username" label="Username" width="120" />
          <el-table-column property="fullname" label="Fullname" />
          <el-table-column property="address" label="Address" />
          <el-table-column property="email" label="Email"/>
          <el-table-column property="phone" label="Phone"/>
          <el-table-column label="Actions" width="160">
            <template #default="{ row }">
               <el-button type="primary">DK</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { ProductResponse } from '../common/Common'
import { getUsers } from '../services/UserService'


const multipleSelection = ref<ProductResponse[]>([])
const loading = ref<boolean>(false)
const resultFinal = ref()
const listIdProductUpdate = ref<number[]>([])
const token = localStorage.getItem("accessToken")!;

const fetchAPI = async () => {
  loading.value = true
  const res = await getUsers(`user`,token)
  if (res) {
    loading.value = false
    resultFinal.value = res
  }
}

// interface User {
//   result: any
//   currentPage: number
//   pageSize: number
//   totalItem: number
//   totalPages: number
// }

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

// watch(status, () => {
//   fetchAPI()
// })
</script>

<style lang="scss" scoped></style>
