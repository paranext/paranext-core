import { Page } from '@playwright/test';

/**
 * Close every dock tab whose title is not "Home" so each test starts from a clean dock state.
 * Platform.Bible persists dock layout across sessions; stale tabs from prior runs cause cross-test
 * pollution.
 *
 * Closes one tab at a time because the locator's match set mutates as tabs disappear — the next
 * iteration must observe the post-close DOM before deciding whether to keep going. Parallelising
 * would race the count() against pending close transitions.
 */
export async function closeAllNonHomeDockTabs(page: Page): Promise<void> {
  const staleCloseBtn = page
    .locator('.dock-tab')
    .filter({ hasNotText: 'Home' })
    .locator('.dock-tab-close-btn');
  // Sequential awaits are intentional — see jsdoc above.
  /* eslint-disable no-await-in-loop */
  while ((await staleCloseBtn.count()) > 0) {
    await staleCloseBtn.first().dispatchEvent('click');
    await page.waitForTimeout(500);
  }
  /* eslint-enable no-await-in-loop */
}
