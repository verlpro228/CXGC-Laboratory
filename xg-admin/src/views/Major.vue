<template>
  <div class="major-container">
    <div class="head-main">
      <div class="btns">
        <el-button size="small" :icon="CirclePlusFilled" @click="open(null)">新增专业</el-button>
      </div>
    </div>

    <el-table class="main-table" :data="tableData" style="width: 100%;" row-key="id"
      element-loading-background="rgba(255, 255, 255, 0.7)">
      <el-table-column type="selection" width="55" :reserve-selection="true" />
      <el-table-column prop="id" label="ID" sortable min-width="50" fixed="left" />
      <el-table-column prop="specialtyName" label="专业名称" min-width="150" />
      <el-table-column prop="collegeName" label="所属学院" />
      <el-table-column label="操作" fixed="right" width="200">
        <template #default="scope">
          <el-button style="border-radius: 10px;" size="small" :icon="Edit" @click="open(scope.row)">编辑</el-button>
          <el-button style="border-radius: 10px;" size="small" :icon="Delete" type="danger"
            @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog 
      v-model="dialogFormVisible" 
      :before-close="beforeClose" 
      :title="dialogTitle" 
      width="500"
    >
      <el-form 
        :model="form" 
        :rules="rules" 
        ref="formRef" 
        label-width="120px"
      >
        <el-form-item label="专业名称" prop="specialtyName">
          <el-input v-model="form.specialtyName" placeholder="请输入专业名称" />
        </el-form-item>

        <el-form-item label="所属学院" prop="collegeName">
          <el-select v-model="form.collegeName" placeholder="请选择所属学院" style="width: 100%">
            <el-option v-for="item in collegeOptions" :key="item.id" :label="item.collegeName"
              :value="item.collegeName" />
          </el-select>
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
import { ref, reactive, nextTick, onMounted } from "vue"
import { CirclePlusFilled, Edit, Delete } from '@element-plus/icons-vue'
import { majorList, deleteMajor, collegeList, addMajor, updateMajor } from '../api/index.js'
import { ElMessage, ElMessageBox } from 'element-plus'



const tableData = ref([])
// 学院select列表
const collegeOptions = ref([])

const getMajorList = () => {
  majorList().then(({ data }) => {
    console.log(data)
    tableData.value = data.data
  })
}

// 获取学院列表
const getCollegeList = () => {
  collegeList().then(({ data }) => {
    console.log('学院列表:', data)
    collegeOptions.value = data.data || []
  })
}

onMounted(() => {
  getMajorList()
  getCollegeList()
})

// 弹窗显示与隐藏
const dialogFormVisible = ref(false)
// 弹窗标题
const dialogTitle = ref('新增专业')

const formRef = ref(null)

const form = reactive({
  specialtyName: '',
  collegeName: ''
})

// 弹窗关闭前的回调函数
const beforeClose = () => {
  dialogFormVisible.value = false
  formRef.value.resetFields()
}


const rules = reactive({
  collegeName: [{
    required: true,
    message: '请选择所属学院',
    trigger: 'change'
  }],
  specialtyName: [{
    required: true,
    message: '请输入专业名称',
    trigger: 'blur'
  }]
})

// 当前编辑的学院ID
const currentId = ref(null)

// 打开弹窗
const open = (rowData = {}) => {
  dialogFormVisible.value = true
  dialogTitle.value = rowData ? '编辑专业' : '新增专业'
  nextTick(() => {
    if(rowData){
      currentId.value = rowData.id
      Object.assign(form, { collegeName: rowData.collegeName, specialtyName: rowData.specialtyName})
    }else{
      currentId.value = null
      formRef.value?.resetFields()
    }
  })
}

const confirm = async () => {
  if(!formRef.value) return
  await formRef.value.validate((valid)=>{
    if(valid){
      const selectedCollege = collegeOptions.value.find(item => 
        item.collegeName === form.collegeName
      )
      const data = { collegeId: selectedCollege?.id, collegeName: form.collegeName, specialtyName: form.specialtyName}
      // 如果有currentId，则表示是编辑
      const request = currentId.value ? updateMajor({...data, id: currentId.value}) : addMajor(data)
      request.then(() => {
        dialogFormVisible.value = false
        formRef.value.resetFields()
        ElMessage.success(currentId.value ? '修改成功' : '添加成功')
        currentId.value = null
        getMajorList()
      })
    }
  })
}



// 删除专业
const handleDelete = (row) => {
  ElMessageBox.confirm('确认删除专业吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    deleteMajor(row.id).then(() => {
      getMajorList()
    })
  })
}




</script>


<style lang='scss' scoped>
.major-container {
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