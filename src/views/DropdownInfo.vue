<template>
  <div class="myInfo">
    <el-dropdown class="myInfo__dropdown">
      <div class="myInfo__wrap">
        <div class="myInfo__img">
          <img :src="avatar" alt="loading..." />
        </div>
        <div class="myInfo__fullname">{{ infoUser?.fullname }}</div>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <RouterLink to="/admin/dashboard" class="myInfo__link">
            <el-dropdown-item v-if="role === 'ADMIN'">Trang quản lý</el-dropdown-item>
          </RouterLink>
          <RouterLink to="/my-info" class="myInfo__link">
            <el-dropdown-item>Thông tin cá nhân</el-dropdown-item>
          </RouterLink>
          <RouterLink to="/reset-password" class="myInfo__link">
            <el-dropdown-item>Đổi mật khẩu</el-dropdown-item>
          </RouterLink>
          <RouterLink to="/bill" class="myInfo__link">
            <el-dropdown-item>Đơn mua</el-dropdown-item>
          </RouterLink>
          <RouterLink to="/logout" class="myInfo__link">
            <el-dropdown-item>Đăng xuất</el-dropdown-item>
          </RouterLink>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
import avatar from '@/assets/bear-9201157_1280.jpg'
import { isValidToken } from '../helper/isValidToken'
import { getRoles } from '../helper/getRoles'
import { onMounted, ref, watchEffect } from 'vue'
import { getInfo } from '../services/UserService'
import { RouterLink } from 'vue-router'

const infoUser = ref()

const token = localStorage.getItem('accessToken')!
const isToken = isValidToken()
let role = null
if (isToken) {
  role = getRoles()
}
onMounted(() => {
  const fetchAPI = async () => {
    const res = await getInfo('user/info', token)
    infoUser.value = res
  }

  fetchAPI()
})
</script>

<style lang="scss" scoped>
.myInfo {
  &__wrap {
    display: flex;
    align-items: center;
  }

  &__dropdown:hover {
    border: none !important;
  }

  &__link {
    text-decoration: none;
    color: #000;
    font-size: 16px;
  }

  &__img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__fullname {
    font-size: 16px;
    font-weight: 500;
    color: #000;
    margin: 0 5px;
  }
}
</style>
