import { expect, FrameLocator, Page } from '@playwright/test';

/**
 * Close every dock tab whose title is not "Home" so each test starts from a clean dock state.
 * Platform.Bible persists dock layout across sessions; stale tabs from prior runs cause cross-test
 * pollution.
 *
 * Closes one tab at a time because the locator's match set mutates as tabs disappear — the next
 * iteration must observe the post-close DOM before deciding whether to keep going. Parallelising
 * would race the count() against pending close transitions.
 */
export async function closeAllNonHomeDockTabs(page: Page): Promise<void> {
  const staleCloseBtn = page
    .locator('.dock-tab')
    .filter({ hasNotText: 'Home' })
    .locator('.dock-tab-close-btn');
  // Sequential awaits are intentional — see jsdoc above.
  /* eslint-disable no-await-in-loop */
  while ((await staleCloseBtn.count()) > 0) {
    await staleCloseBtn.first().dispatchEvent('click');
    await page.waitForTimeout(500);
  }
  /* eslint-enable no-await-in-loop */
}

/** WebView iframe selector for Enhanced Resource. */
export const ER_FRAME_SELECTOR = 'iframe[title="Enhanced Resource"]';

export const SCRIPTURE_TEXT_GRID_WEBVIEW_TYPE = 'platformScriptureEditor.scriptureTextGrid';
export const SCRIPTURE_TEXT_GRID_TAB_TITLE = /^Scripture text$/;
export const SCRIPTURE_TEXT_GRID_FRAME_SELECTOR = 'iframe[title="Scripture text"]';

/** Narrow PAPI slice used by Scripture Text Grid e2e helpers. */
export type ScriptureTextGridPapiWindow = {
  papi: {
    projectLookup: {
      getMetadataForAllProjects: () => Promise<{ id: string; projectInterfaces?: string[] }[]>;
    };
    projectDataProviders: {
      get: (
        pdpType: string,
        projectId: string,
      ) => Promise<{
        setSetting: (key: string, value: unknown) => Promise<boolean>;
        getSetting: (key: string) => Promise<{ items: unknown[] }>;
        canUserWriteProjectTextConnectionSettings: () => Promise<boolean>;
        resetTextCollectionOverlay: () => Promise<boolean>;
        resetCellOrder: () => Promise<boolean>;
        initializeTextCollectionOverlay: () => Promise<boolean>;
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

export type FlaggedResourceItem = {
  type: 'project';
  name: string;
  id: string;
  isInTextCollection: boolean;
};

type ScriptureTextGridRestorePayload = {
  projectId: string;
  modelTexts: unknown;
};

/** Module-scoped restore payload set by `flagResourcesAndOpenScriptureTextGrid`. */
let scriptureTextGridRestorePayload: ScriptureTextGridRestorePayload | undefined;

/** Discover an admin-writable text-connection project, optionally pinned by env var. */
export async function discoverAdminTextConnectionProject(
  page: Page,
  preferredProjectId = process.env.E2E_TEST_PROJECT_ID ?? '',
): Promise<string> {
  return page.evaluate(async (preferredId) => {
    // `globalThis.papi` is set by the renderer and untyped in the Playwright context.
    // eslint-disable-next-line no-type-assertion/no-type-assertion -- Playwright page has no PAPI types
    const { papi } = window as unknown as ScriptureTextGridPapiWindow;
    if (preferredId) return preferredId;

    const allProjects = await papi.projectLookup.getMetadataForAllProjects();
    const candidates = allProjects.filter((project) =>
      project.projectInterfaces?.includes('platformScripture.textConnectionSettings'),
    );
    const adminChecks = await Promise.all(
      candidates.map(async (candidate) => {
        try {
          const pdp = await papi.projectDataProviders.get(
            'platformScripture.textConnectionSettings',
            candidate.id,
          );
          return (await pdp.canUserWriteProjectTextConnectionSettings()) ? candidate.id : undefined;
        } catch {
          return undefined;
        }
      }),
    );
    return adminChecks.find((id) => id) ?? '';
  }, preferredProjectId);
}

/**
 * Flag resources text-collection, seed the overlay, and open the Scripture Text Grid web view.
 * Restores the project's pre-test settings in a `finally` block.
 */
export async function flagResourcesAndOpenScriptureTextGrid(
  page: Page,
  projectId: string,
  items: FlaggedResourceItem[],
): Promise<void> {
  scriptureTextGridRestorePayload = await page.evaluate(
    async ({ testProjectId, modelItems, webViewType }) => {
      // `globalThis.papi` is set by the renderer and untyped in the Playwright context.
      // eslint-disable-next-line no-type-assertion/no-type-assertion -- Playwright page has no PAPI types
      const { papi } = window as unknown as ScriptureTextGridPapiWindow;
      const pdp = await papi.projectDataProviders.get(
        'platformScripture.textConnectionSettings',
        testProjectId,
      );
      const originalModelTexts = await pdp.getSetting('platformScripture.modelTexts');

      try {
        await pdp.setSetting('platformScripture.modelTexts', {
          dataVersion: '1.1.0',
          items: modelItems,
        });
        await pdp.resetTextCollectionOverlay();
        await pdp.resetCellOrder();
        await pdp.initializeTextCollectionOverlay();
        await papi.webViews.openWebView(webViewType, undefined, { existingId: '?' });
        return { projectId: testProjectId, modelTexts: originalModelTexts };
      } catch (error) {
        await pdp.setSetting('platformScripture.modelTexts', originalModelTexts);
        await pdp.resetTextCollectionOverlay();
        await pdp.resetCellOrder();
        throw error;
      }
    },
    { testProjectId: projectId, modelItems: items, webViewType: SCRIPTURE_TEXT_GRID_WEBVIEW_TYPE },
  );
}

/** Best-effort restore for specs that mutate modelTexts. */
export async function restoreScriptureTextGridProjectSettings(page: Page): Promise<void> {
  const restore = scriptureTextGridRestorePayload;
  if (!restore) return;

  await page
    .evaluate(
      async ({ payload, webViewType }) => {
        // `globalThis.papi` is set by the renderer and untyped in the Playwright context.
        // eslint-disable-next-line no-type-assertion/no-type-assertion -- Playwright page has no PAPI types
        const { papi } = window as unknown as ScriptureTextGridPapiWindow;
        const pdp = await papi.projectDataProviders.get(
          'platformScripture.textConnectionSettings',
          payload.projectId,
        );
        await pdp.setSetting('platformScripture.modelTexts', payload.modelTexts);
        await pdp.resetTextCollectionOverlay();
        await pdp.resetCellOrder();
        await papi.webViews.openWebView(webViewType, undefined, { existingId: '?' });
      },
      { payload: restore, webViewType: SCRIPTURE_TEXT_GRID_WEBVIEW_TYPE },
    )
    .catch(() => {
      // Ignore — cleanup is best-effort.
    });

  scriptureTextGridRestorePayload = undefined;
}

/** Open (or focus) the Scripture Text Grid tab and return its iframe locator. */
export async function openScriptureTextGrid(page: Page) {
  await page.evaluate(async (webViewType) => {
    // `globalThis.papi` is set by the renderer and untyped in the Playwright context.
    // eslint-disable-next-line no-type-assertion/no-type-assertion -- Playwright page has no PAPI types
    const { papi } = window as unknown as ScriptureTextGridPapiWindow;
    await papi.webViews.openWebView(webViewType, undefined, { existingId: '?' });
  }, SCRIPTURE_TEXT_GRID_WEBVIEW_TYPE);

  const tab = page.locator('.dock-tab', { hasText: SCRIPTURE_TEXT_GRID_TAB_TITLE });
  await expect(tab).toBeVisible({ timeout: 15_000 });
  return page.frameLocator(SCRIPTURE_TEXT_GRID_FRAME_SELECTOR);
}

// --- View Options panel locators/actions --------------------------------------------------------
// Small helpers over the grid iframe so specs read intent-first and a label change (e.g. sentence-
// casing "View Options") is a one-line edit here instead of a find-and-replace across every spec.

/** The header "View Options" icon button inside the grid iframe. */
export function viewOptionsButton(frame: FrameLocator) {
  return frame.getByRole('button', { name: 'View Options' });
}

/** The "Verse" radio in the View Options VIEW toggle. */
export function verseViewOption(frame: FrameLocator) {
  return frame.getByRole('radio', { name: 'Verse' });
}

/** The "Chapter" radio in the View Options VIEW toggle. */
export function chapterViewOption(frame: FrameLocator) {
  return frame.getByRole('radio', { name: /Chapter/ });
}

/** The grid body — a neutral whitespace target to press Escape on and dismiss the popover. */
export function gridBody(frame: FrameLocator) {
  return frame.locator('body');
}

/**
 * Open the View Options popover, switch the grid to Chapter view, and dismiss the popover so it
 * does not overlay the grid body. Bundles the three-step sequence the chapter-mode specs all
 * repeat.
 */
export async function switchToChapterView(frame: FrameLocator): Promise<void> {
  await viewOptionsButton(frame).click();
  await chapterViewOption(frame).click();
  await gridBody(frame).press('Escape');
}

/**
 * Open an Enhanced Resource window via the Platform menu and wait for the iframe to be ready.
 *
 * The hardcoded ESV16UK+ default in main.ts (TODO(GAP-001)) means the menu click opens the resource
 * directly — no picker dialog. The MarbleGuide tutorial may auto-show on the first ER open per
 * session (BHV-461 / TS-067). When `dismissGuide` is true (default), this helper closes the guide
 * if it appears so subsequent assertions on the scripture pane are not blocked by the modal.
 */
export async function openEnhancedResource(
  page: Page,
  options: { dismissGuide?: boolean } = {},
): Promise<void> {
  const { dismissGuide = true } = options;
  await page.getByRole('menuitem', { name: /^Platform$/i }).click();
  await page.getByRole('menuitem', { name: /^Open Enhanced Resource$/i }).click();
  await expect(page.locator('.dock-tab', { hasText: /Enhanced Resource/i }).first()).toBeVisible({
    timeout: 15_000,
  });
  if (dismissGuide) {
    await dismissMarbleGuideIfShown(page);
  }
}

/**
 * If the MarbleGuide tutorial Dialog is visible, click its Close button so subsequent assertions on
 * the scripture pane are not blocked by `aria-hidden="true"` siblings.
 *
 * This is a no-op if the guide is not shown — only the first ER open per session triggers it.
 */
export async function dismissMarbleGuideIfShown(page: Page): Promise<void> {
  const frame = page.frameLocator(ER_FRAME_SELECTOR);
  const close = frame.getByTestId('marble-guide-close');
  // Wait briefly for the guide to appear, then close it. Use a short timeout because in most tests
  // the guide is NOT shown (already dismissed earlier this session).
  if (await close.isVisible({ timeout: 1_000 }).catch(() => false)) {
    await close.click();
    await expect(close).toBeHidden({ timeout: 5_000 });
  }
}
