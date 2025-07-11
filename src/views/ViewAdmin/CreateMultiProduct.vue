<template>
  <el-button size="small" type="success" @click="handleClick">ADD MultiProduct</el-button>
  <div class="ProductMutliple">
    <el-dialog
      v-model="dialogVisible"
      title="Thêm nhiều sản phẩm"
      width="800"
      :before-close="handleClose"
      append-to-body
    >
      <div class="ProductMutliple__action">
        <el-button type="success" @click="handleAdd">Thêm</el-button>
      </div>

      <div v-for="(product, index) in listProduct" :key="index">
        <el-form
          :model="product"
          :rules="rules"
          :ref="(el: any) => (formRefs[index] = el)"
          label-position="top"
          label-width="auto"
          class="demo-dynamic"
        >
          <h6 style="color: #000; font-weight: bold; margin: 15px 0">Sản phẩm {{ index + 1 }}</h6>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item prop="title" label="Title">
                <el-input v-model="product.title" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item prop="price" label="Price">
                <el-input v-model="product.price" type="number" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item prop="quantity" label="Quantity">
                <el-input v-model="product.quantity" type="number" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item prop="size" label="Size">
                <el-input v-model="product.size"/>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item prop="color" label="Color">
                <el-input v-model="product.color"/>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item prop="description" label="Description">
                <el-input v-model="product.description" type="textarea" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="picture" label="Image">
                <el-upload
                  :auto-upload="false"
                  :on-change="(file: any, fileList: any) => handleFile(file, fileList, index)"
                  list-type="picture"
                >
                  <el-button type="primary">Click to upload</el-button>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <div style="float: right; margin-top: 25px">
                <el-button type="danger" @click="handleDel(index)">Delete</el-button>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <el-divider />
      <el-button type="primary" @click="submitForm" v-if="listProduct.length > 0">Save</el-button>
      <el-button type="primary" @click="submitForm" v-else disabled>Save</el-button>
      <el-button @click="dialogVisible = false">Cancel</el-button>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessageBox, ElMessage, FormInstance } from 'element-plus'
import type { UploadUserFile } from 'element-plus'
import { Product } from '../../common/Common.js'
import { createMultiProduct } from '../../services/ProductService.js'

const dialogVisible = ref(false)
const token = localStorage.getItem('accessToken')!
let listProduct = reactive<Product[]>([])
const formRefs = ref<FormInstance[]>([])

const rules = {
  title: [{ required: true, message: 'Vui lòng nhập title', trigger: 'blur' }],
  price: [{ required: true, message: 'Vui lòng nhập price', trigger: 'blur' }],
  quantity: [{ required: true, message: 'Vui lòng nhập quantity', trigger: 'blur' }],
  description: [{ required: true, message: 'Vui lòng nhập mô tả', trigger: 'blur' }],
  picture: [{ required: true, message: 'Vui lòng chọn hình ảnh', trigger: 'change' }],
  size: [{ required: true, message: 'Vui lòng chọn size', trigger: 'change' }],
  color: [{ required: true, message: 'Vui lòng chọn mau sac', trigger: 'change' }],
}

const handleClick = () => {
  dialogVisible.value = true
}

const handleAdd = () => {
  listProduct.push({
    id: null,
    title: '',
    quantity: 1,
    price: 1,
    description: '',
    size:'',
    color:'',
    categoryId:1,
    picture: null,
  })
}

const handleDel = (index: number) => {
  listProduct.splice(index, 1)
  formRefs.value.splice(index, 1)
}

const handleFile = (file: any, fileList: UploadUserFile[], index: number) => {
  listProduct[index].picture = file.raw
}

const handleClose = (done: () => void) => {
  ElMessageBox.confirm('Bạn có chắc muốn đóng?')
    .then(() => done())
    .catch(() => {})
}

const submitForm = async () => {
  let isValid = true

  for (const form of formRefs.value) {
    if (!form) continue
    const valid = await form.validate().catch(() => false)
    if (!valid) {
      isValid = false
    }
  }

  if (!isValid) {
    ElMessage.error('Vui lòng điền đầy đủ thông tin cho tất cả sản phẩm!')
    return
  }

  const formData = new FormData()

  listProduct.forEach((product, index) => {
    formData.append(`products[${index}].title`, product.title)
    formData.append(`products[${index}].price`, product.price.toString())
    formData.append(`products[${index}].quantity`, product.quantity.toString())
    formData.append(`products[${index}].size`, product.size)
    formData.append(`products[${index}].color`, product.color)
    formData.append(`products[${index}].categoryId`, product.categoryId.toString())
    formData.append(`products[${index}].description`, product.description)
    if (product.picture) {
      formData.append(`products[${index}].picture`, product.picture)
    }
  })

  const res = await createMultiProduct('product/multiple', formData, token)

  listProduct = []
  if (res.code === 200) {
    ElMessage.success('Thêm sản phẩm thành công!')
    dialogVisible.value = false
  } else {
    ElMessage.error('Thêm sản phẩm thất bại!')
  }
}
</script>

<style lang="scss" scoped>
.ProductMutliple {
  &__action {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
