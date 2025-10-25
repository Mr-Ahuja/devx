import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const pluginDir = path.join(root, 'plugins', 'chrome')
const distDir = path.join(root, 'dist-extension')

function run(cmd, args, opts = {}) {
  const res = spawnSync(cmd, args, { stdio: 'inherit', shell: false, ...opts })
  if (res.status !== 0) {
    console.error(`Command failed: ${cmd} ${args.join(' ')}`)
    process.exit(res.status ?? 1)
  }
}

// 1) Generate icons (requires sharp)
run('node', [path.join('scripts', 'generate-icons.mjs')])

// 2) Prepare temp folder to zip
fs.mkdirSync(distDir, { recursive: true })
const staging = path.join(distDir, 'chrome')
fs.rmSync(staging, { recursive: true, force: true })
fs.mkdirSync(staging)

// Copy manifest, popup, assets
const filesToCopy = [
  'manifest.json',
  'popup.html',
  'popup.css',
  'popup.js',
]
for (const file of filesToCopy) {
  fs.copyFileSync(path.join(pluginDir, file), path.join(staging, file))
}
// Copy icons folder
fs.mkdirSync(path.join(staging, 'icons'), { recursive: true })
for (const file of fs.readdirSync(path.join(pluginDir, 'icons'))) {
  fs.copyFileSync(path.join(pluginDir, 'icons', file), path.join(staging, 'icons', file))
}
// Copy assets (svg) for popup logo
fs.mkdirSync(path.join(staging, 'assets'), { recursive: true })
fs.copyFileSync(path.join(pluginDir, 'assets', 'logo.svg'), path.join(staging, 'assets', 'logo.svg'))

// 3) Zip
const zipOut = path.join(distDir, 'devx-chrome.zip')
if (process.platform === 'win32') {
  // Use PowerShell Compress-Archive
  const ps = `Compress-Archive -Path "${staging}/*" -DestinationPath "${zipOut}" -Force`
  run('powershell', ['-NoProfile', '-Command', ps])
} else {
  // Use zip
  run('zip', ['-r', zipOut, '.'], { cwd: staging })
}

console.log('Packaged extension at', zipOut)

