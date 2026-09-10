import type { FullConfig } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { execSync } from 'node:child_process';
import { killProcessesUnderRoot, machineOwnershipFlag, runCleanup } from './scoped-cleanup';
import { killProcessTree, restoreAppGlobalState, restoreLeakedSettings } from './fixtures/helpers';

/**
 * Stops the renderer dev server process global-setup spawned. Delegates the cross-platform kill
 * mechanics to {@link killProcessTree} — see its own docblock for why POSIX and Windows need
 * different approaches to reach the whole tree, including npm/webpack under Windows' `shell: true`
 * cmd.exe wrapper.
 *
 * Passes SIGTERM here, not the SIGKILL the app teardown uses for Electron: the dev server has none
 * of Electron's stubborn descendants (no `dotnet watch` child surviving its parent), so a graceful
 * stop is preferred where one is available — the signal only matters on POSIX, since
 * `killProcessTree`'s win32 branch always forces via `taskkill /f` regardless of what is passed.
 * Verified on native Windows: the run leaves no `node.exe` behind, and every following run starts
 * its own dev server cleanly.
 */
export function killDevServerProcess(pid: number, platform: NodeJS.Platform): void {
  killProcessTree(pid, 'SIGTERM', platform);
}

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
      killDevServerProcess(pid, process.platform);
      fs.unlinkSync(pidFile);
    }
  }

  // Sweep up anything a crashed fixture left behind.
  //
  // Selection is by working directory wherever that is possible: a name match reaches every
  // electron and dotnet process on the machine, including the developer's own app, any app a
  // CDP-based suite is attached to, and other checkouts' runs on a shared box. See
  // e2e-tests/scoped-cleanup.ts for which sweeps each environment gets and why.
  const { scoped, byName, pids } = runCleanup(
    { machineIsOursFlag: machineOwnershipFlag(), platform: process.platform, root: rootDir },
    {
      killUnderRoot: killProcessesUnderRoot,
      sweepByProcessName: () => {
        execSync('npm run stop', { cwd: rootDir, stdio: 'pipe', timeout: 10_000 });
      },
    },
  );

  if (scoped) {
    console.log(
      pids.length > 0
        ? `Cleanup: signalled ${pids.length} process(es) under ${rootDir}: ${pids.join(', ')}`
        : `Cleanup: no leftover processes under ${rootDir}.`,
    );
  } else if (byName === 'skipped') {
    console.log(
      `Skipping cleanup sweep: ${process.platform} has no /proc to scope by, and CI is not set ` +
        'to a value meaning yes. The launch fixtures already tear down what they started; run ' +
        '`npm run stop` by hand if something leaked.',
    );
  }

  if (byName === 'ran') console.log('Cleanup: also swept by process name (the machine is ours).');
  if (byName === 'failed')
    console.log(
      'Cleanup: the process-name sweep did not complete — most likely its 10s timeout. Anything ' +
        'it would have stopped may still be running.',
    );

  // Last line of defence for the developer's own settings and app-global state.
  //
  // Normally the final `teardownElectronApp` puts them back, but a relaunch chain returns early
  // while it is preserving its profile — so a chain that dies part-way never reaches that restore
  // and leaves the pin standing. Global setup would recover it, but only when the developer next
  // runs e2e, and until then their reference and theme are simply missing. Both calls are
  // idempotent and do nothing when there is no backup to put back, so running them here costs a
  // completed run nothing.
  const recoveredKeys = restoreAppGlobalState();
  if (recoveredKeys !== undefined)
    console.log(
      recoveredKeys.length > 0
        ? `Cleanup: restored app-global state (${recoveredKeys.join(', ')}).`
        : 'Cleanup: restored an app-global pin that had parked nothing.',
    );
  const leakedKeys = restoreLeakedSettings();
  if (leakedKeys !== undefined && leakedKeys.length > 0)
    console.log(`Cleanup: restored leaked settings (${leakedKeys.join(', ')}).`);
}
