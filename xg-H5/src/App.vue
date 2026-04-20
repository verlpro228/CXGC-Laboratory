<template>
  <div id="app"
    class="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 overflow-x-hidden text-slate-800">
    <!-- 动态背景粒子 -->
    <div class="particles" ref="particlesContainer"></div>

    <!-- 导航栏 -->
    <nav ref="navbar" class="fixed top-0 w-full z-50 transition-all duration-300 py-4">
      <div class="container mx-auto px-6 flex justify-between items-center">
        <div class="flex items-center space-x-2">
          <div
            class="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-400 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg animate-pulse-slow">
            <i class="fas fa-atom"></i>
          </div>
          <span class="text-2xl font-bold text-gradient">{{ websiteTitle }}</span>
        </div>

        <div class="hidden md:flex items-center space-x-8">
          <a v-for="item in navItems" :key="item.id" :href="'#' + item.id"
            class="text-slate-700 hover:text-blue-600 font-medium transition-colors relative group"
            @click.prevent="scrollToSection(item.id)">
            {{ item.name }}
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
          </a>
          <a href="https://github.com/verlpro228/CXGC-Laboratory" target="_blank" rel="noopener noreferrer"
            class="github-nav-button" title="GitHub 仓库" aria-label="GitHub 仓库">
            <i class="fab fa-github"></i>
          </a>
          <button
            class="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-slate-900/20 transition-all hover:-translate-y-0.5 hover:bg-blue-600 hover:shadow-blue-600/25"
            @click="openAdmin">
            <i class="fas fa-user-shield"></i>
            <span>进入后台</span>
          </button>
        </div>

        <button class="md:hidden text-slate-700 text-2xl" @click="toggleMobileMenu">
          <i class="fas fa-bars"></i>
        </button>
      </div>

      <!-- 移动端菜单 -->
      <div v-show="mobileMenuOpen"
        class="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-lg">
        <div class="flex flex-col p-6 space-y-4">
          <a v-for="item in navItems" :key="item.id" :href="'#' + item.id"
            class="text-slate-700 hover:text-blue-600 font-medium" @click.prevent="scrollToSection(item.id)">
            {{ item.name }}
          </a>
          <a href="https://github.com/verlpro228/CXGC-Laboratory" target="_blank" rel="noopener noreferrer"
            class="github-mobile-button" title="GitHub 仓库" aria-label="GitHub 仓库">
            <i class="fab fa-github"></i>
          </a>
          <button
            class="inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-5 py-3 font-bold text-white shadow-lg"
            @click="openAdmin">
            <i class="fas fa-user-shield"></i>
            <span>进入后台</span>
          </button>
        </div>
      </div>
    </nav>

    <!-- 首页 Hero Section -->
    <section id="home" class="min-h-screen flex items-center justify-center relative pt-20 overflow-hidden">
      <!-- 装饰元素 -->
      <div class="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-float"></div>
      <div class="absolute bottom-20 right-10 w-96 h-96 bg-green-400/20 rounded-full blur-3xl animate-float"
        style="animation-delay: 2s;"></div>
      <div class="absolute top-1/2 left-1/4 w-64 h-64 bg-orange-400/10 rounded-full blur-3xl animate-float"
        style="animation-delay: 4s;"></div>

      <div class="container mx-auto px-6 relative z-10">
        <div class="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div class="lg:w-1/2 text-center lg:text-left space-y-8">
            <div
              class="mobile-float-text inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium animate-bounce-slow">
              <span class="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
              <span>招新火热进行中！！！</span>
            </div>

            <h1 class="mobile-float-text delay-1 text-5xl lg:text-7xl font-black leading-tight">
              <span class="block text-slate-800">探索技术的</span>
              <span class="text-gradient">无限可能</span>
            </h1>

            <p class="mobile-float-text delay-2 text-xl text-slate-600 leading-relaxed max-w-2xl">
              在这里，代码是魔法，创意是燃料。加入星谷创新实验室，与志同道合的伙伴一起，用技术改变世界，用创新定义未来。
            </p>

            <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="#join" @click.prevent="scrollToSection('join')"
                class="btn-pulse px-8 py-4 bg-gradient-to-r from-[#3B82F6] to-[#10B981] text-white rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all flex items-center justify-center space-x-2">
                <span>立即加入</span>
                <i class="fas fa-arrow-right"></i>
              </a>
              <a href="#departments" @click.prevent="scrollToSection('departments')"
                class="px-8 py-4 bg-white text-slate-700 border-2 border-slate-200 rounded-full font-bold text-lg hover:border-blue-500 hover:text-blue-600 transition-all flex items-center justify-center space-x-2">
                <span>了解更多</span>
                <i class="fas fa-chevron-down"></i>
              </a>
            </div>

            <div class="flex items-center justify-center lg:justify-start space-x-8 pt-4">
              <div class="text-center">
                <div class="text-3xl font-bold text-blue-600">200+</div>
                <div class="text-sm text-slate-500">优秀成员</div>
              </div>
              <div class="w-px h-12 bg-slate-300"></div>
              <div class="text-center">
                <div class="text-3xl font-bold text-green-600">6+</div>
                <div class="text-sm text-slate-500">卓越项目</div>
              </div>
              <div class="w-px h-12 bg-slate-300"></div>
              <div class="text-center">
                <div class="text-3xl font-bold text-orange-600">99%</div>
                <div class="text-sm text-slate-500">校企合作客户满意度</div>
              </div>
            </div>
          </div>

          <div class="lg:w-1/2 relative">
            <div class="relative w-full max-w-lg mx-auto">
              <!-- 主视觉图形 -->
              <div
                class="relative z-10 glass rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <div class="grid grid-cols-2 gap-4">
                  <div class="space-y-4">
                    <div class="bg-blue-500/10 rounded-2xl p-4 animate-wave">
                      <i class="fas fa-code text-3xl text-blue-600 mb-2"></i>
                      <div class="text-sm font-medium text-slate-700">前端开发</div>
                    </div>
                    <div class="bg-green-500/10 rounded-2xl p-4 animate-wave" style="animation-delay: 0.5s;">
                      <i class="fas fa-server text-3xl text-green-600 mb-2"></i>
                      <div class="text-sm font-medium text-slate-700">后端架构</div>
                    </div>
                  </div>
                  <div class="space-y-4 mt-8">
                    <div class="bg-orange-500/10 rounded-2xl p-4 animate-wave" style="animation-delay: 1s;">
                      <i class="fas fa-layer-group text-3xl text-orange-600 mb-2"></i>
                      <div class="text-sm font-medium text-slate-700">全栈开发</div>
                    </div>
                    <div class="bg-purple-500/10 rounded-2xl p-4 animate-wave" style="animation-delay: 1.5s;">
                      <i class="fas fa-robot text-3xl text-purple-600 mb-2"></i>
                      <div class="text-sm font-medium text-slate-700">人工智能</div>
                    </div>
                  </div>
                </div>

                <!-- 浮动徽章 -->
                <div
                  class="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white shadow-lg animate-bounce-slow">
                  <div class="text-center">
                    <div class="text-xs font-bold">NEW</div>
                  </div>
                </div>
              </div>

              <!-- 装饰圆圈 -->
              <div
                class="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border-2 border-dashed border-blue-300/30 rounded-full animate-spin-slow">
              </div>
              <div
                class="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border-2 border-dashed border-green-300/20 rounded-full animate-spin-slow"
                style="animation-direction: reverse; animation-duration: 12s;"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- 滚动提示 -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <i class="fas fa-chevron-down text-slate-400 text-2xl"></i>
      </div>
    </section>

    <!-- 部门介绍 Section -->
    <section id="departments" class="py-24 relative">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl lg:text-5xl font-bold mb-4">
            <span class="text-gradient">技术方向</span>
          </h2>
          <p class="text-lg text-slate-600 max-w-2xl mx-auto">
            无论你是界面艺术家、架构师还是全能战士，这里都有属于你的舞台
          </p>
        </div>


        <!-- 部门卡片滑动容器 -->
        <div class="relative max-w-7xl mx-auto">
          <!-- 左箭头 - 桌面端 -->
          <button @click="scrollDepts('left')"
            class="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-lg items-center justify-center text-slate-600 hover:text-blue-600 hover:shadow-xl transition-all">
            <i class="fas fa-chevron-left"></i>
          </button>

          <!-- 右箭头 - 桌面端 -->
          <button @click="scrollDepts('right')"
            class="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-lg items-center justify-center text-slate-600 hover:text-blue-600 hover:shadow-xl transition-all">
            <i class="fas fa-chevron-right"></i>
          </button>



          <!-- 滑动容器 -->
          <div ref="deptContainer"
            class="dept-scroll-container flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
            style="scroll-behavior: smooth;">

            <!-- 动态渲染部门卡片 -->
            <div v-for="(dept, index) in techDirections" :key="dept.id"
              class="dept-card group relative flex-shrink-0 w-[380px] snap-center" @mousemove="handleCardMove"
              @mouseleave="handleCardLeave">
              <div
                class="glass rounded-3xl p-8 h-full transform transition-all duration-500 hover:scale-105 hover:shadow-2xl border-t-4 dept-breathing"
                :class="dept.borderColor" :style="{ animationDelay: `${index * 0.5}s` }">
                <h3 class="text-2xl font-bold text-center mb-4 text-slate-800">{{ dept.tile }}</h3>
                <p class="text-slate-600 text-center mb-6 leading-relaxed">{{ dept.content }}</p>
                <div class="flex flex-wrap gap-2 justify-center mb-6">
                  <span v-for="tag in dept.tagsList" :key="tag" :class="dept.tagClass"
                    class="skill-tag px-3 py-1 rounded-full text-sm font-medium">{{ tag }}</span>
                </div>
                <div class="space-y-3">
                  <div v-for="feature in dept.descList" :key="feature"
                    class="flex items-center space-x-3 text-slate-700">
                    <i :class="dept.iconColor" class="fas fa-check-circle"></i>
                    <span class="text-sm">{{ feature }}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>


          <!-- 左右箭头 - 移动端 -->
          <div class="flex md:hidden justify-center gap-4 mt-4">
            <button @click="scrollDepts('left')"
              class="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-slate-600 active:text-blue-600 active:scale-95 transition-all">
              <i class="fas fa-chevron-left"></i>
            </button>
            <button @click="scrollDepts('right')"
              class="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-slate-600 active:text-blue-600 active:scale-95 transition-all">
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>

        </div>


        <!-- 技术栈展示 -->
        <div class="mt-20 glass rounded-3xl p-8 max-w-5xl mx-auto">
          <h3 class="text-2xl font-bold text-center mb-8 text-slate-800">我们的技术生态</h3>
          <div class="flex flex-wrap justify-center gap-6">
            <div v-for="tech in techStack" :key="tech.name" class="flex flex-col items-center space-y-2">
              <div class="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-3xl shadow-md">
                <i :class="[tech.icon, tech.color]"></i>
              </div>
              <span class="text-sm text-slate-600">{{ tech.name }}</span>
            </div>
          </div>
        </div>


      </div>
    </section>

    <!-- 光荣历史 Section -->
    <section id="history" class="py-24 relative bg-white/50">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl lg:text-5xl font-bold mb-4">
            <span class="text-gradient-warm">荣誉历史</span>
          </h2>
          <p class="text-lg text-slate-600 max-w-2xl mx-auto">
            十年磨一剑，我们的足迹遍布知名公司与优秀的技术竞赛和项目上
          </p>
        </div>


        <!-- 合作企业徽标 -->
        <div class="mt-1">
          <div class="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            <!-- 小米 -->
            <div class="company-logo">
              <div class="w-16 h-16 md:w-20 md:h-20 bg-white flex items-center justify-center">
                <img src="./assets/logo/xiaomi.webp" alt="小米" class="w-full h-full object-contain">
              </div>
            </div>
            <!-- 百度 -->
            <div class="company-logo">
              <div class="w-16 h-16 md:w-20 md:h-20 bg-white flex items-center justify-center">
                <img src="./assets/logo/baidu.webp" alt="百度" class="w-full h-full object-contain">
              </div>
            </div>
            <!-- 美团 -->
            <div class="company-logo">
              <div class="w-16 h-16 md:w-20 md:h-20 bg-white flex items-center justify-center">
                <img src="./assets/logo/meituan.png" alt="美团" class="w-full h-full object-contain">
              </div>
            </div>
            <!-- 阿里 -->
            <div class="company-logo">
              <div class="w-16 h-16 md:w-20 md:h-20 bg-white flex items-center justify-center">
                <img src="./assets/logo/Alibaba.webp" alt="阿里巴巴" class="w-full h-full object-contain">
              </div>
            </div>
          </div>
        </div>


        <!-- 时间轴 -->
        <div class="relative max-w-4xl mx-auto">
          <div class="timeline-line"></div>

          <div v-for="(item, index) in history" :key="item.id" class="relative mb-12">
            <div class="timeline-dot" :style="{ top: '20px', borderColor: item.borderColor }"></div>
            <div class="grid md:grid-cols-2 gap-8 items-center">
              <template v-for="pos in [0, 1]" :key="pos">
                <div :class="getPositionClass(index, pos)">
                  <template v-if="(index % 2 === 0) === (pos === 0)">
                    <div class="glass rounded-2xl p-6 shadow-lg w-full h-40 flex flex-col">
                      <h3 class="text-xl font-bold text-slate-800 mb-2 line-clamp-1">{{ item.tile }}</h3>
                      <p class="text-slate-600 mb-3 line-clamp-2 flex-1">{{ item.ward }}</p>
                      <div class="flex flex-wrap gap-2 mt-auto" :class="pos === 0 ? 'justify-end' : ''">
                        <span v-for="tag in item.tagsList" :key="tag" class="px-2 py-1 rounded text-xs"
                          :class="item.tagClass">{{ tag }}</span>
                      </div>
                    </div>
                  </template>
                  <template v-else>
                    <div class="w-full h-40 rounded-2xl flex items-center justify-center" :class="item.bgClass">
                      <i :class="[item.icon, 'text-6xl opacity-30']"></i>
                    </div>
                  </template>
                </div>
              </template>
            </div>
          </div>

          <!-- 更多成就按钮 -->
          <div class="text-center mt-12">
            <button @click="showMoreHistory"
              class="px-8 py-3 bg-white border-2 border-slate-200 rounded-full font-medium text-slate-600 hover:border-blue-500 hover:text-blue-600 transition-all flex items-center space-x-2 mx-auto">
              <span>查看更多历史成就</span>
              <i class="fas fa-history"></i>
            </button>
          </div>
        </div>

      </div>
    </section>

    <!-- 加入我们 Section -->
    <section id="join" class="py-24 relative overflow-hidden">
      <!-- 背景装饰 -->
      <div class="absolute top-0 left-0 w-full h-full">
        <div class="absolute top-20 left-10 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div class="absolute bottom-20 right-10 w-80 h-80 bg-green-400/10 rounded-full blur-3xl"></div>
      </div>

      <div class="container mx-auto px-6 relative z-10">
        <div class="text-center mb-16">
          <h2 class="text-4xl lg:text-5xl font-bold mb-4">
            <span class="text-gradient">加入我们</span>
          </h2>
          <p class="text-lg text-slate-600 max-w-2xl mx-auto">
            填写报名信息，开启你的技术之旅
          </p>
        </div>

        <!-- 招新流程 -->
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-10">
            <h3 class="text-3xl font-bold text-slate-800 mb-4">招新流程</h3>
            <p class="text-slate-600">了解加入我们的步骤</p>
          </div>

          <div class="space-y-6">
            <div v-for="(step, index) in steps" :key="index" class="flex items-start space-x-4 group scroll-animate"
              :style="{ '--delay': `${index * 0.15}s` }">
              <div
                class="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform"
                :class="step.bgColor">
                {{ index + 1 }}
              </div>
              <div class="flex-1 glass rounded-xl p-4 shadow-md">
                <h4 class="font-bold text-slate-800 mb-1">{{ step.title }}</h4>
                <p class="text-sm text-slate-600">{{ step.desc }}</p>
              </div>
            </div>

            <div class="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-xl flex items-start space-x-3">
              <i class="fas fa-lightbulb text-yellow-600 mt-1"></i>
              <div class="text-sm text-yellow-800">
                <strong>提示：</strong> 零基础也欢迎！我们有完善的培养体系，只要你对技术充满热情，我们都愿意带你成长。<strong>（仅招大一/大二学生）</strong>
              </div>
            </div>
          </div>
        </div>

        <!-- 报名区域 -->
        <div class="max-w-4xl mx-auto mt-20 scroll-animate">
          <div class="glass rounded-3xl p-8 md:p-12">
            <div class="text-center mb-10">
              <h3 class="text-3xl font-bold text-slate-800 mb-4">在线报名</h3>
              <p class="text-slate-600">填写以下信息，开启你的星谷之旅！</p>
            </div>
            <!-- 报名表单 -->
            <el-form ref="formRef" :model="formData" :rules="formRules" label-position="top" class="space-y-6">
              <div class="grid md:grid-cols-2 gap-6">
                <!-- 学号 -->
                <el-form-item label="学号" prop="studentNum">
                  <el-input v-model="formData.studentNum" placeholder="请输入学号" size="large" clearable>
                    <template #prefix>
                      <i class="fas fa-id-card text-slate-400"></i>
                    </template>
                  </el-input>
                </el-form-item>

                <!-- 姓名 -->
                <el-form-item label="姓名" prop="name">
                  <el-input v-model="formData.name" placeholder="请输入姓名" size="large" clearable>
                    <template #prefix>
                      <i class="fas fa-user text-slate-400"></i>
                    </template>
                  </el-input>
                </el-form-item>

                <!-- 专业 -->
                <el-form-item label="专业" prop="specialtyId">
                  <el-select v-model="formData.specialtyId" placeholder="请选择专业" size="large" class="w-full">
                    <template #prefix>
                      <i class="fas fa-graduation-cap text-slate-400 mr-2"></i>
                    </template>
                    <el-option v-for="item in specialtyList" :key="item.id" :label="item.specialtyName"
                      :value="item.id || ''" />
                  </el-select>
                </el-form-item>

                <!-- 年级 -->
                <el-form-item label="年级" prop="grade">
                  <el-input v-model="formData.grade" placeholder="请输入年级" size="large" clearable>
                    <template #prefix>
                      <i class="fas fa-graduation-cap text-slate-400"></i>
                    </template>
                  </el-input>
                </el-form-item>

                <!-- QQ -->
                <el-form-item label="QQ" prop="qq">
                  <el-input v-model="formData.qq" placeholder="请输入QQ号" size="large" clearable>
                    <template #prefix>
                      <i class="fab fa-qq text-slate-400"></i>
                    </template>
                  </el-input>
                </el-form-item>

                <!-- 电话 -->
                <el-form-item label="联系电话" prop="phone">
                  <el-input v-model="formData.phone" placeholder="请输入11位手机号" size="large" clearable>
                    <template #prefix>
                      <i class="fas fa-phone text-slate-400"></i>
                    </template>
                  </el-input>
                </el-form-item>
              </div>


              <!-- 提交按钮 -->
              <div class="flex justify-center pt-4">
                <el-button type="primary" size="large" :loading="submitting" @click="handleSubmit(formRef)"
                  class="!px-12 !py-3 !text-lg !rounded-full !bg-gradient-to-r !from-blue-500 !to-blue-600 !border-none hover:!shadow-lg transition-all">
                  <i class="fas fa-paper-plane mr-2"></i>
                  {{ submitting ? '提交中...' : '立即报名' }}
                </el-button>
              </div>

            </el-form>
          </div>
        </div>

        <!-- 其他加入方式 -->
        <div class="max-w-5xl mx-auto mt-20 scroll-animate">
          <div class="text-center mb-12">
            <h3 class="text-2xl font-bold text-slate-800 mb-4">加群获取报名后续咨询</h3>
            <p class="text-slate-600">点击二维码/一键加群按钮即可联系我们</p>
          </div>

          <!-- 二维码加入 -->
          <div class="flex flex-col items-center">
            <div
              class="qr-container relative bg-white p-4 rounded-3xl shadow-2xl mb-6 transform hover:scale-105 transition-transform duration-300">
              <!-- 二维码容器 -->
              <div class="w-64 h-64 bg-slate-100 rounded-2xl relative overflow-hidden">
                <!-- 背景渐变 -->
                <div class="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-green-500/20"></div>
                <!-- 二维码图片 - 完全填充容器 -->
                <a :href="qqGroupLink" target="_blank" rel="noopener noreferrer"
                  class="absolute inset-0 w-full h-full block">
                  <img :src="qqQrcode" alt="招新群二维码" class="w-full h-full object-cover p-4">
                </a>
                <!-- 扫描线效果 - 增强版 -->
                <div class="qr-scan-line"></div>
                <!-- 角落装饰 -->
                <div class="absolute top-2 left-2 w-6 h-6 border- l-4 border-t-4 border-blue-500 rounded-tl-lg"></div>
                <div class="absolute top-2 right-2 w-6 h-6 border-r-4 border-t-4 border-blue-500 rounded-tr-lg"></div>
                <div class="absolute bottom-2 left-2 w-6 h-6 border-l-4 border-b-4 border-blue-500 rounded-bl-lg">
                </div>
                <div class="absolute bottom-2 right-2 w-6 h-6 border-r-4 border-b-4 border-blue-500 rounded-br-lg">
                </div>
              </div>
              <!-- 装饰角标 -->
              <!-- <div
                class="absolute -top-3 -right-3 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white animate-bounce">
                <i class="fas fa-bell"></i>
              </div> -->
            </div>
            <p class="text-sm text-slate-500 mb-2">若无反应可刷新界面或通过群号加群</p>

            <p class="text-slate-600 text-center mb-4">群号：{{ qqCode }}</p>
            <div class="flex items-center space-x-3">
              <button
                class="px-6 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors flex items-center space-x-2"
                @click="copyGroupNumber">
                <i class="fas fa-copy"></i>
                <span>复制群号</span>
              </button>
              <a :href="qqGroupLink" target="_blank" rel="noopener noreferrer"
                class="px-6 py-2 bg-gradient-to-r from-[#3B82F6] to-[#10B981] text-white rounded-full text-sm font-medium hover:shadow-lg transition-all flex items-center space-x-2">
                <i class="fas fa-external-link-alt"></i>
                <span>一键加群</span>
              </a>
            </div>

          </div>
        </div>

        <!-- 常见问题 -->
        <div class="max-w-3xl mx-auto mt-20">
          <h3 class="text-2xl font-bold text-center text-slate-800 mb-8">常见问题</h3>
          <div class="space-y-4">
            <div v-for="(faq) in questions" :key="faq.id" class="glass rounded-xl overflow-hidden scroll-animate"
              :style="{ '--delay': `${faq.id * 0.01}s` }">
              <button
                class="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-white/50 transition-colors"
                @click="toggleFaq(faq.id)">
                <span class="font-medium text-slate-800">{{ faq.title }}</span>
                <i class="fas fa-chevron-down text-slate-400 transition-transform"
                  :class="{ 'rotate-180': faq.open }"></i>
              </button>
              <div v-show="faq.open" class="px-6 pb-4 text-slate-600 text-sm">
                {{ faq.content }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>



    <!-- 回到顶部按钮 -->
    <button ref="backToTop" @click="scrollToTop"
      class="fixed bottom-8 right-8 w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all transform translate-y-20 opacity-0 z-50 flex items-center justify-center"
      :class="{ 'translate-y-0 opacity-100': showBackToTop }">
      <i class="fas fa-arrow-up"></i>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, reactive, nextTick, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { apply, getSpecialtyList, questionList, honorList, techDirectionList, configList } from './api/index'


// 导航数据
const navItems = [
  { id: 'home', name: '首页' },
  { id: 'departments', name: '部门介绍' },
  { id: 'history', name: '光荣历史' },
  { id: 'join', name: '加入我们' }
]

//报名表单 
const formRef = ref(null)
const submitting = ref(false)

// 表单数据（要与后端接口字段对应）
const formData = reactive({
  name: '',           // 姓名
  studentNum: '',     // 学号（改为数字类型字符串）
  grade: '',          // 年级
  specialtyId: '',      // 专业（字段名改为 specialty）
  qq: '',             // QQ（改为数字类型字符串）
  phone: '',          // 电话（改为数字类型字符串）
})

// 表单验证规则
const formRules = {
  studentNum: [
    { required: true, message: '请输入学号', trigger: 'blur' },
    { pattern: /^\d{10}$/, message: '学号应为10位数字', trigger: 'blur' }
  ],
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { min: 2, max: 10, message: '姓名长度应为2-10个字符', trigger: 'blur' },
    {
      pattern: /^[\u4e00-\u9fa5]+$/,
      message: '姓名只能包含汉字',
      trigger: 'blur'
    }
  ],
  specialtyId: [
    { required: true, message: '请选择专业', trigger: 'change' }
  ],
  grade: [
    { required: true, message: '请输入年级', trigger: 'blur' },
    // 新增：限制为 4 位年份，可选带"级"字，防止乱填
    { pattern: /^20\d{2}(级)?$/, message: '年级格式示例：2024 或 2024级', trigger: 'blur' }
  ],
  qq: [
    { required: true, message: '请输入QQ号码', trigger: 'blur' },
    {
      pattern: /^[1-9]\d{4,10}$/,
      message: 'QQ号码应为5-11位数字，且不能以0开头',
      trigger: 'blur'
    }
  ],
  phone: [
    { required: true, message: '请输入联系电话', trigger: 'blur' },
    {
      pattern: /^1\d{10}$/,
      message: '请输入正确的11位手机号码',
      trigger: 'blur'
    }
  ]
}

// 提交表单加校验并调用后端接口
const handleSubmit = async (formEl) => {
  if (!formEl) return
  // 表单校验
  const valid = await formEl.validate().catch(() => false)
  if (!valid) return

  submitting.value = true
  const res = await apply(formData).catch((error) => {
    ElMessage.error(error.message || '报名失败，请稍后重试')
    return null
  })
  submitting.value = false

  if (res) {
    ElMessage.success('报名成功！')
    formEl.resetFields()
  }
}

// 技术栈
const techStack = [
  { name: 'React', icon: 'fab fa-react', color: 'text-blue-500' },
  { name: 'Vue', icon: 'fab fa-vuejs', color: 'text-green-500' },
  { name: 'Node.js', icon: 'fab fa-node', color: 'text-green-600' },
  { name: 'Python', icon: 'fab fa-python', color: 'text-blue-600' },
  { name: 'Docker', icon: 'fab fa-docker', color: 'text-blue-600' },
  { name: 'Java', icon: 'fab fa-java', color: 'text-orange-500' },
  { name: 'SQL', icon: 'fas fa-database', color: 'text-green-600' },
  { name: 'Git', icon: 'fab fa-git-alt', color: 'text-orange-600' },
]




const history = ref([])

// 荣誉历史颜色配置映射
// 颜色主题配置
const colorThemes = [
  {
    icon: 'fas fa-trophy',
    textColor: 'text-orange-600',
    borderColor: '#F59E0B',
    tagClass: 'bg-orange-100 text-orange-700',
    bgClass: 'bg-gradient-to-r from-orange-100 to-transparent',
    iconColor: 'text-orange-500'
  },
  {
    icon: 'fas fa-award',
    textColor: 'text-green-600',
    borderColor: '#10B981',
    tagClass: 'bg-green-100 text-green-700',
    bgClass: 'bg-gradient-to-l from-green-100 to-transparent',
    iconColor: 'text-green-500'
  },
  {
    icon: 'fas fa-rocket',
    textColor: 'text-purple-600',
    borderColor: '#8B5CF6',
    tagClass: 'bg-purple-100 text-purple-700',
    bgClass: 'bg-gradient-to-l from-purple-100 to-transparent',
    iconColor: 'text-purple-500'
  },
  {
    icon: 'fas fa-medal',
    textColor: 'text-blue-600',
    borderColor: '#3B82F6',
    tagClass: 'bg-blue-100 text-blue-700',
    bgClass: 'bg-gradient-to-r from-blue-100 to-transparent',
    iconColor: 'text-blue-500'
  },
  {
    icon: 'fas fa-star',
    textColor: 'text-pink-600',
    borderColor: '#EC4899',
    tagClass: 'bg-pink-100 text-pink-700',
    bgClass: 'bg-gradient-to-r from-pink-100 to-transparent',
    iconColor: 'text-pink-500'
  },
  {
    icon: 'fas fa-crown',
    textColor: 'text-yellow-600',
    borderColor: '#EAB308',
    tagClass: 'bg-yellow-100 text-yellow-700',
    bgClass: 'bg-gradient-to-l from-yellow-100 to-transparent',
    iconColor: 'text-yellow-500'
  },
  {
    icon: 'fas fa-gem',
    textColor: 'text-cyan-600',
    borderColor: '#06B6D4',
    tagClass: 'bg-cyan-100 text-cyan-700',
    bgClass: 'bg-gradient-to-r from-cyan-100 to-transparent',
    iconColor: 'text-cyan-500'
  },
  {
    icon: 'fas fa-fire',
    textColor: 'text-red-600',
    borderColor: '#EF4444',
    tagClass: 'bg-red-100 text-red-700',
    bgClass: 'bg-gradient-to-l from-red-100 to-transparent',
    iconColor: 'text-red-500'
  }
]

// 部门颜色主题配置
const deptColorThemes = [
  {
    borderColor: 'border-purple-500',
    tagClass: 'bg-purple-100 text-purple-700',
    iconColor: 'text-purple-500'
  },
  {
    borderColor: 'border-blue-500',
    tagClass: 'bg-blue-100 text-blue-700',
    iconColor: 'text-blue-500'
  },
  {
    borderColor: 'border-green-500',
    tagClass: 'bg-green-100 text-green-700',
    iconColor: 'text-green-500'
  },
  {
    borderColor: 'border-orange-500',
    tagClass: 'bg-orange-100 text-orange-700',
    iconColor: 'text-orange-500'
  },
  {
    borderColor: 'border-pink-500',
    tagClass: 'bg-pink-100 text-pink-700',
    iconColor: 'text-pink-500'
  },
  {
    borderColor: 'border-cyan-500',
    tagClass: 'bg-cyan-100 text-cyan-700',
    iconColor: 'text-cyan-500'
  },
  {
    borderColor: 'border-red-500',
    tagClass: 'bg-red-100 text-red-700',
    iconColor: 'text-red-500'
  },
  {
    borderColor: 'border-yellow-500',
    tagClass: 'bg-yellow-100 text-yellow-700',
    iconColor: 'text-yellow-500'
  }
]

// 部门数据
const techDirections = ref([])

// 获取部门列表
const getDepartmentList = async () => {
  try {
    const { data } = await techDirectionList()
    console.log(data, '技术方向数据')
    techDirections.value = data.data.map((item, index) => ({
      ...item,
      ...deptColorThemes[index % deptColorThemes.length]
    }))
  } catch (err) {
    console.error('获取技术方向失败:', err)
  }
}

// 根据颜色映射获取的历史荣誉列表
const getHistoryList = () => {
  honorList().then(({ data }) => {
    // 根据索引循环使用颜色主题
    console.log(data, '荣誉数据')

    history.value = data.data.map((item, index) => ({
      ...item,
      ...colorThemes[index % colorThemes.length]
    }))
  })
}

// 配置列表数据
const configListData = ref([])

// 获取配置数据
const getConfig = () => {
  configList().then(({ data }) => {
    console.log(data, '配置数据')
    configListData.value = data.data
  })
}
// 通过 configKey 查找，不依赖顺序
// 网站标题
const websiteTitle = computed(() => {
  const item = configListData.value.find(item => item.configKey === 'website_title')
  return item?.configValue || '创新实验室'
})
// qq群号
const qqCode = computed(() => {
  const item = configListData.value.find(item => item.configKey === 'qq_group_number')
  return item?.configValue || 'xxxxxxxx'
})
// qq群链接
const qqGroupLink = computed(() => {
  const item = configListData.value.find(item => item.configKey === 'qq_group_link')
  return item?.configValue || ''
})
// qq群二维码
const qqQrcode = computed(() => {
  const item = configListData.value.find(item => item.configKey === 'qq_group_qrcode_path')
  const path = item?.configValue || ''
  // 如果是相对路径，拼接后端基础URL
  if (!path) return ''
  if (path.startsWith('http') || path.startsWith('data:') || path.startsWith('blob:')) return path
  return path
})



const steps = [
  { title: '填写报名表', desc: '在线提交个人信息与年级专业等信息', bgColor: 'bg-green-500' },
  { title: '扫码进群', desc: '扫描二维码加入招新答疑群，获取最新资讯与资料', bgColor: 'bg-blue-500' },
  { title: '技术面试', desc: '参加线下技术面试，展示你的能力与潜力', bgColor: 'bg-orange-500' },
  { title: '成为正式成员', desc: '通过考核，领取工位，开启实验室生涯', bgColor: 'bg-purple-500' }
]

// 图片路径切换
// const imgUrl = new URL('./assets/qqcode.jpg', import.meta.url).href

const questions = ref([])
// 常见问题
const getQuestionList = () => {
  questionList().then(({ data }) => {
    console.log(data, '常见问题数据')
    questions.value = data.data.map(item => ({ ...item, open: false }))
    // 数据加载完成后，重新初始化移动端动画观察器
    nextTick(() => {
      if (window.innerWidth <= 768) {
        observeMobileAnimations()
      }
    })
  })
}
// 切换常见问题的展开与关闭
const toggleFaq = (id) => {
  const faq = questions.value.find(item => item.id === id)
  if (faq) {
    faq.open = !faq.open
  }
}

// 响应式状态
const mobileMenuOpen = ref(false)
const showBackToTop = ref(false)
const particlesContainer = ref(null)
const navbar = ref(null)

// 切换移动端菜单
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const openAdmin = () => {
  mobileMenuOpen.value = false
  const { protocol, hostname, port, origin } = window.location
  const isLocalH5Dev = ['localhost', '127.0.0.1'].includes(hostname) && port === '3000'
  window.location.href = isLocalH5Dev ? `${protocol}//${hostname}:5173/` : `${origin}/admin/`
}

// 滚动到指定部分
const scrollToSection = (id) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    mobileMenuOpen.value = false
  }
}

// 回到顶部
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}



// 部门卡片容器引用
const deptContainer = ref(null)

// 滑动部门卡片
const scrollDepts = (direction) => {
  if (!deptContainer.value) return
  const scrollAmount = 400
  deptContainer.value.scrollBy({
    left: direction === 'left' ? -scrollAmount : scrollAmount,
    behavior: 'smooth'
  })
}

// 复制群号
const copyGroupNumber = () => {
  navigator.clipboard.writeText(qqCode.value).then(() => {
    alert('群号已复制到剪贴板！')
  })
}

// 显示更多历史
const showMoreHistory = () => {
  alert('更多历史成就正在整理中，敬请期待')
}

// 获取时间轴位置类名
const getPositionClass = (index, pos) => {
  const isLeft = pos === 0
  const isEven = index % 2 === 0
  if (isLeft) {
    return isEven ? 'md:text-right md:pr-12' : 'md:pr-12 hidden md:block'
  }
  return isEven ? 'md:pl-12 hidden md:block' : 'md:pl-12'
}

// 3D卡片效果
const handleCardMove = (e) => {
  const card = e.currentTarget.querySelector('.glass')
  const rect = e.currentTarget.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top

  const centerX = rect.width / 2
  const centerY = rect.height / 2

  const rotateX = (y - centerY) / 20
  const rotateY = (centerX - x) / 20

  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`
}

const handleCardLeave = (e) => {
  const card = e.currentTarget.querySelector('.glass')
  card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)'
}

// 生成背景粒子
const createParticles = () => {
  if (!particlesContainer.value) return

  const particleCount = 20

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div')
    particle.className = 'particle'
    particle.style.left = Math.random() * 100 + '%'
    particle.style.top = Math.random() * 100 + '%'
    particle.style.animationDelay = Math.random() * 15 + 's'
    particle.style.animationDuration = (15 + Math.random() * 10) + 's'
    particlesContainer.value.appendChild(particle)
  }
}

// 滚动监听
const handleScroll = () => {
  showBackToTop.value = window.scrollY > 50

  if (navbar.value) {
    if (window.scrollY > 50) {
      navbar.value.classList.add('nav-scrolled')
    } else {
      navbar.value.classList.remove('nav-scrolled')
    }
  }
}

// 移动端滚动动画
let animationObserver = null

const observeMobileAnimations = () => {
  // 只在移动端启用
  if (window.innerWidth > 768) return

  // 如果已有观察器，先断开连接
  if (animationObserver) {
    animationObserver.disconnect()
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -5% 0px', // 元素进入视口底部5%时触发
    threshold: 0.1
  }

  animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        // 动画触发后停止观察，提升性能
        animationObserver.unobserve(entry.target)
      }
    })
  }, observerOptions)

  // 观察所有带有 mobile-float-text 类的元素（排除已添加visible的）
  const floatElements = document.querySelectorAll('.mobile-float-text:not(.visible)')
  floatElements.forEach(el => animationObserver.observe(el))

  // 观察所有带有 scroll-animate 类的卡片元素（排除已添加visible的）
  const cardElements = document.querySelectorAll('.scroll-animate:not(.visible)')
  cardElements.forEach((el, index) => {
    // 为每个卡片设置递增的延迟属性，基础延迟0.2秒
    el.style.setProperty('--delay', `${0.2 + index * 0.022}s`)
    animationObserver.observe(el)
  })

  return animationObserver
}

// 专业下拉列表
const specialtyList = ref([])

onMounted(() => {
  getConfig()
  console.log(qqQrcode.value)
  getDepartmentList()
  getHistoryList()
  getQuestionList()
  createParticles()
  getSpecialtyList().then(({ data }) => {
    console.log(data)
    specialtyList.value = data.data
  })
  window.addEventListener('scroll', handleScroll)

  // 初始化移动端滚动动画（包含文字和卡片）
  observeMobileAnimations()

  // 窗口大小改变时重新初始化
  window.addEventListener('resize', () => {
    observeMobileAnimations()
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (animationObserver) {
    animationObserver.disconnect()
  }
})
</script>

<style>
/* 基础样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC",
    "Microsoft YaHei", Arial, sans-serif;
}

/* 动态背景粒子 */
.particles {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;
  pointer-events: none;
}

.particle {
  position: absolute;
  width: 10px;
  height: 10px;
  background: rgba(59, 130, 246, 0.1);
  border-radius: 50%;
  animation: float 15s infinite;
}

/* 玻璃拟态效果 */
.glass {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.glass-dark {
  background: rgba(30, 41, 59, 0.8);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* 文字渐变 */
.text-gradient {
  background: linear-gradient(135deg, #3B82F6 0%, #10B981 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.text-gradient-warm {
  background: linear-gradient(135deg, #F59E0B 0%, #EF4444 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* 公司徽标呼吸动画 */
.company-logo {
  transition: transform 0.3s ease;
}

.company-logo:hover {
  transform: translateY(-5px);
}

.breathing-animation {
  animation: breathe 1.7s ease-in-out infinite;
}

@keyframes breathe {

  0%,
  100% {
    transform: scale(1);
    opacity: 0.9;
  }

  50% {
    transform: scale(1.2);
    opacity: 1;
  }
}

/* 徽标内部阴影发光效果 */
.company-logo>div {
  transition: box-shadow 0.3s ease;
}

.company-logo:hover>div {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2), 0 0 20px rgba(255, 255, 255, 0.3);
}

/* 时间轴奖项呼吸动效 - 放大缩小效果 */
.award-breathing {
  animation: awardScaleBreathe 2s ease-in-out infinite;
  will-change: transform;
  transform-origin: center center;
}

@keyframes awardScaleBreathe {

  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
  }
}

/* 部门卡片呼吸动效 */
.dept-breathing {
  animation: deptBreathe 2.4s ease-in-out infinite;
  will-change: transform;
  transform-origin: center center;
}

@keyframes deptBreathe {

  0%,
  100% {
    transform: scale(0.9);
  }

  50% {
    transform: scale(1);
  }
}

/* 悬停时暂停呼吸动画，优先显示悬停效果 */
.dept-breathing:hover {
  animation-play-state: paused;
}

/* 技术栈图标左右摇晃动画 */
.tech-shake {
  animation: techShake 3s ease-in-out infinite;
  transform-origin: center center;
}

@keyframes techShake {

  0%,
  100% {
    transform: rotate(0deg);
  }


  100% {
    transform: rotate(360deg);
  }
}

.company-logo {
  border-radius: 20px;

  div {
    border-radius: 20px;
  }
}

/* 导航栏滚动效果 */
.nav-scrolled {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.github-nav-button,
.github-mobile-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  border: 1px solid rgba(15, 23, 42, 0.12);
  background: rgba(255, 255, 255, 0.72);
  color: #0f172a;
  box-shadow: 0 10px 26px rgba(15, 23, 42, 0.12);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  transition: transform 0.25s ease, background 0.25s ease, color 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}

.github-nav-button {
  width: 42px;
  height: 42px;
  font-size: 20px;
}

.github-mobile-button {
  width: 100%;
  height: 46px;
  font-size: 22px;
}

.github-nav-button:hover,
.github-mobile-button:hover {
  transform: translateY(-2px);
  border-color: rgba(59, 130, 246, 0.35);
  background: #0f172a;
  color: #fff;
  box-shadow: 0 14px 34px rgba(59, 130, 246, 0.22);
}

/* 时间轴样式 */
.timeline-line {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: calc(100% - 100px);
  background: linear-gradient(to bottom, #3B82F6, #10B981);
  border-radius: 2px;
}

.timeline-dot {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 20px;
  background: white;
  border: 4px solid #3B82F6;
  border-radius: 50%;
  z-index: 10;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2);
}

/* 扫描线动画 - 通用 */
.scan-line {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(to right, transparent, #10B981, transparent);
  animation: scan 2s linear infinite;
  opacity: 0;
}

/* 合作企业徽标间距 */
.mt-1 {
  margin-top: -2.25rem;
  margin-bottom: 2.25rem;
}

/* 二维码扫描线 - 增强版 */
.qr-scan-line {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(to right,
      transparent 0%,
      rgba(16, 185, 129, 0.1) 20%,
      rgba(16, 185, 129, 0.8) 50%,
      rgba(16, 185, 129, 0.1) 80%,
      transparent 100%);
  box-shadow:
    0 0 6px rgba(16, 185, 129, 0.6),
    0 0 12px rgba(16, 185, 129, 0.4),
    0 0 20px rgba(16, 185, 129, 0.2);
  animation: qr-scan 1.5s ease-in-out infinite;
  z-index: 20;
  pointer-events: none;
}

/* 扫描线光晕效果 */
.qr-scan-line::before {
  content: '';
  position: absolute;
  top: -10px;
  left: 0;
  width: 100%;
  height: 23px;
  background: linear-gradient(to bottom,
      transparent 0%,
      rgba(16, 185, 129, 0.15) 40%,
      rgba(16, 185, 129, 0.3) 50%,
      rgba(16, 185, 129, 0.15) 60%,
      transparent 100%);
  pointer-events: none;
}

@keyframes scan {
  0% {
    top: 0;
    opacity: 0;
  }

  10% {
    opacity: 1;
  }

  90% {
    opacity: 1;
  }

  100% {
    top: 100%;
    opacity: 0;
  }
}

@keyframes qr-scan {
  0% {
    top: 10%;
    opacity: 0;
  }

  5% {
    opacity: 1;
  }

  95% {
    opacity: 1;
  }

  100% {
    top: 90%;
    opacity: 0;
  }
}

/* 浮动动画 */
@keyframes float {

  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }

  33% {
    transform: translateY(-30px) rotate(120deg);
  }

  66% {
    transform: translateY(30px) rotate(240deg);
  }
}

/* 按钮脉冲 */
.btn-pulse {
  position: relative;
  overflow: hidden;
}

.btn-pulse::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.btn-pulse:hover::before {
  width: 300px;
  height: 300px;
}

/* 技能标签动画 */
.skill-tag {
  transition: all 0.3s;
}

.skill-tag:hover {
  transform: scale(1.1) rotate(3deg);
}

/* 部门卡片图标动画 */
.dept-icon {
  transition: transform 0.5s;
}

.dept-card:hover .dept-icon {
  transform: scale(1.2) rotate(360deg);
}

/* 二维码容器 */
.qr-container {
  position: relative;
  overflow: hidden;
}

.qr-container::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(45deg,
      transparent 30%,
      rgba(255, 255, 255, 0.3) 50%,
      transparent 70%);
  transform: rotate(45deg);
  transition: all 0.2s;
  opacity: 0;
}

.qr-container:hover::after {
  animation: shine 0.3s ease-in-out;
}

@keyframes shine {
  0% {
    transform: translateX(-100%) translateY(-100%) rotate(45deg);
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  100% {
    transform: translateX(100%) translateY(100%) rotate(45deg);
    opacity: 0;
  }
}

/* 滚动条美化 */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #3B82F6, #10B981);
  border-radius: 5px;
}

/* 部门卡片滑动容器 - 隐藏滚动条 */
.dept-scroll-container {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.dept-scroll-container::-webkit-scrollbar {
  display: none;
}

/* 部门卡片滑动容器 - 桌面端 */
@media (min-width: 768px) {
  .dept-scroll-container {
    overflow-x: auto;
    cursor: grab;
  }

  .dept-scroll-container:active {
    cursor: grabbing;
  }
}

/* 动画定义 */
.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-pulse-slow {
  animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-bounce-slow {
  animation: bounce 3s infinite;
}

.animate-spin-slow {
  animation: spin 8s linear infinite;
}

.animate-wave {
  animation: wave 2s ease-in-out infinite;
}

@keyframes wave {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
}

/* Element Plus 表单样式优化 */
:deep(.el-form-item__label) {
  font-weight: 600;
  color: #475569;
  padding-bottom: 8px;
}

:deep(.el-input__wrapper) {
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
}

:deep(.el-input__wrapper:hover) {
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
}

:deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

:deep(.el-input__inner) {
  font-size: 15px;
  padding: 8px 12px;
}

:deep(.el-select .el-input__wrapper) {
  border-radius: 12px;
}

:deep(.el-radio-button__inner) {
  border-radius: 10px;
  padding: 12px 20px;
  font-weight: 500;
}

:deep(.el-radio-button:first-child .el-radio-button__inner) {
  border-radius: 10px 0 0 10px;
}

:deep(.el-radio-button:last-child .el-radio-button__inner) {
  border-radius: 0 10px 10px 0;
}

:deep(.el-textarea__inner) {
  border-radius: 12px;
  padding: 12px 16px;
  font-size: 15px;
  resize: none;
}

:deep(.el-form-item.is-error .el-input__wrapper) {
  box-shadow: 0 0 0 2px #ef4444;
}

:deep(.el-form-item__error) {
  color: #ef4444;
  font-size: 13px;
  padding-top: 4px;
}

/* 响应式 */
@media (max-width: 768px) {
  .timeline-line {
    left: 20px;
  }

  .timeline-dot {
    left: 20px;
  }

  :deep(.el-radio-group) {
    flex-direction: column;
    width: 100%;
  }

  :deep(.el-radio-button) {
    width: 100%;
  }

  :deep(.el-radio-button__inner) {
    border-radius: 10px !important;
    width: 100%;
    text-align: center;
  }

  /* ============ 移动端滚动文字浮动动画 ============ */
  /* 初始状态：隐藏并下移 */
  .mobile-float-text {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    will-change: opacity, transform;
  }

  /* 显示状态：完全可见并上浮 */
  .mobile-float-text.visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* 不同延迟类，实现错落有致的动画效果 */
  .mobile-float-text.delay-1 {
    transition-delay: 0.1s;
  }

  .mobile-float-text.delay-2 {
    transition-delay: 0.2s;
  }

  .mobile-float-text.delay-3 {
    transition-delay: 0.3s;
  }

  .mobile-float-text.delay-4 {
    transition-delay: 0.4s;
  }

  /* ============ 移动端卡片滚动触发动画 ============ */
  /* 初始状态：隐藏并从下方浮入 */
  .scroll-animate {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    transition-delay: var(--delay, 0s);
    will-change: opacity, transform;
  }

  /* 显示状态：完全可见并回到原位 */
  .scroll-animate.visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* 禁用桌面端的动画效果 */
  @media (min-width: 769px) {
    .mobile-float-text {
      opacity: 1 !important;
      transform: none !important;
      transition: none !important;
    }

    .scroll-animate {
      opacity: 1 !important;
      transform: none !important;
      transition: none !important;
    }
  }
}
</style>
