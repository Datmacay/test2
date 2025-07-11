<template>
    <div class="manageProduct">
        <el-card>
            <div class="manageProduct__table">
                <el-table ref="multipleTableRef" :data="resultFinal" row-key="id" style="width: 100%"
                    v-loading="loading">
                    <el-table-column property="id" label="ID" />
                    <el-table-column property="name" label="Name"/>
                </el-table>
            </div>

        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { TableInstance } from 'element-plus';
import { onMounted, ref } from 'vue'
import { getCategories } from '../services/ProductService';
const multipleTableRef = ref<TableInstance>()
const loading = ref<boolean>(false)
const resultFinal = ref()

const fetchAPI = async () => {
    loading.value = true
    const res = await getCategories(`category`);
    console.log(res);
    resultFinal.value = res.data;
    loading.value = false
}

onMounted(() => {
    fetchAPI()
})
</script>

<style lang="scss" scoped></style>