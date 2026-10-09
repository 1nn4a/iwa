import sharp from 'sharp'
import { readdir } from 'node:fs/promises'
import path from 'node:path'

const dirs = ['src/assets', 'public']
const MAX_WIDTH = 1600

for (const dir of dirs) {
  for (const f of await readdir(dir)) {
    if (!/\.(jpe?g|png)$/i.test(f)) continue
    if (/^favicon/i.test(f)) continue // keep favicon as-is
    const src = path.join(dir, f)
    const out = path.join(dir, f.replace(/\.(jpe?g|png)$/i, '.webp'))
    await sharp(src)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(out)
    console.log('ok', out)
  }
}