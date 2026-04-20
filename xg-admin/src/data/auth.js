export const mockUsers = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123',
    name: '演示管理员',
    role: 'admin',
    roles: ['admin'],
    permissions: ['*']
  }
]

export const mockMenus = [
  { path: '/student-list', title: '学生列表', icon: 'Avatar', permission: 'student:list' },
  { path: '/schoolAdministration', title: '学院管理', icon: 'Coin', permission: 'college:list' },
  { path: '/major', title: '专业管理', icon: 'SetUp', permission: 'specialty:list' },
  { path: '/technique', title: '技术管理', icon: 'Monitor', permission: 'tech:list' },
  { path: '/achievement', title: '荣誉管理', icon: 'GoldMedal', permission: 'honor:list' },
  { path: '/parameter', title: '配置管理', icon: 'Cpu', permission: 'config:list' },
  { path: '/questions', title: '常见问题', icon: 'ChatDotSquare', permission: 'question:list' }
]

export const mockPermissions = [
  'student:list',
  'student:delete',
  'student:export',
  'college:list',
  'college:create',
  'college:update',
  'college:delete',
  'specialty:list',
  'specialty:create',
  'specialty:update',
  'specialty:delete',
  'tech:list',
  'tech:create',
  'tech:update',
  'tech:delete',
  'honor:list',
  'honor:create',
  'honor:update',
  'honor:delete',
  'honor:sort',
  'config:list',
  'config:update',
  'question:list',
  'question:create',
  'question:update',
  'question:delete'
]
