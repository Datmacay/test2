<template>
  <div class="productDetail">
    <div class="container">
      <el-card style="padding: 20px 0">
        <template v-if="data">
          <el-row :gutter="50" v-loading="loading">
            <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10">
              <div class="productDetail__wrap">
                <div class="productDetail__img">
                  <img :src="data?.picture" alt="loading..." />
                </div>
                <div class="productDetail__carousel" style="margin: 20px 0">
                  <el-carousel type="card" style="height: 130px">
                    <el-carousel-item v-for="item in images" :key="item">
                      <img
                        :src="item"
                        alt=""
                        style="width: 100%; height: 100%; object-fit: contain"
                      />
                    </el-carousel-item>
                  </el-carousel>
                </div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14">
              <div class="productDetail__content">
                <div class="productDetail__req">
                  <div class="productDetail__subtitle">
                    <span>Yêu thích</span> {{ data?.title }}
                  </div>
                  <div class="productDetail__rate">Đánh giá <el-rate model-value="5" /></div>
                </div>
                <div class="productDetail__price">
                  <span>Giá : {{ data?.price }} VND</span>
                </div>
                <div class="productDetail__size">
                  <span
                    >Kích cỡ :
                    <el-select v-model="value" placeholder="Select" style="width: 240px">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      /> </el-select
                  ></span>
                </div>
                <div class="productDetail__quantity">
                  Số Lượng :
                  <el-input-number
                    v-model="num"
                    :min="1"
                    :max="data?.quantity"
                    @change="(value: number) => (num = value)"
                  />
                  <span style="font-size: 14px; color: #ddd; margin-left: 20px"
                    >Tồn kho{{ data?.quantity }} sản phẩm</span
                  >
                </div>
                <div class="productDetail__desc">
                  <span>Mô tả : {{ data?.description }} </span>
                </div>
                <div class="productDetail__button">
                  <el-button @click="handleAdd" type="primary">Thêm vào giỏ hàng</el-button>
                  <el-button @click="handleBuy" type="danger">Mua ngay</el-button>
                </div>
              </div>
            </el-col>
          </el-row>
          <!-- <el-row :gutter="25">
            <el-col :span="24">
              <el-card title="Chi tiet san pham">
                <div class="prodoutDetail__desc">hh</div>
              </el-card>
            </el-col>
          </el-row> -->
        </template>
        <template v-else>
          <el-skeleton animated>
            <template #template>
              <div style="margin-top: 10px">
                <el-skeleton-item variant="p" style="width: 50%" />
                <el-skeleton-item variant="text" style="margin-right: 16px" />
                <el-skeleton-item variant="text" />
              </div>
            </template>
          </el-skeleton>
        </template>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import anh1 from '@/assets/pro-6.webp'
import { onMounted, ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getProductById } from '../services/ProductService'
import { CartFrame, useCartStore } from '../stores/Cart'
import { isValidToken } from '../helper/isValidToken'
import { ElMessage } from 'element-plus'

const images = [
  new URL('@/assets/clother1.webp', import.meta.url).href,
  new URL('@/assets/clother2.webp', import.meta.url).href,
  new URL('@/assets/clother3.webp', import.meta.url).href,
  new URL('@/assets/clother4.webp', import.meta.url).href,
  new URL('@/assets/clother6.webp', import.meta.url).href,
  new URL('@/assets/pro-1-1.webp', import.meta.url).href,
]

const value = ref('')
const route = useRoute()
const productId = route.params.id
const data = ref<CartFrame>()
const num = ref<number>(1)
const isValidToken1 = isValidToken()
const router = useRouter()
const loading = ref<boolean>(false)

onMounted(() => {
  const fetchAPI = async () => {
    const res = await getProductById(`product/${productId}`)
    data.value = res.data
  }
  fetchAPI()
})

const cartStore = useCartStore()

const handleAdd = () => {
  if (!isValidToken1) {
    ElMessage.error('Oops, this is a error message.')
    router.push('/login')
  }
  loading.value = true

  cartStore.handleAddProduct({
    id: data.value.id,
    title: data.value.title,
    description: data.value.description,
    price: data.value.price,
    quantity: num.value,
    thumnail: data.value?.picture,
  })
  loading.value = false
  ElMessage({
    message: 'Congrats, this is a success message.',
    type: 'success',
  })
}

const options = [
  {
    value: 'XL',
    label: 'XL',
  },
  {
    value: 'L',
    label: 'L',
  },
  {
    value: 'S',
    label: 'S',
  },
  {
    value: 'M',
    label: 'M',
  },
]

const handleBuy = () => {
  console.log('hello world')
  if (!isValidToken1) {
    router.push('/login')
  }
}

watchEffect(() => {
  console.log(cartStore)
})
</script>

<style scoped lang="scss">
.productDetail {
  margin-top: 50px;

  &__subtitle {
    font-size: 20px;
    font-weight: bold;

    span {
      padding: 3px 5px;
      background-color: #ee4d2d;
      color: #fff;
      font-size: 14px;
    }
  }

  &__img {
    margin-bottom: 20px !important;
    aspect-ratio: 1/1;
  }

  &__req,
  &__desc {
    margin: 35px 0;
  }

  &__rate {
    margin: 35px 0;
  }

  &__price {
    margin: 35px 0;
  }

  &__quantity {
    margin: 35px 0;
  }

  &__button {
    margin: 35px 0;
  }
}
</style>
