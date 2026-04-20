<template>
  <div class="specialty-container">
    <div class="head-main">
      <div class="btns">
        <el-button size="small" :icon="CirclePlusFilled" @click="open(null)">新增荣誉</el-button>
        <el-button size="small" :icon="Histogram" type="warning" @click="toggleSortMode">
          {{ isSortMode ? '退出排序' : '点击拖拽排序' }}
        </el-button>
        <el-button v-if="isSortMode" :icon="Pointer" size="small" type="success" @click="saveSort">保存排序</el-button>
      </div>
    </div>

    <el-table ref="tableRef" class="main-table" :data="honorListData" style="width: 100%;" row-key="id"
      element-loading-background="rgba(255, 255, 255, 0.7)" :class="{ 'sortable-table': isSortMode }">
      <el-table-column type="selection" width="55" :reserve-selection="true" />
      <el-table-column prop="id" label="ID" sortable min-width="50" fixed="left" />
      <el-table-column prop="tile" label="荣誉名称" min-width="120" />
      <el-table-column prop="ward" label="荣誉级别" min-width="100" />
      <el-table-column prop="tagsList" label="技术标签" />
      <el-table-column label="操作" fixed="right" min-width="100">
        <template #default="scope">
          <el-button style="border-radius: 10px;" size="small" :icon="Edit" @click="open(scope.row)">编辑</el-button>
          <el-button style="border-radius: 10px;" size="small" :icon="Delete" type="danger"
            @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogFormVisible" :before-close="beforeClose" :title="dialogTitle" width="500">
      <el-form :model="form" :rules="rules" ref="formRef" label-width="120px">
        <el-form-item label="荣誉名称" prop="tile">
          <el-input clearable v-model="form.tile" placeholder="请输入荣誉名称" />
        </el-form-item>
        <el-form-item label="荣誉级别" prop="ward">
          <el-input clearable v-model="form.ward" placeholder="请输入荣誉级别" />
        </el-form-item>
        <el-form-item label="技术标签" prop="tagsList">
          <el-input type="textarea" clearable :rows="2" v-model="form.tagsList" placeholder="请输入技术标签,用逗号隔开" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="confirm(formRef)">确认</el-button>
        </div>
      </template>
    </el-dialog>

  </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick } from 'vue'
import { honorList, addHonor, updateHonor, deleteHonor, updateSort } from '../api/index'
import { CirclePlusFilled, Edit, Delete, Histogram, Pointer } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import Sortable from 'sortablejs'


// 荣誉列表
const honorListData = ref([])
const tableRef = ref(null)
const isSortMode = ref(false)
let sortable = null

onMounted(() => {
  getHonorList()
})

const dialogFormVisible = ref(false)

const getHonorList = () => {
  honorList().then(({ data }) => {
    console.log(data, '荣誉列表数据')
    honorListData.value = data.data
  })
}

const formRef = ref(null)
const form = reactive({
  tile: '',
  ward: '',
  tagsList: []
})

const toList = (value) => Array.isArray(value)
  ? value
  : String(value || '').split(',').map(item => item.trim()).filter(Boolean)

const rules = reactive({
  tile: [
    { required: true, message: '请输入荣誉名称', trigger: 'blur' }
  ],
  ward: [
    { required: true, message: '请输入荣誉级别', trigger: 'blur' }
  ],
  tagsList: [
    { required: true, message: '请选择技术标签,用逗号隔开', trigger: 'blur' }
  ]
})

const beforeClose = () => {
  dialogFormVisible.value = false
  formRef.value.resetFields()

}

const currentId = ref(null)
const dialogTitle = ref('新增荣誉')


const open = (rowData = {}) => {
  dialogFormVisible.value = true
  dialogTitle.value = rowData ? '编辑荣誉' : '新增荣誉'
  nextTick(() => {
    if (rowData) {
      currentId.value = rowData.id
      Object.assign(form, { tile: rowData.tile, ward: rowData.ward, tagsList: rowData.tagsList })
    } else {
      currentId.value = null
      formRef.value?.resetFields()
    }
  })
}


const confirm = async () => {
  if (!formRef.value) return
  await formRef.value.validate((valid) => {
    if (valid) {
      const data = { tile: form.tile, ward: form.ward, tagsList: toList(form.tagsList) }
      const request = currentId.value ? updateHonor({ ...data, id: currentId.value }) : addHonor(data)
      request.then(() => {
        ElMessage.success(currentId.value ? '修改成功' : '添加成功')
        dialogFormVisible.value = false
        formRef.value.resetFields()
        currentId.value = null
        getHonorList()
      })
    }
  })
}



const handleDelete = (row) => {
  ElMessageBox.confirm('此操作将永久删除该荣誉, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    deleteHonor(row.id).then(() => {
      ElMessage.success('删除成功')
      getHonorList()
    })
  })
}



// 切换排序模式
const toggleSortMode = () => {
  isSortMode.value = !isSortMode.value
  if (!isSortMode.value) {
    sortable?.destroy()
    sortable = null
    return
  }
  const tbody = tableRef.value?.$el.querySelector('.el-table__body-wrapper tbody')
  if (!tbody) return
  sortable = Sortable.create(tbody, {
    animation: 150,
    handle: '.el-table__row',
    onEnd: ({ newIndex, oldIndex }) => {
      if (newIndex === oldIndex) return
      const item = honorListData.value.splice(oldIndex, 1)[0]
      honorListData.value.splice(newIndex, 0, item)
    }
  })
  ElMessage.warning('已进入拖拽排序模式，拖动行即可调整顺序')
}

// 保存排序
const saveSort = () => {
  const idList = honorListData.value.map(item => item.id)
  console.log('新的排序ID列表:', idList)

  updateSort({ idList }).then(() => {
    ElMessage.success('排序保存成功')
    isSortMode.value = false
    sortable?.destroy()
    sortable = null
  }).catch(() => {
    ElMessage.error('排序保存失败')
  })
}






</script>


<style lang='scss' scoped>
.specialty-container {
  color: rgba(255, 255, 255, 0.9);
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  padding: 10px;
  min-height: 500px;

  .head-main {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .btns {
      display: flex;
      gap: 10px;
      margin-bottom: 10px;

      :deep(.el-button) {
        background-color: rgba(255, 255, 255, 0.1) !important;
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2) !important;
        color: rgba(255, 255, 255, 0.8) !important;
        border-radius: 15px;
        transition: all 0.3s ease;

        &:hover {
          background-color: rgba(255, 255, 255, 0.2) !important;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
        }

        &:active {
          transform: scale(0.98);
        }
      }
    }
  }

  .main-table {
    margin-top: 10px;
    border-radius: 15px;
  }
}
</style>
