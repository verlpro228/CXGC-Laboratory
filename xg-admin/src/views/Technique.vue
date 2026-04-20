<template>
  <div class="specialty-container">
    <div class="head-main">
      <div class="btns">
        <el-button size="small" :icon="CirclePlusFilled" @click="open(null)">新增荣誉</el-button>
      </div>
    </div>

    <el-table class="main-table" :data="techDirectionListData" style="width: 100%;" row-key="id"
      element-loading-background="rgba(255, 255, 255, 0.7)">
      <el-table-column type="selection" width="55" :reserve-selection="true" />
      <el-table-column prop="id" label="ID" sortable min-width="30" fixed="left" />
      <el-table-column prop="tile" label="部门名称" min-width="80" />
      <el-table-column prop="content" label="部门描述" min-width="200" />
      <el-table-column prop="descList" label="部门特点" min-width="120" />
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
        <el-form-item label="部门名称" prop="tile">
          <el-input clearable v-model="form.tile" placeholder="请输入部门名称" />
        </el-form-item>
        <el-form-item label="部门描述" prop="content">
          <el-input clearable v-model="form.content" placeholder="请输入部门描述" />
        </el-form-item>
        <el-form-item label="部门特点" prop="descList">
          <el-input clearable v-model="form.descList" placeholder="请输入部门特点,用逗号隔开" />
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
import { techDirectionList, addTechDirection, updateTechDirection, deleteTechDirection } from '../api/index'
import { ElMessage, ElMessageBox } from 'element-plus'
import { CirclePlusFilled, Edit, Delete } from '@element-plus/icons-vue'



const techDirectionListData = ref([])

const getTechDirectionList = () => {
  techDirectionList().then(({ data }) => {
    console.log(data, '部门数据')
    techDirectionListData.value = data.data
  })
}

const rules = reactive({
  tile: [
    { required: true, message: '请输入部门名称', trigger: 'blur' }
  ],
  content: [
    { required: true, message: '请输入部门描述', trigger: 'blur' }
  ],
  descList: [
    { required: true, message: '请输入部门特点,用逗号隔开', trigger: 'blur' }
  ],
  tagsList: [
    { required: true, message: '请输入技术标签,用逗号隔开', trigger: 'blur' }
  ]
})
const form = reactive({
  tile: '',
  content: '',
  descList: [],
  tagsList: []
})
const currentId = ref(null)
const formRef = ref(null)

const beforeClose = () => {
  dialogFormVisible.value = false
  formRef.value.resetFields()
}
const dialogFormVisible = ref(false)
const dialogTitle = ref('新增部门')
const handleDelete = (rowData) => {
  ElMessageBox.confirm('确认删除该部门吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    deleteTechDirection(rowData.id).then(() => {
      ElMessage.success('删除成功')
      getTechDirectionList()
    })
  })
}

const confirm = async () => {
  if (!formRef.value) return
  await formRef.value.validate((valid) => {
    if (valid) {
      const data = {
        tile: form.tile,
        content: form.content,
        descList: typeof form.descList === 'string' ? form.descList.split(',').map(item => item.trim()) : form.descList,
        tagsList: typeof form.tagsList === 'string' ? form.tagsList.split(',').map(item => item.trim()) : form.tagsList
      }
      const request = currentId.value ? updateTechDirection({ ...data, id: currentId.value }) : addTechDirection(data)
      request.then(() => {
        ElMessage.success(currentId.value ? '更新成功' : '添加成功')
        dialogFormVisible.value = false
        formRef.value.resetFields()
        currentId.value = null
        getTechDirectionList()
      })
    }
  })
}


const open = (rowData = {}) => {
  dialogFormVisible.value = true
  dialogTitle.value = rowData ? '编辑部门' : '添加部门'
  nextTick(() => {
    if (rowData) {
      currentId.value = rowData.id
      Object.assign(form, { tile: rowData.tile, content: rowData.content, descList: rowData.descList, tagsList: rowData.tagsList })
    } else {
      currentId.value = null
      formRef.value?.resetFields()
    }
  })
}


onMounted(() => {
  getTechDirectionList()
})

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