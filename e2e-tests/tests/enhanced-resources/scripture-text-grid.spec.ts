/**
 * E2E scaffold checks for the Scripture Text Grid web view (PT-4049 / A1).
 *
 * Covered: the view opens as a non-closable, icon-only dock tab (located by the opened web view id,
 * since the tab has no text label) — no `.dock-tab-close-btn`, checked against a positive-control
 * tab so a class rename can't make the assertion pass vacuously. The app has no keyboard close
 * shortcut, so the missing button covers both close paths.
 *
 * There is no menu/command for this view (it ships in the PT10 Studio default layout), so the test
 * opens it directly via `window.papi.webViews.openWebView` (renderer exposes `papi` on
 * `globalThis`).
 *
 * NOT covered (need an app relaunch the CDP fixture can't do; verified manually): `useWebViewState`
 * restart-persistence, and feature-flag-OFF hiding the view (registration happens at activation).
 */
import { test, expect } from '../../fixtures/cdp.fixture';
import { waitForAppReady } from '../../fixtures/helpers';
import { closeAllNonHomeDockTabs, openEnhancedResource } from './test-helpers';

const SCRIPTURE_TEXT_GRID_WEBVIEW_TYPE = 'platformScriptureEditor.scriptureTextGrid';

test.describe('Scripture Text Grid (A1 scaffold)', () => {
  test.beforeEach(async ({ mainPage }) => {
    await closeAllNonHomeDockTabs(mainPage);
  });

  // The grid tab is non-closable, so the shared close-button sweep can't clear it, and it would leak
  // into later specs (shared instance + persisted layout). Make it closable via the renderer global
  // `updateWebViewDefinitionById`, then run the normal sweep. Best-effort: cleanup must not fail the test.
  test.afterEach(async ({ mainPage }) => {
    await mainPage
      .evaluate(async (webViewType) => {
        // The renderer exposes `papi` and `updateWebViewDefinitionById` on `globalThis`; both are
        // untyped in the Playwright context.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        const win = window as unknown as {
          papi: {
            webViews: {
              getAllOpenWebViewDefinitions: () => Promise<{ id: string; webViewType: string }[]>;
            };
          };
          updateWebViewDefinitionById: (id: string, update: { isClosable: boolean }) => unknown;
        };
        const defs = await win.papi.webViews.getAllOpenWebViewDefinitions();
        await Promise.all(
          defs
            .filter((d) => d.webViewType === webViewType)
            .map((d) => win.updateWebViewDefinitionById(d.id, { isClosable: true })),
        );
      }, SCRIPTURE_TEXT_GRID_WEBVIEW_TYPE)
      .catch(() => {
        // Ignore — cleanup is best-effort and must not fail the test.
      });
    await closeAllNonHomeDockTabs(mainPage);
  });

  test('opens as a non-closable, icon-only tab', async ({ mainPage }) => {
    await waitForAppReady(mainPage);

    // No menu/command exists for this view (it comes from the default layout), so open it directly
    // through the renderer's global `papi`. `existingId: '?'` reuses an already-open instance.
    const webViewId = await mainPage.evaluate(async (webViewType) => {
      // The renderer sets `globalThis.papi`; it is untyped in the Playwright context.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const { papi } = window as unknown as {
        papi: {
          webViews: {
            openWebView: (
              type: string,
              layout?: unknown,
              options?: { existingId?: string },
            ) => Promise<string | undefined>;
          };
        };
      };
      return papi.webViews.openWebView(webViewType, undefined, { existingId: '?' });
    }, SCRIPTURE_TEXT_GRID_WEBVIEW_TYPE);
    expect(webViewId).toBeTruthy();

    // The tab shows only an icon (no text label), so locate it by the opened web view id rather than
    // by title text. rc-dock renders each tab nav button with `data-node-key` set to the tab id
    // (which equals the web view id).
    const tab = mainPage.locator(`.dock-tab[data-node-key="${webViewId}"]`);
    await expect(tab).toBeVisible({ timeout: 15_000 });

    // Non-closable: the grid tab renders no close button (rc-dock omits it when `closable` is false).
    await expect(tab.locator('.dock-tab-close-btn')).toHaveCount(0);

    // Positive control: a bare `toHaveCount(0)` would pass vacuously if rc-dock renamed
    // `.dock-tab-close-btn`. Open a normal closable tab and confirm the SAME selector matches its
    // close button once, proving the grid tab's zero-count means "no button", not "selector broke".
    await openEnhancedResource(mainPage);
    const closableTab = mainPage.locator('.dock-tab', { hasText: /Enhanced Resource/i }).first();
    await expect(closableTab).toBeVisible({ timeout: 15_000 });
    await expect(closableTab.locator('.dock-tab-close-btn')).toHaveCount(1);

    // The grid tab is still non-closable even with a closable tab now open alongside it.
    await expect(tab.locator('.dock-tab-close-btn')).toHaveCount(0);
  });
});
