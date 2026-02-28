/**
 * Functional tests for UI-PKG-001: Extension Shell
 *
 * Tests verify extension activation, web view provider registration, and command handling.
 *
 * @scenario BHV-605: Extension entry point registers providers and commands
 */
import { test, expect } from '../../fixtures/cdp.fixture';
import { waitForAppReady } from '../../fixtures/helpers';

// Locator helpers
const ER_MENU_LABEL = /Enhanced Resource/i;

test.describe('UI-PKG-001: Extension Shell — Navigation', () => {
  test('NAV-001: Enhanced Resource menu item exists in top-level menu', async ({ mainPage }) => {
    // @scenario BHV-605
    await waitForAppReady(mainPage);
    // Look for the ER menu entry in the main menu bar
    const menuTrigger = mainPage.getByRole('menuitem', { name: /Open/i });
    await menuTrigger.click();
    const erMenuItem = mainPage.getByRole('menuitem', { name: ER_MENU_LABEL });
    await expect(erMenuItem).toBeVisible({ timeout: 10_000 });
    // EVD-001: Screenshot of menu with ER entry
    await mainPage.screenshot({
      path: 'e2e-tests/test-results/UI-PKG-001-NAV-001-menu.png',
    });
  });

  test('NAV-002: Clicking ER menu item opens Enhanced Resource web view', async ({ mainPage }) => {
    // @scenario BHV-605
    await waitForAppReady(mainPage);
    const menuTrigger = mainPage.getByRole('menuitem', { name: /Open/i });
    await menuTrigger.click();
    const erMenuItem = mainPage.getByRole('menuitem', { name: ER_MENU_LABEL });
    await erMenuItem.click();
    // Web view should appear as a dock tab
    const tab = mainPage.locator('.dock-tab', { hasText: ER_MENU_LABEL });
    await expect(tab).toBeVisible({ timeout: 15_000 });
  });
});

test.describe('UI-PKG-001: Extension Shell — Render', () => {
  test('RND-001: ER web view renders an iframe with content', async ({ mainPage }) => {
    // @scenario BHV-605
    await waitForAppReady(mainPage);
    // Open ER via menu
    const menuTrigger = mainPage.getByRole('menuitem', { name: /Open/i });
    await menuTrigger.click();
    await mainPage.getByRole('menuitem', { name: ER_MENU_LABEL }).click();
    await expect(mainPage.locator('.dock-tab', { hasText: ER_MENU_LABEL })).toBeVisible({
      timeout: 15_000,
    });
    // Verify iframe exists for ER web view
    const webViewFrame = mainPage.frameLocator('iframe[title*="Enhanced Resource"]');
    await expect(webViewFrame.locator('[data-testid="er-web-view"]')).toBeVisible({
      timeout: 10_000,
    });
  });

  test('RND-002: No console errors during extension activation', async ({ mainPage }) => {
    // @scenario BHV-605
    await waitForAppReady(mainPage);
    const consoleErrors: string[] = [];
    mainPage.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    const menuTrigger = mainPage.getByRole('menuitem', { name: /Open/i });
    await menuTrigger.click();
    await mainPage.getByRole('menuitem', { name: ER_MENU_LABEL }).click();
    await expect(mainPage.locator('.dock-tab', { hasText: ER_MENU_LABEL })).toBeVisible({
      timeout: 15_000,
    });
    // Filter known noise
    const critical = consoleErrors.filter(
      (e) =>
        !e.includes('DevTools') &&
        !e.includes('favicon') &&
        !e.includes('source map') &&
        !e.includes('net::ERR_'),
    );
    expect(critical).toHaveLength(0);
  });
});

test.describe('UI-PKG-001: Extension Shell — Data Wiring', () => {
  test('DW-001: ER web view connects to backend NetworkObject', async ({ mainPage }) => {
    // @scenario BHV-605
    await waitForAppReady(mainPage);
    const menuTrigger = mainPage.getByRole('menuitem', { name: /Open/i });
    await menuTrigger.click();
    await mainPage.getByRole('menuitem', { name: ER_MENU_LABEL }).click();
    const webViewFrame = mainPage.frameLocator('iframe[title*="Enhanced Resource"]');
    // Wait for web view to load (indicates backend connection succeeded)
    await expect(webViewFrame.locator('[data-testid="er-web-view"]')).toBeVisible({
      timeout: 15_000,
    });
    // The web view should not show a connection error
    await expect(webViewFrame.locator('[data-testid="connection-error"]')).not.toBeVisible();
  });
});

test.describe('UI-PKG-001: Extension Shell — Interaction', () => {
  test('INT-001: Opening multiple ER windows creates separate instances', async ({ mainPage }) => {
    // @scenario BHV-605 edge case
    await waitForAppReady(mainPage);
    // Open first ER
    const menuTrigger = mainPage.getByRole('menuitem', { name: /Open/i });
    await menuTrigger.click();
    await mainPage.getByRole('menuitem', { name: ER_MENU_LABEL }).click();
    await expect(mainPage.locator('.dock-tab', { hasText: ER_MENU_LABEL })).toBeVisible({
      timeout: 15_000,
    });
    // Open second ER
    await menuTrigger.click();
    await mainPage.getByRole('menuitem', { name: ER_MENU_LABEL }).click();
    // Should have at least 2 ER tabs
    const erTabs = mainPage.locator('.dock-tab', { hasText: ER_MENU_LABEL });
    await expect(erTabs).toHaveCount(2, { timeout: 15_000 });
  });
});
