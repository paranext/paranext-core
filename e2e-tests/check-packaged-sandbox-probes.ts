/**
 * Starts a packaged build in noisy dev mode, which loads the `evil` test extension, and checks that
 * every extension sandbox probe `evil` runs is refused. The packaged extension host runs as a
 * webpack bundle rather than through tsx, so only a packaged run shows the sandbox works there.
 *
 * Usage (needs a display; CI wraps it in `xvfb-run`):
 *
 * `node --import tsx e2e-tests/check-packaged-sandbox-probes.ts <path to the packaged executable>`
 *
 * Exits 0 when every probe in every phase was refused, 1 otherwise. Uses port 8876, so no other
 * instance of the app may be running.
 */
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { sendPapiCommand, waitForPapiMethodRegistered } from './fixtures/helpers';
import {
  checkSandboxProbeResults,
  GET_SANDBOX_PROBE_RESULTS_COMMAND,
  type SandboxProbeResult,
} from './fixtures/sandbox-probe-results';

/** How long the packaged app gets to start and activate `evil` */
const STARTUP_TIMEOUT_MS = 180_000;
/** How long the probe phases get after `evil` is active; the last runs 3 seconds after activation */
const PHASES_TIMEOUT_MS = 30_000;
const POLL_INTERVAL_MS = 1_000;
/** Lines of the app's output to print when the check fails */
const OUTPUT_LINES_ON_FAILURE = 200;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function checkProbes(): Promise<string[]> {
  await waitForPapiMethodRegistered(
    `command:${GET_SANDBOX_PROBE_RESULTS_COMMAND}`,
    undefined,
    STARTUP_TIMEOUT_MS,
  );
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
  const executable = process.argv[2];
  if (!executable || !fs.existsSync(executable)) {
    console.error(`Packaged executable not found: ${executable ?? '(none given)'}`);
    return 1;
  }

  const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'paranext-packaged-sandbox-'));
  const output: string[] = [];
  const app = spawn(executable, [`--user-data-dir=${userDataDir}`, '--no-sandbox'], {
    env: { ...process.env, DEV_NOISY: 'true' },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  const keepOutput = (chunk: Buffer) => {
    output.push(...chunk.toString().split('\n'));
    output.splice(0, Math.max(0, output.length - OUTPUT_LINES_ON_FAILURE));
  };
  app.stdout?.on('data', keepOutput);
  app.stderr?.on('data', keepOutput);
  let hasExited = false;
  const exited = new Promise<string[]>((resolve) => {
    app.on('exit', (code, signal) => {
      hasExited = true;
      resolve([`The app exited before the check finished (code ${code}, signal ${signal})`]);
    });
  });

  let problems: string[];
  try {
    problems = await Promise.race([checkProbes(), exited]);
  } catch (e) {
    problems = [`The check failed: ${e instanceof Error ? e.message : String(e)}`];
  } finally {
    if (!hasExited) {
      app.kill('SIGTERM');
      await Promise.race([exited, delay(15_000)]);
      if (!hasExited) app.kill('SIGKILL');
    }
    fs.rmSync(userDataDir, { recursive: true, force: true });
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
