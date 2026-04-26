const fs = require('fs');
const zlib = require('zlib');

function createPNG(width, height, pixels) {
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData.writeUInt8(8, 8);
  ihdrData.writeUInt8(6, 9);
  ihdrData.writeUInt8(0, 10);
  ihdrData.writeUInt8(0, 11);
  ihdrData.writeUInt8(0, 12);
  
  const rawImageData = [];
  for (let y = 0; y < height; y++) {
    rawImageData.push(0);
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      rawImageData.push(pixels[idx], pixels[idx + 1], pixels[idx + 2], pixels[idx + 3]);
    }
  }
  
  const compressed = zlib.deflateSync(Buffer.from(rawImageData));
  
  function crc32(buf) {
    let c = 0xffffffff;
    for (let i = 0; i < buf.length; i++) {
      c ^= buf[i];
      for (let j = 0; j < 8; j++) {
        c = (c >>> 1) ^ (c & 1 ? 0xedb88320 : 0);
      }
    }
    return (c ^ 0xffffffff) >>> 0;
  }
  
  function createChunk(type, data) {
    const length = Buffer.alloc(4);
    length.writeUInt32BE(data.length);
    const typeBuf = Buffer.from(type);
    const crcData = Buffer.concat([typeBuf, data]);
    const crc = Buffer.alloc(4);
    crc.writeUInt32BE(crc32(crcData));
    return Buffer.concat([length, typeBuf, data, crc]);
  }
  
  const ihdr = createChunk('IHDR', ihdrData);
  const idat = createChunk('IDAT', compressed);
  const iend = createChunk('IEND', Buffer.alloc(0));
  
  return Buffer.concat([signature, ihdr, idat, iend]);
}

const w = 20;
const h = 20;
const pixels = Buffer.alloc(w * h * 4, 0);

function setPixel(x, y, r, g, b, a = 255) {
  if (x >= 0 && x < w && y >= 0 && y < h) {
    const idx = (y * w + x) * 4;
    pixels[idx] = r;
    pixels[idx + 1] = g;
    pixels[idx + 2] = b;
    pixels[idx + 3] = a;
  }
}

function drawLine(x1, y1, x2, y2, r, g, b, a = 255) {
  const dx = Math.abs(x2 - x1);
  const dy = Math.abs(y2 - y1);
  const sx = x1 < x2 ? 1 : -1;
  const sy = y1 < y2 ? 1 : -1;
  let err = dx - dy;
  
  while (true) {
    setPixel(x1, y1, r, g, b, a);
    if (x1 === x2 && y1 === y2) break;
    const e2 = 2 * err;
    if (e2 > -dy) { err -= dy; x1 += sx; }
    if (e2 < dx) { err += dx; y1 += sy; }
  }
}

function drawBox(x, y, width, height, r, g, b, a = 255) {
  for (let i = 0; i < width; i++) {
    setPixel(x + i, y, r, g, b, a);
    setPixel(x + i, y + height - 1, r, g, b, a);
  }
  for (let j = 0; j < height; j++) {
    setPixel(x, y + j, r, g, b, a);
    setPixel(x + width - 1, y + j, r, g, b, a);
  }
}

const boxColor = { r: 66, g: 146, b: 198 };
const lineColor = { r: 8, g: 48, b: 107 };
const medianColor = { r: 214, g: 39, b: 40 };

const cx = 10;
const boxLeft = 5;
const boxRight = 15;
const boxTop = 6;
const boxBottom = 14;
const whiskerTop = 2;
const whiskerBottom = 18;
const capWidth = 3;

drawLine(cx, boxTop, cx, whiskerTop, lineColor.r, lineColor.g, lineColor.b);
drawLine(cx, boxBottom, cx, whiskerBottom, lineColor.r, lineColor.g, lineColor.b);
drawLine(cx - capWidth, whiskerTop, cx + capWidth, whiskerTop, lineColor.r, lineColor.g, lineColor.b);
drawLine(cx - capWidth, whiskerBottom, cx + capWidth, whiskerBottom, lineColor.r, lineColor.g, lineColor.b);

drawBox(boxLeft, boxTop, boxRight - boxLeft, boxBottom - boxTop, boxColor.r, boxColor.g, boxColor.b, 180);

drawLine(cx, boxTop + 3, cx, boxBottom - 3, medianColor.r, medianColor.g, medianColor.b, 255);

const png = createPNG(w, h, pixels);
fs.writeFileSync('assets/icon.png', png);
console.log('Boxplot icon created successfully');
