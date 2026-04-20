import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outputDir = path.join(rootDir, 'dist')
const h5Dist = path.join(rootDir, 'xg-H5', 'dist')
const adminDist = path.join(rootDir, 'xg-admin', 'dist')
const adminOutput = path.join(outputDir, 'admin')

for (const dir of [h5Dist, adminDist]) {
  if (!fs.existsSync(dir)) {
    throw new Error(`Missing build output: ${path.relative(rootDir, dir)}`)
  }
}

const resetDir = (dir) => {
  fs.rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 })
  fs.mkdirSync(dir, { recursive: true })
}

const copyRecursive = (from, to) => {
  const stat = fs.statSync(from)
  if (stat.isDirectory()) {
    fs.mkdirSync(to, { recursive: true })
    for (const entry of fs.readdirSync(from)) {
      copyRecursive(path.join(from, entry), path.join(to, entry))
    }
    return
  }

  fs.mkdirSync(path.dirname(to), { recursive: true })
  fs.copyFileSync(from, to)
}

const copyDirContents = (from, to) => {
  fs.mkdirSync(to, { recursive: true })
  for (const entry of fs.readdirSync(from)) {
    copyRecursive(path.join(from, entry), path.join(to, entry))
  }
}

resetDir(outputDir)
copyDirContents(h5Dist, outputDir)
copyDirContents(adminDist, adminOutput)

console.log('Vercel output composed: H5 -> dist/, admin -> dist/admin/')
