/**
 * E2E scaffold checks for the Scripture Text Grid web view (PT-4049 / A1).
 *
 * Scope (what the CDP fixture can deterministically verify against a live instance):
 *
 * - The view opens as a dock tab titled "Scripture Text" (single-cell title; the count-driven flip to
 *   "Text Collection" is wired to A3's contents selector).
 * - The tab is NON-CLOSABLE: it renders no `.dock-tab-close-btn`. Because the app registers no
 *   keyboard tab-close shortcut, the absent close button covers both close paths (X + keyboard).
 *
 * There is no menu or command for this view (it ships in the PT10 Studio default layout), so the
 * test opens it directly through `window.papi.webViews.openWebView` — the renderer exposes `papi`
 * on `globalThis` via `@renderer/global-this-web-view.model`.
 *
 * NOT covered here (require an app relaunch, which the CDP fixture — connected to an
 * already-running instance — cannot do; verified manually per the plan's verification section):
 *
 * - `useWebViewState` restart-persistence across quit & relaunch.
 * - Feature-flag OFF hiding the view (registration is decided at extension activation, so it needs a
 *   relaunch with the setting pre-set).
 */
import { test, expect } from '../../fixtures/cdp.fixture';
import { waitForAppReady } from '../../fixtures/helpers';
import { closeAllNonHomeDockTabs } from './test-helpers';

const SCRIPTURE_TEXT_GRID_WEBVIEW_TYPE = 'platformScriptureEditor.scriptureTextGrid';
const SCRIPTURE_TEXT_TAB_TITLE = /^Scripture Text$/;

test.describe('Scripture Text Grid (A1 scaffold)', () => {
  test.beforeEach(async ({ mainPage }) => {
    await closeAllNonHomeDockTabs(mainPage);
  });

  test('opens as a non-closable "Scripture Text" tab', async ({ mainPage }) => {
    await waitForAppReady(mainPage);

    // No menu/command exists for this view (it comes from the default layout), so open it directly
    // through the renderer's global `papi`. `existingId: '?'` reuses an already-open instance.
    await mainPage.evaluate(async (webViewType) => {
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
      await papi.webViews.openWebView(webViewType, undefined, { existingId: '?' });
    }, SCRIPTURE_TEXT_GRID_WEBVIEW_TYPE);

    const tab = mainPage.locator('.dock-tab', { hasText: SCRIPTURE_TEXT_TAB_TITLE });
    await expect(tab).toBeVisible({ timeout: 15_000 });

    // Non-closable: the tab must render no close button (rc-dock omits it when `closable` is false).
    await expect(tab.locator('.dock-tab-close-btn')).toHaveCount(0);
  });
});
