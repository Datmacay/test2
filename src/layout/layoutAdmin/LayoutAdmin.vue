<template>
  <div >
    <el-container>
      <el-aside width="250px" style="overflow: hidden">
        <SiderAdmin />
      </el-aside>
      <el-container>
        <el-header>
          <HeaderAdmin />
        </el-header>
        <el-main style="min-height: 100vh; padding: 50px">
          <RouterView />
        </el-main>
        <el-footer>
          <FooterAdmin />
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import FooterAdmin from './FooterAdmin.vue'
import HeaderAdmin from './HeaderAdmin.vue'
import SiderAdmin from './SiderAdmin.vue'
import './index.scss'
</script>

<style lang="scss" scoped></style>
