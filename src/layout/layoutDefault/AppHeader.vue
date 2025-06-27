<template>
  <div class="header">
    <div class="header__logo">
      <RouterLink to="/">
        <img :src="logo" alt="loading..." />
      </RouterLink>
    </div>
    <ul class="header__nav">
      <li class="header__item">
        <RouterLink to="/" class="header__item--link">Home</RouterLink>
      </li>
      <li class="header__item">
        <RouterLink to="/about" class="header__item--link">About Us</RouterLink>
      </li>
      <li class="header__item">
        <RouterLink to="/blog" class="header__item--link">Services</RouterLink>
      </li>
      <li class="header__item">
        <RouterLink to="/blog" class="header__item--link">Blog</RouterLink>
      </li>
      <li class="header__item">
        <RouterLink to="/contact" class="header__item--link">Contact</RouterLink>
      </li>
    </ul>
    <div class="header__end">
      <div class="header__event">
        <template v-if="isToken">
          <DropdownInfo />
          <div class="header__cart">
            <RouterLink
              to="/cart"
              style="border: none; background-color: transparent; text-decoration: none"
            >
              <el-badge :value="cartStored.length">
                <i class="fa-solid fa-cart-shopping"></i>
              </el-badge>
            </RouterLink>
          </div>
        </template>
        <template v-else>
          <div class="header__auth">
            <RouterLink to="/login" class="mx-2">
              <el-button type="primary">Login</el-button>
            </RouterLink>
            <RouterLink to="/register">
              <el-button type="success">Register</el-button>
            </RouterLink>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import logo from '@/assets/logo.webp'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '../../stores/Auth'
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import DropdownInfo from '../../views/DropdownInfo.vue'
import { isValidToken } from '../../helper/isValidToken'
import { useCartStore } from '../../stores/Cart'

const { authenticate } = storeToRefs(useAuthStore())
const { cartStored } = storeToRefs(useCartStore())

const isToken = ref(isValidToken())

watch(authenticate, () => {
  isToken.value = isValidToken()
})
</script>

<style>
@import './index.scss';
</style>
