<template>
  <el-button size="small" type="primary" @click="handleEdit(row)">Edit</el-button>
  <el-dialog
    v-model="dialogVisible"
    title="Cập nhập sản phẩm"
    width="800"
    :before-close="handleClose"
    append-to-body
  >
    <el-form
      ref="formRef"
      :model="row"
      label-position="top"
      label-width="auto"
      class="demo-dynamic"
    >
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item prop="title" label="Title" :rules="rules">
            <el-input v-model="row.title" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item prop="price" label="Price" :rules="rules">
            <el-input v-model="row.price" type="number" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item prop="quantity" label="Quantity" :rules="rules">
            <el-input v-model="row.quantity" type="number" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item prop="description" label="Description" :rules="rules">
            <el-input v-model="row.description" type="textarea" placeholder="Please input" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item prop="picture" label="Image">
            <el-upload
              :auto-upload="false"
              :on-change="(file: any, fileList: any) => handleFile(file, fileList)"
              list-type="picture"
            >
              <el-button type="primary">Click to upload</el-button>
            </el-upload>
          </el-form-item>
          <img
            :src="row.picture"
            alt="loading..."
            v-if="typeof row.picture === 'string'"
            style="width: 100px; height: 100px"
          />
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="submitForm(formRef)"> Confirm </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage, ElMessageBox, FormInstance } from 'element-plus'
import { updateProduct } from '../services/ProductService'

const { row, status } = defineProps(['row', 'status'])

const emit = defineEmits<{
  (e: 'resetList', status: boolean): void
}>()

const dialogVisible = ref(false)
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

const handleEdit = (value: any) => {
  dialogVisible.value = true
}

const formRef = ref<FormInstance>()
const token = localStorage.getItem('accessToken')!

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return

  formEl.validate(async (valid) => {
    if (valid) {
      const formData = new FormData()
      Object.keys(row).forEach((key) => {
        if (row[key] !== undefined) {
          formData.append(key, row[key])
        }
      })

      const res = await updateProduct('product', formData, row.id, token)

      dialogVisible.value = false

      emit('resetList', !status)

      if (res.code === 200) {
        ElMessage.success(res.message)
      } else {
        ElMessage.error(res.message)
      }
    } else {
      console.log('error submit!')
    }
  })
}

const handleFile = (file: any, fileList: any) => {
  row.picture = file.raw
}

const handleClose = (done: () => void) => {
  ElMessageBox.confirm('Are you sure to close this dialog?')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}
</script>

<style lang="scss" scoped></style>
