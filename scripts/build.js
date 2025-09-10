import fs from 'fs-extra';
import { zipPromise } from './lib/index.js';

const zipDir = 'utsuwa';
const srcDir = ['themes', 'bin'];

const ignores = [
  'themes/site/node_modules',
  'themes/site/.eslintcache',
  'themes/site/.stylelintcache',
  'themes/site/.node-version',
  'themes/site/.stylelintrc',
  'themes/site/.eslintrc',
  'themes/site/package.json',
  'themes/site/package-lock.json',
  'themes/site/babel.config.js',
  'themes/site/webpack.common.js',
  'themes/site/webpack.dev.js',
  'themes/site/webpack.prod.js',
  'themes/site/webpack.analyze.js',

  'themes/beginner/node_modules',
  'themes/beginner/.eslintcache',
  'themes/beginner/.stylelintcache',
  'themes/beginner/.node-version',
  'themes/beginner/.stylelintrc',
  'themes/beginner/package.json',
  'themes/beginner/package-lock.json',
  'themes/beginner/webpack.common.js',
  'themes/beginner/webpack.dev.js',
  'themes/beginner/webpack.prod.js',
  'themes/beginner/webpack.analyze.js',

  'themes/system',
];

async function main() {
  try {
    // tmp ディレクトリ作成
    console.log('Create tmp directory.');
    fs.mkdirsSync(zipDir);

    // ファイルをコピー
    srcDir.forEach((dir) => {
      const copyFiles = fs.readdirSync(dir);
      copyFiles.forEach((file) => {
        fs.copySync(`${dir}/${file}`, `${zipDir}/${dir}/${file}`);
      });
    });

    // 不要ファイルを削除
    console.log('Remove unused files.');
    console.log(ignores);
    ignores.forEach((filePath) => {
      fs.removeSync(`${zipDir}/${filePath}`);
    });

    // build ディレクトリ作成
    fs.mkdirsSync('build');

    // zip 化
    await zipPromise(`${zipDir}/`, `./build/${zipDir}.zip`);
  } catch (err) {
    console.error(err);
  } finally {
    fs.removeSync(`${zipDir}`);
  }
}

main();
