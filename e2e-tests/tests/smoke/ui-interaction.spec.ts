// SMOKE TEST ONLY — uses papi.fixture for CI smoke testing.
// Per-feature E2E tests belong in tests/isolated/ with isolated.fixture; the ones that must attach
// to an app you started live in tests/attached/ with cdp.fixture.
import { test, expect } from '../../fixtures/papi.fixture';
import {
  isLocalizedAboutMenuItem,
  waitForAppReady,
  waitForMainMenuItem,
} from '../../fixtures/helpers';

test.describe('UI Interaction', () => {
  test.beforeAll(async ({ electronApp }) => {
    // Maximize the window once so everything is visible and clickable for all tests.
    // Wait for the first window to exist before maximizing. app.fixture (via papi.fixture) pins
    // platform.interfaceLanguage to English before launch and asserts it took, so menu-item text
    // matchers (e.g. /Help/i) are deterministic without this suite forcing it again here.
    await electronApp.firstWindow({ timeout: 10_000 });
    await electronApp.evaluate(({ BrowserWindow }) => {
      BrowserWindow.getAllWindows()[0].maximize();
    });

    // The menubar's items arrive from the extension host, not the renderer, so none of
    // waitForAppReady's renderer-only signals (dock layout, window-scoped shards, first-run gate,
    // overlay) observe them being ready — see waitForMainMenuItem's docs. Wait here, once, for the
    // specific item this suite drives by name, so the Help dropdown a test opens below is never
    // mid-replacement underneath the click.
    await waitForMainMenuItem(
      isLocalizedAboutMenuItem,
      'the localized "About Platform.Bible" Help menu item',
    );
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
    // Allow 15 s: on slow CI the dock panel can take longer than 10 s to render
    // after the PAPI command fires. Playwright itself flagged this as "1 flaky"
    // in two separate main-branch runs (SHA 80130761, 4b2894ec).
    await expect(aboutTab).toBeVisible({ timeout: 15_000 });

    // Close the About tab via dispatchEvent (see comment in first test).
    const closeButton = aboutTab.locator('.dock-tab-close-btn');
    await closeButton.dispatchEvent('click');
    await expect(aboutTab).not.toBeVisible({ timeout: 10_000 });
  });

  test('should toggle theme via user profile popover', async ({ mainPage }) => {
    await waitForAppReady(mainPage);

    await expect(mainPage.locator('#theme-styles')).toHaveCount(1, { timeout: 10_000 });

    // The theme style element carries the current theme id
    const getThemeId = () =>
      mainPage.evaluate(() =>
        document.getElementById('theme-styles')?.getAttribute('data-theme-id'),
      );

    const initialThemeId = await getThemeId();
    expect(initialThemeId).toBeTruthy();

    // The standalone theme toggle button was replaced by the appearance toggle inside the
    // User Profile popover. Open the popover, pick the opposite appearance, then restore.
    const popoverTrigger = mainPage.getByTestId('user-profile-popover-trigger');
    await expect(popoverTrigger).toBeVisible({ timeout: 10_000 });
    await expect(popoverTrigger).toBeEnabled({ timeout: 10_000 });
    await popoverTrigger.scrollIntoViewIfNeeded();
    await popoverTrigger.click();

    // Choose the appearance opposite the current theme. Theme ids are derived from the theme
    // family + type (e.g. 'platform-light' / 'platform-dark'); fall back to flipping to dark
    // when we can't infer from the id.
    const initiallyLight = !(initialThemeId ?? '').toLowerCase().includes('dark');
    const flipTarget = initiallyLight ? 'dark' : 'light';
    const restoreTarget = initiallyLight ? 'light' : 'dark';

    const flipButton = mainPage.getByTestId(`user-profile-appearance-${flipTarget}`);
    await expect(flipButton).toBeVisible({ timeout: 10_000 });
    await flipButton.click();

    // Wait for theme data provider to update the stylesheet.
    // Allow 10 s: on slow CI (Windows/Linux) the data provider can take
    // longer than 5 s to propagate the change.
    await expect(async () => {
      const newThemeId = await getThemeId();
      expect(newThemeId).not.toBe(initialThemeId);
    }).toPass({ timeout: 10_000 });

    // The popover stays open after an appearance click (the handler doesn't close it), so we
    // can click the restore target without re-opening the popover.
    const restoreButton = mainPage.getByTestId(`user-profile-appearance-${restoreTarget}`);
    await expect(restoreButton).toBeVisible({ timeout: 10_000 });
    await restoreButton.click();
    // Same 10 s allowance as the flip wait above — identical propagation risk.
    await expect(async () => {
      const restoredThemeId = await getThemeId();
      expect(restoredThemeId).toBe(initialThemeId);
    }).toPass({ timeout: 10_000 });
  });

  // Smoke-level check of the top toolbar's book/chapter control. It is the first such control in
  // the DOM (the toolbar renders above the dock layout; any editor's own control lives inside an
  // iframe). We assert only its rendered + disabled state here — a fresh smoke profile opens no
  // scripture-navigable web view, so the control has nothing to navigate and is disabled. The
  // enabled/interactive flow (open an editor, search, navigate) requires a project + editor, which
  // is per-feature and belongs in the cdp-fixture verse-navigation spec, not the smoke suite.
  test('top toolbar book/chapter control renders and is disabled with no scripture web view open', async ({
    mainPage,
  }) => {
    await waitForAppReady(mainPage);

    const trigger = mainPage.locator('[aria-label="book-chapter-trigger"]').first();
    await expect(trigger).toBeVisible({ timeout: 10_000 });
    await expect(trigger).toBeDisabled();
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
