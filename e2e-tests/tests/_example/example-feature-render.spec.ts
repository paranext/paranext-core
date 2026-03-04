/**
 * === REFERENCE EXAMPLE ===
 *
 * This is a template for per-feature E2E tests using cdp.fixture. Copy this file when creating E2E
 * tests for a new feature.
 *
 * Key rules:
 *
 * - ALWAYS import from '../../fixtures/cdp.fixture' (NOT papi.fixture or app.fixture)
 * - ALWAYS navigate via visible UI (menu clicks, button presses)
 * - NEVER use sendPapiCommand, papiClient, or direct JSON-RPC calls
 * - Cdp.fixture only provides { mainPage } — no papiClient available (by design)
 *
 * This file is excluded from test runs — it's documentation only.
 */
import { test, expect } from '../../fixtures/cdp.fixture';
import { waitForAppReady } from '../../fixtures/helpers';

// Filter console errors, excluding known noise (DevTools, favicon, source maps)
function filterConsoleErrors(errors: string[]): string[] {
  return errors.filter(
    (e) =>
      !e.includes('DevTools') &&
      !e.includes('favicon') &&
      !e.includes('source map') &&
      !e.includes('net::ERR_'),
  );
}

test.describe('Example Feature Render Tests', () => {
  test('should open feature via menu and verify render', async ({ mainPage }) => {
    await waitForAppReady(mainPage);

    // Step 1: Navigate via visible UI — click the top-level menu
    const menuTrigger = mainPage.getByRole('menuitem', { name: /Menu Name/i });
    await menuTrigger.click();

    // Step 2: Click the feature entry in the dropdown
    const featureItem = mainPage.getByRole('menuitem', { name: /Feature Name/i });
    await featureItem.click();

    // Step 3: Verify the feature opened (dock tab appeared)
    const tab = mainPage.locator('.dock-tab', { hasText: /Feature Name/i });
    await expect(tab).toBeVisible({ timeout: 15_000 });
  });

  test('should render without console errors', async ({ mainPage }) => {
    await waitForAppReady(mainPage);
    const consoleErrors: string[] = [];
    mainPage.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    // Navigate to feature via UI
    const menuTrigger = mainPage.getByRole('menuitem', { name: /Menu Name/i });
    await menuTrigger.click();
    const featureItem = mainPage.getByRole('menuitem', { name: /Feature Name/i });
    await featureItem.click();

    // Wait for feature to load
    await expect(mainPage.locator('.dock-tab', { hasText: /Feature Name/i })).toBeVisible({
      timeout: 15_000,
    });

    // Check for critical console errors (filter known noise)
    const criticalErrors = filterConsoleErrors(consoleErrors);
    expect(criticalErrors).toHaveLength(0);
  });
});

test.describe('Example Feature User Journey', () => {
  test('should complete a basic user flow', async ({ mainPage }) => {
    await waitForAppReady(mainPage);

    // Navigate to feature
    const menuTrigger = mainPage.getByRole('menuitem', { name: /Menu Name/i });
    await menuTrigger.click();
    const featureItem = mainPage.getByRole('menuitem', { name: /Feature Name/i });
    await featureItem.click();
    await expect(mainPage.locator('.dock-tab', { hasText: /Feature Name/i })).toBeVisible({
      timeout: 15_000,
    });

    // For web view content inside iframes, switch frame context:
    // const webViewFrame = mainPage.frameLocator('iframe[title="Feature WebView Title"]');
    // await expect(webViewFrame.locator('[data-testid="my-component"]')).toBeVisible();

    // Interact with UI elements
    // await webViewFrame.locator('button', { hasText: /Save/i }).click();

    // Verify results
    // await expect(webViewFrame.locator('[data-testid="success-message"]')).toBeVisible();
  });
});
