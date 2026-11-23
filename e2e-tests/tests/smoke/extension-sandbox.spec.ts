// SMOKE TEST ONLY — uses app.fixture for CI smoke testing (launches Electron).
import fs from 'node:fs';
import path from 'node:path';
import type { ElectronApplication } from '@playwright/test';
import { test, expect } from '../../fixtures/app.fixture';
import {
  sendPapiCommand,
  sendPapiRequestOnce,
  waitForPapiMethodRegistered,
} from '../../fixtures/helpers';
import {
  checkSandboxProbeResults,
  GET_SANDBOX_PROBE_RESULTS_COMMAND,
  type SandboxProbeResult,
} from '../../fixtures/sandbox-probe-results';

/** Lines of the extension host's log that say how `evil` and extension activation went */
const ACTIVATION_LOG_LINE =
  /evil|activat|Sandbox probe|<<BAD>>|Starting extension-host|noisy|failed to load|Extension folder/i;

/** Where the extension build writes `evil`, relative to the repository root */
const EVIL_MANIFEST = path.join('extensions', 'dist', 'evil', 'manifest.json');

/**
 * Explains why `evil`'s command never appeared: which noisy-dev-mode commands are registered (none
 * means the test extensions did not load), and the extension host's log lines about activation. The
 * extension host logs under the app name, not the launch's `--user-data-dir`.
 */
async function describeMissingCommand(electronApp: ElectronApplication): Promise<string> {
  const lines: string[] = [];
  const devNoisy = await electronApp.evaluate(() => process.env.DEV_NOISY);
  lines.push(`DEV_NOISY in the app's main process: ${devNoisy ?? '(not set)'}`);
  const appPath = await electronApp.evaluate(({ app }) => app.getAppPath());
  lines.push(
    `${EVIL_MANIFEST} under ${appPath}: ${fs.existsSync(path.join(appPath, EVIL_MANIFEST)) ? 'present' : 'missing'}`,
  );
  try {
    const discovered = await sendPapiRequestOnce<{ methods?: { name: string }[] }>('rpc.discover');
    const testCommands = (discovered.methods ?? [])
      .map((method) => method.name)
      .filter((name) => /evil|helloRock3|helloSomeone/i.test(name));
    lines.push(`Registered test-extension methods: ${testCommands.join(', ') || '(none)'}`);
  } catch (e) {
    lines.push(`rpc.discover failed: ${e instanceof Error ? e.message : String(e)}`);
  }
  const appData = await electronApp.evaluate(({ app }) => app.getPath('appData'));
  const logFile = path.join(appData, 'Electron', 'logs', 'main.log');
  if (fs.existsSync(logFile)) {
    const logLines = fs.readFileSync(logFile, 'utf8').split('\n');
    // Says whether the extension host saw noisy dev mode; listed first so the tail cannot cut it
    const startLines = logLines
      .filter((line) => line.includes('Starting extension-host'))
      .slice(-3);
    const activationLines = logLines.filter((line) => ACTIVATION_LOG_LINE.test(line)).slice(-60);
    lines.push(`Activation lines from ${logFile}:`, ...startLines, '...', ...activationLines);
  } else lines.push(`No extension host log at ${logFile}`);
  return lines.join('\n');
}

// `evil` loads only in noisy dev mode. CI sets DEV_NOISY=false for the other smoke tests, so this
// spec asks for it explicitly, which also gives it its own app
test.use({ devNoisy: true });

/**
 * The `evil` test extension (loaded because this spec launches in noisy dev mode) tries every known
 * way out of the extension sandbox at load, at activation and 3 seconds later. This checks those
 * results in the real app: the extension host's own wiring, Electron's own Node, and anything the
 * host reopens after startup — which the unit-level probe test cannot see.
 */
test('every extension sandbox probe is refused in the running app', async ({ electronApp }) => {
  try {
    await waitForPapiMethodRegistered(`command:${GET_SANDBOX_PROBE_RESULTS_COMMAND}`);
  } catch (e) {
    throw new Error(
      `${e instanceof Error ? e.message : String(e)}\n${await describeMissingCommand(electronApp)}`,
    );
  }
  const check = async () =>
    checkSandboxProbeResults(
      await sendPapiCommand<Record<string, SandboxProbeResult[]>>(
        GET_SANDBOX_PROBE_RESULTS_COMMAND,
      ),
    );

  await expect
    .poll(async () => (await check()).missingPhases, {
      message: 'every probe phase ran',
      timeout: 30_000,
    })
    .toEqual([]);
  expect((await check()).problems).toEqual([]);
});
