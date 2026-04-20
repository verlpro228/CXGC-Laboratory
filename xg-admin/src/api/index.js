import { mockMenus, mockPermissions, mockUsers } from '../data/auth'
import {
  mockColleges,
  mockConfigs,
  mockHonors,
  mockQuestions,
  mockSpecialties,
  mockStudents,
  mockTechDirections
} from '../data/business'
import { clone, ensureCollection, nextNumericId, nowText, saveCollection } from '../utils/storage'

const KEYS = {
  students: 'students',
  colleges: 'colleges',
  specialties: 'specialties',
  questions: 'questions',
  honors: 'honors',
  techDirections: 'techDirections',
  configs: 'configs'
}

const ok = (data = null, message = '操作成功') => Promise.resolve({ data: { code: 200, message, data } })
const fail = (message = '操作失败') => Promise.reject(new Error(message))

const getStudents = () => ensureCollection(KEYS.students, mockStudents)
const saveStudents = (items) => saveCollection(KEYS.students, items)
const getColleges = () => ensureCollection(KEYS.colleges, mockColleges)
const saveColleges = (items) => saveCollection(KEYS.colleges, items)
const getSpecialties = () => ensureCollection(KEYS.specialties, mockSpecialties)
const saveSpecialties = (items) => saveCollection(KEYS.specialties, items)
const getQuestions = () => ensureCollection(KEYS.questions, mockQuestions)
const saveQuestions = (items) => saveCollection(KEYS.questions, items)
const getHonors = () => ensureCollection(KEYS.honors, mockHonors)
const saveHonors = (items) => saveCollection(KEYS.honors, items)
const getTechDirections = () => ensureCollection(KEYS.techDirections, mockTechDirections)
const saveTechDirections = (items) => saveCollection(KEYS.techDirections, items)
const getConfigs = () => ensureCollection(KEYS.configs, mockConfigs)
const saveConfigs = (items) => saveCollection(KEYS.configs, items)

const publicUser = (user) => {
  const { password, ...rest } = user
  return rest
}

const persistSession = (user) => {
  const token = `mock-token-${Date.now()}`
  const safeUser = publicUser(user)
  localStorage.setItem('xg_token', token)
  localStorage.setItem('xg_user', JSON.stringify(safeUser))
  localStorage.setItem('xg_roles', JSON.stringify(user.roles || [user.role]))
  localStorage.setItem('xg_permissions', JSON.stringify(mockPermissions))
  return { token, user: safeUser, role: user.role, roles: user.roles, permissions: mockPermissions, menus: mockMenus }
}

const normalizeListText = (value) => {
  if (Array.isArray(value)) return value.map(item => String(item).trim()).filter(Boolean)
  if (!value) return []
  return String(value).split(',').map(item => item.trim()).filter(Boolean)
}

const syncSpecialtyName = (student) => {
  const specialty = getSpecialties().find(item => Number(item.id) === Number(student.specialtyId))
  return { ...student, specialtyName: student.specialtyName || specialty?.specialtyName || '未选择专业' }
}

const filterStudents = (items, params = {}) => {
  const keyword = String(params.keyword || params.search || params.name || '').trim().toLowerCase()
  const grade = String(params.grade || '').trim()
  const specialtyId = params.specialtyId ? Number(params.specialtyId) : null
  const specialtyName = String(params.specialtyName || '').trim()

  return items.filter(item => {
    const matchKeyword = !keyword || [item.studentNum, item.name, item.specialtyName, item.grade, item.qq, item.phone]
      .some(value => String(value || '').toLowerCase().includes(keyword))
    const matchGrade = !grade || String(item.grade).includes(grade)
    const matchSpecialtyId = !specialtyId || Number(item.specialtyId) === specialtyId
    const matchSpecialtyName = !specialtyName || String(item.specialtyName).includes(specialtyName)
    return matchKeyword && matchGrade && matchSpecialtyId && matchSpecialtyName
  })
}

const sortStudents = (items, params = {}) => {
  const sortBy = params.sortBy || params.prop
  if (!sortBy) return items
  const order = params.order === 'ascending' || params.order === 'asc' ? 1 : -1
  return [...items].sort((a, b) => String(a[sortBy] || '').localeCompare(String(b[sortBy] || ''), 'zh-Hans-CN') * order)
}

const csvCell = (value) => `"${String(value ?? '').replace(/"/g, '""')}"`
const studentsToCsv = (students) => {
  const headers = ['学号', '姓名', '专业', '年级', 'QQ', '电话', '提交时间']
  const rows = students.map(item => [
    item.studentNum,
    item.name,
    item.specialtyName,
    item.grade,
    item.qq,
    item.phone,
    item.submissionTime
  ])
  return `\ufeff${[headers, ...rows].map(row => row.map(csvCell).join(',')).join('\n')}`
}

const readFileAsDataUrl = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.onload = () => resolve(reader.result)
  reader.onerror = reject
  reader.readAsDataURL(file)
})

// auth
export function login(data) {
  const user = mockUsers.find(item => item.username === data.username && item.password === data.password)
  if (!user) return fail('账号或密码错误，演示账号：admin / admin123')
  return ok(persistSession(user), '登录成功')
}

export function logout() {
  localStorage.removeItem('xg_token')
  localStorage.removeItem('xg_user')
  localStorage.removeItem('xg_roles')
  localStorage.removeItem('xg_permissions')
  return ok(null, '退出成功')
}

export function userInfo() {
  const user = JSON.parse(localStorage.getItem('xg_user') || 'null') || publicUser(mockUsers[0])
  return ok({ user, roles: user.roles || ['admin'], permissions: mockPermissions })
}

export function permissionList() {
  return ok(mockPermissions)
}

export function menuList() {
  return ok(mockMenus)
}

// students
export function studentPage(params = {}) {
  const pageNum = Number(params.pageNum || 1)
  const pageSize = Number(params.pageSize || 10)
  const synced = getStudents().map(syncSpecialtyName)
  const filtered = sortStudents(filterStudents(synced, params), params)
  const start = (pageNum - 1) * pageSize
  const records = filtered.slice(start, start + pageSize)
  return ok({ records, total: filtered.length, pageNum, pageSize })
}

export function deleteStudent(studentNum) {
  saveStudents(getStudents().filter(item => String(item.studentNum) !== String(studentNum)))
  return ok(null, '删除成功')
}

export function exportAll() {
  return Promise.resolve({ data: studentsToCsv(getStudents().map(syncSpecialtyName)) })
}

export function exportByNum(studentNums = []) {
  const selected = getStudents().filter(item => studentNums.includes(item.studentNum)).map(syncSpecialtyName)
  return Promise.resolve({ data: studentsToCsv(selected) })
}

// colleges
export function collegeList() {
  return ok(getColleges())
}

export function deleteCollege(id) {
  saveColleges(getColleges().filter(item => Number(item.id) !== Number(id)))
  return ok(null, '删除成功')
}

export function addCollege(data) {
  const colleges = getColleges()
  const item = { id: nextNumericId(colleges), collegeName: data.collegeName }
  saveColleges([...colleges, item])
  return ok(item, '新增成功')
}

export function updateCollege(data) {
  const colleges = getColleges()
  const oldCollege = colleges.find(item => Number(item.id) === Number(data.id))
  const updated = colleges.map(item => Number(item.id) === Number(data.id) ? { ...item, collegeName: data.collegeName } : item)
  saveColleges(updated)

  if (oldCollege && oldCollege.collegeName !== data.collegeName) {
    saveSpecialties(getSpecialties().map(item => Number(item.collegeId) === Number(data.id)
      ? { ...item, collegeName: data.collegeName }
      : item))
  }
  return ok(updated.find(item => Number(item.id) === Number(data.id)), '修改成功')
}

// specialties
export function majorList() {
  return ok(getSpecialties())
}

export function addMajor(data) {
  const specialties = getSpecialties()
  const college = getColleges().find(item => Number(item.id) === Number(data.collegeId) || item.collegeName === data.collegeName)
  const item = {
    id: nextNumericId(specialties),
    specialtyName: data.specialtyName,
    collegeId: college?.id || data.collegeId || '',
    collegeName: college?.collegeName || data.collegeName || ''
  }
  saveSpecialties([...specialties, item])
  return ok(item, '新增成功')
}

export function updateMajor(data) {
  const specialties = getSpecialties()
  const college = getColleges().find(item => Number(item.id) === Number(data.collegeId) || item.collegeName === data.collegeName)
  const updated = specialties.map(item => Number(item.id) === Number(data.id)
    ? { ...item, specialtyName: data.specialtyName, collegeId: college?.id || data.collegeId || item.collegeId, collegeName: college?.collegeName || data.collegeName || item.collegeName }
    : item)
  saveSpecialties(updated)
  const changed = updated.find(item => Number(item.id) === Number(data.id))
  if (changed) {
    saveStudents(getStudents().map(item => Number(item.specialtyId) === Number(data.id) ? { ...item, specialtyName: changed.specialtyName } : item))
  }
  return ok(changed, '修改成功')
}

export function deleteMajor(id) {
  saveSpecialties(getSpecialties().filter(item => Number(item.id) !== Number(id)))
  return ok(null, '删除成功')
}

// questions
export function questionList() {
  return ok(getQuestions())
}

export function addQuestion(data) {
  const items = getQuestions()
  const item = { id: nextNumericId(items), title: data.title, content: data.content }
  saveQuestions([...items, item])
  return ok(item, '新增成功')
}

export function updateQuestion(data) {
  const updated = getQuestions().map(item => Number(item.id) === Number(data.id) ? { ...item, title: data.title, content: data.content } : item)
  saveQuestions(updated)
  return ok(updated.find(item => Number(item.id) === Number(data.id)), '修改成功')
}

export function deleteQuestion(id) {
  saveQuestions(getQuestions().filter(item => Number(item.id) !== Number(id)))
  return ok(null, '删除成功')
}

// honors
export function honorList() {
  return ok(getHonors())
}

export function addHonor(data) {
  const items = getHonors()
  const item = { id: nextNumericId(items), tile: data.tile, ward: data.ward, tagsList: normalizeListText(data.tagsList) }
  saveHonors([...items, item])
  return ok(item, '新增成功')
}

export function updateHonor(data) {
  const updated = getHonors().map(item => Number(item.id) === Number(data.id)
    ? { ...item, tile: data.tile, ward: data.ward, tagsList: normalizeListText(data.tagsList) }
    : item)
  saveHonors(updated)
  return ok(updated.find(item => Number(item.id) === Number(data.id)), '修改成功')
}

export function deleteHonor(id) {
  saveHonors(getHonors().filter(item => Number(item.id) !== Number(id)))
  return ok(null, '删除成功')
}

export function updateSort(data) {
  const items = getHonors()
  const ordered = data.idList
    .map(id => items.find(item => Number(item.id) === Number(id)))
    .filter(Boolean)
  const leftovers = items.filter(item => !data.idList.some(id => Number(id) === Number(item.id)))
  saveHonors([...ordered, ...leftovers])
  return ok(null, '排序保存成功')
}

// tech directions
export function techDirectionList() {
  return ok(getTechDirections())
}

export function addTechDirection(data) {
  const items = getTechDirections()
  const item = {
    id: nextNumericId(items),
    tile: data.tile,
    content: data.content,
    descList: normalizeListText(data.descList),
    tagsList: normalizeListText(data.tagsList)
  }
  saveTechDirections([...items, item])
  return ok(item, '新增成功')
}

export function updateTechDirection(data) {
  const updated = getTechDirections().map(item => Number(item.id) === Number(data.id)
    ? { ...item, tile: data.tile, content: data.content, descList: normalizeListText(data.descList), tagsList: normalizeListText(data.tagsList) }
    : item)
  saveTechDirections(updated)
  return ok(updated.find(item => Number(item.id) === Number(data.id)), '修改成功')
}

export function deleteTechDirection(id) {
  saveTechDirections(getTechDirections().filter(item => Number(item.id) !== Number(id)))
  return ok(null, '删除成功')
}

// configs and upload
export function configList() {
  return ok(getConfigs())
}

export function updateConfig(data) {
  const updated = getConfigs().map(item => Number(item.id) === Number(data.id)
    ? { ...item, configValue: data.configValue, updateTime: nowText() }
    : item)
  saveConfigs(updated)
  return ok(updated.find(item => Number(item.id) === Number(data.id)), '修改成功')
}

export async function qqQrcodeUpload(formData) {
  const file = formData?.get?.('file')
  if (!file) return fail('请选择图片文件')
  const dataUrl = await readFileAsDataUrl(file)
  return ok({ filePath: dataUrl, url: dataUrl }, '上传成功')
}

export function resetMockData() {
  saveStudents(clone(mockStudents))
  saveColleges(clone(mockColleges))
  saveSpecialties(clone(mockSpecialties))
  saveQuestions(clone(mockQuestions))
  saveHonors(clone(mockHonors))
  saveTechDirections(clone(mockTechDirections))
  saveConfigs(clone(mockConfigs))
  return ok(null, '演示数据已重置')
}
