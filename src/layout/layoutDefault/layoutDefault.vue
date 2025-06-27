<template>
  <div class="layoutDefault">
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
</script>

<style lang="scss" scoped></style>
