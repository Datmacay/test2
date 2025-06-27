<template>
  <el-autocomplete
    v-model="state1"
    :fetch-suggestions="restaurants"
    clearable
    class="inline-input w-50"
    placeholder="Please Input"
    @select="handleSelect"
  />

  <el-cascader
    :props="{
      expandTrigger: 'hover' as const,
    }"
  />
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'

interface RestaurantItem {
  value: string
  link: string
}

const state1 = ref('')

let restaurants = ref<RestaurantItem[]>([])
// const querySearch = (queryString: string, cb: any) => {
//   const results = queryString
//     ? restaurants.value.filter(createFilter(queryString))
//     : restaurants.value
//   cb(results)
//   // return results;
// }
// const createFilter = (queryString: string) => {
//   return (restaurant: RestaurantItem) => restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
// }
const loadAll = () => {
  return [
    { value: 'vue', link: 'https://github.com/vuejs/vue' },
    { value: 'element', link: 'https://github.com/ElemeFE/element' },
    { value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },
    { value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui' },
    { value: 'vuex', link: 'https://github.com/vuejs/vuex' },
    { value: 'vue-router', link: 'https://github.com/vuejs/vue-router' },
    { value: 'babel', link: 'https://github.com/babel/babel' },
  ]
}

const handleSelect = (item: Record<string, any>) => {
  console.log(item.value)
}

onMounted(() => {
  restaurants.value = loadAll()
})
</script>

<style scoped lang="scss">
.about {
  padding: 100px 0;
}
</style>
