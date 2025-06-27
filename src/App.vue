<script setup lang="ts">
import { RouterView } from 'vue-router'
import { RefreshToken } from './helper/refreshToken'

// function setupTokenAutoRefresh() {
//   setInterval(() => {
//     console.log('hello')
//     RefreshToken()
//   }, 60000) // mỗi 30s kiểm tra 1 lần
// }

// // gọi hàm này khi app khởi động
// setupTokenAutoRefresh()
</script>

<template>
  <RouterView />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

body,
html {
  font-family: 'Poppins', sans-serif;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>
