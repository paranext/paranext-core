import fs from 'fs';
import os from 'os';
import path from 'path';
import { parseStartupMarks, formatWaterfall } from './startup-waterfall.util';

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
  if (!fs.existsSync(logPath)) {
    console.error(`Log file not found: ${logPath}\nPass --log <path> or run the app first.`);
    process.exit(1);
  }
  const text = fs.readFileSync(logPath, 'utf8');
  console.log(`Startup waterfall from ${logPath}\n`);
  console.log(formatWaterfall(parseStartupMarks(text)));
}

main();
