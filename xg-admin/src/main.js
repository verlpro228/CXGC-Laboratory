import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
const pinia = createPinia()

// 路由守卫 - 权限控制
router.beforeEach((to, from) => {
  const token = localStorage.getItem('xg_token')
  // 非登录页面token不存在
  if(!token && to.path !== '/login'){
    return '/login'
  }else if(token && to.path === '/login'){
    return '/'
  }else{
    return true
  }
})


for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router)
app.use(pinia)
app.use(ElementPlus)
app.mount('#app')