<template>
  <el-menu :style="{ width: store.isCollapsed ? '60px' : '200px' }" class="aside-container"
    :collapse="store.isCollapsed" :default-active="activeMenu">
    <!-- :router="true"  -->
    <p class="text">
      <template v-if="store.isCollapsed">
        <el-icon>
          <MoonNight />
        </el-icon>
      </template>
      <template v-else>
        <el-icon>
          <MoonNight />
        </el-icon>
        <span style="margin-left: 5px;">前端中心</span>
      </template>
    </p>

    <el-menu-item v-for="item in menuList" :key="item.path" :index="item.path" @click="selectMenu" class="platForm">
      <el-icon class="icon" size="20">
        <component :is="item.icon" />
      </el-icon>
      <span class="text1">{{ item.title }}</span>
    </el-menu-item>




  </el-menu>
</template>


<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Avatar, Coin, MoonNight, SetUp, Monitor, GoldMedal, Cpu } from '@element-plus/icons-vue'
import { isCollapse } from '../store/isCollapse'
const store = isCollapse()
const route = useRoute()
const router = useRouter()




const activeMenu = computed(() => route.path)

// 菜单列表
const menuList = [
  { path: '/student-list', title: '学生列表', icon: 'Avatar' },
  { path: '/schoolAdministration', title: '学院管理', icon: 'Coin' },
  { path: '/major', title: '专业管理', icon: 'SetUp' },
  { path: '/technique', title: '技术管理', icon: 'Monitor' },
  { path: '/achievement', title: '荣誉管理', icon: 'GoldMedal' },
  { path: '/parameter', title: '配置管理', icon: 'Cpu' },
  { path: '/questions', title: '常见问题', icon: 'ChatDotSquare' }
]

const selectMenu = (key) => {
  router.push(key.index)
}



</script>



<style lang='less' scoped>
.aside-container {
  height: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);

  .text {
    margin-top: 10px;
    text-align: center;
    font-size: 25px;
    font-weight: 400;
    font-style: oblique;
    color: rgba(255, 255, 255, 0.9);
    // text-shadow: 水平偏移 垂直偏移 模糊距离 颜色;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
    margin-bottom: 30px;
  }

  .platForm {
    display: flex;
    justify-content: center;
    align-items: center;

    .icon {
      color: rgba(255, 255, 255, 0.8);
      width: 45px;
      height: 45px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .text1 {
      font-size: 20px;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.9);
    }
  }




  :deep(.el-menu-item) {
    border-radius: 25px;

    &:hover {
      background-color: rgba(255, 255, 255, 0.7) !important;
    }
  }

  // 菜单选中的时候高亮
  :deep(.el-menu-item.is-active) {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.4)) !important;
    border: 1px solid rgba(255, 255, 255, 0.2) !important;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.1);

    .text1 {
      color: #fff !important;
      font-weight: 600;
      text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
    }
  }
}
</style>
