import type { FullConfig } from '@playwright/test';
import { execSync, spawn } from 'child_process';
import net from 'net';
import path from 'path';
import fs from 'fs';
import { restoreAppGlobalState, restoreLeakedSettings } from './fixtures/helpers';

const WEBSOCKET_PORT = 8876;
const RENDERER_PORT = 1212;

/** Check if a port is already in use */
function isPortInUse(port: number): Promise<boolean> {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once('error', () => {
      server.close();
      resolve(true);
    });
    server.once('listening', () => {
      server.close();
      resolve(false);
    });
    server.listen(port);
  });
}

/** Wait until a port is accepting connections */
function waitForPort(port: number, timeout: number): Promise<void> {
  const startTime = Date.now();
  return new Promise((resolve, reject) => {
    const tryConnect = () => {
      if (Date.now() - startTime > timeout) {
        reject(new Error(`Port ${port} did not become available within ${timeout}ms`));
        return;
      }
      const socket = net.createConnection(port, '127.0.0.1');
      socket.on('connect', () => {
        socket.destroy();
        resolve();
      });
      socket.on('error', () => {
        socket.destroy();
        setTimeout(tryConnect, 500);
      });
    };
    tryConnect();
  });
}

/** Last few lines of a file, for putting a process's own words into the error that reports it. */
function tailFile(filePath: string, lines = 20): string {
  try {
    return fs.readFileSync(filePath, 'utf-8').split('\n').slice(-lines).join('\n');
  } catch {
    return '(no output captured)';
  }
}

/**
 * Newest file modification time (ms since epoch) under `dir`, recursively. Used to detect a stale
 * dev main bundle. `node_modules` is skipped — dependency changes are reflected in package.json.
 */
function newestMtimeMs(dir: string): number {
  return fs.readdirSync(dir, { withFileTypes: true }).reduce((newest, entry) => {
    if (entry.name === 'node_modules') return newest;
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return Math.max(newest, newestMtimeMs(entryPath));
    if (entry.isFile()) return Math.max(newest, fs.statSync(entryPath).mtimeMs);
    return newest;
  }, 0);
}

/**
 * Whether a prebuilt dev bundle is older than the main-process sources it was built from.
 * Playwright launches Electron against these prebuilt bundles (there is no webpack watcher in an
 * E2E run), so a bundle from before the current checkout's changes would silently test STALE code —
 * the renderer, served fresh by the dev server, would be new while main stayed old.
 */
function isDevBundleStale(rootDir: string, bundlePath: string): boolean {
  const bundleMtime = fs.statSync(bundlePath).mtimeMs;
  // The bundles' inputs: the main-process entry tree (src/main — which is also where preload.ts
  // lives — plus the src/shared and src/node code it imports; src/extension-host and src/renderer
  // run from source/dev-server and cannot go stale this way), the workspace library the bundle
  // compiles in (platform-bible-utils; the platform-bible-react import in src/shared is types-only
  // and never reaches the bundle), the webpack configs that shape the bundles, and package.json
  // (dependency changes). `.erb/scripts` is in the list because the build reaches into it too:
  // webpack.config.main.dev.ts imports ../scripts/check-node-env, and `prestart` runs
  // .erb/scripts/generate-dev-build-info.ts before webpack.
  const sourceDirs = [
    'src/main',
    'src/shared',
    'src/node',
    'lib/platform-bible-utils/src',
    '.erb/configs',
    '.erb/scripts',
  ];
  const newestSource = Math.max(
    ...sourceDirs.map((dir) => newestMtimeMs(path.join(rootDir, dir))),
    fs.statSync(path.join(rootDir, 'package.json')).mtimeMs,
  );
  return newestSource > bundleMtime;
}

/**
 * The prebuilt dev bundles an E2E run launches Electron against, each paired with the npm script
 * that emits it.
 *
 * The preload needs an entry of its own because `prestart` does NOT produce the preload the app
 * loads: the main webpack config's `preload` entry emits `preload.bundle.dev.js`, which nothing
 * reads, while the unpackaged app points `BrowserWindow`'s `preload` at `.erb/dll/preload.js` (see
 * `createWindow` in src/main/main.ts) — the output of the separate preload config. The renderer dev
 * server does spawn a watcher for it, but only when this setup has to start the server, and setup
 * waits for the server's port rather than for that build, so Electron could launch against whatever
 * preload bundle was lying around from an earlier checkout. Build it here instead, where the same
 * staleness check that covers the main bundle covers it.
 */
const DEV_BUNDLES = [
  { label: 'main bundle', relativePath: '.erb/dll/main.bundle.dev.js', buildScript: 'prestart' },
  {
    label: 'preload bundle',
    relativePath: '.erb/dll/preload.js',
    // The one-shot build; `start:preload` is the same webpack config in watch mode and never exits
    buildScript: 'build:preload:dev',
  },
];

// Playwright global setup requires this signature even though config is unused
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function globalSetup(_config: FullConfig): Promise<void> {
  const rootDir = path.resolve(__dirname, '..');

  // Fail fast if Platform.Bible is already running (single-instance lock will
  // cause Playwright's Electron instance to exit immediately)
  if (await isPortInUse(WEBSOCKET_PORT)) {
    throw new Error(
      `Port ${WEBSOCKET_PORT} is already in use. ` +
        'Stop the running Platform.Bible instance (npm run stop) before running E2E tests.',
    );
  }
  // AFTER the port check, deliberately. Both restores overwrite files a running app owns, so
  // recovering a stale backup while the developer's own app is up would revert their live
  // settings and scroll position — and then abort the run telling them to close that app.
  // Undo a settings pin left behind by a run that died before its teardown. Done first, so the
  // developer's real settings are back in place before anything reads them — and so a suite that
  // pins nothing does not silently inherit another suite's mode from a run that crashed days ago.
  const leakedKeys = restoreLeakedSettings();
  if (leakedKeys !== undefined) {
    console.log(
      'Recovered dev-appdata/data/settings.json from a previous run that was killed before it ' +
        `could restore it. Settings it had left behind: ${leakedKeys.join(', ') || '(none)'}`,
    );
  }

  // Same for app-global state the main process persists outside the isolated user-data directory
  // (the scroll group's reference, the theme). A killed run leaves it emptied, which the developer
  // sees as their app opening at Genesis 1:1 in the default theme until something puts it back.
  const recoveredKeys = restoreAppGlobalState();
  if (recoveredKeys !== undefined) {
    console.log(
      'Recovered app-global main-process storage from a previous run that was killed before it ' +
        `could restore it. Keys restored: ${recoveredKeys.join(', ')}`,
    );
  }

  // Remove stale Electron singleton lock files (left behind after crashes).
  // Done AFTER the port check so we only delete locks when the port is free,
  // confirming they are genuinely stale rather than belonging to an instance
  // that is still starting up.
  const os = await import('os');
  let appSupportDir: string;
  if (process.platform === 'darwin') {
    appSupportDir = path.join(os.homedir(), 'Library/Application Support');
  } else if (process.platform === 'linux') {
    appSupportDir = path.join(os.homedir(), '.config');
  } else {
    appSupportDir = process.env.APPDATA || '';
  }

  ['Electron', 'paratext-10-studio', 'platform-bible', 'Paranext', 'Platform.Bible'].forEach(
    (dir) => {
      const lockPath = path.join(appSupportDir, dir, 'SingletonLock');
      if (fs.existsSync(lockPath)) {
        console.log(`Removing stale singleton lock: ${lockPath}`);
        fs.unlinkSync(lockPath);
      }
    },
  );

  // Ensure every prebuilt dev bundle exists and is at least as new as the main-process sources — a
  // stale bundle would run OLD code against the fresh dev-server renderer.
  DEV_BUNDLES.forEach(({ label, relativePath, buildScript }) => {
    const bundlePath = path.join(rootDir, relativePath);
    if (!fs.existsSync(bundlePath)) {
      console.log(`Development ${label} not found. Building...`);
    } else if (isDevBundleStale(rootDir, bundlePath)) {
      console.log(`Development ${label} is older than main-process sources. Rebuilding...`);
    } else {
      console.log(`Development ${label} found and up to date.`);
      return;
    }
    execSync(`npm run ${buildScript}`, { cwd: rootDir, stdio: 'inherit' });
  });

  // Start the webpack dev server for the renderer if not already running
  if (await isPortInUse(RENDERER_PORT)) {
    console.log(`Renderer dev server already running on port ${RENDERER_PORT}.`);
  } else {
    console.log('Starting renderer dev server...');
    // Log the dev server's output instead of discarding it. When this process dies mid-run, every
    // subsequent test fails with `Window URL: chrome-error://chromewebdata/` — the renderer cannot
    // load — and with `stdio: 'ignore'` there is no record anywhere of why it went. One dead dev
    // server then costs a whole suite's runtime and leaves nothing to diagnose from.
    const devServerLogPath = path.join(rootDir, 'e2e-tests', '.dev-server.log');
    const devServerLog = fs.openSync(devServerLogPath, 'w');
    const devServer = spawn('npm', ['run', 'start:renderer'], {
      cwd: rootDir,
      stdio: ['ignore', devServerLog, devServerLog],
      shell: true,
      // Create a new process group so global-teardown can kill the entire tree
      // via process.kill(-pid). Without this, the shell child inherits the
      // parent's PGID and process.kill(-pid) throws ESRCH.
      detached: true,
      // Must clear ELECTRON_RUN_AS_NODE for the env to be clean.
      // SKIP_START_MAIN tells the webpack dev server's setupMiddlewares to skip
      // spawning start:main — Playwright launches Electron directly via electron.launch().
      env: { ...process.env, ELECTRON_RUN_AS_NODE: undefined, SKIP_START_MAIN: '1' },
    });

    // The child holds its own copy of the descriptors now, so release the parent's. Leaving it open
    // keeps a write handle on a file this process never writes to, which on Windows blocks anything
    // that later wants to truncate or delete the log.
    fs.closeSync(devServerLog);

    // Allow the Playwright process to exit independently of the detached server
    devServer.unref();

    // Store PID so global-teardown can find and stop the process
    const pidFile = path.join(rootDir, 'e2e-tests/.dev-server.pid');
    if (devServer.pid) {
      fs.writeFileSync(pidFile, String(devServer.pid));
    }

    // Notice the server dying rather than waiting out the full port timeout and reporting the wrong
    // cause. `detached` + `unref` do not stop this process from seeing the exit.
    //
    // Raced against the port wait rather than merely recorded: a server that dies BEFORE the port
    // opens would otherwise leave `waitForPort` polling a port nothing will ever bind, for its full
    // two minutes, before anyone looks at the exit. Racing makes that case fail when it happens.
    let devServerExit: { code: number | null; signal: string | null } | undefined;
    const devServerExited = new Promise<never>((_resolve, reject) => {
      devServer.on('exit', (code, signal) => {
        devServerExit = { code, signal };
        reject(new Error(`The renderer dev server exited before port ${RENDERER_PORT} opened.`));
      });
    });
    // Nothing awaits this promise unless the race below rejects with it; without a no-op catch,
    // an exit AFTER the port opened would surface as an unhandled rejection and take the run down.
    devServerExited.catch(() => {});

    // Wait for the dev server to be ready
    console.log(`Waiting for renderer dev server on port ${RENDERER_PORT}...`);
    try {
      await Promise.race([waitForPort(RENDERER_PORT, 120_000), devServerExited]);
    } catch (err) {
      const why = devServerExit
        ? `The renderer dev server exited (code=${devServerExit.code}, signal=${devServerExit.signal}).`
        : 'The renderer dev server is still running but never opened the port.';
      const reason = err instanceof Error ? err.message : String(err);
      throw new Error(
        `${reason}\n${why}\nIts output: ${devServerLogPath}\n${tailFile(devServerLogPath)}`,
      );
    }
    if (devServerExit) {
      throw new Error(
        `The renderer dev server opened port ${RENDERER_PORT} and then exited (code=${devServerExit.code}, signal=${devServerExit.signal}). Every test would otherwise fail with \`Window URL: chrome-error://chromewebdata/\` — the renderer cannot load.\nIts output: ${devServerLogPath}\n${tailFile(devServerLogPath)}`,
      );
    }
    console.log(`Renderer dev server is ready. Its output: ${devServerLogPath}`);
  }
}
