import { mkdir, writeFile } from 'node:fs/promises';
import sharp from 'sharp';
import assert from 'node:assert/strict';

// Original geometric outlines keep the master independent of installed fonts.
const letters = [
  ['M60 0H14L0 14V42L42 56V70H0V88H46L60 74V42L18 28V18H60Z', 0],
  ['M0 0H18V70H57V88H0Z', 75],
  ['M0 0H18V88H0Z', 147],
  ['M60 0H15L0 15V73L15 88H60V70H21L18 67V21L21 18H60Z', 180],
  ['M0 0H18V34L48 0H70L31 44L70 88H47L18 55V88H0Z', 255],
  ['M0 0H18V34L48 0H70L31 44L70 88H47L18 55V88H0Z', 337],
];
const word = (color) => `<g fill="${color}">${letters.map(([d,x])=>`<path transform="translate(${x})" d="${d}"/>`).join('')}</g>`;
const symbol = (color) => `<path fill="${color}" d="${letters[0][0]}"/>`;
const svg = (w,h,body) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><title>SLICKK — original geometric identity</title>${body}</svg>`;
const dir = 'public/brand';
await mkdir(dir,{recursive:true});
for (const [name,color] of [['dark','#080b10'],['light','#f5f3ef'],['blue','#328cff']]) {
  const variants = {
    wordmark: svg(447,128,`<g transform="translate(20 20)">${word(color)}</g>`),
    symbol: svg(128,128,`<g transform="translate(34 20)">${symbol(color)}</g>`),
    horizontal: svg(575,128,`<g transform="translate(34 20)">${symbol('#328cff')}</g><path stroke="${color}" opacity=".3" d="M128 20v88"/><g transform="translate(148 20)">${word(color)}</g>`),
  };
  for (const [kind,source] of Object.entries(variants)) {
    const filename = `${dir}/slickk-${kind}-${name}`;
    await writeFile(filename+'.svg',source);
    await sharp(Buffer.from(source)).resize({width:kind==='symbol'?1024:2400}).png().toFile(filename+'.png');
    await sharp(Buffer.from(source)).resize({width:kind==='symbol'?1024:2400}).flatten({background:name==='light'?'#080b10':'#f5f3ef'}).jpeg({quality:96,chromaSubsampling:'4:4:4'}).toFile(filename+'.jpg');
  }
}
const avatar=svg(512,512,`<rect width="512" height="512" fill="#080b10"/><g transform="translate(166 124) scale(3)">${symbol('#4bd7ef')}</g>`);
await writeFile(`${dir}/slickk-avatar.svg`,avatar);
await sharp(Buffer.from(avatar)).png().toFile(`${dir}/slickk-avatar.png`);
await sharp(Buffer.from(avatar)).jpeg({quality:96}).toFile(`${dir}/slickk-avatar.jpg`);
await writeFile('public/favicon.svg',avatar);
for(const size of [96,192,512]) await sharp(Buffer.from(avatar)).resize(size).png().toFile(`public/favicon-${size}.png`);
await sharp(Buffer.from(avatar)).resize(180).png().toFile('public/apple-touch-icon.png');
const social=svg(1200,630,`<rect width="1200" height="630" fill="#080b10"/><path stroke="#222934" d="M64 120H1136M64 500H1136M820 64V566"/><g transform="translate(64 180) scale(1.6)">${word('#f5f3ef')}</g><g transform="translate(900 180) scale(2)">${symbol('#4bd7ef')}</g><text x="64" y="390" fill="#f5f3ef" font-family="sans-serif" font-size="32">We Design. We Build. We Elevate.</text><text x="64" y="546" fill="#aebac8" font-family="sans-serif" font-size="20">DIGITAL SOLUTIONS · BANGLADESH</text>`);
await writeFile(`${dir}/slickk-social.svg`,social);
await sharp(Buffer.from(social)).jpeg({quality:92}).toFile('public/images/agency-social.jpg');
const meta=await sharp(`${dir}/slickk-wordmark-dark.png`).metadata();
assert.equal(meta.width,2400); assert.equal(meta.hasAlpha,true);
assert.equal((await sharp('public/favicon-96.png').metadata()).width,96);
console.log('Brand master SVG, transparent PNG, background JPEG, avatar, social and favicons exported.');
