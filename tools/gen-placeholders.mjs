/**
 * NexifyHost safe placeholder generator.
 *
 * Existing files are preserved unless --force is supplied.
 */
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "public", "images");
const force = process.argv.includes("--force");

const slots = [
  ["logo.webp", 256, 256],
  ["faq-side.webp", 720, 960],
  ["banners/minecraft.png", 1920, 1080],
  ["banners/budget.png", 800, 450],
  ["banners/standard.webp", 800, 450],
  ["banners/performance.png", 800, 450],
  ["banners/bots.png", 1280, 720],
  ["banners/gameservers.png", 1280, 720],
  ["banners/domains.png", 1280, 720],
  ["runtimes/node.png", 256, 256],
  ["runtimes/python.png", 256, 256],
  ["runtimes/java.png", 256, 256],
  ["runtimes/go.png", 256, 256],
  ["runtimes/php.png", 256, 256],
  ["runtimes/lua.png", 256, 256],
  ["partners/intel.png", 480, 160],
  ["partners/amd.png", 480, 160],
  ["partners/pterodactyl.png", 480, 160],
  ["partners/cloudflare.png", 480, 160],
  ["partners/hetzner.png", 480, 160],
  ["showcase/shell.png", 1280, 800],
  ["showcase/plugins.png", 1280, 800],
  ["showcase/mods.png", 1280, 800],
  ["showcase/analytics.png", 1280, 800],
];

const crcTable = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let value = n;
    for (let bit = 0; bit < 8; bit++) {
      value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
    }
    table[n] = value >>> 0;
  }
  return table;
})();

function crc32(buffer) {
  let value = 0xffffffff;
  for (const byte of buffer) value = crcTable[(value ^ byte) & 0xff] ^ (value >>> 8);
  return (value ^ 0xffffffff) >>> 0;
}

function pngChunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([length, body, crc]);
}

function makePng(width, height) {
  const rgba = Buffer.alloc(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    rgba[i * 4] = 241;
    rgba[i * 4 + 1] = 245;
    rgba[i * 4 + 2] = 249;
    rgba[i * 4 + 3] = 255;
  }

  const raw = Buffer.alloc((width * 4 + 1) * height);
  for (let y = 0; y < height; y++) {
    rgba.copy(raw, y * (width * 4 + 1) + 1, y * width * 4, (y + 1) * width * 4);
  }

  const header = Buffer.alloc(13);
  header.writeUInt32BE(width, 0);
  header.writeUInt32BE(height, 4);
  header[8] = 8;
  header[9] = 6;

  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    pngChunk("IHDR", header),
    pngChunk("IDAT", zlib.deflateSync(raw, { level: 9 })),
    pngChunk("IEND", Buffer.alloc(0)),
  ]);
}

let written = 0;
let preserved = 0;
for (const [relativePath, width, height] of slots) {
  const destination = path.join(root, relativePath);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  if (!force && fs.existsSync(destination)) {
    preserved++;
    continue;
  }
  fs.writeFileSync(destination, makePng(width, height));
  written++;
}

console.log(`Written: ${written} genuine PNG placeholders`);
console.log(`Preserved: ${preserved} existing images`);
console.log("Real WebP files can be added with the same base names and load first.");