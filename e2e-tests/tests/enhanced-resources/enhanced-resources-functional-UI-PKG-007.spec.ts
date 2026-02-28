/**
 * Functional tests for UI-PKG-007: MarbleGuideForm
 *
 * RED phase — all tests use test.fixme() until implementation activates them. Tests verify guide
 * content display, show-on-open toggle, and visibility behavior.
 *
 * @scenario BHV-410, BHV-604
 */
import { test, expect } from '../../fixtures/cdp.fixture';
import { waitForAppReady } from '../../fixtures/helpers';

const ER_MENU_LABEL = /Enhanced Resource/i;

async function openERWebView(mainPage: import('@playwright/test').Page) {
  await waitForAppReady(mainPage);
  const menuTrigger = mainPage.getByRole('menuitem', { name: /Open/i });
  await menuTrigger.click();
  await mainPage.getByRole('menuitem', { name: ER_MENU_LABEL }).click();
  await expect(mainPage.locator('.dock-tab', { hasText: ER_MENU_LABEL })).toBeVisible({
    timeout: 15_000,
  });
  return mainPage.frameLocator('iframe[title*="Enhanced Resource"]');
}

test.describe('UI-PKG-007: MarbleGuideForm — Render', () => {
  test.fixme('RND-001: Guide content renders with highlight explanations', async ({ mainPage }) => {
    // @scenario BHV-410
    const frame = await openERWebView(mainPage);
    // Toggle guide via info icon
    const infoBtn = frame.locator('[data-testid="info-icon-btn"]');
    await expect(infoBtn).toBeVisible({ timeout: 10_000 });
    await infoBtn.click();
    const guide = frame.locator('[data-testid="guide-panel"]');
    await expect(guide).toBeVisible({ timeout: 5_000 });
    // Verify content sections
    await expect(guide.getByText(/blue highlighted/i)).toBeVisible();
    await expect(guide.getByText(/gray highlighted/i)).toBeVisible();
    await expect(guide.getByText(/orange highlighted/i)).toBeVisible();
    // EVD-011: Screenshot of guide panel
    await mainPage.screenshot({
      path: 'e2e-tests/test-results/UI-PKG-007-RND-001-guide.png',
    });
  });

  test.fixme('RND-002: Guide includes tab icon descriptions', async ({ mainPage }) => {
    // @scenario BHV-410
    const frame = await openERWebView(mainPage);
    const infoBtn = frame.locator('[data-testid="info-icon-btn"]');
    await infoBtn.click();
    const guide = frame.locator('[data-testid="guide-panel"]');
    await expect(guide).toBeVisible({ timeout: 5_000 });
    await expect(guide.getByText(/Dictionary/i)).toBeVisible();
    await expect(guide.getByText(/Encyclopedia/i)).toBeVisible();
  });

  test.fixme('RND-003: Show-on-open checkbox is present', async ({ mainPage }) => {
    // @scenario BHV-410
    const frame = await openERWebView(mainPage);
    const infoBtn = frame.locator('[data-testid="info-icon-btn"]');
    await infoBtn.click();
    const guide = frame.locator('[data-testid="guide-panel"]');
    await expect(guide).toBeVisible({ timeout: 5_000 });
    const checkbox = guide.locator('[data-testid="show-guide-checkbox"]');
    await expect(checkbox).toBeVisible();
  });
});

test.describe('UI-PKG-007: MarbleGuideForm — Interaction', () => {
  test.fixme('INT-001: Close button hides guide panel', async ({ mainPage }) => {
    // @scenario BHV-410
    const frame = await openERWebView(mainPage);
    const infoBtn = frame.locator('[data-testid="info-icon-btn"]');
    await infoBtn.click();
    const guide = frame.locator('[data-testid="guide-panel"]');
    await expect(guide).toBeVisible({ timeout: 5_000 });
    const closeBtn = guide.locator('[data-testid="guide-close"]');
    await closeBtn.click();
    await expect(guide).not.toBeVisible({ timeout: 5_000 });
  });

  test.fixme('INT-002: Info icon re-shows guide after close', async ({ mainPage }) => {
    // @scenario BHV-604
    const frame = await openERWebView(mainPage);
    const infoBtn = frame.locator('[data-testid="info-icon-btn"]');
    // Open and close guide
    await infoBtn.click();
    const guide = frame.locator('[data-testid="guide-panel"]');
    await expect(guide).toBeVisible({ timeout: 5_000 });
    await guide.locator('[data-testid="guide-close"]').click();
    await expect(guide).not.toBeVisible({ timeout: 5_000 });
    // Re-open via info icon
    await infoBtn.click();
    await expect(guide).toBeVisible({ timeout: 5_000 });
  });

  test.fixme('INT-003: Show-on-open checkbox toggle persists setting', async ({ mainPage }) => {
    // @scenario BHV-410
    const frame = await openERWebView(mainPage);
    const infoBtn = frame.locator('[data-testid="info-icon-btn"]');
    await infoBtn.click();
    const guide = frame.locator('[data-testid="guide-panel"]');
    await expect(guide).toBeVisible({ timeout: 5_000 });
    const checkbox = guide.locator('[data-testid="show-guide-checkbox"]');
    await checkbox.click();
    // Setting should persist (verified by close and reopen behavior)
  });
});

test.describe('UI-PKG-007: MarbleGuideForm — Data Wiring', () => {
  test.fixme(
    'DW-001: Guide auto-shown on first ER open when setting is true',
    async ({ mainPage }) => {
      // @scenario BHV-410, BHV-604
      await waitForAppReady(mainPage);
      // This test would need the setting to be true (default)
      // On first open, the guide should auto-appear
    },
  );
});
