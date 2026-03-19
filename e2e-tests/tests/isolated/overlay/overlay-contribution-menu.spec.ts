import { test, expect } from '../../../fixtures/isolated.fixture';
import { waitForAppReady } from '../../../fixtures/helpers';

test.describe('Overlay Contribution Menu', () => {
  test('overlay host element is present in the DOM', async ({ mainPage }) => {
    await waitForAppReady(mainPage);

    // TODO: This test should trigger a contribution-based context menu (e.g., right-click
    // on a WebView element that has registered menu contributions) and assert that:
    // 1. The context menu overlay appears with the correct contributed menu items
    // 2. Clicking a menu item fires the associated command
    // 3. The menu dismisses after selection
    // Currently the e2e infrastructure does not support triggering contribution-based
    // context menus, so this only verifies the overlay host prerequisite exists.

    const overlayHost = mainPage.locator('[data-overlay-host]');
    await expect(overlayHost).toBeAttached({ timeout: 10_000 });

    const webViewFrame = mainPage.locator('iframe[data-web-view-id]').first();
    await expect(webViewFrame).toBeVisible({ timeout: 30_000 });
  });
});
