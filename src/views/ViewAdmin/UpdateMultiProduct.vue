<template>
  <el-button size="small" color="#626aef" @click="handleClick" style="margin-left: 10px"
    >Edit MultiProduct</el-button
  >
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
      <div class="ProductMutliple__action">
        <el-button type="danger" @click="handleDelAll">Xoa</el-button>
      </div>

      <div v-for="(product, index) in listProductUpdate" :key="index">
        <el-form
          :model="product"
          :rules="rules"
          :ref="(el: any) => (formRefs[index] = el)"
          label-position="top"
          label-width="auto"
          class="demo-dynamic"
        >
          <div style="display: flex; align-items: center; justify-content: space-between">
            <h6 style="color: #000; font-weight: bold; margin: 15px 0">Sản phẩm {{ index + 1 }}</h6>
            <el-checkbox
              :label="`Xóa sản phẩm ${index + 1}`"
              size="large"
              v-if="product.id"
              @change="handleDelete(product.id)"
            />
          </div>
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
      <el-button type="primary" @click="submitForm" v-if="listProductUpdate.length > 0"
        >Save</el-button
      >
      <el-button type="primary" @click="submitForm" v-else disabled>Save</el-button>
      <el-button @click="dialogVisible = false">Cancel</el-button>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import {
  deleteMultiProducts,
  getMultiProduct,
  updateMultiProduct,
} from '../../services/ProductService'
import { ElMessage, ElMessageBox, FormInstance, UploadUserFile } from 'element-plus'
import { Product } from '../../common/Common'

const rules = {
  title: [{ required: true, message: 'Vui lòng nhập title', trigger: 'blur' }],
  price: [{ required: true, message: 'Vui lòng nhập price', trigger: 'blur' }],
  quantity: [{ required: true, message: 'Vui lòng nhập quantity', trigger: 'blur' }],
  description: [{ required: true, message: 'Vui lòng nhập mô tả', trigger: 'blur' }],
  picture: [{ required: true, message: 'Vui lòng chọn hình ảnh', trigger: 'change' }],
}
const dialogVisible = ref(false)
const token = localStorage.getItem('accessToken')!
const formRefs = ref<FormInstance[]>([])
const { listIdProductUpdate } = defineProps<{
  listIdProductUpdate: number[]
}>()

const listProductUpdate = ref<Product[]>([])

const listProductDelete = ref<number[]>([])

const handleDelete = (value: any) => {
  listProductDelete.value.push(value)
}

const handleDelAll = async () => {
  const listIdProductUpdateJoining = listIdProductUpdate.join(',')
  const res = await deleteMultiProducts(`product`, listIdProductUpdateJoining, token)

  dialogVisible.value = false

  listProductUpdate.value = []
  if (res.code === 200) {
    ElMessage.success('Thêm sản phẩm thành công!')
  } else {
    ElMessage.error('Thêm sản phẩm thất bại!')
  }
}

const handleClick = async () => {
  dialogVisible.value = true
  const listIdProductUpdateJoining = listIdProductUpdate.join(',')
  const res = await getMultiProduct(`product/multiple/${listIdProductUpdateJoining}`, token)
  listProductUpdate.value = res.data
}

const handleAdd = () => {
  listProductUpdate.value.push({
    id: null,
    title: '',
    quantity: 1,
    price: 1,
    description: '',
    picture: null,
  })
}

const handleClose = (done: () => void) => {
  ElMessageBox.confirm('Bạn có chắc muốn đóng?')
    .then(() => done())
    .catch(() => {})
}

const handleDel = (index: number) => {
  listProductUpdate.value.splice(index, 1)
  formRefs.value.splice(index, 1)
}

const handleFile = (file: any, fileList: UploadUserFile[], index: number) => {
  listProductUpdate.value[index].picture = file.raw
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

  listProductUpdate.value.forEach((product, index) => {
    if (product.id !== null) {
      formData.append(`products[${index}].id`, product.id.toString())
    }
    formData.append(`products[${index}].title`, product.title)
    formData.append(`products[${index}].price`, product.price.toString())
    formData.append(`products[${index}].quantity`, product.quantity.toString())
    formData.append(`products[${index}].description`, product.description)
    if (product.picture instanceof File) {
      formData.append(`products[${index}].picture`, product.picture)
    } else if (typeof product.picture === 'string') {
      // Ảnh cũ => vẫn gửi về backend
      formData.append(`products[${index}].pictureUrl`, product.picture)
    }
  })

  listProductDelete.value.forEach((id: number, idx: number) => {
    formData.append(`deletedIds[${idx}]`, id.toString())
  })

  const res = await updateMultiProduct('product/multiple', formData, token)
  dialogVisible.value = false

  listProductUpdate.value = []
  if (res.code === 200) {
    ElMessage.success('Thêm sản phẩm thành công!')
  } else {
    ElMessage.error('Thêm sản phẩm thất bại!')
  }
}
</script>

<style lang="scss" scoped></style>
