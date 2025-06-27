<template>
  <el-popconfirm
    class="box-item"
    title="Top Left prompts info"
    placement="top"
    @confirm="handleDelete(row)"
  >
    <template #reference>
      <el-button size="small" type="danger">Delete</el-button>
    </template>
  </el-popconfirm>
</template>

<script setup lang="ts">
import { deleteProducts } from '../services/ProductService'
import { Product } from './ProductManage.vue'

const { row, status } = defineProps(['row', 'status'])
const token = localStorage.getItem('accessToken')!
const emit = defineEmits<{
  (e: 'resetList', resetStatus: boolean): void
}>()

const handleDelete = async (row: Product) => {
  const res = await deleteProducts('product', row.id, token)
  emit('resetList', !status.value)
  if (res) {
    alert('Delete Product Success')
  } else {
    alert('Delete not Success')
  }
}
</script>

<style lang="scss" scoped></style>
