// SMOKE TEST ONLY — uses papi.fixture for CI smoke testing.
// Per-feature E2E tests MUST use cdp.fixture instead. See e2e-tests/tests/_example/.
import { test, expect } from '../../fixtures/papi.fixture';
import {
  PROCESS_READY_TIMEOUT,
  sendPapiRequestOnce,
  waitForAppReady,
  waitForPapiMethodRegistered,
} from '../../fixtures/helpers';

test.describe('UI Interaction', () => {
  // The settings service is exposed as a data-provider network object — data providers
  // append a `-data` suffix to the provider name, so the JSON-RPC method is
  // `object:<providerName>-data.set`.
  const SETTINGS_SET_METHOD = 'object:platform.settingsServiceDataProvider-data.set';
  // The settings `set` handler internally awaits `waitForResyncContributions()`,
  // which blocks until `extensionService.initialize()` finishes in the extension
  // host. On slow CI that can exceed the default 10s PAPI request timeout.
  const SLOW_CI_PAPI_TIMEOUT_MS = 30_000;
  // On slow macOS CI runners the settings data provider can take longer than the
  // default 60 s to appear in rpc.discover. Use PROCESS_READY_TIMEOUT (120 s) as
  // the upper bound; the beforeAll timeout is extended below to fit both this wait
  // and the subsequent sendPapiRequestOnce call.
  const SETTINGS_REGISTRATION_TIMEOUT_MS = PROCESS_READY_TIMEOUT;

  test.beforeAll(async ({ electronApp }) => {
    // Extend the beforeAll timeout to cover SETTINGS_REGISTRATION_TIMEOUT_MS (120 s)
    // + up to 3 sendPapiRequestOnce retries (3 × 30 s) + 2 re-poll waits (2 × 30 s)
    // + 2 sleeps (2 × 2 s) + slack → ~300 s worst case on the slowest CI runners.
    test.setTimeout(300_000);
    // Maximize the window once so everything is visible and clickable for all tests
    // Wait for the first window to exist before maximizing
    await electronApp.firstWindow({ timeout: 10_000 });
    await electronApp.evaluate(({ BrowserWindow }) => {
      BrowserWindow.getAllWindows()[0].maximize();
    });

    // Force the interface language to English so menu-item text matchers
    // (e.g. /Help/i) are deterministic regardless of the developer's saved
    // platform.interfaceLanguage setting in dev-appdata.
    // Fast-fail guard: on slow CI the settings data provider can register
    // after this beforeAll starts; this throws a clear error if it never does.
    await waitForPapiMethodRegistered(
      SETTINGS_SET_METHOD,
      undefined,
      SETTINGS_REGISTRATION_TIMEOUT_MS,
    );
    // The set handler internally awaits waitForResyncContributions(), which can
    // cause the extension host's WebSocket to close before responding on slow CI
    // ("Web socket N has closed"). Retry on that specific transient error.
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        await sendPapiRequestOnce(
          SETTINGS_SET_METHOD,
          ['platform.interfaceLanguage', ['en']],
          undefined,
          SLOW_CI_PAPI_TIMEOUT_MS,
        );
        break;
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        const isWsClose = msg.includes('Web socket') && msg.includes('has closed');
        if (!isWsClose || attempt >= 2) throw err;
        await new Promise<void>((resolve) => {
          setTimeout(resolve, 2_000);
        });
        await waitForPapiMethodRegistered(SETTINGS_SET_METHOD, undefined, SLOW_CI_PAPI_TIMEOUT_MS);
      }
    }
  });

  test('should open the About dialog from the Help menu', async ({ mainPage }) => {
    await waitForAppReady(mainPage);

    // Click the "Help" menu trigger in the menubar
    const helpMenu = mainPage.getByRole('menuitem', { name: /Help/i });
    await helpMenu.click();

    // Click "About Platform.Bible" in the dropdown
    const aboutItem = mainPage.getByRole('menuitem', { name: /About Platform\.Bible/i });
    await aboutItem.click();

    // The about dialog opens as a floating dock tab. Wait for it to appear.
    const aboutTab = mainPage.locator('.dock-tab', { hasText: /About/i });
    await expect(aboutTab).toBeVisible({ timeout: 10_000 });

    // Close the about tab. Use dispatchEvent because on small CI viewports the
    // tab may be outside the visible area of the dock tab bar, and even
    // force:true fails when the element is outside the viewport.
    const closeButton = aboutTab.locator('.dock-tab-close-btn');
    await closeButton.dispatchEvent('click');
    await expect(aboutTab).not.toBeVisible({ timeout: 10_000 });
  });

  test('should open the About dialog via PAPI command', async ({ papiClient, mainPage }) => {
    await waitForAppReady(mainPage);

    // Trigger the about dialog via PAPI
    await papiClient.sendCommand('platform.about');

    // The about dialog opens as a floating dock tab (same as Help menu path).
    const aboutTab = mainPage.locator('.dock-tab', { hasText: /About/i });
    await expect(aboutTab).toBeVisible({ timeout: 10_000 });

    // Close the About tab via dispatchEvent (see comment in first test).
    const closeButton = aboutTab.locator('.dock-tab-close-btn');
    await closeButton.dispatchEvent('click');
    await expect(aboutTab).not.toBeVisible({ timeout: 10_000 });
  });

  test('should toggle theme via toolbar button', async ({ mainPage }) => {
    await waitForAppReady(mainPage);

    await expect(mainPage.locator('#theme-styles')).toHaveCount(1, { timeout: 10_000 });

    // The theme style element carries the current theme id
    const getThemeId = () =>
      mainPage.evaluate(() =>
        document.getElementById('theme-styles')?.getAttribute('data-theme-id'),
      );

    const initialThemeId = await getThemeId();
    expect(initialThemeId).toBeTruthy();

    const themeButton = mainPage.getByTestId('theme-toggle');
    await expect(themeButton).toBeVisible({ timeout: 10_000 });
    await expect(themeButton).toBeEnabled({ timeout: 10_000 });
    await themeButton.scrollIntoViewIfNeeded();
    await themeButton.click();

    // Wait for theme data provider to update the stylesheet
    await expect(async () => {
      const newThemeId = await getThemeId();
      expect(newThemeId).not.toBe(initialThemeId);
    }).toPass({ timeout: 5_000 });

    // Toggle back to restore the original theme for subsequent tests
    await themeButton.click();
    await expect(async () => {
      const restoredThemeId = await getThemeId();
      expect(restoredThemeId).toBe(initialThemeId);
    }).toPass({ timeout: 5_000 });
  });

  test('should have a functional toolbar with book/chapter control', async ({ mainPage }) => {
    await waitForAppReady(mainPage);

    // The trigger button opens a popover with the book search input inside
    const trigger = mainPage.locator('[aria-label="book-chapter-trigger"]');
    await expect(trigger).toBeVisible({ timeout: 10_000 });
    await trigger.click();

    // After the popover opens, a CommandInput (actual <input>) appears inside
    const commandInput = mainPage.locator('[data-radix-popper-content-wrapper] input');
    await expect(commandInput).toBeVisible({ timeout: 5_000 });
    await commandInput.fill('Gen');

    // A list of matching books should appear
    const listItem = mainPage.locator('[cmdk-item]');
    await expect(listItem.first()).toBeVisible({ timeout: 5_000 });

    // Close the popover to avoid leaking UI state into later tests
    await mainPage.keyboard.press('Escape');
    await expect(commandInput).not.toBeVisible({ timeout: 5_000 });
  });

  test('should open Settings from the menu', async ({ papiClient, mainPage }) => {
    await waitForAppReady(mainPage);

    // Open settings via PAPI command
    await papiClient.sendCommand('platform.openSettings');

    // Settings opens as a new tab in the dock layout
    const settingsTab = mainPage.locator('.dock-tab', { hasText: /Settings/i });
    await expect(settingsTab).toBeVisible({ timeout: 10_000 });

    // Close the Settings tab via dispatchEvent (see comment in first test).
    const closeButton = settingsTab.locator('.dock-tab-close-btn');
    await closeButton.dispatchEvent('click');
    await expect(settingsTab).not.toBeVisible({ timeout: 10_000 });
  });
});
