import fs from 'fs-extra';
import { exec } from 'child_process';
import { promisify } from 'util';
import archiver from 'archiver';

const execAsync = promisify(exec);

/**
 * Run system command
 *
 * @param {string} cmdString
 * @returns {Promise<string>}
 */
export const systemCmd = async (cmdString) => {
  try {
    console.log(cmdString);
    const { stdout, stderr } = await execAsync(cmdString);
    console.log(stdout);
    if (stderr) {
      console.log(stderr);
    }
    return stdout;
  } catch (error) {
    console.error('Command failed:', error);
    throw error;
  }
};

/**
 * Get file list from directory
 *
 * @param {string} directory
 * @returns {Promise<string[]>}
 */
export const systemDirList = async (directory) => {
  try {
    return await fs.readdir(directory);
  } catch (err) {
    throw err;
  }
};

/**
 * Zip a directory
 *
 * @param {string} src
 * @param {string} dist
 * @returns {Promise<void>}
 */
export const zipPromise = (src, dist) => {
  return new Promise((resolve, reject) => {
    const archive = archiver.create('zip', {});
    const output = fs.createWriteStream(dist);

    output.on('close', () => {
      console.log(`${archive.pointer()} total bytes`);
      console.log('Archiver has been finalized and the output file descriptor has closed.');
      resolve();
    });

    archive.on('error', (err) => {
      reject(err);
    });

    archive.pipe(output);
    archive.directory(src, false);
    archive.finalize();
  });
};
