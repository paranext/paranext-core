import type { FullConfig } from '@playwright/test';
import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

async function globalTeardown(config: FullConfig): Promise<void> {
  const rootDir = path.resolve(__dirname, '..');

  // Kill the renderer dev server if we started it
  const pidFile = path.join(rootDir, 'e2e-tests/.dev-server.pid');
  if (fs.existsSync(pidFile)) {
    const pid = parseInt(fs.readFileSync(pidFile, 'utf-8').trim(), 10);
    console.log(`Stopping renderer dev server (PID: ${pid})...`);
    try {
      // Kill the process group (negative PID kills the group)
      process.kill(-pid, 'SIGTERM');
    } catch {
      try {
        process.kill(pid, 'SIGTERM');
      } catch {
        // Already stopped
      }
    }
    fs.unlinkSync(pidFile);
  }

  // Run the stop script to ensure all Electron processes are terminated
  console.log('Running cleanup: npm run stop');
  try {
    execSync('npm run stop', { cwd: rootDir, stdio: 'pipe', timeout: 10_000 });
    console.log('Cleanup completed.');
  } catch {
    console.log('Cleanup: No processes to stop or already stopped.');
  }
}

export default globalTeardown;
