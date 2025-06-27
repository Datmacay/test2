<template>
  <div class="bill">
    <div class="container">
      <el-row>
        <el-col :span="24">
          <template v-for="item in data" v-if="data.length > 0" :key="item.productId">
            <el-card class="bill__card">
              <template #header>
                <div class="bill__header">
                  <div class="bill__shop">Ngày đặt : {{ item.createdOrder }}</div>
                  <div class="bill__ship">
                    <span class="bill__item1">
                      <i class="fa-solid fa-truck-fast"></i>
                      Giao hàng thành công
                    </span>
                    <span class="bill__item2"> HOAN THANH </span>
                  </div>
                </div>
              </template>
              <div class="bill__main">
                <div class="bill__content">
                  <div class="bill__img">
                    <img :src="product" alt="loading..." />
                  </div>
                  <div class="bill__wrap">
                    <h1 class="bill__title">
                      {{ item.title }}
                    </h1>
                    <span class="bill__quantity"> x {{ item.quantity }} </span>
                  </div>
                </div>
                <div class="bill__price">
                  <span>{{ item.priceAtPurchase }} VND</span>
                </div>
              </div>
              <template #footer>
                <div class="bill__footer">
                  <div class="bill__money">
                    Thành tiền :
                    <span style="color: #ee4d2d"
                      >{{ item.quantity * item.priceAtPurchase }} VND</span
                    >
                  </div>

                  <el-button type="primary">
                    <RouterLink :to="`/product/${item.productId}`">Mua Lại</RouterLink>
                  </el-button>
                </div>
              </template>
            </el-card>
          </template>
          <template v-else>
            <el-empty description="Ordered Empty" />
          </template>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { getPurchaseInfoByUserId } from '../services/OrderService'
import { jwtDecode } from 'jwt-decode'
import product from '@/assets/pro-6.webp'
import { RouterLink } from 'vue-router'

interface Purchase {
  productId: number
  title: string
  quantity: number
  priceAtPurchase: number
  createdOrder: Date
}

const token = localStorage.getItem('accessToken')!
const tokenDecode: any = jwtDecode(token)
const userId = parseInt(tokenDecode.sub)
const data = ref<Purchase[]>([])

onMounted(() => {
  const fetchAPI = async () => {
    const res = await getPurchaseInfoByUserId(`order/user/${userId}`, token)
    data.value = res.data.result
  }

  fetchAPI()
})
</script>

<style lang="scss" scoped>
.bill {
  padding-top: 50px;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__ship {
    display: flex;
    align-items: center;
    font-size: 18px;
  }

  &__item1 {
    position: relative;
    color: #26aa99;
    margin: 0 10px;
    font-size: 16px;

    &::after {
      content: '';
      background-color: #ccc;
      height: 100%;
      width: 1px;
      right: -5px;
      top: 0;
      position: absolute;
    }
  }

  &__item2 {
    color: #ee4d2d;
    font-size: 16px;
  }

  &__card {
    padding: 10px;
    margin: 10px 0;
  }

  &__main {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__content {
    display: flex;
    align-items: center;
  }

  &__img {
    width: 82px;
    height: 82px;
    margin-right: 10px;

    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }

  &__title {
    font-size: 18px;
    color: #000;
    font-weight: 500;
  }

  &__quantity {
    font-size: 16px;
  }

  &__price {
    font-size: 16px;
  }

  &__footer {
    float: right;
  }

  &__money {
    margin-bottom: 10px;
  }
}
</style>
