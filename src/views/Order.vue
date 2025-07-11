<template>
  <div class="order">
    <div class="container">
      <div class="order__address">
        <el-card class="mt-2">
          <el-row>
            <el-col :span="24">
              <div class="cart__content" style="color: #ee4d2d; font-size: 18px; font-weight: 500">
                Địa chỉ nhận hàng
              </div>
              <input
                class="cart__content"
                v-model="addressRecipt"
                style="border: none; border-bottom: 1px solid #000"
              />
            </el-col>
          </el-row>
        </el-card>
      </div>
      <el-card class="mt-2">
        <template #header>
          <div class="order__header">
            <div>Phương thức thanh toán</div>
            <div>
              <span style="margin-right: 20px">{{ textPaymentMethod }}</span>
              <el-button type="primary" @click="dialogVisible = true">Thay đổi</el-button>

              <el-dialog
                v-model="dialogVisible"
                title="Phương thức thanh toán"
                width="500"
                :before-close="handleClose"
              >
                <div class="order__popup">
                  <el-radio-group v-model="radio1">
                    <el-radio value="COD" size="large">Thanh toán khi nhận hàng</el-radio>
                    <el-radio value="ONL" size="large">Thanh toán Online</el-radio>
                  </el-radio-group>
                </div>
                <template #footer>
                  <div class="dialog-footer">
                    <el-button @click="dialogVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="handleConfirm"> Confirm </el-button>
                  </div>
                </template>
              </el-dialog>
            </div>
          </div>
        </template>
        <div class="cart__product">
          <div style="display: flex; flex-direction: column; align-items: flex-end">
            <span> Tổng tiền hàng : {{ payment?.totalAmount }} VND</span>
            <span style="color: #ee4d2d; font-size: 18px">
              Tổng thanh toán : {{ payment?.totalAmount }} VND</span
            >
          </div>
        </div>
        <template #footer>
          <div class="card-footer">
            <span>Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo Điều khoản Flone</span>
            <el-button style="float: right" type="danger" @click="handlePayment"
              >Đặt hàng</el-button
            >
          </div>
        </template>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePaymentOrder } from '../stores/Order'
import { ref } from 'vue'
import { createOrder } from '../services/OrderService'
import { paymentOnline } from '../services/PaymentService'
import { ElMessage } from 'element-plus'

const token = localStorage.getItem('accessToken')!
const { payment } = storeToRefs(usePaymentOrder())
const addressRecipt = ref<string>('')
const dialogVisible = ref(false)
const radio1 = ref('COD')
const textPaymentMethod = ref('Thanh toán khi nhận hàng')

const handleConfirm = () => {
  textPaymentMethod.value =
    radio1.value === 'COD' ? 'Thanh toán khi nhận hàng' : 'Thanh toán Online'
  dialogVisible.value = false
}
const handleClose = () => {
  dialogVisible.value = false
}

const handlePayment = async () => {
  const responseOrder = await createOrder('order', payment.value, token)
  console.log(radio1.value);
  if (radio1.value === 'ONL') {
    const responsePaymentOnline = await paymentOnline(
      `payment?orderId=${responseOrder?.data?.id}&amount=${payment.value.totalAmount}&orderInfo=Nguời dùng có id ${payment.value.userId} chuyển khoản`,
      token,
    )
    window.location.href = responsePaymentOnline.url;
  }
  if (responseOrder.code === 200) {
    ElMessage({
      message: `Congrats, ${responseOrder.message}`,
      type: 'success',
    })
  } else {
    ElMessage({
      message: `Fail, Not Implement`,
      type: 'error',
    })
  }
}
</script>

<style lang="scss" scoped>
.order {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
