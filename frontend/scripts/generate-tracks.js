import { parseFile } from 'music-metadata'
import { readdir, writeFile, mkdir } from 'fs/promises'
import { join, basename, extname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const musicDir  = join(__dirname, '../public/music')
const artDir    = join(__dirname, '../public/artwork')
const outFile   = join(__dirname, '../src/tracks.json')

await mkdir(artDir, { recursive: true })

const files = (await readdir(musicDir))
  .filter(f => extname(f).toLowerCase() === '.mp3')
  .sort()

const tracks = []

for (const file of files) {
  const { common } = await parseFile(join(musicDir, file), { skipCovers: false })
  const stem = basename(file, '.mp3')
  const artFile = `${stem}.jpg`

  // Write embedded artwork if present
  const cover = common.picture?.[0]
  if (cover) {
    await writeFile(join(artDir, artFile), cover.data)
  }

  tracks.push({
    file,
    title: common.title  ?? stem,
    album: common.album  ?? 'Unknown Album',
    year:  common.year   ?? null,
    art:   cover ? artFile : null,
  })
}

await writeFile(outFile, JSON.stringify(tracks, null, 2))
console.log(`wrote ${tracks.length} tracks to src/tracks.json`)
tracks.forEach(t => console.log(`  [${t.art ? '★' : ' '}] ${t.title} — ${t.album} (${t.year})`))
