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

/**
 * Resolve the `--log` path from argv, supporting both `--log <path>` and the common `--log=<path>`
 * single-token form. Returns an error string (rather than silently falling back to the default log
 * and analyzing the wrong run) for a bare `--log` with no value or any other unrecognized `--log*`
 * token. Returns `undefined` path with no error when no `--log` arg is present (caller uses the
 * default).
 */
function parseLogPathArg(argv: string[]): { logPath?: string; error?: string } {
  const args = argv.slice(2);
  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (arg === '--log') {
      const next = args[i + 1];
      if (!next) return { error: '--log requires a path (use --log <path> or --log=<path>)' };
      return { logPath: next };
    }
    if (arg.startsWith('--log=')) {
      const value = arg.slice('--log='.length);
      if (!value) return { error: '--log= requires a path (use --log <path> or --log=<path>)' };
      return { logPath: value };
    }
    if (arg.startsWith('--log')) {
      return { error: `Unrecognized argument "${arg}" (use --log <path> or --log=<path>)` };
    }
  }
  return {};
}

const USAGE = `Render Platform.Bible startup timing marks from a log as an ordered waterfall.

Usage:
  npm run startup-waterfall [-- <options>]

Options:
  --log <path>, --log=<path>   Log file to read. Defaults to this platform's dev
                               Electron main.log.
  --help, -h                   Show this help.

Capture marks first by launching with PT_STARTUP_MARKS=true (see the "Startup
performance timing" section of README.md).`;

function main(): void {
  if (process.argv.includes('--help') || process.argv.includes('-h')) {
    console.log(USAGE);
    return;
  }
  const { logPath: logPathArg, error: argError } = parseLogPathArg(process.argv);
  if (argError) {
    console.error(argError);
    process.exit(1);
  }
  const logPath = logPathArg ?? defaultLogPath();
  if (!logPath) {
    console.error('Could not determine a log path. Pass --log <path>.');
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
