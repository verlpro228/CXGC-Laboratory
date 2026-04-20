<template>
  <div class="common-layout">
    <!--背景-->
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
    </div>

    <!-- 主体内容 -->
    <el-container class="main-content">
      <Aside />
      <el-container>
        <el-header>
          <Header />
        </el-header>
        <el-main class="scrollable-main">
          <div class="container">
            <router-view />
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import Aside from '../components/aside.vue'
import Header from '../components/header.vue'
import ParticleEffect from '../components/ParticleEffect.vue'
import { reactive } from 'vue'

// 粒子特效配置
const particleConfig = reactive({
  count: 60,
  minSize: 2,
  maxSize: 5,
  speed: 0.8,
  colors: [
    'rgba(255, 255, 255, 0.8)',
    'rgba(200, 220, 255, 0.3)',
    'rgba(255, 220, 200, 0.8)',
    'rgba(220, 255, 220, 0.9)'
  ],
  enableLines: true,
  lineDistance: 120,
  lineWidth: 0.5,
  lineColor: 'rgba(255, 255, 255, 0.15)',
  mouseInteraction: 'repulse',
  mouseRadius: 150,
  mouseForce: 0.03
})


</script>


<style lang='less' scoped>
.common-layout {
  height: 100%;
  position: relative;
  overflow: hidden;

  // 流动背景层
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


  }

  // 主内容层
  .main-content {
    position: relative;
    z-index: 1;
    height: 100%;

    .el-container {
      height: 100%;
    }

    .container {
      height: 100%;
    }
  }
}

// 动画关键帧
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

@keyframes orbFloat1 {

  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }

  25% {
    transform: translate(50px, 30px) scale(1.1);
  }

  50% {
    transform: translate(20px, 60px) scale(0.95);
  }

  75% {
    transform: translate(-30px, 40px) scale(1.05);
  }
}

@keyframes orbFloat2 {

  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }

  33% {
    transform: translate(-40px, -50px) scale(1.15);
  }

  66% {
    transform: translate(-60px, -20px) scale(0.9);
  }
}

@keyframes orbFloat3 {

  0%,
  100% {
    transform: translate(-50%, -50%) scale(1);
  }

  50% {
    transform: translate(-30%, -70%) scale(1.2);
  }
}

@keyframes orbFloat4 {

  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
  }

  50% {
    transform: translate(-20px, 30px) rotate(180deg);
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

@keyframes gridMove {
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: 50px 50px;
  }
}

// 滚动条样式
.scrollable-main {
  overflow-y: auto;
  height: calc(100vh - 60px);

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 3px;

    &:hover {
      background: rgba(255, 255, 255, 0.5);
    }
  }
}
</style>
