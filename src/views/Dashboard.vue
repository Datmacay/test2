<template>
  <el-table
    :data="tableData"
    row-key="id"
    lazy
    :load="loadChildren"
    :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    style="width: 100%"
  >
    <el-table-column prop="name" label="Name" />
  </el-table>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

interface TreeNode {
  id: number
  name: string
  hasChildren?: boolean
  children?: TreeNode[]
}

const tableData = ref<TreeNode[]>([
  { id: 1, name: 'Folder 1', hasChildren: true },
  { id: 2, name: 'Folder 2', hasChildren: true },
])

const loadChildren = (
  row: TreeNode,
  treeNode: unknown,
  resolve: (children: TreeNode[]) => void,
) => {
  console.log('Loading children for:', row)

  // Mô phỏng gọi API async bằng setTimeout
  setTimeout(() => {
    const children = [
      { id: row.id * 10 + 1, name: `${row.name} - Child 1` },
      { id: row.id * 10 + 2, name: `${row.name} - Child 2` },
    ]
    resolve(children)
  }, 1000)
}
</script>
