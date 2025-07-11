<template>
  <div class="productDetail">
    <div class="container">
      <el-card style="padding: 20px 0">
        <template v-if="data && reviews">
          <el-row :gutter="50" v-loading="loading">
            <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10">
              <div class="productDetail__wrap">
                <div class="productDetail__img">
                  <img :src="data?.picture" alt="loading..." />
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
                  <span>Kích cỡ :
                    <el-select v-model="value" placeholder="Select" style="width: 240px">
                      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select></span>
                </div>
                <div class="productDetail__quantity">
                  Số Lượng :
                  <el-input-number v-model="num" :min="1" :max="data?.quantity"
                    @change="(value: number) => (num = value)" />
                  <span style="font-size: 14px; color: #ddd; margin-left: 20px">Tồn kho{{ data?.quantity }} sản
                    phẩm</span>
                </div>
                <div class="productDetail__desc">
                  <span>Mô tả : {{ data?.description }} </span>
                </div>
                <div class="productDetail__button">
                  <el-button @click="handleAdd" type="primary">Thêm vào giỏ hàng</el-button>
                </div>
              </div>
            </el-col>
          </el-row>

          <h4>Bình luận sản phẩm</h4>
          <el-row class="add-comment">
            <el-col :span="18">
              <el-input v-model="newComment" placeholder="Nhập bình luận của bạn..." class="comment-input"></el-input>
            </el-col>
            <el-col :span="6">
              <el-button style="margin-left: 10px;" type="primary" @click="addComment">Bình luận</el-button>
            </el-col>
          </el-row>

          <!-- Display comments -->
          <el-divider></el-divider>
          <div v-for="(comment, index) in reviews" :key="index" class="comment">
            <el-row>
              <el-col :span="1">
                <img src="data:image/png;base64,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" alt="avatar" class="avatar" />
              </el-col>
              <el-col :span="23">
                <div class="comment-details">
                  <div class="username">{{ comment?.username }}</div>
                  <div class="time">{{ comment.review_date }}</div>
                  <div class="comment-text">{{ comment.comment }}</div>
                </div>
              </el-col>
            </el-row>
            <el-divider></el-divider>
          </div>

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
import { onMounted, ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getProductById } from '../services/ProductService'
import { CartFrame, useCartStore } from '../stores/Cart'
import { isValidToken } from '../helper/isValidToken'
import { ElMessage } from 'element-plus'
import { getReviews, postReview } from '../services/ReviewService'
import { jwtDecode } from 'jwt-decode'


const token = localStorage.getItem("accessToken")!;
const userId = jwtDecode(token).sub;
const value = ref('')
const route = useRoute()
const productId = route.params.id
const data = ref<CartFrame>()
const num = ref<number>(1)
const isValidToken1 = isValidToken()
const router = useRouter()
const loading = ref<boolean>(false)
const reviews = ref([]);
const newComment = ref('')

// Hàm thêm bình luận mới
async function addComment() {
  
   const res = await postReview("review",{
     comment:newComment.value,
     userId:userId,
     product:productId,
     rating:5,
   },token);

   console.log(res);
}

onMounted(() => {
  const fetchAPI = async () => {
    const res = await getProductById(`product/${productId}`)
    const review = await getReviews("review")
    reviews.value = review.data;
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
  if (!isValidToken1) {
    router.push('/login')
  }
}

watchEffect(() => {
  console.log(reviews.value);
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

.comment-section {
  width: 100%;
  padding: 20px;
}

.add-comment {
  margin-bottom: 20px;
}

.comment-input {
  width: 100%;
}

.comment {
  margin-bottom: 20px;
  border-radius: 8px;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.comment-details {
  padding-left: 10px;
}

.username {
  font-weight: bold;
  font-size: 16px;
}

.time {
  color: #888;
  font-size: 12px;
}

.comment-text {
  margin-top: 10px;
  font-size: 14px;
}
</style>
