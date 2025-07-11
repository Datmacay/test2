<template>
  <div class="home">
    <div class="banner">
      <el-carousel arrow="always" height="630px">
        <el-carousel-item v-for="(item, index) in images" :key="index">
          <div class="container" style="height: 100%">
            <el-row style="height: 100%">
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="banner__content">
                  <p class="banner__desc">Smart Products</p>
                  <h1 class="banner__title">Summer Offer<br />2025 Collection</h1>
                  <button class="banner__btn">SHOP NOW</button>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="banner__img">
                  <img :src="item" alt="loading..." />
                </div>
              </el-col>
            </el-row>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="bitton">
      <div class="container">
        <el-row :gutter="30">
          <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
            <div class="bitton__box">
              <div class="bitton__icon">
                <i class="fa-solid fa-truck-fast"></i>
              </div>
              <div class="bitton__content">
                <div class="bitton__title">Free Shipping</div>
                <p class="bitton__desc">Free shipping on all order</p>
              </div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
            <div class="bitton__box">
              <div class="bitton__icon">
                <i class="fa-regular fa-face-grin-stars"></i>
              </div>
              <div class="bitton__content">
                <div class="bitton__title">Support 24/7</div>
                <d class="bitton__desc">Free shipping on all order</d>
              </div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
            <div class="bitton__box">
              <div class="bitton__icon">
                <i class="fa-solid fa-thumbs-up"></i>
              </div>
              <div class="bitton__content">
                <div class="bitton__title">Money Return</div>
                <p class="bitton__desc">Free shipping on all order</p>
              </div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
            <div class="bitton__box">
              <div class="bitton__icon">
                <i class="fa-solid fa-heart"></i>
              </div>
              <div class="bitton__content">
                <div class="bitton__title">Order Discount</div>
                <p class="bitton__desc">Free shipping on all order</p>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="deals">
      <div class="container">
        <el-row>
          <el-col :span="24">
            <div class="BoxHead">
              <h1 class="BoxHead__title">DAILY DEALS!</h1>
              <div class="BoxHead__subtitle">
                <div class="BoxHead__desc">New Arrivals</div>
                <div class="BoxHead__desc">Best Sellers</div>
                <div class="BoxHead__desc">Sale Items</div>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row class="product" :gutter="20">
          <template v-if="resultFinal?.result.length > 0">
            <el-col
              v-for="item in resultFinal?.result"
              :key="item?.id"
              :xs="24"
              :sm="12"
              :md="6"
              :lg="6"
              :xl="6"
            >
              <RouterLink :to="`/product/${item?.id}`" style="text-decoration: none; color: #000">
                <div class="product__box">
                  <div class="product__img">
                    <div class="product__img--wrap">
                      <img :src="item?.picture" alt="loading..." />
                      <div class="product__bage">New</div>
                    </div>
                    <div class="product__hidden1">
                      <div class="product__cart">
                        <div class="product__love">
                          <i class="fa-solid fa-heart"></i>
                        </div>
                        <div class="product__add">
                          <i class="fa-solid fa-cart-shopping"></i> Add To Cart
                        </div>
                        <div class="product__eye">
                          <i class="fa-solid fa-eye"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="product__content">
                    <div class="product__req">
                      <div class="product__subtitle">
                        {{ item?.title }}
                      </div>
                      <div class="product__rate">
                        <el-rate :model-value="5" />
                      </div>
                    </div>
                    <div class="product__price">
                      <span>{{ item?.price }} VND</span>
                      <span style="float: right">Con lai:{{ item?.quantity }} SP</span>
                    </div>
                  </div>
                </div>
              </RouterLink>
            </el-col>
          </template>
          <template v-else>
            <el-col
              v-for="(item, index) in 4"
              :key="index"
              :xs="24"
              :sm="12"
              :md="6"
              :lg="6"
              :xl="6"
            >
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
            </el-col>
          </template>
        </el-row>
        <div class="pagination-wrapper">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :current-page="currentPage"
            :page-size="pageSize"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
          />
        </div>
      </div>
    </div>
    <div class="swipper" style="margin-top: 50px">
      <el-row>
        <el-col :span="24">
          <div class="BoxHead">
            <h1 class="BoxHead__title">BEST SELLER!</h1>
          </div>
        </el-col>
      </el-row>
      <div class="container">
        <el-carousel :interval="4000" type="card" height="350px" :autoplay="false">
          <el-carousel-item v-for="item in 6" :key="item">
            <img :src="anh3" alt="" />
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="blog">
      <div class="container">
        <el-row>
          <el-col :span="24">
            <div class="BoxHead">
              <h1 class="BoxHead__title">OUR BLOG</h1>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="25" class="blog__wrap">
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <div class="blog__box">
              <div class="blog__img">
                <div class="blog__img--wrap">
                  <img :src="anh1" alt="loading..." />
                  <div class="blog__bage">Lifestyle</div>
                </div>
              </div>
              <div class="blog__content">
                <div class="blog__subContent">
                  <div>
                    Lorem ipsum dolor <br />
                    sit amet consec.
                  </div>
                  <div>By Shop Admin</div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <div class="blog__box">
              <div class="blog__img">
                <div class="blog__img--wrap">
                  <img :src="anh2" alt="loading..." />
                  <div class="blog__bage">Lifestyle</div>
                </div>
              </div>
              <div class="blog__content">
                <div class="blog__subContent">
                  <div>
                    Lorem ipsum dolor <br />
                    sit amet consec.
                  </div>
                  <div>By Shop Admin</div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <div class="blog__box">
              <div class="blog__img">
                <div class="blog__img--wrap">
                  <img :src="anh3" alt="loading..." />
                  <div class="blog__bage">Lifestyle</div>
                </div>
              </div>
              <div class="blog__content">
                <div class="blog__subContent">
                  <div>
                    Lorem ipsum dolor <br />
                    sit amet consec.
                  </div>
                  <div>By Shop Admin</div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue'
import { getProducts } from '../services/ProductService'
import { ElCarousel, ElCarouselItem } from 'element-plus'
import './index.scss'
import anh1 from '@/assets/blog-1.webp'
import anh2 from '@/assets/blog-2.webp'
import anh3 from '@/assets/blog-3.webp'
import anh4 from '@/assets/pro-6.webp'

interface pagiType {
  result: any
  currentPage: number
  pageSize: number
  totalItem: number
  totalPages: number
}

const images = [
  new URL('@/assets/single-slide-1.webp', import.meta.url).href,
  new URL('@/assets/single-slide-hm1-2.webp', import.meta.url).href,
]

const resultFinal = ref<pagiType>()

const fetchAPI = async () => {
  const res = await getProducts(`product?page=${currentPage.value}&size=${pageSize.value}`)
  resultFinal.value = res.data
  total.value = res.data.totalItem
}

onMounted(() => {
  fetchAPI()
})
const currentPage = ref(1)
const pageSize = ref(4)
const total = ref(0)

const handleCurrentChange = (page: number) => {
  currentPage.value = page
  fetchAPI()
}

const handleSizeChange = (size: number) => {
  pageSize.value = size
  fetchAPI()
}
</script>

<style>
.pagination-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.el-carousel__item img {
  /* opacity: 0.75; */
  line-height: 200px;
  margin: 0;
  text-align: center;
}
</style>
