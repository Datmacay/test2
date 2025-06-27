<template>
  <div>Dang dang xuat!</div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/Auth'
const router = useRouter()
const { handleLogout } = useAuthStore()
;(() => {
  handleLogout()
  router.push('/login')
})()
</script>

<style lang="scss" scoped></style>
