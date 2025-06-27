<template>
  <el-form ref="formRef" :model="data" label-position="top" label-width="auto" class="demo-dynamic">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item prop="title" label="Title" :rules="rules">
          <el-input v-model="data.title" />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item prop="price" label="Price" :rules="rules">
          <el-input v-model="data.price" type="number" />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item prop="quantity" label="Quantity" :rules="rules">
          <el-input v-model="data.quantity" type="number" />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item prop="description" label="Description" :rules="rules">
          <el-input v-model="data.description" type="textarea" placeholder="Please input" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item>
      <el-button type="primary" @click="submitForm(formRef)">Submit</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElMessage, type FormInstance } from 'element-plus'
import { createProduct } from '../services/ProductService'

const formRef = ref<FormInstance>()
const rules = [
  {
    required: true,
    message: 'Please input title',
    trigger: 'blur',
  },
  {
    required: true,
    message: 'Please input price',
    trigger: ['change'],
  },
  {
    required: true,
    message: 'Please input quantity',
    trigger: ['change'],
  },
  {
    required: true,
    message: 'Please input description',
    trigger: ['blur', 'change'],
  },
]

const data = reactive({
  title: '',
  description: '',
  price: 0,
  quantity: 1,
  is_delete: false,
})
const token = localStorage.getItem('accessToken')!
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      const res = await createProduct('product', data, token)
      if (res) {
        formEl.resetFields()
        ElMessage({
          message: 'Congrats,Create new product success',
          type: 'success',
        })
      }
    } else {
      ElMessage({
        message: 'Create new product fail.',
        type: 'error',
      })
    }
  })
}
</script>
