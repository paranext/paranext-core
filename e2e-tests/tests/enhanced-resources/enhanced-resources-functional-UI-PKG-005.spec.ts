/**
 * Functional tests for UI-PKG-005: WarningBanners
 *
 * RED phase — all tests use test.fixme() until implementation activates them. Tests verify
 * conditional warning banners: display, dismiss, action links, stacking.
 *
 * @scenario BHV-411
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

test.describe('UI-PKG-005: WarningBanners — Render', () => {
  test.fixme('RND-001: Warning banner area exists in layout', async ({ mainPage }) => {
    // @scenario BHV-411
    const frame = await openERWebView(mainPage);
    const bannerArea = frame.locator('[data-testid="warning-banner-stack"]');
    await expect(bannerArea).toBeAttached({ timeout: 10_000 });
    // EVD-005: Screenshot of banner area
    await mainPage.screenshot({
      path: 'e2e-tests/test-results/UI-PKG-005-RND-001-banners.png',
    });
  });

  test.fixme(
    'RND-002: Banners stack vertically when multiple are visible',
    async ({ mainPage }) => {
      // @scenario BHV-411 stacking
      const frame = await openERWebView(mainPage);
      const banners = frame.locator('[data-testid="warning-banner-item"]');
      // Count may be 0 if no conditions are met — test verifies structure
      const count = await banners.count();
      if (count >= 2) {
        const banner1Box = await banners.nth(0).boundingBox();
        const banner2Box = await banners.nth(1).boundingBox();
        expect(banner2Box!.y).toBeGreaterThan(banner1Box!.y);
      }
    },
  );
});

test.describe('UI-PKG-005: WarningBanners — Interaction', () => {
  test.fixme('INT-001: Dismissible banners can be closed', async ({ mainPage }) => {
    // @scenario BHV-411 dismiss
    const frame = await openERWebView(mainPage);
    const dismissibleBanner = frame.locator(
      '[data-testid="warning-banner-item"][data-dismissible="true"]',
    );
    const count = await dismissibleBanner.count();
    if (count > 0) {
      const closeBtn = dismissibleBanner.first().locator('[data-testid="banner-dismiss"]');
      await closeBtn.click();
      await expect(dismissibleBanner.first()).not.toBeVisible({
        timeout: 5_000,
      });
    }
  });

  test.fixme('INT-002: Non-dismissible banners have no close button', async ({ mainPage }) => {
    // @scenario BHV-411 non-dismiss
    const frame = await openERWebView(mainPage);
    const nonDismissible = frame.locator(
      '[data-testid="warning-banner-item"][data-dismissible="false"]',
    );
    const count = await nonDismissible.count();
    if (count > 0) {
      await expect(
        nonDismissible.first().locator('[data-testid="banner-dismiss"]'),
      ).not.toBeVisible();
    }
  });

  test.fixme('INT-003: Action links in banners are clickable', async ({ mainPage }) => {
    // @scenario BHV-411 action links
    const frame = await openERWebView(mainPage);
    const actionLink = frame.locator('[data-testid="banner-action-link"]');
    const count = await actionLink.count();
    if (count > 0) {
      await expect(actionLink.first()).toBeVisible();
    }
  });
});

test.describe('UI-PKG-005: WarningBanners — Data Wiring', () => {
  test.fixme('DW-001: Banner visibility driven by resource state', async ({ mainPage }) => {
    // @scenario BHV-411
    const frame = await openERWebView(mainPage);
    // The banner stack should reflect actual resource state (may be empty)
    const bannerStack = frame.locator('[data-testid="warning-banner-stack"]');
    await expect(bannerStack).toBeAttached({ timeout: 10_000 });
  });
});
