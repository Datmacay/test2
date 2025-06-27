<template>
  <div class="headerAdmin">
    <button class="headerAdmin__bar" @click="handleClick">
      <i class="fa-solid fa-bars"></i>
    </button>
    <div class="headerAdmin__content">
      <div class="headerAdmin__ring">
        <i class="fa-regular fa-bell"></i>
      </div>
      <div class="headerAdmin__mail">
        <i class="fa-solid fa-envelope"></i>
      </div>
      <div class="headerAdmin__calender">
        <i class="fa-solid fa-calendar-days"></i>
      </div>
      <div class="headerAdmin__dropdown">
        <el-dropdown>
          <div class="headerAdmin__avatar">
            <div class="headerAdmin__img">
              <img :src="gau" alt="loading..." />
            </div>
          </div>
          <template #dropdown>
            <el-dropdown-menu class="custom-dropdown">
              <div class="headerAdmin__account" style="padding: 0 10px">
                <div class="headerAdmin__title">Account</div>
                <el-dropdown-item>
                  <div class="headerAdmin__account">
                    <i class="fa-regular fa-bell"></i> Notification
                  </div>
                </el-dropdown-item>
                <el-dropdown-item>Action 2</el-dropdown-item>
                <el-dropdown-item>
                  <RouterLink to="/logout">Logout</RouterLink>
                </el-dropdown-item>
              </div>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import gau from '@/assets/bear-9201157_1280.jpg'
import { useStatusButton } from '../../stores/Status'
import { watchEffect } from 'vue'
import { RouterLink } from 'vue-router'

const { check, handleChangeStatus } = useStatusButton()
const handleClick = () => {
  handleChangeStatus(!check.value)
}
</script>

<style lang="scss" scoped>
.custom-dropdown {
  min-width: 150px;
  /* tăng chiều rộng dropdown */
}

.headerAdmin {
  &__bar {
    outline: none;
    border: none;
    border-radius: 5px;
    padding: 2px 7px;
    font-size: 16px;
    background-color: #fff;
  }
}
</style>
