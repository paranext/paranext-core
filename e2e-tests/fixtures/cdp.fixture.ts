/**
 * === NEW IN PT10 === Reason: CDP-based Playwright fixture for running E2E tests against an
 * already-running Platform.Bible instance with remote debugging enabled.
 *
 * Uses `connectOverCDP` (port 9223) instead of `_electron.launch()`, so:
 *
 * - No app restart needed (no port 8876 conflict)
 * - Tests run against the same app instance used during development
 * - No teardown/shutdown of the app on completion
 *
 * Prerequisite: Platform.Bible running with --remote-debugging-port=9223
 */
import { test as base, chromium, Page } from '@playwright/test';

const CDP_URL = process.env.CDP_URL || 'http://localhost:9223';

export interface CdpFixtures {
  mainPage: Page;
}

export const test = base.extend<CdpFixtures>({
  mainPage: async ({}, use) => {
    const browser = await chromium.connectOverCDP(CDP_URL, { timeout: 10_000 });

    // Find the renderer page (not devtools) — same logic as pw-server.mjs
    let page: Page | undefined;
    for (const ctx of browser.contexts()) {
      for (const p of ctx.pages()) {
        const url = p.url();
        if (
          (url.includes('localhost') || url.includes('index.html') || url.startsWith('file://')) &&
          !url.includes('devtools://')
        ) {
          page = p;
          break;
        }
      }
      if (page) break;
    }

    // Fallback: pick the first non-devtools page
    if (!page) {
      for (const ctx of browser.contexts()) {
        for (const p of ctx.pages()) {
          if (!p.url().includes('devtools://')) {
            page = p;
            break;
          }
        }
        if (page) break;
      }
    }

    if (!page) throw new Error('No renderer page found via CDP');

    await use(page);
    // Do NOT close browser — we didn't start the app
  },
});

export { expect } from '@playwright/test';
