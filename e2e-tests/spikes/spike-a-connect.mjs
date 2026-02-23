/**
 * Spike A: Playwright connectOverCDP
 *
 * Connects to an already-running Platform.Bible instance via CDP port 9223.
 * Tests: screenshot, click Help→About, verify tab appears.
 *
 * Prerequisites:
 *   MAIN_ARGS="--remote-debugging-port=9223" npm start
 *
 * Usage:
 *   node e2e-tests/spikes/spike-a-connect.mjs
 */

import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RESULTS_DIR = path.join(__dirname, 'results-a');
const CDP_URL = 'http://localhost:9223';

function log(msg) {
  console.log(`[Spike A] ${new Date().toISOString()} ${msg}`);
}

async function main() {
  fs.mkdirSync(RESULTS_DIR, { recursive: true });
  const results = { steps: [], errors: [], timing: {} };
  const t0 = Date.now();

  // Step 1: Connect via CDP
  log('Connecting to CDP...');
  let browser;
  try {
    browser = await chromium.connectOverCDP(CDP_URL, { timeout: 10_000 });
    results.timing.connectMs = Date.now() - t0;
    results.steps.push({ step: 'connect', status: 'pass', ms: results.timing.connectMs });
    log(`Connected in ${results.timing.connectMs}ms`);
  } catch (err) {
    results.steps.push({ step: 'connect', status: 'FAIL', error: err.message });
    results.errors.push(err.message);
    log(`FAIL: Could not connect: ${err.message}`);
    fs.writeFileSync(path.join(RESULTS_DIR, 'results.json'), JSON.stringify(results, null, 2));
    process.exit(1);
  }

  // Step 2: Get the renderer page
  log('Getting renderer page...');
  let page;
  try {
    const contexts = browser.contexts();
    log(`Found ${contexts.length} browser context(s)`);
    for (const ctx of contexts) {
      const pages = ctx.pages();
      log(`  Context has ${pages.length} page(s)`);
      for (const p of pages) {
        log(`    Page URL: ${p.url()}`);
      }
    }

    // Find the renderer page (the one with localhost or file:// URL that has actual content)
    for (const ctx of contexts) {
      for (const p of ctx.pages()) {
        const url = p.url();
        if (url.includes('localhost') || url.includes('index.html') || url.startsWith('file://')) {
          page = p;
          break;
        }
      }
      if (page) break;
    }

    if (!page) {
      // Fallback: just use the first page
      page = contexts[0]?.pages()[0];
    }

    if (!page) {
      throw new Error('No pages found in any context');
    }

    results.steps.push({ step: 'getPage', status: 'pass', url: page.url() });
    log(`Using page: ${page.url()}`);
  } catch (err) {
    results.steps.push({ step: 'getPage', status: 'FAIL', error: err.message });
    results.errors.push(err.message);
    log(`FAIL: ${err.message}`);
    fs.writeFileSync(path.join(RESULTS_DIR, 'results.json'), JSON.stringify(results, null, 2));
    browser.close();
    process.exit(1);
  }

  // Step 3: Initial screenshot
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

  // Step 4: Wait for dock layout (app fully loaded)
  log('Waiting for dock layout...');
  try {
    await page.waitForSelector('div[class*="dock-layout"]', { state: 'attached', timeout: 30_000 });
    results.steps.push({ step: 'waitForDock', status: 'pass' });
    log('Dock layout found');
  } catch (err) {
    results.steps.push({ step: 'waitForDock', status: 'FAIL', error: err.message });
    results.errors.push(err.message);
    log(`FAIL waitForDock: ${err.message}`);
  }

  // Step 5: Click Help menu
  log('Clicking Help menu...');
  try {
    const helpMenu = page.getByRole('menuitem', { name: /Help/i });
    await helpMenu.click({ timeout: 10_000 });
    results.steps.push({ step: 'clickHelp', status: 'pass' });
    log('Clicked Help');

    // Screenshot after Help menu opens
    await page.waitForTimeout(500);
    const ssPath = path.join(RESULTS_DIR, '02-help-menu.png');
    await page.screenshot({ path: ssPath });
    log(`Screenshot saved: ${ssPath}`);
  } catch (err) {
    results.steps.push({ step: 'clickHelp', status: 'FAIL', error: err.message });
    results.errors.push(err.message);
    log(`FAIL clickHelp: ${err.message}`);
  }

  // Step 6: Click "About Platform.Bible"
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

  // Step 7: Verify About tab appears
  log('Verifying About tab...');
  try {
    const aboutTab = page.locator('.dock-tab', { hasText: /About/i });
    await aboutTab.waitFor({ state: 'visible', timeout: 10_000 });
    results.steps.push({ step: 'verifyAbout', status: 'pass' });
    log('About tab is visible');
  } catch (err) {
    results.steps.push({ step: 'verifyAbout', status: 'FAIL', error: err.message });
    results.errors.push(err.message);
    log(`FAIL verifyAbout: ${err.message}`);
  }

  // Step 8: Screenshot after About
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

  // Step 9: Test text input — open book/chapter selector, type "Gen"
  log('Testing text input via book/chapter selector...');
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

    // Press Escape to close
    await page.keyboard.press('Escape');
  } catch (err) {
    results.steps.push({ step: 'textInput', status: 'FAIL', error: err.message });
    results.errors.push(err.message);
    log(`FAIL textInput: ${err.message}`);
  }

  // Step 10: Test JS eval in renderer
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

  // Step 11: Test iframe access (check for extension web views)
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

  // Note: connectOverCDP does NOT provide main process access
  results.steps.push({
    step: 'mainProcessAccess',
    status: 'N/A',
    note: 'connectOverCDP does not provide Electron main process access',
  });

  results.timing.totalMs = Date.now() - t0;
  results.passCount = results.steps.filter((s) => s.status === 'pass').length;
  results.failCount = results.steps.filter((s) => s.status === 'FAIL').length;

  // Write results
  fs.writeFileSync(path.join(RESULTS_DIR, 'results.json'), JSON.stringify(results, null, 2));

  log('');
  log('=== SPIKE A RESULTS ===');
  log(`Pass: ${results.passCount}, Fail: ${results.failCount}`);
  log(`Total time: ${results.timing.totalMs}ms`);
  for (const step of results.steps) {
    log(`  ${step.status.padEnd(5)} ${step.step}${step.error ? ` — ${step.error}` : ''}`);
  }

  // Disconnect (don't close — app keeps running)
  log('Disconnecting (app keeps running)...');
  browser.close();
  log('Done.');
}

main().catch((err) => {
  console.error('Spike A unhandled error:', err);
  process.exit(1);
});
