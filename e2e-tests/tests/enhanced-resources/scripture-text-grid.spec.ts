/**
 * E2E scaffold checks for the Scripture Text Grid web view (PT-4049 / A1).
 *
 * Covered: the view opens as a non-closable dock tab titled "Scripture Text" — no
 * `.dock-tab-close-btn`, checked against a positive-control tab so a class rename can't make the
 * assertion pass vacuously. The app has no keyboard close shortcut, so the missing button covers
 * both close paths.
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
const SCRIPTURE_TEXT_TAB_TITLE = /^Scripture text$/;

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

// ---------------------------------------------------------------------------
// A4 (PT-4052) — ScriptureTextGrid renderer (chapter-first).
//
// Honest runnability: there is NO dev-fixture plumbing for web-view content (a web view is a
// renderer iframe with no injected env), and the grid needs real flagged resources. So only
// non-negotiable #1 is scripted to run, and only when E2E_TEST_PROJECT_ID names an editable admin
// project — mirroring the A2 shown-by-default spec's real-data pattern. It flags a Bible-text ref
// via papi, opens the grid, and asserts the row renders a gridcell (offline state is fine — the
// point of #1 is "no blank-out"). RTL row reversal, frame budget, scrRef-sync, and partial-failure
// need harness support this CDP fixture lacks (UI-locale switching, >=5 real resources with USJ,
// controlled per-cell failure), so they are `test.fixme` with reasons — DEFERRED at PR merge.
// ---------------------------------------------------------------------------
const A4_TEST_PROJECT_ID = process.env.E2E_TEST_PROJECT_ID ?? '';

test.describe('Scripture Text Grid renderer (A4)', () => {
  test.beforeEach(async ({ mainPage }) => {
    await closeAllNonHomeDockTabs(mainPage);
  });

  test('non-negotiable #1: a shown resource renders a gridcell (no blank-out, no empty toolbar)', async ({
    mainPage,
  }) => {
    test.skip(
      !A4_TEST_PROJECT_ID,
      'No editable admin test project configured for this run (set E2E_TEST_PROJECT_ID)',
    );
    await waitForAppReady(mainPage);

    // Admin flags one Bible-text ref shown-by-default, then seeds the per-user overlay to match, so
    // the A3 selector includes it. A synthetic id is fine here: an unresolvable id renders the
    // cell's OFFLINE state, which still proves the row renders a cell (no blank-out) — the point of
    // non-negotiable #1. Then open the grid (`existingId: '?'` reuses the default-layout instance).
    await mainPage.evaluate(
      async ({ projectId, webViewType }) => {
        // The renderer sets `globalThis.papi`; it is untyped in the Playwright context.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        const { papi } = window as unknown as {
          papi: {
            projectDataProviders: {
              get: (
                pdpType: string,
                id: string,
              ) => Promise<{
                setSetting: (key: string, value: unknown) => Promise<boolean>;
                resetShownByDefaultOverlay: () => Promise<boolean>;
                initializeShownByDefaultOverlay: () => Promise<boolean>;
              }>;
            };
            webViews: {
              openWebView: (
                type: string,
                layout?: unknown,
                options?: { existingId?: string },
              ) => Promise<string | undefined>;
            };
          };
        };
        const pdp = await papi.projectDataProviders.get(
          'platformScripture.textConnectionSettings',
          projectId,
        );
        await pdp.setSetting('platformScripture.modelTexts', {
          dataVersion: '1.1.0',
          items: [
            {
              type: 'project',
              name: 'STG A4 smoke',
              id: 'aabbccddeeff00112233',
              isResourceShownByDefault: true,
            },
          ],
        });
        await pdp.resetShownByDefaultOverlay();
        await pdp.initializeShownByDefaultOverlay();
        await papi.webViews.openWebView(webViewType, undefined, { existingId: '?' });
      },
      { projectId: A4_TEST_PROJECT_ID, webViewType: SCRIPTURE_TEXT_GRID_WEBVIEW_TYPE },
    );

    const tab = mainPage.locator('.dock-tab', { hasText: SCRIPTURE_TEXT_TAB_TITLE });
    await expect(tab).toBeVisible({ timeout: 15_000 });

    // Web-view content lives in an iframe titled with the (single-cell) grid tab title.
    const frame = mainPage.frameLocator('iframe[title="Scripture text"]');
    // The row structure renders...
    await expect(frame.locator('[role="grid"]')).toBeVisible({ timeout: 15_000 });
    // ...with at least one cell (ready or offline — never a blank pane): non-negotiable #1.
    await expect(frame.locator('[role="gridcell"]').first()).toBeVisible({ timeout: 15_000 });
    // No empty top toolbar: this web view renders no toolbar by construction; assert none leaked in.
    await expect(frame.locator('[role="toolbar"]')).toHaveCount(0);
  });

  test.fixme(
    'RTL: an RTL UI locale reverses the row via logical properties — needs UI-locale switching in the CDP harness',
    async () => {},
  );
  test.fixme(
    'frame budget: >=5 shown resources at MAT 5:3 render under threshold (re-baselined for full chapters) — needs >=5 real resources',
    async () => {},
  );
  test.fixme(
    'scrRef sync: changing the reference navigates every cell; a missing verse in one resource does not blank the others — needs multiple real resources',
    async () => {},
  );
  test.fixme(
    'partial-failure: 3 shown, 1 fails -> 2 render chapters, 1 shows the offline label — needs controlled per-cell failure',
    async () => {},
  );
});
