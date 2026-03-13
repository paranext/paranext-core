import { test, expect } from '../../../fixtures/isolated.fixture';
import { waitForAppReady } from '../../../fixtures/helpers';

test.describe('Overlay Contribution Menu', () => {
  test('overlay infrastructure is present for contribution-based menus', async ({ mainPage }) => {
    await waitForAppReady(mainPage);

    // The overlay host must be mounted in the document for any overlay type to render.
    // This is a prerequisite for contribution-based menus (Phase 3 of the overlay spec).
    const overlayHost = mainPage.locator('[data-overlay-host]');
    await expect(overlayHost).toBeAttached({ timeout: 10_000 });

    // WebView iframes must exist as potential overlay requesters
    const webViewFrame = mainPage.locator('iframe[data-web-view-id]').first();
    await expect(webViewFrame).toBeVisible({ timeout: 30_000 });

    // TODO: When showContextMenuFromContribution() is implemented (Phase 3),
    // add tests that verify:
    // - Menu items are resolved from the contribution system
    // - Items from multiple extensions are aggregated into a single menu
    // - Ordering is consistent and predictable
  });
});
