import sharp from 'sharp';
import { mkdir, readFile } from 'node:fs/promises';

await mkdir('public/images', { recursive: true });
const source = 'assets/originals/fruit-still-life.png';
await sharp(source).resize(1536, 1024).webp({ quality: 82 }).toFile('public/images/hero.webp');
await sharp(source).resize(768, 512).webp({ quality: 80 }).toFile('public/images/hero-small.webp');
const crops = [
  ['apples', { left: 0, top: 210, width: 650, height: 700 }],
  ['oranges', { left: 540, top: 270, width: 530, height: 600 }],
  ['grapes', { left: 960, top: 220, width: 576, height: 700 }],
];
for (const [name, extract] of crops) {
  for (const width of [480, 800]) {
    await sharp(source).extract(extract).resize(width, Math.round(width * .8), { fit: 'cover' }).webp({ quality: 82 }).toFile(`public/images/${name}${width === 480 ? '-small' : ''}.webp`);
  }
}
const overlay = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="650" height="630" fill="#143b2b"/><text x="60" y="130" fill="#f8f7f1" font-family="Arial,sans-serif" font-size="65" font-weight="bold">SLICKK<tspan fill="#efaa69">.</tspan></text><text x="60" y="290" fill="#f8f7f1" font-family="Georgia,serif" font-size="64">Freshness</text><text x="60" y="370" fill="#efaa69" font-family="Georgia,serif" font-size="64">Across Borders.</text><text x="60" y="490" fill="#d2dccb" font-family="Arial,sans-serif" font-size="23">International fruit sourcing for Bangladesh</text><text x="60" y="540" fill="#d2dccb" font-family="Arial,sans-serif" font-size="21">slickk.online</text></svg>`);
await sharp(source).resize(1200, 630, { fit: 'cover' }).composite([{ input: overlay }]).jpeg({ quality: 86 }).toFile('public/images/social.jpg');
await readFile('public/fonts/inter-latin.woff2');
console.log('Prepared responsive WebP images and social preview; local font exists.');
