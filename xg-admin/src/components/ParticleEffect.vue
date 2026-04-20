<template>
  <canvas
    ref="canvasRef"
    class="particle-canvas"
    :style="canvasStyle"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  ></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'

// 粒子特效配置项
const props = defineProps({
  // 粒子数量
  particleCount: {
    type: Number,
    default: 80
  },
  // 粒子最小大小
  minSize: {
    type: Number,
    default: 2
  },
  // 粒子最大大小
  maxSize: {
    type: Number,
    default: 6
  },
  // 粒子移动速度
  speed: {
    type: Number,
    default: 1
  },
  // 粒子颜色（支持单一颜色或渐变色数组）
  colors: {
    type: [String, Array],
    default: () => ['rgba(255, 255, 255, 0.8)', 'rgba(200, 220, 255, 0.8)', 'rgba(255, 220, 200, 0.8)']
  },
  // 是否启用连线效果
  enableLines: {
    type: Boolean,
    default: true
  },
  // 连线距离阈值
  lineDistance: {
    type: Number,
    default: 150
  },
  // 连线线条粗细
  lineWidth: {
    type: Number,
    default: 0.5
  },
  // 连线颜色
  lineColor: {
    type: String,
    default: 'rgba(255, 255, 255, 0.2)'
  },
  // 鼠标交互模式：'none' | 'attract' | 'repulse'
  mouseInteraction: {
    type: String,
    default: 'repulse'
  },
  // 鼠标影响半径
  mouseRadius: {
    type: Number,
    default: 200
  },
  // 鼠标交互力度
  mouseForce: {
    type: Number,
    default: 0.02
  }
})

const canvasRef = ref(null)
const particles = ref([])
const mouse = ref({ x: null, y: null })
const animationId = ref(null)
const ctx = ref(null)

// 画布样式
const canvasStyle = computed(() => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  pointerEvents: props.mouseInteraction !== 'none' ? 'auto' : 'none',
  zIndex: 0
}))

// 粒子类
class Particle {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight
    this.reset()
  }

  reset() {
    this.x = Math.random() * this.canvasWidth
    this.y = Math.random() * this.canvasHeight
    this.size = Math.random() * (props.maxSize - props.minSize) + props.minSize
    this.speedX = (Math.random() - 0.5) * props.speed
    this.speedY = (Math.random() - 0.5) * props.speed
    this.color = this.getRandomColor()
    this.opacity = Math.random() * 0.5 + 0.3
  }

  getRandomColor() {
    if (Array.isArray(props.colors)) {
      return props.colors[Math.floor(Math.random() * props.colors.length)]
    }
    return props.colors
  }

  update() {
    // 基础移动
    this.x += this.speedX
    this.y += this.speedY

    // 边界检测和反弹
    if (this.x < 0 || this.x > this.canvasWidth) {
      this.speedX = -this.speedX
    }
    if (this.y < 0 || this.y > this.canvasHeight) {
      this.speedY = -this.speedY
    }

    // 鼠标交互
    if (props.mouseInteraction !== 'none' && mouse.value.x !== null) {
      const dx = mouse.value.x - this.x
      const dy = mouse.value.y - this.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < props.mouseRadius) {
        const force = (props.mouseRadius - distance) / props.mouseRadius
        const directionX = dx / distance
        const directionY = dy / distance

        if (props.mouseInteraction === 'repulse') {
          // 排斥效果
          this.x -= directionX * force * props.mouseForce * 100
          this.y -= directionY * force * props.mouseForce * 100
        } else if (props.mouseInteraction === 'attract') {
          // 吸引效果
          this.x += directionX * force * props.mouseForce * 100
          this.y += directionY * force * props.mouseForce * 100
        }
      }
    }
  }

  draw(context) {
    context.beginPath()
    context.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    context.fillStyle = this.color
    context.globalAlpha = this.opacity
    context.fill()
    context.globalAlpha = 1
  }
}

// 初始化粒子
const initParticles = () => {
  const canvas = canvasRef.value
  if (!canvas) return

  particles.value = []
  for (let i = 0; i < props.particleCount; i++) {
    particles.value.push(new Particle(canvas.width, canvas.height))
  }
}

// 绘制连线
const drawLines = (context) => {
  if (!props.enableLines) return

  for (let i = 0; i < particles.value.length; i++) {
    for (let j = i + 1; j < particles.value.length; j++) {
      const dx = particles.value[i].x - particles.value[j].x
      const dy = particles.value[i].y - particles.value[j].y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < props.lineDistance) {
        const opacity = (1 - distance / props.lineDistance) * 0.5
        context.beginPath()
        context.strokeStyle = props.lineColor
        context.lineWidth = props.lineWidth
        context.globalAlpha = opacity
        context.moveTo(particles.value[i].x, particles.value[i].y)
        context.lineTo(particles.value[j].x, particles.value[j].y)
        context.stroke()
        context.globalAlpha = 1
      }
    }
  }
}

// 动画循环
const animate = () => {
  const canvas = canvasRef.value
  const context = ctx.value
  if (!canvas || !context) return

  context.clearRect(0, 0, canvas.width, canvas.height)

  // 更新和绘制粒子
  particles.value.forEach(particle => {
    particle.update()
    particle.draw(context)
  })

  // 绘制连线
  drawLines(context)

  animationId.value = requestAnimationFrame(animate)
}

// 处理鼠标移动
const handleMouseMove = (event) => {
  const canvas = canvasRef.value
  if (!canvas) return

  const rect = canvas.getBoundingClientRect()
  mouse.value.x = event.clientX - rect.left
  mouse.value.y = event.clientY - rect.top
}

// 处理鼠标离开
const handleMouseLeave = () => {
  mouse.value.x = null
  mouse.value.y = null
}

// 调整画布大小
const resizeCanvas = () => {
  const canvas = canvasRef.value
  if (!canvas) return

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  // 重新初始化粒子
  initParticles()
}

// 监听配置变化
watch(() => props.particleCount, () => {
  initParticles()
})

watch(() => [props.minSize, props.maxSize, props.speed, props.colors], () => {
  particles.value.forEach(particle => {
    particle.size = Math.random() * (props.maxSize - props.minSize) + props.minSize
    particle.speedX = (Math.random() - 0.5) * props.speed
    particle.speedY = (Math.random() - 0.5) * props.speed
    particle.color = particle.getRandomColor()
  })
}, { deep: true })

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return

  ctx.value = canvas.getContext('2d')
  resizeCanvas()
  initParticles()
  animate()

  window.addEventListener('resize', resizeCanvas)
})

onUnmounted(() => {
  if (animationId.value) {
    cancelAnimationFrame(animationId.value)
  }
  window.removeEventListener('resize', resizeCanvas)
})
</script>

<style lang="less" scoped>
  .particle-canvas {
    display: block;
  }
</style>
