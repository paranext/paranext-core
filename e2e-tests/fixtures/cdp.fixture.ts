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

export { expect } from '@playwright/test';

const CDP_URL = process.env.CDP_URL || 'http://localhost:9223';

export interface CdpFixtures {
  mainPage: Page;
}

export const test = base.extend<CdpFixtures>({
  // Playwright fixtures require destructured parameter even when no dependencies are needed
  // eslint-disable-next-line no-empty-pattern
  mainPage: async ({}, use) => {
    let browser;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        browser = await chromium.connectOverCDP(CDP_URL, { timeout: 10_000 });
        break;
      } catch (err) {
        if (attempt === 3) throw err;
        await new Promise<void>((resolve) => {
          setTimeout(resolve, 2_000);
        });
      }
    }
    if (!browser) throw new Error('Failed to connect to CDP after 3 attempts');

    // Find the renderer page (not devtools) — same logic as pw-server.mjs
    const allPages = browser.contexts().flatMap((ctx) => ctx.pages());
    let page: Page | undefined = allPages.find((p) => {
      const url = p.url();
      return (
        (url.includes('localhost') || url.includes('index.html') || url.startsWith('file://')) &&
        !url.includes('devtools://')
      );
    });

    // Fallback: pick the first non-devtools page
    if (!page) {
      page = allPages.find((p) => !p.url().includes('devtools://'));
    }

    if (!page) throw new Error('No renderer page found via CDP');

    await use(page);
    // Do NOT close browser — we didn't start the app
  },
});
