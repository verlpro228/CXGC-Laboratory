<template>
  <div class="student-list-container">

    <!-- 按钮 -->
    <div class="head-mian">
      <div class="btns">
        <el-button :icon="CopyDocument" size="small" @click="exportAllData">一键导出全部数据</el-button>
        <el-button :icon="CopyDocument" size="small" @click="exportByNumData">按需选择性导出数据</el-button>
        <el-popconfirm confirm-button-text="是" cancel-button-text="否" :icon="InfoFilled" icon-color="#626AFF"
          title="是否确认删除选中数据" @confirm="handleBatchDelete">
          <template #reference>
            <el-button :icon="Delete" size="small" type="danger" :disabled="selectedStudents.length === 0">
              按需批量删除({{ selectedStudents.length }})
            </el-button>
          </template>
        </el-popconfirm>
      </div>
    </div>

    <!-- 数据表 -->
    <el-table class="main-table" :data="tableData.records" style="width: 100%;" row-key="studentNum" :loading="loading"
      element-loading-text="加载中..." element-loading-background="rgba(255, 255, 255, 0.7)"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" :reserve-selection="true" />
      <el-table-column prop="studentNum" label="学号" min-width="120" sortable />
      <el-table-column prop="name" label="姓名" min-width="100" />
      <!-- <el-table-column label="专业" min-width="150">
        <template #default="scope">
          {{ getMajorName(scope.row.specialtyId) }}
        </template>
      </el-table-column> -->
      <el-table-column prop="specialtyName" label="专业" min-width="150" />
      <el-table-column prop="grade" label="年级" min-width="100" />
      <el-table-column prop="qq" label="QQ" min-width="120" />
      <el-table-column prop="phone" label="电话" min-width="140" />
      <el-table-column prop="submissionTime" label="提交时间" min-width="140" />

      <el-table-column label="操作" min-width="100" fixed="right">
        <template #default="scope">
          <el-popconfirm confirm-button-text="是" cancel-button-text="否" :icon="InfoFilled" icon-color="#626AFF"
            title="是否确认删除" @confirm="confirmEvent(scope.row.studentNum)">
            <template #reference>
              <el-button style="border-radius: 10px;" :icon="Delete" size="small" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>

    </el-table>

    <!-- 分页 -->
    <div class="pagination-info">
      <el-pagination v-model:current-page="paginationData.pageNum" v-model:page-size="paginationData.pageSize"
        size="small" :disabled="false" :background="true" layout="total, prev, pager, next" :total="tableData.total"
        :page-sizes="[10, 20, 50, 100]" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
  </div>
</template>

<script setup>
import { studentPage, deleteStudent, exportAll, exportByNum, majorList } from '../api/index'
import { CopyDocument, Delete, InfoFilled } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus'
import { ref, reactive, onMounted, computed } from 'vue'

// 表格数据
const tableData = ref({
  records: [],
  total: 0
})

const paginationData = reactive({
  pageSize: 10,
  pageNum: 1,
  total: 0
})

// 加载状态
const loading = ref(false)



// 获取列表数据
const getlistData = (params = {}) => {
  loading.value = true
  studentPage({ ...paginationData, ...params }).then(({ data }) => {
    tableData.value = data.data
    paginationData.total = data.data.total
  }).finally(() => {
    loading.value = false
  })
}

// 专业列表
// const majorListData = ref([])
// majorList().then(({ data }) => {
//   console.log(data,'专业列表')
//   majorListData.value = data.data
// })

// 根据专业ID获取专业名称
// const getMajorName = (id) => {
//   const major = majorListData.value.find(item => item.id === id)
//   return major?.specialtyName || '未知专业'
// }

// 页面加载时获取数据
onMounted(() => {
  getlistData()
})

const handleSizeChange = (val) => {
  paginationData.pageSize = val
  getlistData()
}

const handleCurrentChange = (val) => {
  paginationData.pageNum = val
  getlistData()
}

// 单个删除
const confirmEvent = (studentNum) => {
  deleteStudent(studentNum).then(({ data }) => {
    if (data.code === 200) {
      getlistData()
      ElMessage.success('删除成功')
    }
  }).catch(error => {
    ElMessage.error('删除失败')
  })
}

// 选中的学生列表
const selectedStudents = ref([])

// 处理选中变化
const handleSelectionChange = (selection) => {
  selectedStudents.value = selection
}

// 批量删除
const handleBatchDelete = async () => {
  if (selectedStudents.value.length === 0) {
    ElMessage.warning('请先选择要删除的数据')
    return
  }
  const studentNums = selectedStudents.value.map(item => item.studentNum)
  for (let i = 0; i < studentNums.length; i++) {
    await deleteStudent(studentNums[i])
  }
  getlistData()
  selectedStudents.value = []
  ElMessage.success('批量删除成功')
}

// 全部导出数据
const exportAllData = async () => {
  const res = await exportAll()
  // 创建 Blob 对象，将二进制数据包装成文件
  // Blob 是浏览器处理二进制数据的标准方式
  const blob = new Blob([res.data])
  // 创建隐藏的 <a> 标签，用于触发下载
  const link = document.createElement('a')
  // 生成临时下载链接（将 Blob 转为 URL）
  // URL.createObjectURL 创建一个指向 Blob 的临时地址
  link.href = URL.createObjectURL(blob)
  // 设置下载文件名
  link.download = `星谷报名数据_${new Date().toLocaleDateString()}.csv`
  // 触发点击，开始下载
  // 模拟用户点击链接，浏览器自动下载
  link.click()
  ElMessage.success('导出成功')
}

// 按学号选择性导出数据
const exportByNumData = async () => {
  if (selectedStudents.value.length === 0) {
    ElMessage.warning('请先选择要导出的数据')
    return
  }
  const studentNums = selectedStudents.value.map(item => item.studentNum)
  const res = await exportByNum(studentNums)
  const blob = new Blob([res.data])
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `星谷报名数据_${new Date().toLocaleDateString()}.csv`
  link.click()
  ElMessage.success('选择性导出成功')
}
</script>

<style lang='less' scoped>
.student-list-container {
  color: rgba(255, 255, 255, 0.9);
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  padding: 10px;
  min-height: 500px;

  .head-mian {
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
        color: rgba(255, 255, 255, 1) !important;
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
    border-radius: 10px;
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
