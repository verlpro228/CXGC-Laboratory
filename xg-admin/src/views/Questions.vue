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
      <el-table-column prop="id" label="ID" sortable min-width="50" fixed="left" />
      <el-table-column prop="title" label="问题标题" min-width="120" />
      <el-table-column prop="content" label="问题内容" min-width="200" />
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
        <el-form-item label="问题标题" prop="title">
          <el-input clearable v-model="form.title" placeholder="请输入问题标题" />
        </el-form-item>
        <el-form-item label="问题内容" prop="content">
          <el-input type="textarea" clearable :rows="4" v-model="form.content" placeholder="请输入问题内容" />
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
import { questionList,addQuestion,updateQuestion,deleteQuestion } from '../api/index'
import { CirclePlusFilled, Delete, Edit } from '@element-plus/icons-vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { ref,reactive, onMounted,nextTick  } from 'vue'


const currentId = ref(null)
const tableData = ref([])
const dialogFormVisible = ref(false)
const dialogTitle = ref('新增问题')
const formRef = ref(null)

const beforeClose = ()=>{
  dialogFormVisible.value = false
  formRef.value.resetFields()
}

const form = reactive({
  title:'',
  content:''
})
const handleDelete = (row)=>{
  ElMessageBox.confirm('确认删除吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    deleteQuestion(row.id).then(() => {
      ElMessage.success('删除成功')
      getQuestionsList()
    })
  })
}

const rules = reactive({
  title: [
    { required: true, message: '请输入问题标题', trigger: 'blur' }
  ],
  content: [
    { required: true, message: '请输入问题内容', trigger: 'blur' }
  ]
})

const getQuestionsList=()=>{
  questionList().then(({data})=>{
    console.log(data)
    tableData.value = data.data
  })
}

const open=(rowData = {})=>{
  dialogFormVisible.value = true
  dialogTitle.value = rowData ? '编辑问题' : '新增问题'
  nextTick(()=>{
    if(rowData){
      currentId.value = rowData.id
      Object.assign(form,{title:rowData.title,content:rowData.content})
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
      const data = {title:form.title,content:form.content}
      const request = currentId.value ? updateQuestion({...data,id:currentId.value}) : addQuestion(data)
      request.then(()=>{
        ElMessage.success(currentId.value ? '修改成功' : '添加成功')
        dialogFormVisible.value = false
        formRef.value.resetFields()
        currentId.value = null
        getQuestionsList()
      })
    }
  })
}


onMounted(()=>{
  getQuestionsList()
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