import fs from 'fs';
import path from 'path';
import { systemCmd } from './lib/index.js';

/**
 * ルートのpackage.jsonからバージョンを読み取る
 * @returns {string} バージョン番号
 */
function getRootVersion() {
  const rootPackagePath = path.join(process.cwd(), 'package.json');

  try {
    const packageContent = fs.readFileSync(rootPackagePath, 'utf8');
    const packageJson = JSON.parse(packageContent);
    return packageJson.version;
  } catch (error) {
    console.error('Error reading root package.json:', error.message);
    process.exit(1);
  }
}

/**
 * themes/ディレクトリ内の全テーマを検出する
 * @returns {string[]} テーマディレクトリ名の配列
 */
function detectThemes() {
  const themesPath = path.join(process.cwd(), 'themes');

  try {
    const items = fs.readdirSync(themesPath, { withFileTypes: true });
    const themes = [];

    for (const item of items) {
      if (item.isDirectory()) {
        const themePath = path.join(themesPath, item.name);
        const packageJsonPath = path.join(themePath, 'package.json');

        // package.jsonが存在するディレクトリのみをテーマとして認識
        if (fs.existsSync(packageJsonPath)) {
          themes.push(item.name);
        }
      }
    }

    return themes;
  } catch (error) {
    console.error('Error detecting themes:', error.message);
    process.exit(1);
  }
}

/**
 * README.mdのバージョン番号を更新する
 * @param {string} themeName テーマ名
 * @param {string} version 更新するバージョン
 * @returns {boolean} 成功した場合true
 */
function updateReadmeVersion(themeName, version) {
  try {
    const readmePath = path.join(process.cwd(), 'themes', themeName, 'README.md');

    // README.mdが存在しない場合はスキップ
    if (!fs.existsSync(readmePath)) {
      console.log(`📝 ${themeName}: README.md not found, skipping`);
      return true;
    }

    const readmeContent = fs.readFileSync(readmePath, 'utf8');
    const versionRegex = /Ver\.([\d\.].+)/;
    const currentVersionMatch = readmeContent.match(versionRegex);

    if (!currentVersionMatch) {
      console.log(`📝 ${themeName}: Version pattern not found in README.md, skipping`);
      return true;
    }

    const currentVersion = currentVersionMatch[1];
    if (currentVersion !== version) {
      const updatedContent = readmeContent.replace(versionRegex, `Ver.${version}`);
      fs.writeFileSync(readmePath, updatedContent, 'utf8');
      console.log(`📝 ${themeName}: README.md version updated from ${currentVersion} to ${version}`);
    } else {
      console.log(`📝 ${themeName}: README.md already at version ${version}`);
    }

    return true;
  } catch (error) {
    console.error(`❌ Failed to update README.md for ${themeName}:`, error.message);
    return false;
  }
}

/**
 * 指定されたテーマのバージョンを同期する
 * @param {string} themeName テーマ名
 * @param {string} version 同期するバージョン
 * @returns {Promise<boolean>} 成功した場合true
 */
async function syncThemeVersion(themeName, version) {
  try {
    console.log(`Syncing theme: ${themeName} to version ${version}`);

    // package.jsonのバージョンを更新
    const command = `npm --prefix themes/${themeName} version ${version} --no-git-tag-version`;
    await systemCmd(command);

    // README.mdのバージョンを更新
    const readmeSuccess = updateReadmeVersion(themeName, version);

    if (readmeSuccess) {
      console.log(`✅ ${themeName} synced to ${version}`);
      return true;
    } else {
      console.error(`❌ Failed to update README.md for ${themeName}`);
      return false;
    }
  } catch (error) {
    // バージョンが既に同じ場合は成功として扱う
    if (error.message.includes('Version not changed')) {
      console.log(`✅ ${themeName} package.json already at version ${version}`);

      // package.jsonは既に同じバージョンでも、README.mdは更新する
      const readmeSuccess = updateReadmeVersion(themeName, version);
      return readmeSuccess;
    }

    console.error(`❌ Failed to sync ${themeName}:`, error.message);
    return false;
  }
}

/**
 * 全テーマのバージョンを同期する
 * @param {string} version 同期するバージョン
 * @returns {Promise<boolean>} 全て成功した場合true
 */
async function syncAllThemes(version) {
  const themes = detectThemes();

  if (themes.length === 0) {
    console.log('No themes found in themes/ directory');
    return true;
  }

  console.log(`Found ${themes.length} themes: ${themes.join(', ')}`);

  let allSuccess = true;

  for (const theme of themes) {
    const success = await syncThemeVersion(theme, version);
    if (!success) {
      allSuccess = false;
    }
  }

  return allSuccess;
}

/**
 * メイン処理
 */
async function main() {
  try {
    console.log('🚀 Starting version synchronization...');

    // ルートのバージョンを取得
    const version = getRootVersion();
    console.log(`📦 Root version: ${version}`);

    // 全テーマのバージョンを同期
    const success = await syncAllThemes(version);

    if (success) {
      console.log(`✅ all themes synced to ${version}`);
    } else {
      console.error('❌ Some themes failed to sync');
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Version synchronization failed:', error.message);
    process.exit(1);
  }
}

// スクリプトを実行
main();
