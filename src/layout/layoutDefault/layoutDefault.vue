<template>
  <div class="layoutDefault">
    <!-- <Chatbot  style="position: fixed; right: 20px; bottom: 50px; z-index: 99;"/> -->
    <AppHeader />
    <main style="min-height: 100vh">
      <RouterView />
    </main>
    <AppFooter />
  </div>
</template>

<script lang="ts" setup>
import AppHeader from './AppHeader.vue'
import AppFooter from './AppFooter.vue'
import '@/assets/container.css'
// import Chatbot from './Chatbot.vue';
</script>

<style lang="scss" scoped></style>
