import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const root = path.resolve(process.cwd())
const svgPath = path.join(root, 'plugins', 'chrome', 'assets', 'logo.svg')
const outDir = path.join(root, 'plugins', 'chrome', 'icons')
const sizes = [16, 32, 48, 128, 256]

if (!fs.existsSync(svgPath)) {
  console.error('SVG not found at', svgPath)
  process.exit(1)
}
fs.mkdirSync(outDir, { recursive: true })

const tasks = sizes.map(async (size) => {
  const out = path.join(outDir, `icon-${size}.png`)
  await sharp(svgPath).resize(size, size).png({ compressionLevel: 9 }).toFile(out)
  console.log('Generated', out)
})

await Promise.all(tasks)
console.log('All icons generated.')

