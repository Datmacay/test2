<template>
  <div class="login">
    <div class="login__wrap">
      <div class="login__title">Login</div>
      <div class="login__form">
        <el-form
          ref="ruleFormRef"
          style="max-width: 600px"
          :model="ruleForm"
          status-icon
          :rules="rules"
          label-position="top"
          label-width="auto"
          class="demo-ruleForm"
          v-loading="loading"
        >
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="Username" prop="username">
                <el-input v-model="ruleForm.username" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="Password" prop="password">
                <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item>
                <el-button style="width: 100%" type="primary" @click="submitForm(ruleFormRef)">
                  Submit
                </el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { h, reactive, ref } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { login } from '../../services/AuthService'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/Auth'

const { handleLogin } = useAuthStore()
const ruleFormRef = ref<FormInstance>() //Lay ra cai the form tuong ung trong vueJs
const router = useRouter()
const ruleForm = reactive({
  username: '',
  password: '',
}) //dung de lay ra du lieu tuong ung khi nguoi dung thay doi gia tri trong username va password

const loading = ref<boolean>(false)

const rules = reactive<FormRules<typeof ruleForm>>({
  username: [
    { required: true, message: 'Please input Username', trigger: 'blur' },
    { min: 3, max: 12, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  password: [{ required: true, message: 'Please input Password', trigger: 'blur' }],
}) // cai rules nay de tao ra nhung validation de validate khi nguioi dung an submit

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) {
    return
  }
  formEl.validate(async (valid) => {
    // thuc hien validate theo cac rule da khai bao:
    loading.value = true
    if (valid) {
      // bien valid se la true khi cac rule da viet da duoc nguoi dung thuc hien dung
      const result = await login('auth/login', ruleForm)
      if (result.code === 200) {
        handleLogin(result.data.accessToken, result.data.refreshToken) // dispatch 1 cais action len store AuthStore va redirect nguoi dung den trang dang nhap
        loading.value = false
        router.push('/')
        ElMessage({
          message: 'Dang nhap thanh cong.',
          type: 'success',
        })
      } else {
        loading.value = false
        ElMessage.error(`${result?.message}.Hay thu lai nhe`)
      }
    }
  })
}
</script>

<style scoped lang="scss">
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 600px;
  margin: 50px auto;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;

  &__title {
    text-align: center;
    margin: 20px 0;
    font-size: 20px;
    font-weight: 600;
  }

  &__warp {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
}
</style>
