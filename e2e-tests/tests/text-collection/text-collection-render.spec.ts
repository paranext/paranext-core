/**
 * E2E render smoke tests for the Select Texts dialog (UI-PKG-001) and Open Texts dialog
 * (UI-PKG-002).
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

/**
 * Open the Select Texts dialog via the Platform menu. If the tab is already visible (e.g. from a
 * previous test or manual interaction), skip navigation.
 */
async function openSelectTextsDialog(mainPage: import('@playwright/test').Page): Promise<void> {
  const tab = mainPage.locator('.dock-tab', { hasText: /Select Texts/i });

  // If the tab is already visible, no need to navigate
  if (await tab.isVisible().catch(() => false)) return;

  // Click the "Platform" top-level menu trigger
  const platformMenu = mainPage.getByRole('menuitem', { name: /Platform/i });
  await platformMenu.click();

  // Click the "Select Texts..." menu entry
  const selectTextsItem = mainPage.getByRole('menuitem', { name: /Select Texts/i });
  await selectTextsItem.click();

  // Wait for the tab to appear
  await expect(tab).toBeVisible({ timeout: 15_000 });
}

test.describe('Select Texts Dialog Render Tests', () => {
  test('should open Select Texts dialog via Platform menu', async ({ mainPage }) => {
    await waitForAppReady(mainPage);
    await openSelectTextsDialog(mainPage);

    // Verify the dialog opened (dock tab appeared)
    const tab = mainPage.locator('.dock-tab', { hasText: /Select Texts/i });
    await expect(tab).toBeVisible({ timeout: 15_000 });
  });

  test('should render without console errors', async ({ mainPage }) => {
    await waitForAppReady(mainPage);
    const consoleErrors: string[] = [];
    mainPage.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    await openSelectTextsDialog(mainPage);

    // Give the web view a moment to fully render (content loads async via PAPI)
    await mainPage.waitForTimeout(3_000);

    // Check for critical console errors (filter known noise)
    const criticalErrors = filterConsoleErrors(consoleErrors);
    expect(criticalErrors).toHaveLength(0);
  });

  test('should display the two-pane layout inside the web view', async ({ mainPage }) => {
    await waitForAppReady(mainPage);
    await openSelectTextsDialog(mainPage);

    // Web view content is inside an iframe titled "Select Texts"
    const webViewFrame = mainPage.frameLocator('iframe[title="Select Texts"]');

    // Verify the main component rendered via data-testid
    await expect(webViewFrame.locator('[data-testid="select-texts-dialog"]')).toBeVisible({
      timeout: 15_000,
    });
  });
});

/** Open the Open Texts dialog via the Platform menu. If the tab is already visible, skip navigation. */
async function openOpenTextsDialog(mainPage: import('@playwright/test').Page): Promise<void> {
  const tab = mainPage.locator('.dock-tab', { hasText: /^Open$/i });

  // If the tab is already visible, no need to navigate
  if (await tab.isVisible().catch(() => false)) return;

  // Click the "Platform" top-level menu trigger
  const platformMenu = mainPage.getByRole('menuitem', { name: /Platform/i });
  await platformMenu.click();

  // Click the "Open..." menu entry
  const openTextsItem = mainPage.getByRole('menuitem', { name: /Open\.\.\./i });
  await openTextsItem.click();

  // Wait for the tab to appear
  await expect(tab).toBeVisible({ timeout: 15_000 });
}

test.describe('Open Texts Dialog Render Tests (UI-PKG-002)', () => {
  test('should open Open Texts dialog via Platform menu', async ({ mainPage }) => {
    await waitForAppReady(mainPage);
    await openOpenTextsDialog(mainPage);

    // Verify the dialog opened (dock tab appeared)
    const tab = mainPage.locator('.dock-tab', { hasText: /^Open$/i });
    await expect(tab).toBeVisible({ timeout: 15_000 });
  });

  test('should render Open Texts dialog without console errors', async ({ mainPage }) => {
    await waitForAppReady(mainPage);
    const consoleErrors: string[] = [];
    mainPage.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    await openOpenTextsDialog(mainPage);

    // Give the web view a moment to fully render
    await mainPage.waitForTimeout(3_000);

    // Check for critical console errors
    const criticalErrors = filterConsoleErrors(consoleErrors);
    expect(criticalErrors).toHaveLength(0);
  });

  test('should display the Open Texts dialog content inside the web view', async ({ mainPage }) => {
    await waitForAppReady(mainPage);
    await openOpenTextsDialog(mainPage);

    // Web view content is inside an iframe titled "Open"
    const webViewFrame = mainPage.frameLocator('iframe[title="Open"]');

    // Verify the main component rendered via data-testid
    await expect(webViewFrame.locator('[data-testid="open-texts-dialog"]')).toBeVisible({
      timeout: 15_000,
    });
  });
});
