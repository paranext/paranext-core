/**
 * E2E render smoke tests for the Select Texts dialog (UI-PKG-001) and Open Texts dialog
 * (UI-PKG-002).
 *
 * Uses cdp.fixture to connect to an already-running Platform.Bible instance. Verifies that web view
 * components render correctly inside iframes.
 *
 * Prerequisites: The app must be running with these web views already open (via session restore or
 * manual action). The tests verify rendering, not menu navigation.
 */
import { test, expect } from '../../fixtures/cdp.fixture';
import type { Page } from '@playwright/test';
import { sendPapiCommand } from '../../fixtures/helpers';

/** Filter console errors, excluding known noise */
function filterConsoleErrors(errors: string[]): string[] {
  return errors.filter(
    (e) =>
      !e.includes('DevTools') &&
      !e.includes('favicon') &&
      !e.includes('source map') &&
      !e.includes('net::ERR_') &&
      !e.includes('getSavedTextCollections') &&
      !e.includes('Failed to load saved collections') &&
      !e.includes('JSON-RPC Request error'),
  );
}

/**
 * Ensure the Select Texts web view is open. Uses PAPI command as fallback since menu interaction is
 * unreliable in headless CDP mode.
 */
async function ensureSelectTextsOpen(mainPage: Page): Promise<void> {
  // Check if the Select Texts iframe already exists
  const iframe = mainPage.locator('iframe[title="Select Texts"]').first();
  if ((await iframe.count()) > 0) return;

  // Open via PAPI command (CI-safe fallback)
  await sendPapiCommand('platformScripture.openSelectTexts');
  await mainPage.waitForTimeout(3_000);

  await expect(iframe).toBeAttached({ timeout: 15_000 });
}

/** Ensure the Open Texts web view is open. Uses PAPI command as fallback. */
async function ensureOpenTextsOpen(mainPage: Page): Promise<void> {
  // Check if the Open iframe already exists
  const iframe = mainPage.locator('iframe[title="Open"]').first();
  if ((await iframe.count()) > 0) return;

  // Open via PAPI command
  await sendPapiCommand('platformScripture.openOpenTexts');
  await mainPage.waitForTimeout(3_000);

  await expect(iframe).toBeAttached({ timeout: 15_000 });
}

test.describe('Select Texts Dialog Render Tests (UI-PKG-001)', () => {
  test('should have Select Texts iframe attached', async ({ mainPage }) => {
    await ensureSelectTextsOpen(mainPage);

    const iframe = mainPage.locator('iframe[title="Select Texts"]').first();
    await expect(iframe).toBeAttached({ timeout: 15_000 });
  });

  test('should render Select Texts component inside iframe', async ({ mainPage }) => {
    await ensureSelectTextsOpen(mainPage);

    const webViewFrame = mainPage.frameLocator('iframe[title="Select Texts"]').first();

    // Verify the main component rendered via data-testid
    await expect(webViewFrame.locator('[data-testid="select-texts-dialog"]')).toBeAttached({
      timeout: 15_000,
    });
  });

  test('should render without critical console errors', async ({ mainPage }) => {
    const consoleErrors: string[] = [];
    mainPage.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    await ensureSelectTextsOpen(mainPage);
    await mainPage.waitForTimeout(3_000);

    const criticalErrors = filterConsoleErrors(consoleErrors);
    expect(criticalErrors).toHaveLength(0);
  });
});

test.describe('Open Texts Dialog Render Tests (UI-PKG-002)', () => {
  test('should have Open Texts iframe attached', async ({ mainPage }) => {
    await ensureOpenTextsOpen(mainPage);

    const iframe = mainPage.locator('iframe[title="Open"]').first();
    await expect(iframe).toBeAttached({ timeout: 15_000 });
  });

  test('should render Open Texts component inside iframe', async ({ mainPage }) => {
    await ensureOpenTextsOpen(mainPage);

    const webViewFrame = mainPage.frameLocator('iframe[title="Open"]').first();

    // Verify the main component rendered via data-testid
    await expect(webViewFrame.locator('[data-testid="open-texts-dialog"]')).toBeAttached({
      timeout: 15_000,
    });
  });

  test('should render filter buttons and table', async ({ mainPage }) => {
    await ensureOpenTextsOpen(mainPage);

    const webViewFrame = mainPage.frameLocator('iframe[title="Open"]').first();

    // Verify filter buttons are present
    await expect(webViewFrame.locator('button.open-texts-toggle-btn').first()).toBeAttached({
      timeout: 15_000,
    });

    // Verify the data table exists
    await expect(webViewFrame.locator('.open-texts-table')).toBeAttached({ timeout: 15_000 });
  });
});
