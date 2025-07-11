<template>
  <div class="info">
    <div class="container">
      <div class="info__wrap">
        <div
          style="
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          "
        >
          <div class="info__avatar">
            <img :src="data.avatarUrl" alt="avatar..." />
          </div>
          <h2 class="info__title">Thông Tin Cá Nhân</h2>
        </div>
        <div class="info__main">
          <el-form
            ref="formRef"
            :model="data"
            label-position="top"
            label-width="auto"
            class="demo-dynamic"
          >
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item prop="fullname" label="Fullname" :rules="rules">
                  <el-input v-model="data.fullname" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item prop="email" label="Email" :rules="rules">
                  <el-input v-model="data.email" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item prop="phone" label="Phone" :rules="rules">
                  <el-input v-model="data.phone" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item prop="address" label="Address" :rules="rules">
                  <el-input v-model="data.address" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item prop="avatar" label="Avatar" :rules="rules">
                  <el-upload
                    :auto-upload="false"
                    :on-change="(file: any, fileList: any) => handleFile(file)"
                    list-type="picture"
                  >
                    <el-button type="primary">Click to upload</el-button>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item>
              <el-button type="danger" @click="submitForm(formRef)">Submit</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watchEffect } from 'vue'
import { getInfo, updateInfo } from '../services/UserService'
import { ElMessage, FormInstance } from 'element-plus'

const formRef = ref<FormInstance>()
const token = localStorage.getItem('accessToken')!
const rules = {
  fullname: [
    {
      required: true,
      message: 'Please input fullname',
      trigger: 'blur',
    },
  ],
  email: [
    {
      required: true,
      message: 'Please input email',
      trigger: 'blur',
    },
  ],
  phone: [
    {
      required: true,
      message: 'Please input phone',
      trigger: 'blur',
    },
  ],
  address: [
    {
      required: true,
      message: 'Please input address',
      trigger: 'blur',
    },
  ],
}

interface infoUser {
  id: number
  fullname: string
  address: string
  email: string
  phone: string
  avatarUrl: string
  avatar: File | null
}
const data = ref<infoUser>({
  id: 0,
  fullname: '',
  address: '',
  email: '',
  avatarUrl: '',
  avatar: null,
  phone: '',
})

const handleFile = (file: any) => {
  data.value.avatar = file.raw
}

onMounted(() => {
  const fetchInfoUser = async () => {
    const response = await getInfo('user/info', token)
    data.value = response
  }

  fetchInfoUser()
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      const formData = new FormData()
      formData.append('fullname', data.value.fullname)
      formData.append('email', data.value.email)
      formData.append('phone', data.value.phone)
      formData.append('address', data.value.address)
      if (data.value.avatar) {
        formData.append('avatar', data.value.avatar)
      } else {
        formData.append('avatarUrl', data.value.avatarUrl)
      }

      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value)
      }
      const res = await updateInfo(`user/${data.value.id}`, formData, token)
      if (res) {
        ElMessage({
          message: 'Congrats,Update Info success',
          type: 'success',
        })
      }
    } else {
      ElMessage({
        message: 'Update Info fail.',
        type: 'error',
      })
    }
  })
}

watchEffect(() => {
  console.log(data.value)
})
</script>

<style lang="scss" scoped>
.info {
  margin-top: 50px;

  &__title {
    font-size: 25px;
    font-weight: 500;
  }

  &__avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin: 10px 0;
    overflow: hidden;
    img {
      object-fit: cover;
    }
  }

  &__wrap {
    padding: 30px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
}
</style>
