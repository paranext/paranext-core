import type { FullConfig } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { isSweepEnabled, killProcessesUnderRoot } from './scoped-cleanup';

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

  // Sweep up anything a crashed fixture left behind — but only this checkout's processes, and only
  // when the machine belongs to the run.
  //
  // Selection is by working directory, never by process name: a name match reaches every electron
  // and dotnet process on the machine, including the developer's own app, any app a CDP-based
  // suite is attached to, and other checkouts' runs on a shared box. See
  // e2e-tests/scoped-cleanup.ts.
  if (!isSweepEnabled(process.env.CI)) {
    console.log(
      'Skipping cleanup sweep: CI is not set to a value meaning yes. The launch fixtures already ' +
        'tear down what they started; run `npm run stop` by hand if something leaked.',
    );
    return;
  }
  const killed = killProcessesUnderRoot(rootDir);
  console.log(
    killed.length > 0
      ? `Cleanup: terminated ${killed.length} process(es) under ${rootDir}: ${killed.join(', ')}`
      : `Cleanup: no leftover processes under ${rootDir}.`,
  );
}
