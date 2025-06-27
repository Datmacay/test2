<template>
  <el-skeleton style="width: 240px" animated>
    <template #template>
      <el-skeleton-item style="width: 240px; height: 240px" />
      <div style="margin-top: 10px">
        <el-skeleton-item variant="p" style="width: 50%" />
        <el-skeleton-item variant="text" style="margin-right: 16px" />
        <el-skeleton-item variant="text" />
      </div>
    </template>
  </el-skeleton>

  <el-skeleton style="width: 240px" animated>
    <template #template>
      <el-skeleton-item style="width: 240px; height: 240px" />
      <div style="margin-top: 10px">
        <el-skeleton-item variant="p" style="width: 50%" />
        <el-skeleton-item variant="text" style="margin-right: 16px" />
        <el-skeleton-item variant="text" />
      </div>
    </template>
  </el-skeleton>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const loading = ref(true)
</script>

<style lang="scss" scoped></style>
