const STORAGE_PREFIX = 'xg_static_xg_'

const isBrowser = () => typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'

export const clone = (value) => {
  if (value === undefined) return undefined
  return JSON.parse(JSON.stringify(value))
}

export const storageKey = (key) => `${STORAGE_PREFIX}${key}`
const seedKey = (key) => `${key}__seed`
const stringify = (value) => JSON.stringify(value)

const itemIdentity = (item) => {
  if (!item || typeof item !== 'object') return null
  if (item.configKey !== undefined) return `config:${item.configKey}`
  if (item.studentNum !== undefined) return `student:${item.studentNum}`
  if (item.id !== undefined) return `id:${item.id}`
  return null
}

const toIdentityMap = (items = []) => {
  const map = new Map()
  items.forEach((item) => {
    const id = itemIdentity(item)
    if (id) map.set(id, item)
  })
  return map
}

const mergeSeedChanges = (existing, initialData, previousSeed) => {
  const seed = clone(initialData)
  const previous = Array.isArray(previousSeed) ? previousSeed : existing
  const seedMap = toIdentityMap(seed)
  const previousMap = toIdentityMap(previous)
  const used = new Set()

  const merged = existing.map((item) => {
    const id = itemIdentity(item)
    const seedItem = id ? seedMap.get(id) : null
    const previousItem = id ? previousMap.get(id) : null
    if (!id || !seedItem || !previousItem) return item
    used.add(id)

    // If the user has not edited this record, sync newer defaults from data files.
    if (stringify(item) === stringify(previousItem)) return clone(seedItem)
    return item
  })

  seed.forEach((item) => {
    const id = itemIdentity(item)
    if (id && !used.has(id) && !existing.some((existingItem) => itemIdentity(existingItem) === id)) {
      merged.push(clone(item))
    }
  })

  return merged
}

export function getStorage(key, fallback = null) {
  if (!isBrowser()) return clone(fallback)
  const raw = window.localStorage.getItem(storageKey(key))
  if (!raw) return clone(fallback)
  try {
    return JSON.parse(raw)
  } catch (error) {
    console.warn(`Failed to parse localStorage data: ${key}`, error)
    return clone(fallback)
  }
}

export function setStorage(key, value) {
  if (!isBrowser()) return value
  window.localStorage.setItem(storageKey(key), JSON.stringify(value))
  return value
}

export function removeStorage(key) {
  if (!isBrowser()) return
  window.localStorage.removeItem(storageKey(key))
}

export function ensureCollection(key, initialData = []) {
  const existing = getStorage(key)
  const previousSeed = getStorage(seedKey(key))
  if (Array.isArray(existing)) {
    const merged = mergeSeedChanges(existing, initialData, previousSeed)
    setStorage(seedKey(key), clone(initialData))
    if (stringify(merged) !== stringify(existing)) setStorage(key, merged)
    return merged
  }
  const seeded = clone(initialData)
  setStorage(key, seeded)
  setStorage(seedKey(key), seeded)
  return seeded
}

export function saveCollection(key, value) {
  return setStorage(key, clone(value))
}

export function nextNumericId(items) {
  const maxId = items.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0)
  return maxId + 1
}

export function nowText() {
  const pad = (num) => String(num).padStart(2, '0')
  const date = new Date()
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`
}
