/**
 * Smoke test for the `papi-er://` image protocol end-to-end.
 *
 * Confirms that opening the Enhanced Resources Media tab on an image-bearing verse causes at least
 * one `<img src="papi-er://images/...">` element to load successfully (browser decodes the bytes,
 * `naturalWidth > 0`). Catches the regression where the protocol service dispatched
 * `fetchImageBytes` as a `command:` instead of an `object:` network-object method, which produced
 * `No handler found` errors and broken-placeholder thumbnails.
 *
 * Scope:
 *
 * - Verifies the full chain: renderer `<img>` → main-process protocol handler →
 *   `networkService.request('object:platform.enhancedResources.fetchImageBytes', ...)` → C# data
 *   provider → image bytes → decoded `<img>`.
 * - Does NOT exercise the full marble image search-order matrix; one successfully decoded image is
 *   sufficient to prove the protocol path works.
 *
 * Frame: WebView content is hosted in `iframe[title="Enhanced Resource"]`.
 */
import { test, expect } from '../../fixtures/cdp.fixture';
import { waitForAppReady } from '../../fixtures/helpers';
import { closeAllNonHomeDockTabs, openEnhancedResource } from './test-helpers';

const ER_FRAME_SELECTOR = 'iframe[title="Enhanced Resource"]';

test.describe('Enhanced Resources Image Protocol', () => {
  test.beforeEach(async ({ mainPage }) => {
    await closeAllNonHomeDockTabs(mainPage);
  });

  // Opens ER, switches to the Media tab, and asserts at least one papi-er://images/... URL renders
  // as a successfully-decoded image (naturalWidth > 0). The default reference (John 1:14) has
  // images that match Genesis-style thumbnails in production fixtures; if the active reference has
  // no media items the assertion will fail and the test will surface that as a clearer signal than
  // a silently-broken thumbnail in manual QA.
  test('image protocol: at least one papi-er:// thumbnail loads with non-zero naturalWidth', async ({
    mainPage,
  }) => {
    await waitForAppReady(mainPage);
    await openEnhancedResource(mainPage);

    const frame = mainPage.frameLocator(ER_FRAME_SELECTOR);
    await expect(frame.getByTestId('er-scripture-pane')).toBeVisible({ timeout: 15_000 });

    // Switch to the Media tab. The Media tab loads thumbnail bytes lazily (BHV-359), so we must
    // be on the tab for any <img> elements to be created.
    await frame.getByRole('tab', { name: /^Media$/i }).click();
    await expect(frame.getByRole('tab', { name: /^Media$/i })).toHaveAttribute(
      'aria-selected',
      'true',
    );

    // Wait for at least one papi-er://images/... img to mount AND finish loading. The Media tab
    // emits one <img> per visible MediaEntryRow; if the protocol path is broken every <img> stays
    // at naturalWidth=0. Poll for naturalWidth > 0 because the actual fetch is async over IPC.
    await expect
      .poll(
        async () =>
          frame
            .locator('img')
            .evaluateAll<
              number,
              HTMLImageElement
            >((imgs) => imgs.filter((i) => i.src.startsWith('papi-er://images/') && i.naturalWidth > 0).length),
        {
          message: 'expected at least one papi-er:// image to load with naturalWidth > 0',
          timeout: 30_000,
        },
      )
      .toBeGreaterThan(0);
  });
});
