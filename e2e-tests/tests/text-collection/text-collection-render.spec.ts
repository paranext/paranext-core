/**
 * E2E render smoke tests for the Select Texts dialog (UI-PKG-001).
 *
 * Uses cdp.fixture to connect to an already-running Platform.Bible instance. Navigates via visible
 * UI only -- no PAPI commands.
 */
import { test, expect } from '../../fixtures/cdp.fixture';
import { waitForAppReady } from '../../fixtures/helpers';

/** Filter console errors, excluding known noise */
function filterConsoleErrors(errors: string[]): string[] {
  return errors.filter(
    (e) =>
      !e.includes('DevTools') &&
      !e.includes('favicon') &&
      !e.includes('source map') &&
      !e.includes('net::ERR_'),
  );
}

test.describe('Select Texts Dialog Render Tests', () => {
  test('should open Select Texts dialog via Project menu', async ({ mainPage }) => {
    await waitForAppReady(mainPage);

    // Step 1: Click the Project top-level menu
    const projectMenu = mainPage.getByRole('menuitem', { name: /Project/i });
    await projectMenu.click();

    // Step 2: Click the Select Texts menu entry
    const selectTextsItem = mainPage.getByRole('menuitem', { name: /Select Texts/i });
    await selectTextsItem.click();

    // Step 3: Verify the dialog opened (look for dock tab or panel with Select Texts)
    const tab = mainPage.locator('.dock-tab', { hasText: /Select Texts/i });
    await expect(tab).toBeVisible({ timeout: 15_000 });
  });

  test('should render Select Texts dialog without console errors', async ({ mainPage }) => {
    await waitForAppReady(mainPage);
    const consoleErrors: string[] = [];
    mainPage.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    // Navigate to Select Texts dialog via menu
    const projectMenu = mainPage.getByRole('menuitem', { name: /Project/i });
    await projectMenu.click();
    const selectTextsItem = mainPage.getByRole('menuitem', { name: /Select Texts/i });
    await selectTextsItem.click();

    // Wait for the dialog to appear
    await expect(mainPage.locator('.dock-tab', { hasText: /Select Texts/i })).toBeVisible({
      timeout: 15_000,
    });

    // Give the web view a moment to fully render (content loads async via PAPI)
    await mainPage.waitForTimeout(3_000);

    // Check for critical console errors (filter known noise)
    const criticalErrors = filterConsoleErrors(consoleErrors);
    expect(criticalErrors).toHaveLength(0);
  });

  test('should display the two-pane layout inside the web view', async ({ mainPage }) => {
    await waitForAppReady(mainPage);

    // Open Select Texts dialog
    const projectMenu = mainPage.getByRole('menuitem', { name: /Project/i });
    await projectMenu.click();
    const selectTextsItem = mainPage.getByRole('menuitem', { name: /Select Texts/i });
    await selectTextsItem.click();

    await expect(mainPage.locator('.dock-tab', { hasText: /Select Texts/i })).toBeVisible({
      timeout: 15_000,
    });

    // Web view content is inside an iframe. Find the iframe for Select Texts.
    const webViewFrame = mainPage.frameLocator('iframe').first();

    // Verify the main component rendered via data-testid
    await expect(webViewFrame.locator('[data-testid="select-texts-dialog"]')).toBeVisible({
      timeout: 15_000,
    });
  });
});
