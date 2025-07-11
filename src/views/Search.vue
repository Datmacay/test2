<template>
  <div class="page-container" style="padding-top: 50px;">
    <div class="container">
      <el-row :gutter="20">
        <!-- Sidebar -->
        <el-col :span="4">
          <el-card>
            <h6>Danh Mục</h6>
            <el-menu class="category-menu" v-for="item in categories" :key="item.id">
              <el-menu-item @click="filters.categoryId = item.id">{{ item.name }}</el-menu-item>
            </el-menu>

            <div>
              <h6 class="font-semibold mb-2">Khoảng Giá</h6>
              <div class="flex items-center space-x-2 mb-3">
                <el-input v-model="filters.priceFrom" placeholder="₫ TỪ" size="small" class="w-1/2" />
                <span>-</span>
                <el-input v-model="filters.priceTo" placeholder="₫ ĐẾN" size="small" class="w-1/2" />
              </div>
            </div>

            <div>
              <h3 class="font-semibold mb-2">Size</h3>
              <el-select v-model="filters.size" placeholder="Chọn size" size="small" class="w-full" clearable>
                <el-option label="Small (S)" value="S" />
                <el-option label="Medium (M)" value="M" />
                <el-option label="Large (L)" value="L" />
                <el-option label="XL" value="XL" />
              </el-select>
            </div>

            <div>
              <h3 class="font-semibold mb-2">Màu sắc</h3>
              <el-select v-model="filters.color" placeholder="Chọn màu" size="small" class="w-full" clearable>
                <el-option label="Đen" value="black" />
                <el-option label="Trắng" value="white" />
                <el-option label="Đỏ" value="red" />
                <el-option label="Xanh" value="blue" />
              </el-select>
            </div>

            <el-button type="danger" size="small" @click="applyFilters">ÁP DỤNG</el-button>
            <el-button size="small" @click="resetFilters">RESET</el-button>
          </el-card>
        </el-col>

        <!-- Product Content -->
        <el-col :span="20">
          <!-- Sort Bar -->
          <el-row class="sort-bar" type="flex" justify="space-between" align="middle">
            <el-col :span="8">
              <div style="display: flex;align-items: center;justify-content: space-evenly;">
                <el-button size="small" :type="filters.sortBy === 'popular' ? 'primary' : 'default'"
                  @click="filters.sortBy = 'popular'">
                  Phổ biến
                </el-button>
                <el-button size="small" :type="filters.sortBy === 'newest' ? 'primary' : 'default'"
                  @click="filters.sortBy = 'newest'">
                  Mới nhất
                </el-button>
                <el-button size="small" :type="filters.sortBy === 'bestseller' ? 'primary' : 'default'"
                  @click="filters.sortBy = 'bestseller'">
                  Bán chạy
                </el-button>
                <el-dropdown @command="handlePriceSort">
                  <el-button size="small">
                    Giá <el-icon><arrow-down /></el-icon>
                  </el-button>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item command="asc">Thấp đến cao</el-dropdown-item>
                      <el-dropdown-item command="desc">Cao đến thấp</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </div>
            </el-col>
            <el-col :span="10">
              <el-input v-model="filters.title" placeholder="Tìm kiếm sản phẩm..." class="w-1/2" clearable
                @input="debounceSearch">
                <template #append>
                  <el-button :icon="Search" />
                </template>
              </el-input>
            </el-col>
          </el-row>

          <!-- Product Grid -->
          <el-row class="product" :gutter="20">
            <template v-if="filteredProducts?.length > 0">
              <el-col v-for="item in filteredProducts" :key="item?.id" :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
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
                        <span style="float: right">Còn lại: {{ item?.quantity }} SP</span>
                      </div>
                    </div>
                  </div>
                </RouterLink>
              </el-col>
            </template>
            <template v-else-if="isLoading">
              <el-col v-for="index in 4" :key="index" :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
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
            <template v-else>
              <el-col :span="24">
                <div class="text-center py-8">
                  <p>Không tìm thấy sản phẩm nào</p>
                </div>
              </el-col>
            </template>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search, ArrowDown } from '@element-plus/icons-vue'
import { onMounted, ref, reactive, computed, watch } from 'vue'
import { getCategories, getProducts, search } from '../services/ProductService'
import axios from 'axios'

// Đối tượng reactive chứa tất cả dữ liệu lọc
const filters = reactive({
  categoryId: null,
  priceFrom: '',
  priceTo: '',
  size: null,
  color: null,
  priceSort: null, // asc, desc
  title: ''
})

// Dữ liệu
const products = ref([])
const categories = ref([])
const isLoading = ref(true)

// Computed để lọc và sắp xếp sản phẩm
const filteredProducts = computed(() => {
  let result = [...products.value]

  // Lọc theo danh mục
  if (filters.categoryId) {
    result = result.filter(item => item.categoryId === filters.categoryId)
  }

  // Lọc theo khoảng giá
  if (filters.priceFrom) {
    result = result.filter(item => item.price >= Number(filters.priceFrom))
  }
  if (filters.priceTo) {
    result = result.filter(item => item.price <= Number(filters.priceTo))
  }

  // Lọc theo size
  if (filters.size) {
    result = result.filter(item => item.sizes?.includes(filters.size))
  }

  // Lọc theo màu
  if (filters.color) {
    result = result.filter(item => item.colors?.includes(filters.color))
  }

  // Lọc theo tìm kiếm
  if (filters.title) {
    result = result.filter(item =>
      item.title.toLowerCase().includes(filters.title.toLowerCase())
    )
  }

  // Sắp xếp
  if (filters.priceSort) {
    result.sort((a, b) => {
      return filters.priceSort === 'asc' ? a.price - b.price : b.price - a.price
    })
  } else {
    // Sắp xếp theo loại khác
    switch (filters.sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        break
      case 'bestseller':
        result.sort((a, b) => b.sold - a.sold)
        break
      default:
        // popular - có thể sắp xếp theo rating hoặc view
        result.sort((a, b) => b.rating - a.rating)
    }
  }

  return result
})

// Debounce cho tìm kiếm
let searchTimeout: NodeJS.Timeout
const debounceSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    // Tìm kiếm được thực hiện tự động thông qua computed
  }, 300)
}

// Xử lý sắp xếp giá
const handlePriceSort = (command: string) => {
  filters.priceSort = command
  filters.sortBy = null // Reset sort by khi sắp xếp theo giá
}

// Áp dụng bộ lọc
const applyFilters = async () => {
  const searchParams: string[] = []

  if (filters.categoryId !== null && filters.categoryId !== undefined) {
    searchParams.push(`category_id:${filters.categoryId}`)
  }

  if (filters.title && filters.title.trim() !== '') {
    searchParams.push(`title~${filters.title}`)
  }

  if (filters.priceFrom !== '' && filters.priceFrom !== null && filters.priceFrom !== undefined) {
    searchParams.push(`price>${filters.priceFrom}`)
  }

  if (filters.priceTo !== '' && filters.priceTo !== null && filters.priceTo !== undefined) {
    searchParams.push(`price<${filters.priceTo}`)
  }

  if (filters.color && filters.color !== undefined) {
    searchParams.push(`color~${filters.color}`)
  }

  if (filters.size && filters.size !== undefined) {
    searchParams.push(`size~${filters.size}`)
  }

  const searchQuery = searchParams.join(',')
  const res = await search(`search=${searchQuery}`)
  products.value = res.data
}


// Reset bộ lọc
const resetFilters = () => {
  Object.assign(filters, {
    categoryId: null,
    priceFrom: '',
    priceTo: '',
    size: null,
    color: null,
    sortBy: 'popular',
    priceSort: null,
    searchText: ''
  })
}

// Fetch dữ liệu
const fetchProducts = async () => {
  try {
    isLoading.value = true
    const res = await getProducts('product/search')
    products.value = res.data
  } catch (error) {
    console.error('Lỗi khi tải sản phẩm:', error)
  } finally {
    isLoading.value = false
  }
}

const fetchCategories = async () => {
  try {
    const res = await getCategories('category')
    categories.value = res.data
  } catch (error) {
    console.error('Lỗi khi tải danh mục:', error)
  }
}

// Watch để log thay đổi filters (có thể bỏ trong production)
watch(filters, (newFilters) => {
  console.log('Filters changed:', newFilters)
}, { deep: true })

onMounted(() => {
  fetchProducts()
  fetchCategories()
})
</script>

<style scoped lang="scss">
.product {
  &__img {
    position: relative;
    overflow: hidden;

    &--wrap {
      aspect-ratio: 1/1;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;

        &:hover {
          transform: scale(1.1);
        }
      }
    }
  }

  &__box {
    margin-top: 25px;
    border: 1px solid #ddd;
  }

  &__bage {
    position: absolute;
    right: 15px;
    top: 15px;
    padding: 0px 10px;
    background-color: #a749ff;
    border-radius: 2px;
    color: #fff;
    font-size: 13px;
  }

  &__content {
    padding: 20px;
  }

  &__cart {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__love,
  &__eye {
    width: 50px;
    height: 50px;
    color: #fff;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  &__eye::before {
    position: absolute;
    width: 1px;
    background-color: #fff;
    content: '';
    left: 0;
    top: 0;
    height: 100%;
  }

  &__love::after {
    position: absolute;
    width: 1px;
    background-color: #fff;
    content: '';
    right: 0;
    height: 100%;
  }

  &__add {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    color: #fff;

    i {
      margin-right: 5px;
    }
  }

  &__hidden1 {
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: #a749ff;
    opacity: 0;
    transform: translateY(100%);
    transition:
      opacity 0.3s ease,
      transform 0.3s ease;
  }

  &__box:hover &__hidden1 {
    opacity: 1;
    transform: translateY(0);
  }

  &__title {
    font-size: 18px;
  }

  &__subtitle {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &__req {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__price {
    margin: 10px 0;
    font-size: 14px;
  }
}
</style>