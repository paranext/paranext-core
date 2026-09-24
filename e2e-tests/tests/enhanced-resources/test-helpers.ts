import { expect, FrameLocator, Locator, Page } from '@playwright/test';

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
export const SCRIPTURE_TEXT_GRID_TAB_TITLE = /^Text Collection$/;
export const SCRIPTURE_TEXT_GRID_FRAME_SELECTOR = 'iframe[title="Text Collection"]';

/**
 * The admin project setting the Text Collection grid builds its cells from: its
 * `isInTextCollection`-flagged items seed the per-user overlay (`initializeTextCollectionOverlay`)
 * and are what the grid renders (`useTextCollectionSources`). `platformScripture.modelTexts` is not
 * part of the text collection, so seeding it shows nothing.
 */
const REFERENCED_PROJECTS_AND_RESOURCES_SETTING =
  'platformScripture.referencedProjectsAndResources';

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
        options?: { existingId?: string; projectId?: string },
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
  referencedProjectsAndResources: unknown;
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
 * Write `items` as the project's `platformScripture.referencedProjectsAndResources` list, reset the
 * current user's text-collection overlay and cell order, re-initialize the overlay from that list,
 * and open the Scripture Text Grid web view bound to the project.
 *
 * Remembers the list's previous value for {@link restoreScriptureTextGridProjectSettings}, and
 * writes it back itself if any step here throws.
 */
export async function flagResourcesAndOpenScriptureTextGrid(
  page: Page,
  projectId: string,
  items: FlaggedResourceItem[],
): Promise<void> {
  scriptureTextGridRestorePayload = await page.evaluate(
    async ({ testProjectId, referencedItems, webViewType, settingKey }) => {
      // `globalThis.papi` is set by the renderer and untyped in the Playwright context.
      // eslint-disable-next-line no-type-assertion/no-type-assertion -- Playwright page has no PAPI types
      const { papi } = window as unknown as ScriptureTextGridPapiWindow;
      const pdp = await papi.projectDataProviders.get(
        'platformScripture.textConnectionSettings',
        testProjectId,
      );
      const originalReferenced = await pdp.getSetting(settingKey);

      try {
        await pdp.setSetting(settingKey, {
          dataVersion: '1.1.0',
          items: referencedItems,
        });
        await pdp.resetTextCollectionOverlay();
        await pdp.resetCellOrder();
        await pdp.initializeTextCollectionOverlay();
        await papi.webViews.openWebView(webViewType, undefined, {
          existingId: '?',
          projectId: testProjectId,
        });
        return { projectId: testProjectId, referencedProjectsAndResources: originalReferenced };
      } catch (error) {
        await pdp.setSetting(settingKey, originalReferenced);
        await pdp.resetTextCollectionOverlay();
        await pdp.resetCellOrder();
        throw error;
      }
    },
    {
      testProjectId: projectId,
      referencedItems: items,
      webViewType: SCRIPTURE_TEXT_GRID_WEBVIEW_TYPE,
      settingKey: REFERENCED_PROJECTS_AND_RESOURCES_SETTING,
    },
  );
}

/**
 * Best-effort restore after {@link flagResourcesAndOpenScriptureTextGrid}: writes back the project's
 * previous `platformScripture.referencedProjectsAndResources` list and resets the current user's
 * text-collection overlay and cell order.
 */
export async function restoreScriptureTextGridProjectSettings(page: Page): Promise<void> {
  const restore = scriptureTextGridRestorePayload;
  if (!restore) return;

  await page
    .evaluate(
      async ({ payload, webViewType, settingKey }) => {
        // `globalThis.papi` is set by the renderer and untyped in the Playwright context.
        // eslint-disable-next-line no-type-assertion/no-type-assertion -- Playwright page has no PAPI types
        const { papi } = window as unknown as ScriptureTextGridPapiWindow;
        const pdp = await papi.projectDataProviders.get(
          'platformScripture.textConnectionSettings',
          payload.projectId,
        );
        await pdp.setSetting(settingKey, payload.referencedProjectsAndResources);
        await pdp.resetTextCollectionOverlay();
        await pdp.resetCellOrder();
        await papi.webViews.openWebView(webViewType, undefined, {
          existingId: '?',
          projectId: payload.projectId,
        });
      },
      {
        payload: restore,
        webViewType: SCRIPTURE_TEXT_GRID_WEBVIEW_TYPE,
        settingKey: REFERENCED_PROJECTS_AND_RESOURCES_SETTING,
      },
    )
    .catch(() => {
      // Ignore — cleanup is best-effort.
    });

  scriptureTextGridRestorePayload = undefined;
}

/**
 * Pre-bound locators and actions for the Scripture Text Grid iframe.
 *
 * Obtain one by calling `openScriptureTextGrid`. Use `stg.frame` for selectors not covered by the
 * named locators below.
 */
export type ScriptureTextGrid = {
  /** Raw FrameLocator — use for selectors not covered by the named locators below. */
  frame: FrameLocator;
  /** The "View Options" icon button in the grid header. */
  viewOptionsButton: Locator;
  /** The "Verse" radio in the View Options VIEW toggle. */
  verseViewOption: Locator;
  /** The "Chapter" radio in the View Options VIEW toggle. */
  chapterViewOption: Locator;
  /** The draggable cell wrappers (`data-testid="scripture-text-grid-cell-draggable"`). */
  cellDraggable: Locator;
  /** Open View Options, switch to Chapter view, dismiss the popover. */
  switchToChapterView: () => Promise<void>;
};

/**
 * Open (or focus) the Scripture Text Grid tab and return a page object with pre-bound locators.
 *
 * @param projectId The project to bind the grid to. Required whenever the grid is opened fresh (no
 *   editor is open for `useTextCollectionProjectId` to fall back to) — pass the same id used to
 *   seed its referenced projects and resources, or the grid renders empty.
 */
export async function openScriptureTextGrid(
  page: Page,
  projectId?: string,
): Promise<ScriptureTextGrid> {
  await page.evaluate(
    async ({ webViewType, gridProjectId }) => {
      // `globalThis.papi` is set by the renderer and untyped in the Playwright context.
      // eslint-disable-next-line no-type-assertion/no-type-assertion -- Playwright page has no PAPI types
      const { papi } = window as unknown as ScriptureTextGridPapiWindow;
      await papi.webViews.openWebView(webViewType, undefined, {
        existingId: '?',
        projectId: gridProjectId,
      });
    },
    { webViewType: SCRIPTURE_TEXT_GRID_WEBVIEW_TYPE, gridProjectId: projectId },
  );

  const tab = page.locator('.dock-tab', { hasText: SCRIPTURE_TEXT_GRID_TAB_TITLE });
  await expect(tab).toBeVisible({ timeout: 15_000 });
  const frame = page.frameLocator(SCRIPTURE_TEXT_GRID_FRAME_SELECTOR);
  return {
    frame,
    viewOptionsButton: viewOptionsButton(frame),
    verseViewOption: verseViewOption(frame),
    chapterViewOption: chapterViewOption(frame),
    cellDraggable: frame.getByTestId('scripture-text-grid-cell-draggable'),
    switchToChapterView: async () => switchToChapterView(frame),
  };
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
 * The content zoom area of one resource's row or column, read off the zoom scope the grid puts on
 * the container (`resource-<id>`, or `text-collection` for an id that yields none).
 */
export async function readResourceZoomArea(resourceContainer: Locator): Promise<string> {
  const areaId = await resourceContainer.getAttribute('data-platform-content-zoom-scope');
  if (!areaId) throw new Error('Resource container carries no zoom scope');
  return areaId;
}

/** The name a resource's text is labelled with for the zoom indicator (its cell label). */
export async function readResourceZoomLabel(resourceContainer: Locator): Promise<string> {
  const label = await resourceContainer
    .locator('[data-platform-content-zoom-label]')
    .first()
    .getAttribute('data-platform-content-zoom-label');
  if (!label) throw new Error('Resource text carries no zoom label');
  return label;
}

/** Right-clicks a resource's text and returns the cell's own menu once it is open. */
export async function openCellContextMenu(
  frame: FrameLocator,
  resourceContainer: Locator,
): Promise<Locator> {
  await resourceContainer
    .locator('[data-platform-content-zoom-root]')
    .first()
    .click({ button: 'right' });
  const menu = frame.getByRole('menu');
  await expect(menu).toBeVisible();
  return menu;
}

/**
 * Opens the "⋮" zoom options menu in a chapter-view column's header (it is revealed on hover) and
 * returns the menu once it is open.
 */
export async function openChapterViewZoomOptions(
  frame: FrameLocator,
  column: Locator,
  resourceName: string,
): Promise<Locator> {
  await column.hover();
  await column.getByRole('button', { name: `Zoom options for ${resourceName}` }).click();
  const menu = frame.getByRole('menu');
  await expect(menu).toBeVisible();
  return menu;
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
