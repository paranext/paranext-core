import { execFileSync } from 'child_process';
import detectPort from 'detect-port';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { createInterface } from 'readline/promises';
import webpackPaths from '../configs/webpack.paths';
import {
  FreshInstallFolder,
  formatSize,
  getFreshInstallFolders,
  isConfirmation,
  isDataProviderRunning,
  parseTarget,
} from './reset-fresh-install.util';

/**
 * Port the main process serves the extension host and data provider on while any build runs. Keep
 * in sync with `WEBSOCKET_PORT` in `src/shared/data/rpc.model.ts`.
 */
const PAPI_WEBSOCKET_PORT = 8876;

const USAGE = `Delete the folders Paratext 10 or Platform.Bible leaves behind, so the next launch looks
like a first launch after a fresh install. Paratext 9's folders are not touched. Uninstall the app
first; this only removes its data.

Usage:
  npm run reset-fresh-install:p10    installed Paratext 10 builds
  npm run reset-fresh-install:core   dev builds from this repo and packaged Platform.Bible`;

function getProcessListOutput(): string {
  return process.platform === 'win32'
    ? execFileSync('tasklist', ['/FO', 'CSV', '/NH'], { encoding: 'utf8' })
    : execFileSync('ps', ['-A', '-o', 'command='], { encoding: 'utf8' });
}

async function isAppRunning(): Promise<boolean> {
  if (isDataProviderRunning(getProcessListOutput())) return true;
  const availablePort = await detectPort(PAPI_WEBSOCKET_PORT);
  return availablePort !== PAPI_WEBSOCKET_PORT;
}

function isSnapInstalled(snapName: string): boolean {
  try {
    execFileSync('snap', ['list', snapName], { stdio: 'ignore' });
    return true;
  } catch {
    // `snap list` exits non-zero when the snap is not installed, and throws when snapd is absent
    return false;
  }
}

function getFolderSize(folderPath: string): number {
  let total = 0;
  fs.readdirSync(folderPath, { withFileTypes: true }).forEach((entry) => {
    const entryPath = path.join(folderPath, entry.name);
    try {
      if (entry.isDirectory()) total += getFolderSize(entryPath);
      else if (entry.isFile()) total += fs.statSync(entryPath).size;
    } catch {
      // An unreadable entry only makes the shown size an underestimate
    }
  });
  return total;
}

function describeFolderSize(folderPath: string): string {
  try {
    return formatSize(getFolderSize(folderPath));
  } catch {
    // The size is only informational; if the folder can't be deleted either, the delete reports why
    return 'size unknown';
  }
}

async function main(): Promise<number> {
  const parsed = parseTarget(process.argv);
  if ('error' in parsed) {
    console.error(`${parsed.error}\n\n${USAGE}`);
    return 1;
  }

  if (await isAppRunning()) {
    console.error(
      `Paratext 10 or Platform.Bible is still running (data provider process or port ${PAPI_WEBSOCKET_PORT} in use). Close it and try again.`,
    );
    return 1;
  }

  const existing = getFreshInstallFolders(parsed.target, {
    platform: process.platform,
    homeDir: os.homedir(),
    env: process.env,
    repoRoot: webpackPaths.rootPath,
  }).filter((folder) => fs.existsSync(folder.path));

  const toDelete: FreshInstallFolder[] = [];
  existing.forEach((folder) => {
    if (folder.snapName && isSnapInstalled(folder.snapName))
      console.log(
        `Skipping ${folder.path}: the ${folder.snapName} snap is still installed. Run \`sudo snap remove ${folder.snapName}\` first to include it.`,
      );
    else toDelete.push(folder);
  });

  if (toDelete.length === 0) {
    console.log('Nothing to delete: no folders found.');
    return 0;
  }

  console.log('These folders will be deleted:\n');
  toDelete.forEach((folder) => {
    console.log(`  ${folder.path}  (${describeFolderSize(folder.path)})`);
    console.log(`    ${folder.description}`);
  });

  const readline = createInterface({ input: process.stdin, output: process.stdout });
  const answer = await readline.question('\nDelete these? (y/N) ');
  readline.close();
  if (!isConfirmation(answer)) {
    console.log('Nothing deleted.');
    return 0;
  }

  let failed = false;
  toDelete.forEach((folder) => {
    try {
      fs.rmSync(folder.path, { recursive: true, force: true });
      console.log(`Deleted ${folder.path}`);
    } catch (error) {
      failed = true;
      console.error(`Could not delete ${folder.path}: ${error}`);
    }
  });
  return failed ? 1 : 0;
}

main()
  .then((exitCode) => process.exit(exitCode))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
