import { readdir, unlink } from 'fs/promises'
import { join, extname, basename } from 'path'
import { fileURLToPath } from 'url'
import { execFile } from 'child_process'
import { promisify } from 'util'

const exec = promisify(execFile)
const __dirname = fileURLToPath(new URL('.', import.meta.url))
const imgDir = join(__dirname, '../src/assets/images')

const EXTS = ['.jpg', '.jpeg', '.png']

const files = (await readdir(imgDir)).filter(f => EXTS.includes(extname(f).toLowerCase()))

if (!files.length) {
  console.log('No JPG/PNG files found.')
  process.exit(0)
}

for (const file of files) {
  const input = join(imgDir, file)
  const output = join(imgDir, `${basename(file, extname(file))}.webp`)

  try {
    await exec('ffmpeg', [
      '-i', input,
      '-vf', "scale=w='min(1920,iw)':h=-2",
      '-c:v', 'libwebp',
      '-quality', '82',
      output,
      '-y',
    ])
    await unlink(input)
    console.log(`✓ ${file} → ${basename(output)}`)
  } catch {
    console.error(`✗ ${file} — failed (is ffmpeg installed?)`)
  }
}
