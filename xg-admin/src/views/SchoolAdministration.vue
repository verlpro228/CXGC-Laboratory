<template>
  <div class="specialty-container">
    <div class="head-main">
      <div class="btns">
        <el-button size="small" :icon="CirclePlusFilled" @click="open(null)">新增学院</el-button>
      </div>
    </div>

    <el-table 
      class="main-table" 
      :data="tableData" 
      style="width: 100%;" 
      row-key="id"
      element-loading-background="rgba(255, 255, 255, 0.7)" 
    >
      <el-table-column type="selection" width="55" :reserve-selection="true" />
      <el-table-column prop="id" label="ID" sortable min-width="120" fixed="left" />
      <el-table-column prop="collegeName" label="学院名称" min-width="150" />
      <el-table-column label="操作" fixed="right">
        <template #default="scope">
          <el-button style="border-radius: 10px;" size="small" :icon="Edit" @click="open(scope.row)">编辑</el-button>
          <el-button style="border-radius: 10px;" size="small" :icon="Delete" type="danger"
            @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogFormVisible" :before-close="beforeClose" :title="dialogTitle" width="500">
      <el-form :model="form" :rules="rules" ref="formRef" label-width="120px">
        <el-form-item label="学院名称" prop="collegeName">
          <el-input v-model="form.collegeName" placeholder="请输入学院名称" />
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
import { CirclePlusFilled, Delete, Edit } from '@element-plus/icons-vue'
import { ref, reactive, nextTick, onMounted } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { collegeList, deleteCollege, addCollege, updateCollege } from '../api/index'



// 当前编辑的学院ID
const currentId = ref(null)

const confirm = async () => {
  if (!formRef.value) return
  await formRef.value.validate((valid) => {
    if (valid) {
      const data = { collegeName: form.collegeName }
      // 如果有currentId，说明是编辑
      const request = currentId.value ? updateCollege({ ...data, id: currentId.value }) : addCollege(data)
      request.then(() => {
        ElMessage.success(currentId.value ? '修改成功' : '添加成功')
        dialogFormVisible.value = false
        formRef.value.resetFields()
        currentId.value = null
        getCollegeList()
      })
    }
  })
}

const tableData = ref([])

// 获取学院信息列表
const getCollegeList = () => {
  collegeList().then(({ data }) => {
    console.log(data)
    tableData.value = data.data
  })
}

onMounted(() => {
  getCollegeList()
})



// 弹窗显示与隐藏
const dialogFormVisible = ref(false)
const dialogTitle = ref('新增学院')
const open = (rowData = null) => {
  dialogFormVisible.value = true
  dialogTitle.value = rowData ? '编辑学院' : '新增学院'
  nextTick(() => {
    if (rowData) {
      currentId.value = rowData.id
      Object.assign(form, { collegeName: rowData.collegeName })
    } else {
      currentId.value = null
      formRef.value?.resetFields()
    }
  })
}

// 弹窗关闭前的回调函数
const beforeClose = () => {
  dialogFormVisible.value = false
  formRef.value.resetFields()
}

const form = reactive({
  collegeName: ''
})
const formRef = ref()
const rules = reactive({
  collegeName: [{
    required: true,
    message: '请输入学院名称',
    trigger: 'blur'
  }]
})

// 删除学院
const handleDelete = (row) => {
  ElMessageBox.confirm('确认删除学院吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    deleteCollege(row.id).then(() => {
      getCollegeList()
    })
  })
}


</script>


<style lang='less' scoped>
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


  .pagination-info {
    background-color: transparent;
    padding: 15px;
    margin-top: 10px;

    :deep(.el-pagination) {
      display: flex;
      align-items: center;
      gap: 8px;

      .btn-prev,
      .btn-next {
        background-color: rgba(255, 255, 255, 0.15) !important;
        border: 1px solid rgba(255, 255, 255, 0.3) !important;
        color: #111 !important;
        border-radius: 10px;
        padding: 0 10px;
        height: 28px;
        transition: all 0.3s ease;

        &:hover:not(:disabled) {
          background-color: rgba(255, 255, 255, 0.25) !important;
          box-shadow: 0 0 8px rgba(255, 255, 255, 0.2);
        }

        &:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
      }

      .el-pager {
        display: flex;
        gap: 6px;

        li {
          background-color: rgba(255, 255, 255, 0.15) !important;
          border: 1px solid rgba(255, 255, 255, 0.3) !important;
          color: #555 !important;
          border-radius: 15px;
          min-width: 28px;
          height: 28px;
          line-height: 26px;
          margin: 0 3px;
          transition: all 0.3s ease;

          &:hover {
            background-color: rgba(255, 255, 255, 0.25) !important;
            transform: translateY(-1px);
          }

          &.is-active {
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.6)) !important;
            border-color: rgba(255, 255, 255, 0.5) !important;
            color: #555 !important;
            font-weight: 600;
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
          }
        }
      }

      .el-pagination__total {
        color: #555 !important;
        font-weight: 500;
        margin-right: 5px;
      }
    }
  }
}
</style>