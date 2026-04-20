<template>
  <el-row class="container">

    <!-- 流动背景层 -->
    <div class="flow-background">
      <!-- 动态渐变球体 -->
      <div class="gradient-orbs">
        <div class="orb orb-1"></div>
        <div class="orb orb-2"></div>
        <div class="orb orb-3"></div>
        <div class="orb orb-4"></div>
      </div>
      <!-- 渐变流动层 -->
      <div class="gradient-flow"></div>
      <!-- 波浪层 -->
      <div class="wave-layer">
        <div class="wave wave-1"></div>
        <div class="wave wave-2"></div>
        <div class="wave wave-3"></div>
      </div>
      <!-- 动态粒子特效组件 -->
      <ParticleEffect :particle-count="particleConfig.count" :min-size="particleConfig.minSize"
        :max-size="particleConfig.maxSize" :speed="particleConfig.speed" :colors="particleConfig.colors"
        :enable-lines="particleConfig.enableLines" :line-distance="particleConfig.lineDistance"
        :line-width="particleConfig.lineWidth" :line-color="particleConfig.lineColor"
        :mouse-interaction="particleConfig.mouseInteraction" :mouse-radius="particleConfig.mouseRadius"
        :mouse-force="particleConfig.mouseForce" />
      <!-- 网格动画层 -->
      <div class="grid-pattern"></div>
      <!-- 技术栈文字浮动层 -->
      <div class="tech-stack">
        <span v-for="(tech, index) in techStackList" :key="index" class="tech-text" :style="getTechStyle(index)">
          {{ tech }}
        </span>
      </div>
    </div>

    <div class="text-main">
      <h1>欢迎来到前端技术中心</h1>
    </div>

    <el-card shadow="hover">
      <div class="text">
        <p>管理员登录</p>
      </div>
      <el-form ref="ruleFormRef" style="max-width: 600px" :model="loginForm" :rules="rules" class="login-form" @keyup.enter="submitForm(ruleFormRef)"                                               >
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入账户" :prefix-icon="UserFilled" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" placeholder="请输入密码" :prefix-icon="Lock" type="password" show-password />
        </el-form-item>
        <el-form-item>
          <el-button class="submition" round @click="submitForm(ruleFormRef)">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>

  </el-row>
</template>


<script setup>
import { login } from '../api/index'
import { reactive, ref } from 'vue'
import { UserFilled, Lock } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import ParticleEffect from '../components/ParticleEffect.vue'

const router = useRouter()

// 粒子特效配置
const particleConfig = reactive({
  count: 60,                    // 粒子数量
  minSize: 2,                   // 最小粒子大小
  maxSize: 5,                   // 最大粒子大小
  speed: 0.8,                   // 移动速度
  colors: [                     // 粒子颜色数组
    'rgba(255, 255, 255, 0.8)',
    'rgba(200, 220, 255, 0.8)',
    'rgba(255, 220, 200, 0.8)',
    'rgba(220, 255, 220, 0.8)'
  ],
  enableLines: true,            // 启用连线效果
  lineDistance: 120,            // 连线距离阈值
  lineWidth: 0.5,               // 连线粗细
  lineColor: 'rgba(255, 255, 255, 0.15)',  // 连线颜色
  mouseInteraction: 'repulse',  // 鼠标交互模式: 'none' | 'attract' | 'repulse'
  mouseRadius: 150,             // 鼠标影响半径
  mouseForce: 0.03              // 鼠标交互力度
})

const loginForm = reactive({
  username: 'admin',
  password: 'admin123'
})
const ruleFormRef = ref()
const rules = reactive({
  username: [{ required: true, message: '请输入管理员账户', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})

// 技术栈文字列表
const techStackList = [
  'JavaScript', 'Python', 'Java', 'TypeScript', 'Go', 'Rust',
  'React', 'Vue', 'Angular', 'Node.js', 'Django', 'Spring',
  'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'Linux',
  'Git', 'CI/CD', 'DevOps', 'Microservices', 'REST API', 'GraphQL',
  'MongoDB', 'PostgreSQL', 'Redis', 'MySQL', 'Elasticsearch', 'Kafka',
  'AI', 'Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision', 'Blockchain',
  'React Native', 'Flutter', 'Swift', 'Kotlin', 'iOS', 'Android',
  'TensorFlow', 'PyTorch', 'Pandas', 'NumPy', 'Scikit-learn', 'OpenCV'
]

// 生成技术栈文字样式
const getTechStyle = (index) => {
  const tech = techStackList[index]
  const baseSize = tech.length > 8 ? 9 : tech.length > 5 ? 10 : 11
  const fontSize = baseSize + Math.random() * 2
  const left = Math.random() * 90 + 5
  const top = Math.random() * 85 + 5
  const delay = Math.random() * 15
  const duration = 12 + Math.random() * 8
  const opacity = 0.3 + Math.random() * 0.4
  const rotate = (Math.random() - 0.5) * 30

  return {
    fontSize: `${fontSize}px`,
    left: `${left}%`,
    top: `${top}%`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`,
    opacity: opacity,
    transform: `rotate(${rotate}deg)`
  }
}



const submitForm = async (formEl) => {
  if (!formEl) return
  try {
    await formEl.validate()
  } catch (error) {
    return
  }

  try {
    // 调用登录接口
    // 请求拦截器会自动处理：添加 token
    const { data } = await login(loginForm)
    console.log('登录成功:', data)

    // 保存 token
    const token = data.data?.token || data.token
    if (token) {
      localStorage.setItem('xg_token', token)
    }
    ElMessage.success('登录成功')
    router.push('/')
  } catch (error) {
    console.log('登录失败，错误已被拦截器处理:', error.message)
    ElMessage.error(error.message || '登录失败')
  }
}



</script>


<style lang='less' scoped>
:deep(.el-card__header) {
  padding: 0
}

:deep(.el-card) {
  padding: 1px;
  background-color: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 40px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  position: relative;
  overflow: hidden;

  // 流动背景容器
  .flow-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%);
    background-size: 400% 400%;
    animation: gradientFlow 15s ease infinite;
    will-change: background-position;

    // 动态渐变球体
    .gradient-orbs {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;

      .orb {
        position: absolute;
        border-radius: 50%;
        filter: blur(60px);
        opacity: 0.6;
        will-change: transform;

        &.orb-1 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(255, 100, 200, 0.8) 0%, transparent 70%);
          top: -100px;
          left: -100px;
          animation: orbFloat1 20s ease-in-out infinite;
        }

        &.orb-2 {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(100, 200, 255, 0.8) 0%, transparent 70%);
          bottom: -150px;
          right: -100px;
          animation: orbFloat2 25s ease-in-out infinite;
        }

        &.orb-3 {
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(200, 100, 255, 0.6) 0%, transparent 70%);
          top: 50%;
          left: 50%;
          animation: orbFloat3 18s ease-in-out infinite;
        }

        &.orb-4 {
          width: 350px;
          height: 350px;
          background: radial-gradient(circle, rgba(100, 255, 200, 0.5) 0%, transparent 70%);
          top: 20%;
          right: 10%;
          animation: orbFloat4 22s ease-in-out infinite;
        }
      }
    }

    // 渐变流动层
    .gradient-flow {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(ellipse at 20% 80%, rgba(120, 119, 198, 0.4) 0%, transparent 50%),
        radial-gradient(ellipse at 80% 20%, rgba(255, 119, 198, 0.4) 0%, transparent 50%),
        radial-gradient(ellipse at 40% 40%, rgba(120, 219, 255, 0.3) 0%, transparent 50%);
      animation: gradientPulse 8s ease-in-out infinite;
      will-change: opacity, transform;
    }

    // 波浪层
    .wave-layer {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 40%;
      overflow: hidden;

      .wave {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 200%;
        height: 100%;
        background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='rgba(255,255,255,0.1)' d='M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E") repeat-x;
        background-size: 50% 100%;
        animation: waveFlow 20s linear infinite;
        will-change: transform;

        &.wave-1 {
          opacity: 0.3;
          animation-duration: 25s;
          bottom: 0;
        }

        &.wave-2 {
          opacity: 0.2;
          animation-duration: 20s;
          animation-direction: reverse;
          bottom: 10px;
        }

        &.wave-3 {
          opacity: 0.1;
          animation-duration: 30s;
          bottom: 20px;
        }
      }
    }

    // 网格动画层
    .grid-pattern {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image:
        linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
      background-size: 50px 50px;
      animation: gridMove 20s linear infinite;
      will-change: background-position;
    }

    // 技术栈文字浮动层
    .tech-stack {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      overflow: hidden;

      .tech-text {
        position: absolute;
        color: rgba(255, 255, 255, 0.5);
        font-weight: 500;
        font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
        text-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
        animation: techFloat ease-in-out infinite;
        will-change: transform, opacity;
        white-space: nowrap;
        letter-spacing: 0.5px;

        &:nth-child(odd) {
          color: rgba(200, 220, 255, 0.55);
        }

        &:nth-child(3n) {
          color: rgba(255, 220, 200, 0.5);
        }

        &:nth-child(5n) {
          color: rgba(220, 255, 220, 0.5);
        }
      }
    }
  }

  // 动画定义
  @keyframes gradientFlow {
    0% {
      background-position: 0% 50%;
    }

    50% {
      background-position: 100% 50%;
    }

    100% {
      background-position: 0% 50%;
    }
  }

  @keyframes gradientPulse {

    0%,
    100% {
      opacity: 0.8;
      transform: scale(1);
    }

    50% {
      opacity: 1;
      transform: scale(1.05);
    }
  }

  @keyframes waveFlow {
    0% {
      transform: translateX(0);
    }

    100% {
      transform: translateX(-50%);
    }
  }

  // 球体漂浮动画
  @keyframes orbFloat1 {

    0%,
    100% {
      transform: translate(0, 0) scale(1);
    }

    25% {
      transform: translate(100px, 50px) scale(1.1);
    }

    50% {
      transform: translate(50px, 100px) scale(0.9);
    }

    75% {
      transform: translate(-50px, 50px) scale(1.05);
    }
  }

  @keyframes orbFloat2 {

    0%,
    100% {
      transform: translate(0, 0) scale(1);
    }

    33% {
      transform: translate(-80px, -60px) scale(1.15);
    }

    66% {
      transform: translate(-40px, -100px) scale(0.95);
    }
  }

  @keyframes orbFloat3 {

    0%,
    100% {
      transform: translate(-50%, -50%) scale(1);
    }

    50% {
      transform: translate(-40%, -60%) scale(1.2);
    }
  }

  @keyframes orbFloat4 {

    0%,
    100% {
      transform: translate(0, 0) scale(1) rotate(0deg);
    }

    50% {
      transform: translate(-30px, 80px) scale(1.1) rotate(180deg);
    }
  }

  // 网格移动动画
  @keyframes gridMove {
    0% {
      background-position: 0 0;
    }

    100% {
      background-position: 50px 50px;
    }
  }

  // 技术栈文字浮动动画
  @keyframes techFloat {

    0%,
    100% {
      transform: translate(0, 0) rotate(var(--rotate, 0deg));
      opacity: var(--opacity, 0.5);
    }

    20% {
      transform: translate(15px, -10px) rotate(calc(var(--rotate, 0deg) + 3deg));
      opacity: calc(var(--opacity, 0.5) + 0.1);
    }

    40% {
      transform: translate(-10px, 15px) rotate(calc(var(--rotate, 0deg) - 2deg));
      opacity: calc(var(--opacity, 0.5) - 0.05);
    }

    60% {
      transform: translate(20px, 5px) rotate(calc(var(--rotate, 0deg) + 2deg));
      opacity: calc(var(--opacity, 0.5) + 0.05);
    }

    80% {
      transform: translate(-15px, -15px) rotate(calc(var(--rotate, 0deg) - 3deg));
      opacity: calc(var(--opacity, 0.5) - 0.1);
    }
  }

  .text-main {
    color: rgba(255, 255, 255, 0.95);
    // 使用 clamp 实现响应式字体大小：最小 1.5rem，首选 4vw，最大 2.5rem
    font-size: clamp(1.5rem, 4vw, 2.5rem);
    position: absolute;
    // 使用 clamp 实现响应式顶部距离
    top: clamp(60px, 10vh, 100px);
    left: 50%;
    transform: translateX(-50%);
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    white-space: nowrap;
    z-index: 1;
    animation: textGlow 3s ease-in-out infinite;
    // 确保文字在不同屏幕下都有良好的可读性
    line-height: 1.2;
    font-weight: 600;
    // 添加文字溢出处理
    max-width: 90vw;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @keyframes textGlow {

    0%,
    100% {
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    }

    50% {
      text-shadow: 0 2px 20px rgba(255, 255, 255, 0.3), 0 0 30px rgba(255, 255, 255, 0.2);
    }
  }

  .text {
    color: #fff;
    // 使用 clamp 实现响应式字体大小：最小 1.1rem，首选 2.5vw，最大 1.5rem
    font-size: clamp(1.1rem, 2.5vw, 1.5rem);
    font-weight: 600;
    text-align: center;
    margin-bottom: clamp(10px, 2vh, 20px);
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.3), 0 0 30px rgba(255, 255, 255, 0.2);
    animation: titleGlow 2s ease-in-out infinite alternate;
    // 确保文字不会溢出
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  @keyframes titleGlow {
    0% {
      text-shadow: 0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.3), 0 0 30px rgba(255, 255, 255, 0.2);
    }

    100% {
      text-shadow: 0 0 15px rgba(255, 255, 255, 0.7), 0 0 30px rgba(255, 255, 255, 0.5), 0 0 45px rgba(255, 255, 255, 0.3);
    }
  }

  .login-form {
    width: 300px;
    position: relative;
    z-index: 1;

    :deep(.el-input__wrapper) {
      border-radius: 20px;
      background-color: rgba(255, 255, 255, 0.15);
      border: 1px solid rgba(255, 255, 255, 0.2);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;

      &:hover,
      &:focus {
        background-color: rgba(255, 255, 255, 0.25);
        border-color: rgba(255, 255, 255, 0.4);
        box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
      }

      .el-input__inner {
        color: #fff;

        &::placeholder {
          color: rgba(255, 255, 255, 0.6);
        }
      }

      .el-input__icon {
        color: rgba(255, 255, 255, 0.8);
      }
    }

    .submition {
      position: absolute;
      left: 33.3%;
      top: 50%;
      width: 30%;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      background: rgba(255, 255, 255, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.3);
      backdrop-filter: blur(10px);
      transition: all 0.3s ease;
      cursor: pointer;
      font-weight: 600;

      &:active {
        transform: scale(0.95);
      }

      &:hover {
        background: rgba(255, 255, 255, 0.3);
        border-color: rgba(255, 255, 255, 0.5);
        transform: translateY(-2px);
        box-shadow: 0 5px 20px rgba(255, 255, 255, 0.2);
      }
    }
  }

  // 确保 el-card 在背景之上
  :deep(.el-card) {
    position: relative;
    z-index: 1;
    animation: cardFloat 6s ease-in-out infinite;
  }

  @keyframes cardFloat {

    0%,
    100% {
      transform: translateY(0);
    }

    50% {
      transform: translateY(-5px);
    }
  }
}

// 响应式设计 - 精细断点调整
// 超小屏幕（手机竖屏）
@media (max-width: 480px) {
  .container {
    .text-main {
      font-size: clamp(1.2rem, 5vw, 1.5rem);
      top: 50px;
      max-width: 95vw;
      // 允许在小屏幕上换行
      white-space: normal;
      text-align: center;
      line-height: 1.3;
    }

    .login-form {
      width: 90%;
      max-width: 300px;
    }

    .text {
      font-size: clamp(1rem, 4vw, 1.25rem);
    }
  }
}

// 小屏幕（手机横屏/大手机）
@media (min-width: 481px) and (max-width: 768px) {
  .container {
    .text-main {
      font-size: clamp(1.4rem, 4vw, 1.8rem);
      top: clamp(55px, 8vh, 70px);
    }

    .login-form {
      width: 320px;
    }

    .text {
      font-size: clamp(1.1rem, 3vw, 1.3rem);
    }
  }
}

// 中等屏幕（平板）
@media (min-width: 769px) and (max-width: 1024px) {
  .container {
    .text-main {
      font-size: clamp(1.8rem, 3.5vw, 2.2rem);
      top: clamp(70px, 9vh, 85px);
    }

    .login-form {
      width: 380px;
    }
  }
}

// 大屏幕（桌面）
@media (min-width: 1025px) and (max-width: 1440px) {
  .container {
    .text-main {
      font-size: clamp(2rem, 3vw, 2.5rem);
      top: clamp(80px, 10vh, 100px);
    }

    .login-form {
      width: 400px;
    }
  }
}

// 超大屏幕
@media (min-width: 1441px) {
  .container {
    .text-main {
      font-size: clamp(2.2rem, 2.5vw, 3rem);
      top: clamp(90px, 12vh, 120px);
    }

    .login-form {
      width: 450px;
    }
  }
}

// 高分辨率屏幕优化
@media (min-width: 1920px) {
  .container {
    .text-main {
      font-size: clamp(2.5rem, 2vw, 3.5rem);
    }
  }
}

// 减少动画偏好支持
@media (prefers-reduced-motion: reduce) {
  .container {
    .flow-background {
      animation: none;

      .gradient-flow,
      .wave-layer,
      .particles,
      .gradient-orbs,
      .grid-pattern,
      .tech-stack {
        animation: none;
      }
    }

    :deep(.el-card) {
      animation: none;
    }
  }
}

// 粒子特效Canvas样式调整
:deep(.particle-canvas) {
  position: absolute !important;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
</style>
