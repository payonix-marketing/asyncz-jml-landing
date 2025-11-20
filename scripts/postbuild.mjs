import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { pipeline } from "stream/promises";
import { createGzip, createBrotliCompress } from "zlib";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const buildDir = path.join(__dirname, "../build");
const COMPRESS_EXTENSIONS = new Set([".html", ".js", ".css", ".json", ".svg", ".txt", ".webmanifest"]);

async function* walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const res = path.resolve(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(res);
    } else {
      yield res;
    }
  }
}

async function compressFile(filePath) {
  const ext = path.extname(filePath);
  if (!COMPRESS_EXTENSIONS.has(ext)) {
    return;
  }

  const source = await fs.open(filePath, "r");
  try {
    const gzipPath = `${filePath}.gz`;
    const brotliPath = `${filePath}.br`;

    const gzip = createGzip({ level: 9 });
    await pipeline(source.createReadStream(), gzip, (await fs.open(gzipPath, "w")).createWriteStream());
    await fs.utimes(gzipPath, new Date(), new Date());

    const source2 = await fs.open(filePath, "r");
    const brotli = createBrotliCompress({ quality: 11 });
    await pipeline(source2.createReadStream(), brotli, (await fs.open(brotliPath, "w")).createWriteStream());
    await fs.utimes(brotliPath, new Date(), new Date());
    await source2.close();
  } finally {
    await source.close();
  }
}

async function run() {
  try {
    await fs.access(buildDir);
  } catch (error) {
    console.warn("Build directory not found; skipping compression");
    return;
  }

  for await (const file of walk(buildDir)) {
    await compressFile(file);
  }

  console.log("Assets compressed with gzip and Brotli");
}

run().catch((error) => {
  console.error("Postbuild compression failed", error);
  process.exitCode = 1;
});
