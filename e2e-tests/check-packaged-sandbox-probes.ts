/**
 * Starts a packaged build in noisy dev mode, which loads the `evil` test extension, and checks that
 * every extension sandbox probe `evil` runs is refused. The packaged extension host runs as a
 * webpack bundle rather than through tsx, so only a packaged run shows the sandbox works there.
 *
 * Usage (on Linux it needs a display; CI wraps it in `xvfb-run`):
 *
 * `node --import tsx e2e-tests/check-packaged-sandbox-probes.ts [path to the packaged executable]`
 *
 * Without a path it finds this platform's executable under `release/build`, where `npm run package`
 * puts it. Exits 0 when every probe in every phase was refused, 1 otherwise. Refuses to start while
 * another app holds port 8876, since it would read that app's results.
 */
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import net from 'node:net';
import os from 'node:os';
import path from 'node:path';
import {
  DEFAULT_WEBSOCKET_PORT,
  electronChildEnv,
  killProcessTree,
  removeUserDataDirBestEffort,
  sendPapiCommand,
  waitForPapiMethodRegistered,
} from './fixtures/helpers';
import {
  checkSandboxProbeResults,
  GET_SANDBOX_PROBE_RESULTS_COMMAND,
  type SandboxProbeResult,
} from './fixtures/sandbox-probe-results';

/** Where `npm run package` writes its output (`directories.output` in `electron-builder.json5`) */
const BUILD_DIR = path.resolve(__dirname, '..', 'release', 'build');
/** `productName` in `electron-builder.json5`: the Windows and macOS executable name */
const PRODUCT_NAME = 'Platform.Bible';
/** `linux.executableName` in `electron-builder.json5` */
const LINUX_EXECUTABLE_NAME = 'platform-bible';

/** How long the packaged app gets to start and activate `evil` */
const STARTUP_TIMEOUT_MS = 180_000;
/** How long one wait for `evil`'s command lasts before checking the app is still running */
const REGISTRATION_POLL_MS = 5_000;
/** How long the probe phases get after `evil` is active; the last runs 3 seconds after activation */
const PHASES_TIMEOUT_MS = 30_000;
const POLL_INTERVAL_MS = 1_000;
/** How long the app gets to exit after a graceful stop before it is killed */
const GRACEFUL_EXIT_MS = 15_000;
/** Lines of the app's output to print when the check fails */
const OUTPUT_LINES_ON_FAILURE = 200;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

/**
 * Finds this platform's packaged executable under {@link BUILD_DIR}
 *
 * @returns Its path, or `undefined` if it is not there
 */
function findPackagedExecutable(): string | undefined {
  if (process.platform === 'win32') {
    const executable = path.join(BUILD_DIR, 'win-unpacked', `${PRODUCT_NAME}.exe`);
    return fs.existsSync(executable) ? executable : undefined;
  }
  if (process.platform === 'darwin') {
    // `mac-universal` for the universal build; `mac` or `mac-arm64` for a single-architecture one
    const macDirs = fs.existsSync(BUILD_DIR)
      ? fs.readdirSync(BUILD_DIR).filter((name) => name.startsWith('mac'))
      : [];
    return macDirs
      .map((dir) =>
        path.join(BUILD_DIR, dir, `${PRODUCT_NAME}.app`, 'Contents', 'MacOS', PRODUCT_NAME),
      )
      .find((executable) => fs.existsSync(executable));
  }
  const executable = path.join(BUILD_DIR, 'linux-unpacked', LINUX_EXECUTABLE_NAME);
  return fs.existsSync(executable) ? executable : undefined;
}

/** Whether something already accepts connections on the app's WebSocket port */
function isPortInUse(port: number): Promise<boolean> {
  return new Promise((resolve) => {
    const socket = net.connect({ port, host: '127.0.0.1' });
    socket.once('connect', () => {
      socket.destroy();
      resolve(true);
    });
    socket.once('error', () => resolve(false));
  });
}

/**
 * Waits for `evil`'s command and reads every phase's results
 *
 * @param hasAppExited Whether the app has exited, so the wait can stop instead of polling a dead
 *   port
 * @returns Every problem found; empty when every probe in every phase was refused
 */
async function checkProbes(hasAppExited: () => boolean): Promise<string[]> {
  const startupDeadline = Date.now() + STARTUP_TIMEOUT_MS;
  for (;;) {
    if (hasAppExited()) return [];
    try {
      // Sequential waits: each must end before checking whether the app is still running
      // eslint-disable-next-line no-await-in-loop
      await waitForPapiMethodRegistered(
        `command:${GET_SANDBOX_PROBE_RESULTS_COMMAND}`,
        undefined,
        REGISTRATION_POLL_MS,
      );
      break;
    } catch (e) {
      if (Date.now() > startupDeadline)
        return [`evil never registered its command: ${e instanceof Error ? e.message : String(e)}`];
    }
  }

  const deadline = Date.now() + PHASES_TIMEOUT_MS;
  for (;;) {
    // Sequential polling: each read must finish before the next
    // eslint-disable-next-line no-await-in-loop
    const results = await sendPapiCommand<Record<string, SandboxProbeResult[]>>(
      GET_SANDBOX_PROBE_RESULTS_COMMAND,
    );
    const { missingPhases, problems } = checkSandboxProbeResults(results);
    if (missingPhases.length === 0) {
      Object.entries(results).forEach(([phase, phaseResults]) => {
        const refused = phaseResults.filter((result) => result.outcome === 'refused').length;
        console.log(`Sandbox probes (${phase}): ${refused}/${phaseResults.length} refused`);
      });
      return problems;
    }
    if (Date.now() > deadline)
      return [...problems, `Phases that never ran: ${missingPhases.join(', ')}`];
    // Waiting between sequential polls, as above
    // eslint-disable-next-line no-await-in-loop
    await delay(POLL_INTERVAL_MS);
  }
}

async function main(): Promise<number> {
  const executable = process.argv[2] ?? findPackagedExecutable();
  if (!executable || !fs.existsSync(executable)) {
    const built = fs.existsSync(BUILD_DIR) ? fs.readdirSync(BUILD_DIR).join(', ') : '(missing)';
    console.error(
      `Packaged executable not found: ${executable ?? `none for ${process.platform}`}. ` +
        `${BUILD_DIR} holds: ${built}`,
    );
    return 1;
  }
  if (await isPortInUse(DEFAULT_WEBSOCKET_PORT)) {
    console.error(
      `Port ${DEFAULT_WEBSOCKET_PORT} is already in use, so this check would read another app's ` +
        'results. Stop that app first.',
    );
    return 1;
  }
  console.log(`Checking ${executable}`);

  const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'paranext-packaged-sandbox-'));
  const output: string[] = [];
  const app = spawn(executable, [`--user-data-dir=${userDataDir}`, '--no-sandbox'], {
    // Without ELECTRON_RUN_AS_NODE, which terminals inside VS Code set: the app would start as Node
    env: { ...electronChildEnv(), DEV_NOISY: 'true' },
    stdio: ['ignore', 'pipe', 'pipe'],
    // Its own process group, so killProcessTree stops the extension host and data provider too
    detached: process.platform !== 'win32',
  });
  const keepOutput = (chunk: Buffer) => {
    output.push(...chunk.toString().split('\n'));
    output.splice(0, Math.max(0, output.length - OUTPUT_LINES_ON_FAILURE));
  };
  app.stdout?.on('data', keepOutput);
  app.stderr?.on('data', keepOutput);
  let exitDescription: string | undefined;
  const exited = new Promise<void>((resolve) => {
    app.on('exit', (code, signal) => {
      exitDescription = `code ${code}, signal ${signal}`;
      resolve();
    });
  });
  /** Resolves true once the app has exited, or false after `ms` */
  const waitForExit = async (ms: number): Promise<boolean> => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const timedOut = new Promise<boolean>((resolve) => {
      timer = setTimeout(() => resolve(false), ms);
    });
    const result = await Promise.race([exited.then(() => true), timedOut]);
    clearTimeout(timer);
    return result;
  };

  let problems: string[];
  try {
    problems = await checkProbes(() => exitDescription !== undefined);
    if (exitDescription !== undefined)
      problems = [`The app exited before the check finished (${exitDescription})`, ...problems];
  } catch (e) {
    problems = [`The check failed: ${e instanceof Error ? e.message : String(e)}`];
  } finally {
    if (exitDescription === undefined && app.pid !== undefined) {
      killProcessTree(app.pid, 'SIGTERM');
      if (!(await waitForExit(GRACEFUL_EXIT_MS))) {
        killProcessTree(app.pid, 'SIGKILL');
        await waitForExit(5_000);
      }
    }
    removeUserDataDirBestEffort(userDataDir);
  }

  if (problems.length === 0) {
    console.log('Every extension sandbox probe was refused in the packaged app.');
    return 0;
  }
  console.error(`Extension sandbox check failed:\n${problems.join('\n')}`);
  console.error(`\nLast lines of the app's output:\n${output.join('\n')}`);
  return 1;
}

main()
  .then((exitCode) => {
    process.exitCode = exitCode;
    return undefined;
  })
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  });
