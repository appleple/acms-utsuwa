import { systemCmd } from './lib/index.js';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// package.json のバージョンを読み込み
const pkgJsonPath = join(__dirname, 'package.json');
const { version } = JSON.parse(await readFile(pkgJsonPath, 'utf8'));

async function main() {
  try {
    await systemCmd('git add -A');
    await systemCmd(`git commit -m "v${version}"`);
    await systemCmd('git push');
  } catch (err) {
    console.error(err);
  }
}

main();
