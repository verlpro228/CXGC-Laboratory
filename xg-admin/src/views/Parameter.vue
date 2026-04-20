<template>
  <div class="specialty-container">
    <div class="head-main">
      <div class="btns">
        <el-button size="small" :icon="Pointer" @click="addQQCode">新增QQ二维码</el-button>
      </div>
    </div>


    <el-table class="main-table" :data="configListData" style="width: 100%;" row-key="id"
      element-loading-background="rgba(255, 255, 255, 0.7)">
      <el-table-column type="selection" width="55" :reserve-selection="true" />
      <el-table-column prop="id" label="ID" sortable min-width="50" fixed="left" />
      <el-table-column prop="configKey" label="配置项" min-width="150" />
      <el-table-column prop="configValue" label="配置值" min-width="250" show-overflow-tooltip />
      <el-table-column prop="description" label="配置描述" min-width="120" />
      <el-table-column prop="updateTime" label="更新时间" min-width="120" />
      <el-table-column label="操作" fixed="right" min-width="100">
        <template #default="scope">
          <el-button style="border-radius: 10px;" size="small" :icon="Edit"
            @click="handleEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogFormVisible" :before-close="beforeClose" title="编辑配置值" width="500">
      <el-form :model="form" :rules="rules" ref="formRef" label-width="120px">
        <el-form-item label="配置值" prop="configValue">
          <el-input clearable v-model="form.configValue" placeholder="请输入配置值" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="confirm(formRef)">确认</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 新增QQ二维码弹窗 -->
    <el-dialog v-model="qqCodeDialogVisible" title="上传QQ群二维码" width="400">
      <div class="upload-area" @click="triggerFileInput">
        <input ref="fileInput" type="file" accept="image/*" style="display: none" @change="handleFileChange" />
        <div v-if="!selectedFile" class="upload-placeholder">
          <el-icon :size="48" color="#909399">
            <Plus />
          </el-icon>
          <p style="margin-top: 10px; color: #909399;">点击选择图片</p>
        </div>
        <div v-else class="preview-area">
          <img :src="previewUrl" style="max-width: 100%; max-height: 300px;" />
          <p style="margin-top: 10px; color: #67c23a;">{{ selectedFile.name }}</p>
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="qqCodeDialogVisible = false">取消</el-button>
          <el-button type="primary" :disabled="!selectedFile" @click="uploadQQCode">上传</el-button>
        </div>
      </template>
    </el-dialog>


  </div>
</template>


<script setup>
import { Edit, Pointer, Plus } from '@element-plus/icons-vue'
import { configList, updateConfig, qqQrcodeUpload } from '../api/index'
import { onMounted, ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'



const configListData = ref([])

const dialogFormVisible = ref(false)
const formRef = ref(null)

// QQ二维码弹窗相关
const qqCodeDialogVisible = ref(false)    // 控制弹窗显示/隐藏
const fileInput = ref(null)              // 引用隐藏的文件输入框
const selectedFile = ref(null)          // 存储选中的文件对象
const previewUrl = ref('')             // 图片预览的临时URL




const form = reactive({
  configValue: ''
})
const rules = reactive({
  configValue: [
    { required: true, message: '请输入配置值', trigger: 'blur' }
  ]
})

// 存取当前编辑的行数据
const currentRow = ref({})

const handleEdit = (row) => {
  dialogFormVisible.value = true
  currentRow.value = row
  form.configValue = row.configValue
}

const confirm = async (formEl) => {
  await formEl.validate()
  await updateConfig({ ...currentRow.value, configValue: form.configValue })
  dialogFormVisible.value = false
  getConfigListData()
}

const beforeClose = () => {
  dialogFormVisible.value = false
  formRef.value?.resetFields()
}
onMounted(() => {
  getConfigListData()
})

const getConfigListData = () => {
  configList().then(({ data }) => {
    console.log(data, '配置数据')
    configListData.value = data.data
  })
}

const addQQCode = () => {
  selectedFile.value = null
  previewUrl.value = ''
  qqCodeDialogVisible.value = true
}

const triggerFileInput = () => fileInput.value?.click()

const handleFileChange = (e) => {
  const file = e.target.files[0]
  if (!file) return
  if (file.size > 2 * 1024 * 1024) {
    ElMessage.error('图片大小不能超过 2MB')
    e.target.value = ''
    return
  }
  selectedFile.value = file
  previewUrl.value = URL.createObjectURL(file)
}

const uploadQQCode = async () => {
  if (!selectedFile.value) return
  try {
    // 创建 FormData 对象并添加文件
    const formData = new FormData()
    formData.append('file', selectedFile.value)
    // 发送上传请求
    const { data } = await qqQrcodeUpload(formData)
    // 从响应中提取文件路径
    const filePath = data.data?.filePath || data.data?.url || data.data
    const qrConfig = configListData.value.find(item => item.configKey === 'qq_group_qrcode_path')
    if (qrConfig) await updateConfig({ ...qrConfig, configValue: filePath })
    await getConfigListData()
    qqCodeDialogVisible.value = false
    selectedFile.value = null
    previewUrl.value = ''
    ElMessage.success('二维码上传成功')
  } catch (error) {
    ElMessage.error('上传失败')
  }
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

  .upload-area {
    border: 2px dashed rgba(255, 255, 255, 0.3);
    border-radius: 15px;
    padding: 40px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      border-color: rgba(255, 255, 255, 0.6);
      background-color: rgba(255, 255, 255, 0.05);
    }

    .upload-placeholder {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .preview-area {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
}
</style>