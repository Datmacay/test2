<template>
  <div class="siderAdmin" style="margin-bottom: 14px">
    <div class="siderAdmin__header">
      <div class="siderAdmin__center">FLONE</div>
    </div>
    <div class="siderAdmin__main">
      <el-menu default-active="2" class="el-menu-vertical-demo" :collapse="isCollapse" @open="handleOpen"
        @close="handleClose" style="height: 100%">
        <el-menu-item index="5">
          <el-icon>
            <setting />
          </el-icon>
          <template #title>
            <RouterLink to="/admin/dashboard">DashBoard</RouterLink>
          </template>
        </el-menu-item>
        <el-menu-item index="1">
          <el-icon>
            <setting />
          </el-icon>
          <template #title>
            <RouterLink to="/admin/user">Account</RouterLink>
          </template>
        </el-menu-item>
        <el-sub-menu index="2">
          <template #title>
            <el-icon>
              <location />
            </el-icon>
            <RouterLink to="/admin/products">Products</RouterLink>
          </template>
        </el-sub-menu>
        <el-menu-item index="4">
          <el-icon>
            <setting />
          </el-icon>
          <template #title>
            <RouterLink to="/admin/orders">Orders</RouterLink>
          </template>
        </el-menu-item>
        <el-menu-item index="3">
          <template #title>
            <el-icon>
              <location />
            </el-icon>
            <RouterLink to="/admin/category">Category</RouterLink>
          </template>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Menu as IconMenu, Location, Setting } from '@element-plus/icons-vue'
import { RouterLink } from 'vue-router'
import { useStatusButton } from '../../stores/Status'
const { check } = useStatusButton()
const isCollapse = ref(false)

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
  isCollapse.value = check.value
}
const handleClose = (key: string, keyPath: string[]) => {
  isCollapse.value = check.value
}
</script>

<style></style>
