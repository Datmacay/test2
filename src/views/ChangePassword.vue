<template>
  <div class="changePassword">
    <h1 class="changePassword__title">Đổi mật khẩu</h1>
    <div class="changePassword__wrap">
      <div class="changePassword__form">
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
              <el-form-item label="Old Password" prop="oldPassWord">
                <el-input v-model="ruleForm.oldPassWord" type="password" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="New Password" prop="newPassWord">
                <el-input v-model="ruleForm.newPassWord" type="password" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="Retype Password" prop="reTypePassWord">
                <el-input v-model="ruleForm.reTypePassWord" type="password" />
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
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { changePassword } from '../services/UserService'
import { useAuthStore } from '../stores/Auth'

const { handleLogout } = useAuthStore()
const ruleFormRef = ref<FormInstance>() //Lay ra cai the form tuong ung trong vueJs
const router = useRouter()
const ruleForm = reactive({
  oldPassWord: '',
  newPassWord: '',
  reTypePassWord: '',
})

const loading = ref<boolean>(false)
const token = localStorage.getItem('accessToken')!
const rules = reactive<FormRules<typeof ruleForm>>({
  oldPassWord: [{ required: true, message: 'Please input old password', trigger: 'blur' }],
  newPassWord: [{ required: true, message: 'Please input new password', trigger: 'blur' }],
  reTypePassWord: [{ required: true, message: 'Please input reType password', trigger: 'blur' }],
}) // cai rules nay de tao ra nhung validation de validate khi nguioi dung an submit

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) {
    return
  }
  formEl.validate(async (valid) => {
    // thuc hien validate theo cac rule da khai bao:
    loading.value = true
    if (valid) {
      const result = await changePassword('user/change-password', ruleForm, token)
      if (result.code === 200) {
        loading.value = false
        handleLogout()
        router.push('/login')
        ElMessage({
          message: 'Đổi mật khẩu thành công.',
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

<style lang="scss" scoped>
.changePassword {
  margin: 50px 0;

  &__title {
    text-align: center;
  }
  &__wrap {
    border: 1px solid #000;
    max-width: 600px;
    margin: 0 auto;
    padding: 25px;
    border-radius: 5px;
  }
}
</style>
