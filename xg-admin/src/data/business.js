export const mockColleges = [
  { id: 1, collegeName: '信息工程学院' },
  { id: 2, collegeName: '智能制造学院' },
  { id: 3, collegeName: '数字经济学院' },
  { id: 4, collegeName: '艺术设计学院' }
]

export const mockSpecialties = [
  { id: 1, specialtyName: '软件工程', collegeId: 1, collegeName: '信息工程学院' },
  { id: 2, specialtyName: '计算机科学与技术', collegeId: 1, collegeName: '信息工程学院' },
  { id: 3, specialtyName: '数据科学与大数据技术', collegeId: 1, collegeName: '信息工程学院' },
  { id: 4, specialtyName: '人工智能', collegeId: 1, collegeName: '信息工程学院' },
  { id: 5, specialtyName: '电子信息工程', collegeId: 2, collegeName: '智能制造学院' },
  { id: 6, specialtyName: '数字媒体技术', collegeId: 4, collegeName: '艺术设计学院' }
]

export const mockStudents = [
  {
    studentNum: '2024001001',
    name: '李明',
    specialtyId: 1,
    specialtyName: '软件工程',
    grade: '2024',
    qq: '120045678',
    phone: '13800000001',
    submissionTime: '2026-03-18 09:12'
  },
  {
    studentNum: '2024001002',
    name: '王雨',
    specialtyId: 2,
    specialtyName: '计算机科学与技术',
    grade: '2024',
    qq: '987654321',
    phone: '13800000002',
    submissionTime: '2026-03-18 10:21'
  },
  {
    studentNum: '2023002001',
    name: '张辰',
    specialtyId: 3,
    specialtyName: '数据科学与大数据技术',
    grade: '2023',
    qq: '765432198',
    phone: '13800000003',
    submissionTime: '2026-03-18 11:05'
  },
  {
    studentNum: '2025003001',
    name: '陈曦',
    specialtyId: 4,
    specialtyName: '人工智能',
    grade: '2025',
    qq: '556677889',
    phone: '13800000004',
    submissionTime: '2026-03-18 14:35'
  },
  {
    studentNum: '2023002002',
    name: '赵一',
    specialtyId: 5,
    specialtyName: '电子信息工程',
    grade: '2023',
    qq: '334455667',
    phone: '13800000005',
    submissionTime: '2026-03-19 08:44'
  },
  {
    studentNum: '2024001003',
    name: '刘星',
    specialtyId: 6,
    specialtyName: '数字媒体技术',
    grade: '2024',
    qq: '223344556',
    phone: '13800000006',
    submissionTime: '2026-03-19 13:26'
  }
]

export const mockTechDirections = [
  {
    id: 1,
    tile: '前端开发',
    content: '负责 Web 与 H5 页面开发，关注交互体验、组件化和工程化。',
    descList: ['Vue/React 组件开发', '页面性能优化', '移动端适配'],
    tagsList: ['Vue', 'React', 'TypeScript', 'Tailwind CSS']
  },
  {
    id: 2,
    tile: '后端架构',
    content: '围绕业务接口、数据库设计和服务稳定性进行学习与实践。',
    descList: ['接口设计', '数据库建模', '服务部署'],
    tagsList: ['Java', 'Spring Boot', 'MySQL', 'Redis']
  },
  {
    id: 3,
    tile: '人工智能',
    content: '探索机器学习、计算机视觉和大模型应用方向。',
    descList: ['模型训练', '数据处理', 'AI 应用落地'],
    tagsList: ['Python', 'PyTorch', 'OpenCV', 'LLM']
  },
  {
    id: 4,
    tile: '全栈项目',
    content: '参与真实项目从需求、设计、开发到上线的完整流程。',
    descList: ['需求拆解', '前后端联调', '项目交付'],
    tagsList: ['Node.js', 'Docker', 'Git', 'CI/CD']
  }
]

export const mockHonors = [
  {
    id: 1,
    tile: '全国大学生软件创新大赛',
    ward: '国家级二等奖',
    tagsList: ['Vue', 'Spring Boot', 'MySQL']
  },
  {
    id: 2,
    tile: '互联网+ 校级选拔赛',
    ward: '校级一等奖',
    tagsList: ['产品设计', '前端', '数据分析']
  },
  {
    id: 3,
    tile: '企业真实项目交付',
    ward: '优秀项目团队',
    tagsList: ['全栈', '协作', '部署']
  },
  {
    id: 4,
    tile: '人工智能应用挑战赛',
    ward: '省级三等奖',
    tagsList: ['Python', '机器学习', '视觉识别']
  }
]

export const mockQuestions = [
  {
    id: 1,
    title: '零基础可以报名吗？',
    content: '可以。我们更看重学习热情和持续投入，会安排基础培养和项目实践。'
  },
  {
    id: 2,
    title: '主要招收哪些年级？',
    content: '主要面向大一、大二学生，其他年级如有明确方向也可以联系咨询。'
  },
  {
    id: 3,
    title: '加入后需要做什么？',
    content: '需要参与技术学习、项目协作、阶段考核和团队分享。'
  },
  {
    id: 4,
    title: '可以同时选择多个方向吗？',
    content: '前期可以广泛了解，后续建议选择一个主方向深入。'
  }
]

export const mockConfigs = [
  {
    id: 1,
    configKey: 'website_title',
    configValue: '前端技术中心',
    description: '前台网站标题',
    updateTime: '2026-03-20 09:00'
  },
  {
    id: 2,
    configKey: 'qq_group_number',
    configValue: '123456789',
    description: '招新 QQ 群号',
    updateTime: '2026-03-20 09:00'
  },
  {
    id: 3,
    configKey: 'qq_group_link',
    configValue: 'https://im.qq.com/index/#/',
    description: '招新 QQ 群链接',
    updateTime: '2026-03-20 09:00'
  },
  {
    id: 4,
    configKey: 'qq_group_qrcode_path',
    configValue: '',
    description: '招新 QQ 群二维码',
    updateTime: '2026-03-20 09:00'
  }
]
