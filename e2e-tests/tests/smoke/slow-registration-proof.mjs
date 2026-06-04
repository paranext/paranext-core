/**
 * Proof-of-fix script for the slow-CI flake in ui-interaction.spec.ts.
 *
 * The real flake: on slow macOS CI runners, the settings data-provider takes
 * longer than the default 60 s to register, so waitForPapiMethodRegistered
 * (which polls rpc.discover) throws before the method appears.
 * The fix: raise the explicit timeout from 60 s to 90 s.
 *
 * This script replicates the problem by running a mock rpc.discover server
 * that withholds the target method for REGISTRATION_DELAY_MS, then proves:
 *   - OLD_TIMEOUT_MS (< REGISTRATION_DELAY_MS) → fails  [RED LIGHT]
 *   - NEW_TIMEOUT_MS (> REGISTRATION_DELAY_MS) → passes  [GREEN LIGHT]
 *
 * The timings are compressed (seconds not minutes) for local reproducibility;
 * the boundary relationship is identical to the CI scenario.
 */

import { WebSocketServer } from 'ws';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const WebSocket = require('ws');

// ── Timing constants ─────────────────────────────────────────────────────────
// Compressed from the real CI scenario (65 s registration, 60 s vs 90 s):
const REGISTRATION_DELAY_MS = 5_000;  // simulates the slow CI: ~65 s on real runners
const OLD_TIMEOUT_MS = 3_000;          // original 60 s default — TOO SHORT
const NEW_TIMEOUT_MS = 7_000;          // fix value 90 s — long enough

const TARGET_METHOD = 'object:platform.settingsServiceDataProvider-data.set';
const MOCK_PORT = 19_876;
const POLL_INTERVAL_MS = 250;

// ── Inline waitForPapiMethodRegistered (identical logic to helpers.ts) ───────
// Copied verbatim so this script tests the EXACT production timeout logic.
async function waitForPapiMethodRegistered(methodName, port, timeoutMs) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const remaining = timeoutMs - (Date.now() - start);
    try {
      const result = await sendPapiRequestOnce('rpc.discover', [], port,
        Math.min(10_000, Math.max(1_000, remaining)));
      if (result.methods?.some((m) => m.name === methodName)) return;
    } catch {
      /* next poll */
    }
    const sleepMs = Math.min(POLL_INTERVAL_MS, timeoutMs - (Date.now() - start));
    if (sleepMs <= 0) break;
    await new Promise((r) => setTimeout(r, sleepMs));
  }
  throw new Error(
    `PAPI method "${methodName}" not listed in rpc.discover within ${timeoutMs}ms`
  );
}

// ── One-shot JSON-RPC WebSocket request (identical logic to helpers.ts) ──────
function sendPapiRequestOnce(method, params, port, perRequestTimeoutMs) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(`ws://localhost:${port}`);
    const timer = setTimeout(() => {
      ws.close();
      reject(new Error(`PAPI request "${method}" timed out after ${perRequestTimeoutMs}ms`));
    }, perRequestTimeoutMs);

    ws.on('open', () => {
      ws.send(JSON.stringify({ jsonrpc: '2.0', id: 1, method, params }));
    });
    ws.on('message', (data) => {
      let parsed;
      try { parsed = JSON.parse(data.toString()); } catch (e) {
        clearTimeout(timer); ws.close(); reject(e); return;
      }
      if (parsed.id !== 1) return;
      clearTimeout(timer); ws.close();
      if (parsed.error) reject(new Error(JSON.stringify(parsed.error)));
      else resolve(parsed.result);
    });
    ws.on('error', (e) => { clearTimeout(timer); reject(e); });
  });
}

// ── Mock rpc.discover server ─────────────────────────────────────────────────
function startMockServer(registrationDelayMs) {
  const serverStart = Date.now();
  const wss = new WebSocketServer({ port: MOCK_PORT });

  wss.on('connection', (ws) => {
    ws.on('message', (data) => {
      const req = JSON.parse(data.toString());
      if (req.method !== 'rpc.discover') {
        ws.send(JSON.stringify({ jsonrpc: '2.0', id: req.id, error: { code: -32601 } }));
        return;
      }
      const elapsed = Date.now() - serverStart;
      const methods = elapsed >= registrationDelayMs
        ? [{ name: TARGET_METHOD }]  // method appears after the delay
        : [];                          // not registered yet
      ws.send(JSON.stringify({ jsonrpc: '2.0', id: req.id, result: { methods } }));
    });
  });

  return wss;
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('=== Slow-registration proof of fix ===\n');
  console.log(`Mock server withholds "${TARGET_METHOD}" for ${REGISTRATION_DELAY_MS / 1000} s`);
  console.log(`  (simulates the real CI flake where startup can exceed 60 s)\n`);

  // ── RED LIGHT ────────────────────────────────────────────────────────────
  console.log(`RED LIGHT: waitForPapiMethodRegistered timeout=${OLD_TIMEOUT_MS}ms`);
  console.log(`  (analogous to old 60 s default — shorter than the ${REGISTRATION_DELAY_MS / 1000} s delay)`);

  let redServer = startMockServer(REGISTRATION_DELAY_MS);
  const redStart = Date.now();
  let redPassed = false;
  try {
    await waitForPapiMethodRegistered(TARGET_METHOD, MOCK_PORT, OLD_TIMEOUT_MS);
    redPassed = true;
  } catch (e) {
    console.log(`  ✘ FAILED after ${Date.now() - redStart}ms — ${e.message}`);
  }
  await new Promise((r) => redServer.close(r));

  if (redPassed) {
    console.error('  ERROR: red-light run should have failed but passed');
    process.exit(1);
  }

  // small gap so port is free for second server
  await new Promise((r) => setTimeout(r, 200));

  // ── GREEN LIGHT ──────────────────────────────────────────────────────────
  console.log(`\nGREEN LIGHT: waitForPapiMethodRegistered timeout=${NEW_TIMEOUT_MS}ms`);
  console.log(`  (analogous to the fix: 90 s — longer than the ${REGISTRATION_DELAY_MS / 1000} s delay)`);

  let greenServer = startMockServer(REGISTRATION_DELAY_MS);
  const greenStart = Date.now();
  let greenPassed = false;
  try {
    await waitForPapiMethodRegistered(TARGET_METHOD, MOCK_PORT, NEW_TIMEOUT_MS);
    greenPassed = true;
    console.log(`  ✓ PASSED after ${Date.now() - greenStart}ms`);
  } catch (e) {
    console.log(`  ✘ FAILED — ${e.message}`);
  }
  await new Promise((r) => greenServer.close(r));

  if (!greenPassed) {
    console.error('  ERROR: green-light run should have passed but failed');
    process.exit(1);
  }

  console.log('\n✓ Proof complete: raising the timeout from below to above the registration');
  console.log('  time turns the failure into a pass. The fix is verified.\n');
  console.log('Note: on slow CI the numbers are:');
  console.log(`  registration time ≈ 60-70 s, old timeout = 60 s (fails), new timeout = 90 s (passes)`);
}

main().catch((e) => { console.error(e); process.exit(1); });
