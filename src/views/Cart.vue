<template>
  <div class="cart">
    <div class="container">
      <div class="cart__data" v-if="cartStored.length > 0">
        <el-card class="mt-2">
          <el-row>
            <el-col :span="12">
              <div class="cart__checkbox">
                <input type="checkbox" @change="hanldeChangeAll" />
                <span>Card name</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="cart__content">
                <span>Đơn giá</span>
                <span>Số lượng</span>
                <span>Số tiền</span>
                <span>Thao tác</span>
              </div>
            </el-col>
          </el-row>
        </el-card>
        <template v-for="item in cartStored" :key="item.id">
          <el-card class="mt-2">
            <template #header>
              <div class="card-header">
                <span>Card name</span>
              </div>
            </template>
            <div class="cart__product">
              <el-row>
                <el-col :span="12">
                  <div class="cart__checkbox">
                    <input
                      type="checkbox"
                      :checked="choseAll"
                      @change="(e: Event) => handleChange(e, item.id)"
                    />
                    <img :src="item.thumnail" alt="loading..." />
                    <span>{{ item.title }}</span>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="cart__content">
                    <span>{{ item.price }} VND</span>
                    <span>
                      <el-input-number
                        v-model="item.quantity"
                        :min="1"
                        @change="(value: number) => (num = value)"
                      />
                    </span>
                    <span>{{ item.price * item.quantity }} VND</span>
                    <span>
                      <el-button @click="handleDeleteItem(item.id)" type="danger">Xóa</el-button>
                    </span>
                  </div>
                </el-col>
              </el-row>
            </div>
            <template #footer>Footer content</template>
          </el-card>
        </template>
        <el-card class="mt-2">
          <div class="cart__payment">
            <div>
              <div class="cart__chose">
                Tổng cộng ({{ dataBuy.length }} Sản phẩm): {{ filterData }}VND
              </div>
              <el-button @click="handleProcessOrder" type="primary">Mua hàng</el-button>
            </div>
          </div>
        </el-card>
      </div>
      <div v-else>
        <el-empty description="Product Empty">
          <el-button type="primary">
            <RouterLink to="/"> Buy Now </RouterLink>
          </el-button>
        </el-empty>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { CartFrame, useCartStore } from '../stores/Cart'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { ElMessage } from 'element-plus'
import { Purchase, usePaymentOrder } from '../stores/Order'
import { jwtDecode } from 'jwt-decode'

const { handleDelete } = useCartStore()
const { cartStored } = storeToRefs(useCartStore())
const { handleProcessPayment } = usePaymentOrder()
const token = localStorage.getItem('accessToken')!
const userId = jwtDecode(token).sub!;
const route = useRouter();

const dataBuy = ref<CartFrame[]>([])
const num = ref<number>(1)
const choseAll = ref<boolean>(false)

const filterData = computed(() => {
  return dataBuy.value.reduce((accumulator: number, item: CartFrame): number => {
    return accumulator + item.price * item.quantity
  }, 0)
})

const handleChange = (e: Event, id: number) => {
  const { checked } = e.target as HTMLInputElement
  const product = cartStored.value.find((item) => item.id === id)!
  if (checked) {
    //hàm push,splice, unshift thì không cần gán lại thì nó vue nó vẫn hiểu là có sự thay đổi còn riêng thằng filter phải bắt buộc gán lại thì nó mới hiểu là có sự thay đổi
    dataBuy.value.push(product)
  } else {
    //gán lại để dataBuy cập nhập lại giá trị thay đổi
    dataBuy.value = dataBuy.value.filter((item) => {
      return item.id !== id
    })
  }
}

const hanldeChangeAll = () => {
  choseAll.value = !choseAll.value
  if (choseAll.value) {
    dataBuy.value = cartStored.value
  } else {
    dataBuy.value = []
  }
}

const handleDeleteItem = (value: number) => {
  handleDelete(value)
  ElMessage({
    message: 'Congrats, this is a success message.',
    type: 'success',
  })
}

const handleProcessOrder = async () => {
  const dataPurchase: Purchase[] = []
  const listIdProduct: number[] = []

  dataBuy.value.forEach((item: CartFrame) => {
    dataPurchase.push({
      productId: item.id,
      price: item.price,
      quantity: item.quantity,
    })
    listIdProduct.push(item.id)
  })

  // cartStored.value = cartStored.value.filter((item) => !listIdProduct.includes(item.id))

  handleProcessPayment({
    userId: parseInt(userId),
    totalAmount: filterData.value,
    purchaseRequests: dataPurchase,
  });

  route.push("/order");
}
</script>

<style lang="scss" scoped>
.cart {
  padding: 10px;

  &__checkbox {
    display: flex;
    align-items: center;

    img {
      width: 100px;
      height: 100px;
      object-fit: cover;
      margin: 0px 10px;
    }

    span {
      margin-left: 5px;
    }
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: space-around;

    span {
      font-size: 18px;
      font-weight: 500;
      color: #000;
    }
  }

  &__payment {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    div {
      display: flex;
      align-items: center;
    }
  }

  &__chose {
    font-size: 18px;
    margin-right: 10px;
  }
}
</style>
