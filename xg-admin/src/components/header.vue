<template>
  <div class="header-container">
    <!-- 左侧  -->
    <div class="header-left">
      <el-icon class="icon" size="25" @click="store.changeCollapse">
        <Operation />
      </el-icon>
      <div class="text">
        <p>前端技术中心</p>
      </div>
    </div>
    <!-- 右侧 用户信息 -->
    <div class="header-right">
      <el-dropdown @command="handleClick">
        <div class="el-dropdown-link flex-box">
          <el-avatar class="avatar">{{ userInitial }}</el-avatar>
          <p class="user-admin">{{ currentUser.name || currentUser.username }}</p>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="cancel">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>


<script setup>
import { computed } from 'vue'
import { logout } from '../api/index'
import { useRouter } from 'vue-router'
import { Operation } from '@element-plus/icons-vue'
import { isCollapse } from '../store/isCollapse'
import { ElMessageBox } from 'element-plus'

const router = useRouter()
const store = isCollapse()

const currentUser = computed(() => {
  try {
    return JSON.parse(localStorage.getItem('xg_user') || 'null') || { username: 'admin', name: '演示管理员' }
  } catch (error) {
    return { username: 'admin', name: '演示管理员' }
  }
})

const userInitial = computed(() => (currentUser.value.name || currentUser.value.username || 'A').slice(0, 1).toUpperCase())

const handleClick = (command) => {
  if (command === 'cancel') {
    ElMessageBox.confirm('确定退出吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(() => {
      logout().then(() => {
        localStorage.removeItem('xg_token')
        router.push('/login')
      })
    })
  }
}
</script>


<style lang='less' scoped>
.flex-box {
  display: flex;
  justify-content: center;
  align-items: center;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  // 毛玻璃效果
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);

  .header-left {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    position: relative;

    .icon {
      color: rgba(255, 255, 255, 0.8);
      width: 45px;
      height: 100%;
      position: absolute;
      left: 0;
    }

    .icon:hover {
      color: #fff;
      // text-shadow: 水平偏移 垂直偏移 模糊距离 颜色;
      cursor: pointer;
    }

    .text {
      font-size: 30px;
      font-weight: 500;
      font-style: oblique;
      color: rgba(255, 255, 255, 0.9);
      // text-shadow: 水平偏移 垂直偏移 模糊距离 颜色;
      text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
      // 添加字间距
      letter-spacing: 2px;
    }
  }

  .header-right {
    .user-admin {
      margin: 0px 20px 0 10px;
      color: rgba(255, 255, 255, 0.8);
    }
  }
}
</style>
