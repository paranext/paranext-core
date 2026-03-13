import { Frame, Page } from '@playwright/test';

/**
 * Find the Hello Rock3 WebView frame by activating its dock tab and searching child frames for
 * hello-rock3-specific content.
 *
 * Requires DEV_NOISY=true so that the helloRock3 test extension is loaded.
 *
 * @returns The Frame object for the hello-rock3 iframe, usable for interactions inside the WebView.
 */
export async function findHelloRock3Frame(page: Page): Promise<Frame> {
  // Wait for the Hello Rock3 tab to appear in the dock layout and activate it
  const tab = page.locator('.dock-tab', { hasText: /Hello Rock3/i });
  await tab.first().waitFor({ state: 'visible', timeout: 60_000 });
  await tab.first().click();

  // Poll child frames until we find one with hello-rock3 content.
  // The hello-rock3 WebView renders a .title div containing "Hello Rock3" (or
  // the unresolved localization key "%helloRock3_helloRock3%").
  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    // eslint-disable-next-line no-await-in-loop -- polling loop; iterations are intentionally sequential
    const match = await page
      .frames()
      .filter((f) => f !== page.mainFrame())
      .reduce<Promise<Frame | undefined>>(async (accPromise, frame) => {
        const acc = await accPromise;
        if (acc) return acc;
        try {
          const titleEl = frame.locator('.title');
          const count = await titleEl.count();
          if (count > 0) {
            const text = await titleEl.first().textContent();
            if (text && (text.includes('Hello Rock3') || text.includes('helloRock3'))) {
              return frame;
            }
          }
        } catch {
          // Frame may not be ready yet
        }
        return undefined;
      }, Promise.resolve(undefined));

    if (match) return match;

    // eslint-disable-next-line no-await-in-loop -- polling loop requires sequential waits
    await page.waitForTimeout(500);
  }

  throw new Error(
    'Hello Rock3 WebView frame not found within 30s. ' +
      'Ensure DEV_NOISY=true is set so the helloRock3 test extension loads.',
  );
}

/**
 * The default person name from the helloRock3 settings contribution (`settings.json`). The
 * `useSetting('helloRock3.personName', ...)` hook resolves to this contributed default on a fresh
 * install.
 */
export const DEFAULT_PERSON_NAME = 'Bill';
