import {
  mockColleges,
  mockConfigs,
  mockHonors,
  mockQuestions,
  mockSpecialties,
  mockStudents,
  mockTechDirections
} from '../data/business'
import { ensureCollection, nowText, saveCollection } from '../utils/storage'

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
const getSpecialties = () => ensureCollection(KEYS.specialties, mockSpecialties)
const getQuestions = () => ensureCollection(KEYS.questions, mockQuestions)
const getHonors = () => ensureCollection(KEYS.honors, mockHonors)
const getTechDirections = () => ensureCollection(KEYS.techDirections, mockTechDirections)
const getConfigs = () => ensureCollection(KEYS.configs, mockConfigs)

// 确保同域部署时，后台未访问过也会初始化学院数据。
ensureCollection(KEYS.colleges, mockColleges)

export const apply = (data) => {
  const students = getStudents()
  const studentNum = String(data.studentNum || '').trim()
  if (students.some(item => String(item.studentNum) === studentNum)) {
    return fail('该学号已提交报名，请勿重复提交')
  }

  const specialty = getSpecialties().find(item => Number(item.id) === Number(data.specialtyId))
  const item = {
    studentNum,
    name: String(data.name || '').trim(),
    grade: String(data.grade || '').trim(),
    specialtyId: data.specialtyId,
    specialtyName: specialty?.specialtyName || '未选择专业',
    qq: String(data.qq || '').trim(),
    phone: String(data.phone || '').trim(),
    submissionTime: nowText()
  }
  saveStudents([item, ...students])
  return ok(item, '报名成功')
}

export const getSpecialtyList = () => ok(getSpecialties())

export function questionList() {
  return ok(getQuestions())
}

export function honorList() {
  return ok(getHonors())
}

export function techDirectionList() {
  return ok(getTechDirections())
}

export function configList() {
  return ok(getConfigs())
}
