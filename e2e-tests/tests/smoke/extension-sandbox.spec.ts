// SMOKE TEST ONLY — uses app.fixture for CI smoke testing (launches Electron).
import { test, expect } from '../../fixtures/app.fixture';
import { sendPapiCommand, waitForPapiMethodRegistered } from '../../fixtures/helpers';
import {
  checkSandboxProbeResults,
  GET_SANDBOX_PROBE_RESULTS_COMMAND,
  type SandboxProbeResult,
} from '../../fixtures/sandbox-probe-results';

/**
 * The `evil` test extension (loaded because the launch helper sets `DEV_NOISY=true`) tries every
 * known way out of the extension sandbox at load, at activation and 3 seconds later. This checks
 * those results in the real app: the extension host's own wiring, Electron's own Node, and anything
 * the host reopens after startup — which the unit-level probe test cannot see.
 */
test('every extension sandbox probe is refused in the running app', async ({ electronApp }) => {
  expect(electronApp).toBeTruthy();
  await waitForPapiMethodRegistered(`command:${GET_SANDBOX_PROBE_RESULTS_COMMAND}`);
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
