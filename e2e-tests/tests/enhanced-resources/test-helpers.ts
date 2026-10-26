import { expect, Page } from '@playwright/test';

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

/** WebView iframe selector for Enhanced Resource. */
export const ER_FRAME_SELECTOR = 'iframe[title="Enhanced Resource"]';

/**
 * Open an Enhanced Resource window via the Platform menu and wait for the iframe to be ready.
 *
 * The hardcoded ESV16UK+ default in main.ts (TODO(GAP-001)) means the menu click opens the resource
 * directly — no picker dialog. The MarbleGuide tutorial may auto-show on the first ER open per
 * session (BHV-461 / TS-067). When `dismissGuide` is true (default), this helper closes the guide
 * if it appears so subsequent assertions on the scripture pane are not blocked by the modal.
 */
export async function openEnhancedResource(
  page: Page,
  options: { dismissGuide?: boolean } = {},
): Promise<void> {
  const { dismissGuide = true } = options;
  await page.getByRole('menuitem', { name: /^Platform$/i }).click();
  await page.getByRole('menuitem', { name: /^Open Enhanced Resource$/i }).click();
  await expect(page.locator('.dock-tab', { hasText: /Enhanced Resource/i }).first()).toBeVisible({
    timeout: 15_000,
  });
  if (dismissGuide) {
    await dismissMarbleGuideIfShown(page);
  }
}

/**
 * If the MarbleGuide tutorial Dialog is visible, click its Close button so subsequent assertions on
 * the scripture pane are not blocked by `aria-hidden="true"` siblings.
 *
 * This is a no-op if the guide is not shown — only the first ER open per session triggers it.
 */
export async function dismissMarbleGuideIfShown(page: Page): Promise<void> {
  const frame = page.frameLocator(ER_FRAME_SELECTOR);
  const close = frame.getByTestId('marble-guide-close');
  // Wait briefly for the guide to appear, then close it. Use a short timeout because in most tests
  // the guide is NOT shown (already dismissed earlier this session).
  if (await close.isVisible({ timeout: 1_000 }).catch(() => false)) {
    await close.click();
    await expect(close).toBeHidden({ timeout: 5_000 });
  }
}
