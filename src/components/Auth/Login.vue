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
              <div className="d-flex align-items-center justify-content-center pb-4">
                <button type="button" className="login-with-google-btn" @click="loginGoogle">
                  Sign in with Google
                </button>
              </div>
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
import { reactive, ref } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { login } from '../../services/AuthService'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/Auth'
import { configOauth } from '../../configurations/configOauth'

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
    if (valid) {
      loading.value = true
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

const loginGoogle = () => {
  const callbackUrl = configOauth.redirectUri
  const authUrl = configOauth.authUri
  const googleClientId = configOauth.clientId

  const targetUrl = `${authUrl}?redirect_uri=${encodeURIComponent(
    callbackUrl,
  )}&response_type=code&client_id=${googleClientId}&scope=openid%20email%20profile`

  window.location.href = targetUrl
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

.login-with-google-btn {
  transition:
    background-color 0.3s,
    box-shadow 0.3s;

  padding: 12px 16px 12px 42px;
  border: none;
  border-radius: 3px;
  box-shadow:
    0 -1px 0 rgba(0, 0, 0, 0.04),
    0 1px 1px rgba(0, 0, 0, 0.25);

  color: #757575;
  font-size: 14px;
  font-weight: 500;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans',
    'Droid Sans', 'Helvetica Neue', sans-serif;

  background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4=);
  background-color: white;
  background-repeat: no-repeat;
  background-position: 12px 11px;
}
</style>
