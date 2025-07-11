<template>
  <div style="display: flex; align-items: center; justify-content: center; margin-top: 50px">
    <div>Authenticating...</div>
    <div v-loading="loading"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { loginGoogle } from '../../services/AuthService'
import { useAuthStore } from '../../stores/Auth'
import { useRouter } from 'vue-router'

const { handleLogin } = useAuthStore()
const router = useRouter()
const loading = ref<boolean>(false)

const fetchApiLoginwithGoogle = async () => {
  loading.value = true
  const authCodeRegex = /code=([^&]+)/
  const isMatch = window.location.href.match(authCodeRegex)
  if (isMatch) {
    const authCode = isMatch[1]
    const res = await loginGoogle(authCode);
    console.log(res);
    if (res.code === 200) {
      handleLogin(res?.data?.accessToken, res?.data?.accessToken)
      loading.value = false
      router.push('/')
    }
  }
}

onMounted(() => {
  fetchApiLoginwithGoogle()
})
</script>

<style lang="scss" scoped></style>
