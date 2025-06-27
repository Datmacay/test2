<template>
  <div class="footer">
    <div class="container">
      <el-row :gutter="30">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <div class="footer__dat">
            <div class="footer__box custom-vertical">
              <div class="footer__img">
                <img :src="logo" alt="loading..." />
              </div>
              <div class="footer__content">
                <div>
                  © 2024 Jassa.<br />
                  All Rights Reserved
                </div>
              </div>
            </div>
          </div>
        </el-col>

        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <div class="footer__wrap custom-vertical">
            <div class="footer__title">ABOUT US</div>
            <ul class="footer__list">
              <li class="footer__item">Store location</li>
              <li class="footer__item">About us</li>
              <li class="footer__item">Contact</li>
              <li class="footer__item">Orders tracking</li>
            </ul>
          </div>
        </el-col>

        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <div class="footer__wrap custom-vertical">
            <div class="footer__title">USEFUL LINKS</div>
            <ul class="footer__list">
              <li class="footer__item">Returns</li>
              <li class="footer__item">Support Policy</li>
              <li class="footer__item">Size guide</li>
              <li class="footer__item">FAQs</li>
            </ul>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <div class="footer__wrap custom-vertical">
            <div class="footer__title">FOLLOW US</div>
            <ul class="footer__list">
              <li class="footer__item">Facebook</li>
              <li class="footer__item">Twitter</li>
              <li class="footer__item">Instagram</li>
              <li class="footer__item">Youtube</li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script lang="ts" setup>
import logo from '@/assets/logo.webp'
import './index.scss'
</script>
