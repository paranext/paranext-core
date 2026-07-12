import fs from 'fs';
import os from 'os';
import path from 'path';
import { parseStartupMarks, formatWaterfall, selectLatestRun } from './startup-waterfall.util';

/**
 * Default dev `main.log` location per platform (packaged uses 'platform-bible' instead of
 * 'Electron').
 */
function defaultLogPath(): string {
  const home = os.homedir();
  switch (process.platform) {
    case 'win32':
      return path.join(
        process.env.APPDATA ?? path.join(home, 'AppData', 'Roaming'),
        'Electron',
        'logs',
        'main.log',
      );
    case 'darwin':
      return path.join(home, 'Library', 'Logs', 'Electron', 'main.log');
    default:
      return path.join(home, '.config', 'Electron', 'logs', 'main.log');
  }
}

function main(): void {
  const logArgIndex = process.argv.indexOf('--log');
  const logPath = logArgIndex >= 0 ? process.argv[logArgIndex + 1] : defaultLogPath();
  if (!logPath) {
    console.error('--log requires a path');
    process.exit(1);
  }
  if (!fs.existsSync(logPath)) {
    console.error(`Log file not found: ${logPath}\nPass --log <path> or run the app first.`);
    process.exit(1);
  }
  const text = fs.readFileSync(logPath, 'utf8');
  console.log(`Startup waterfall from ${logPath}\n`);
  const { marks, runCount } = selectLatestRun(parseStartupMarks(text));
  if (runCount > 1)
    console.warn(
      `Note: the log contains marks from ${runCount} app runs; showing only the latest. Delete the log and relaunch for a clean capture.\n`,
    );
  console.log(formatWaterfall(marks));
}

main();
