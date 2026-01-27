import type { FullConfig } from '@playwright/test';
import { execSync, spawn, ChildProcess } from 'child_process';
import net from 'net';
import path from 'path';
import fs from 'fs';

const WEBSOCKET_PORT = 8876;
const RENDERER_PORT = 1212;

/** Check if a port is already in use */
function isPortInUse(port: number): Promise<boolean> {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once('error', () => resolve(true));
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

// Store the dev server process so teardown can stop it
let devServerProcess: ChildProcess | undefined;

async function globalSetup(config: FullConfig): Promise<void> {
  const rootDir = path.resolve(__dirname, '..');

  // Fail fast if Platform.Bible is already running (single-instance lock will
  // cause Playwright's Electron instance to exit immediately)
  if (await isPortInUse(WEBSOCKET_PORT)) {
    throw new Error(
      `Port ${WEBSOCKET_PORT} is already in use. ` +
        'Stop the running Platform.Bible instance (npm run stop) before running E2E tests.',
    );
  }

  // Remove stale Electron singleton lock files (left behind after crashes).
  // The app may use different data directories depending on configuration.
  const os = await import('os');
  const appSupportDir =
    process.platform === 'darwin'
      ? path.join(os.homedir(), 'Library/Application Support')
      : process.platform === 'linux'
        ? path.join(os.homedir(), '.config')
        : process.env.APPDATA || '';

  const lockDirs = ['Electron', 'paratext-10-studio', 'platform-bible', 'Paranext'];
  for (const dir of lockDirs) {
    const lockPath = path.join(appSupportDir, dir, 'SingletonLock');
    if (fs.existsSync(lockPath)) {
      console.log(`Removing stale singleton lock: ${lockPath}`);
      fs.unlinkSync(lockPath);
    }
  }

  // Ensure the dev main bundle exists
  const devMainPath = path.join(rootDir, '.erb/dll/main.bundle.dev.js');
  if (!fs.existsSync(devMainPath)) {
    console.log('Development main bundle not found. Building...');
    execSync('npm run prestart', { cwd: rootDir, stdio: 'inherit' });
  } else {
    console.log('Development main bundle found.');
  }

  // Start the webpack dev server for the renderer if not already running
  if (await isPortInUse(RENDERER_PORT)) {
    console.log(`Renderer dev server already running on port ${RENDERER_PORT}.`);
  } else {
    console.log('Starting renderer dev server...');
    devServerProcess = spawn('npm', ['run', 'start:renderer'], {
      cwd: rootDir,
      stdio: 'pipe',
      shell: true,
      // Must clear ELECTRON_RUN_AS_NODE for the env to be clean
      env: { ...process.env, ELECTRON_RUN_AS_NODE: undefined },
    });

    // Store PID so teardown can find it
    const pidFile = path.join(rootDir, 'e2e-tests/.dev-server.pid');
    if (devServerProcess.pid) {
      fs.writeFileSync(pidFile, String(devServerProcess.pid));
    }

    // Wait for the dev server to be ready
    console.log(`Waiting for renderer dev server on port ${RENDERER_PORT}...`);
    await waitForPort(RENDERER_PORT, 60_000);
    console.log('Renderer dev server is ready.');
  }
}

export default globalSetup;
