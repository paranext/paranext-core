import type { FullConfig } from '@playwright/test';
import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

// Playwright global teardown requires this signature even though config is unused
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function globalTeardown(_config: FullConfig): Promise<void> {
  const rootDir = path.resolve(__dirname, '..');

  // Kill the renderer dev server if we started it
  const pidFile = path.join(rootDir, 'e2e-tests', '.dev-server.pid');
  if (fs.existsSync(pidFile)) {
    const pid = parseInt(fs.readFileSync(pidFile, 'utf-8').trim(), 10);
    if (Number.isNaN(pid)) {
      console.warn(`Invalid PID in ${pidFile}, skipping process kill`);
      fs.unlinkSync(pidFile);
    } else {
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
  }

  // Sweep up any Electron left behind by a crashed fixture. `npm run stop` matches by process
  // name and kills every electron and dotnet process on the machine, so it is safe only where the
  // machine belongs to the run. On a developer box it would also kill the app they are working in,
  // any app a CDP-based suite is attached to, and unrelated dotnet processes. The launch fixtures
  // already tear down what they started; if something does leak, the port check in global-setup
  // names `npm run stop` as the manual remedy.
  if (process.env.CI) {
    console.log('Running cleanup: npm run stop');
    try {
      execSync('npm run stop', { cwd: rootDir, stdio: 'pipe', timeout: 10_000 });
      console.log('Cleanup completed.');
    } catch {
      console.log('Cleanup: No processes to stop or already stopped.');
    }
  } else {
    console.log('Skipping machine-wide process sweep outside CI. Run `npm run stop` if needed.');
  }
}
