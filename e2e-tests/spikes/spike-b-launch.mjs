/**
 * Spike B: Playwright electron.launch()
 *
 * Launches a fresh Electron instance with full main-process access.
 * Tests: main process eval, screenshot, click Help→About, text input.
 *
 * Prerequisites:
 *   npm run build (or at minimum: .erb/dll/main.bundle.dev.js exists)
 *   Renderer dev server running on port 1212 (or run: npm run start:renderer)
 *
 * Usage:
 *   node e2e-tests/spikes/spike-b-launch.mjs
 */

import { _electron as electron } from 'playwright';
import fs from 'fs';
import os from 'os';
import path from 'path';
import net from 'net';
import { fileURLToPath } from 'url';
import WebSocket from 'ws';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '../..');
const RESULTS_DIR = path.join(__dirname, 'results-b');
const WEBSOCKET_PORT = 8876;
const RENDERER_PORT = 1212;

function log(msg) {
  console.log(`[Spike B] ${new Date().toISOString()} ${msg}`);
}

function isPortInUse(port) {
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

async function waitForWebSocket(port, timeout) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    try {
      await new Promise((resolve, reject) => {
        const ws = new WebSocket(`ws://localhost:${port}`);
        const timer = setTimeout(() => {
          ws.close();
          reject(new Error('timeout'));
        }, 2000);
        ws.on('open', () => {
          clearTimeout(timer);
          ws.close();
          resolve();
        });
        ws.on('error', (err) => {
          clearTimeout(timer);
          reject(err);
        });
      });
      return;
    } catch {
      await new Promise((r) => setTimeout(r, 500));
    }
  }
  throw new Error(`WebSocket not ready on port ${port} after ${timeout}ms`);
}

async function main() {
  fs.mkdirSync(RESULTS_DIR, { recursive: true });
  const results = { steps: [], errors: [], timing: {} };
  const t0 = Date.now();

  // Pre-check: renderer dev server
  const rendererRunning = await isPortInUse(RENDERER_PORT);
  if (!rendererRunning) {
    log(`WARNING: Renderer dev server not running on port ${RENDERER_PORT}.`);
    log('The app may not load correctly. Start with: npm run start:renderer');
  }

  // Pre-check: no conflicting instance
  const wsInUse = await isPortInUse(WEBSOCKET_PORT);
  if (wsInUse) {
    log(`ERROR: Port ${WEBSOCKET_PORT} already in use. Stop the running app first.`);
    process.exit(1);
  }

  // Step 1: Launch Electron
  log('Launching Electron...');
  const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'paranext-spike-b-'));
  let electronApp;

  const env = { ...process.env, NODE_ENV: 'development' };
  delete env.ELECTRON_RUN_AS_NODE;

  try {
    electronApp = await electron.launch({
      args: [`--user-data-dir=${userDataDir}`, ROOT_DIR],
      cwd: ROOT_DIR,
      env,
      timeout: 60_000,
    });
    results.timing.launchMs = Date.now() - t0;
    results.steps.push({ step: 'launch', status: 'pass', ms: results.timing.launchMs });
    log(`Launched in ${results.timing.launchMs}ms`);
  } catch (err) {
    results.steps.push({ step: 'launch', status: 'FAIL', error: err.message });
    results.errors.push(err.message);
    log(`FAIL launch: ${err.message}`);
    fs.writeFileSync(path.join(RESULTS_DIR, 'results.json'), JSON.stringify(results, null, 2));
    fs.rmSync(userDataDir, { recursive: true, force: true });
    process.exit(1);
  }

  // Step 2: Main process eval
  log('Testing main process eval...');
  try {
    const appName = await electronApp.evaluate(({ app }) => app.getName());
    const appVersion = await electronApp.evaluate(({ app }) => app.getVersion());
    const userDataPath = await electronApp.evaluate(({ app }) => app.getPath('userData'));
    results.steps.push({
      step: 'evalMain',
      status: 'pass',
      appName,
      appVersion,
      userDataPath,
    });
    log(`App name: "${appName}", version: "${appVersion}"`);
    log(`User data: ${userDataPath}`);
  } catch (err) {
    results.steps.push({ step: 'evalMain', status: 'FAIL', error: err.message });
    results.errors.push(err.message);
    log(`FAIL evalMain: ${err.message}`);
  }

  // Step 3: Get first window
  log('Getting first window...');
  let page;
  try {
    page = await electronApp.firstWindow();
    await page.waitForLoadState('domcontentloaded');
    results.steps.push({ step: 'getWindow', status: 'pass', url: page.url() });
    log(`Window URL: ${page.url()}`);
  } catch (err) {
    results.steps.push({ step: 'getWindow', status: 'FAIL', error: err.message });
    results.errors.push(err.message);
    log(`FAIL getWindow: ${err.message}`);
    await cleanup(electronApp, userDataDir);
    fs.writeFileSync(path.join(RESULTS_DIR, 'results.json'), JSON.stringify(results, null, 2));
    process.exit(1);
  }

  // Step 4: Wait for React root
  log('Waiting for React root...');
  try {
    await page.waitForSelector('#root', { state: 'attached', timeout: 30_000 });
    results.steps.push({ step: 'waitForRoot', status: 'pass' });
    log('React root found');
  } catch (err) {
    results.steps.push({ step: 'waitForRoot', status: 'FAIL', error: err.message });
    results.errors.push(err.message);
    log(`FAIL waitForRoot: ${err.message}`);
  }

  // Step 5: Wait for WebSocket / PAPI server
  log('Waiting for PAPI WebSocket...');
  try {
    await waitForWebSocket(WEBSOCKET_PORT, 60_000);
    results.steps.push({ step: 'waitForPAPI', status: 'pass' });
    log('PAPI WebSocket ready');
  } catch (err) {
    results.steps.push({ step: 'waitForPAPI', status: 'FAIL', error: err.message });
    results.errors.push(err.message);
    log(`FAIL waitForPAPI: ${err.message}`);
  }

  // Step 6: Wait for dock layout (extensions loaded)
  log('Waiting for dock layout...');
  try {
    await page.waitForSelector('div[class*="dock-layout"]', { state: 'attached', timeout: 60_000 });
    results.steps.push({ step: 'waitForDock', status: 'pass' });
    log('Dock layout found');
  } catch (err) {
    results.steps.push({ step: 'waitForDock', status: 'FAIL', error: err.message });
    results.errors.push(err.message);
    log(`FAIL waitForDock: ${err.message}`);
  }

  // Step 7: Initial screenshot
  log('Taking initial screenshot...');
  try {
    const ssPath = path.join(RESULTS_DIR, '01-initial.png');
    await page.screenshot({ path: ssPath, fullPage: true });
    results.steps.push({ step: 'screenshot-initial', status: 'pass', path: ssPath });
    log(`Screenshot saved: ${ssPath}`);
  } catch (err) {
    results.steps.push({ step: 'screenshot-initial', status: 'FAIL', error: err.message });
    results.errors.push(err.message);
    log(`FAIL screenshot: ${err.message}`);
  }

  // Step 8: Click Help menu
  log('Clicking Help menu...');
  try {
    const helpMenu = page.getByRole('menuitem', { name: /Help/i });
    await helpMenu.click({ timeout: 10_000 });
    await page.waitForTimeout(500);
    results.steps.push({ step: 'clickHelp', status: 'pass' });
    log('Clicked Help');

    const ssPath = path.join(RESULTS_DIR, '02-help-menu.png');
    await page.screenshot({ path: ssPath });
    log(`Screenshot saved: ${ssPath}`);
  } catch (err) {
    results.steps.push({ step: 'clickHelp', status: 'FAIL', error: err.message });
    results.errors.push(err.message);
    log(`FAIL clickHelp: ${err.message}`);
  }

  // Step 9: Click About
  log('Clicking About...');
  try {
    const aboutItem = page.getByRole('menuitem', { name: /About Platform\.Bible/i });
    await aboutItem.click({ timeout: 10_000 });
    results.steps.push({ step: 'clickAbout', status: 'pass' });
    log('Clicked About');
  } catch (err) {
    results.steps.push({ step: 'clickAbout', status: 'FAIL', error: err.message });
    results.errors.push(err.message);
    log(`FAIL clickAbout: ${err.message}`);
  }

  // Step 10: Verify About tab
  log('Verifying About tab...');
  try {
    const aboutTab = page.locator('.dock-tab', { hasText: /About/i });
    await aboutTab.waitFor({ state: 'visible', timeout: 10_000 });
    results.steps.push({ step: 'verifyAbout', status: 'pass' });
    log('About tab visible');
  } catch (err) {
    results.steps.push({ step: 'verifyAbout', status: 'FAIL', error: err.message });
    results.errors.push(err.message);
    log(`FAIL verifyAbout: ${err.message}`);
  }

  // Step 11: Screenshot after About
  log('Taking post-About screenshot...');
  try {
    const ssPath = path.join(RESULTS_DIR, '03-about-open.png');
    await page.screenshot({ path: ssPath, fullPage: true });
    results.steps.push({ step: 'screenshot-about', status: 'pass', path: ssPath });
    log(`Screenshot saved: ${ssPath}`);
  } catch (err) {
    results.steps.push({ step: 'screenshot-about', status: 'FAIL', error: err.message });
    results.errors.push(err.message);
    log(`FAIL screenshot: ${err.message}`);
  }

  // Step 12: Text input — book/chapter selector
  log('Testing text input...');
  try {
    const trigger = page.locator('[aria-label="book-chapter-trigger"]');
    await trigger.click({ timeout: 10_000 });
    await page.waitForTimeout(300);

    const commandInput = page.locator('[data-radix-popper-content-wrapper] input');
    await commandInput.fill('Gen', { timeout: 5_000 });
    await page.waitForTimeout(500);

    const ssPath = path.join(RESULTS_DIR, '04-text-input.png');
    await page.screenshot({ path: ssPath });
    results.steps.push({ step: 'textInput', status: 'pass', path: ssPath });
    log('Text input works');

    await page.keyboard.press('Escape');
  } catch (err) {
    results.steps.push({ step: 'textInput', status: 'FAIL', error: err.message });
    results.errors.push(err.message);
    log(`FAIL textInput: ${err.message}`);
  }

  // Step 13: JS eval in renderer
  log('Testing JS eval in renderer...');
  try {
    const title = await page.evaluate(() => document.title);
    results.steps.push({ step: 'evalRenderer', status: 'pass', value: title });
    log(`document.title = "${title}"`);
  } catch (err) {
    results.steps.push({ step: 'evalRenderer', status: 'FAIL', error: err.message });
    results.errors.push(err.message);
    log(`FAIL evalRenderer: ${err.message}`);
  }

  // Step 14: iframe access
  log('Testing iframe access...');
  try {
    const frames = page.frames();
    log(`Found ${frames.length} frame(s)`);
    for (const f of frames) {
      log(`  Frame: ${f.url()}`);
    }
    results.steps.push({
      step: 'iframeAccess',
      status: 'pass',
      frameCount: frames.length,
      frameUrls: frames.map((f) => f.url()),
    });
  } catch (err) {
    results.steps.push({ step: 'iframeAccess', status: 'FAIL', error: err.message });
    results.errors.push(err.message);
    log(`FAIL iframeAccess: ${err.message}`);
  }

  // Finalize
  results.timing.totalMs = Date.now() - t0;
  results.passCount = results.steps.filter((s) => s.status === 'pass').length;
  results.failCount = results.steps.filter((s) => s.status === 'FAIL').length;

  fs.writeFileSync(path.join(RESULTS_DIR, 'results.json'), JSON.stringify(results, null, 2));

  log('');
  log('=== SPIKE B RESULTS ===');
  log(`Pass: ${results.passCount}, Fail: ${results.failCount}`);
  log(`Total time: ${results.timing.totalMs}ms`);
  for (const step of results.steps) {
    log(`  ${step.status.padEnd(5)} ${step.step}${step.error ? ` — ${step.error}` : ''}`);
  }

  // Cleanup
  await cleanup(electronApp, userDataDir);
  log('Done.');
}

async function cleanup(electronApp, userDataDir) {
  log('Shutting down...');

  // Try graceful quit via PAPI first
  try {
    await new Promise((resolve, reject) => {
      const ws = new WebSocket(`ws://localhost:${WEBSOCKET_PORT}`);
      const timer = setTimeout(() => {
        ws.close();
        resolve();
      }, 5000);
      ws.on('open', () => {
        ws.send(
          JSON.stringify({
            jsonrpc: '2.0',
            id: 999,
            method: 'command:platform.quit',
            params: [],
          }),
        );
        setTimeout(() => {
          clearTimeout(timer);
          ws.close();
          resolve();
        }, 2000);
      });
      ws.on('error', () => {
        clearTimeout(timer);
        resolve();
      });
    });
  } catch {
    // Ignore
  }

  try {
    const closeTimeout = new Promise((resolve) => setTimeout(resolve, 15_000));
    await Promise.race([electronApp.close(), closeTimeout]);
  } catch {
    log('electronApp.close() failed or timed out');
  }

  fs.rmSync(userDataDir, { recursive: true, force: true });
}

main().catch((err) => {
  console.error('Spike B unhandled error:', err);
  process.exit(1);
});
