/**
 * Page object for the Scripture Text Grid (Text Collection) web view: opening it, its View Options
 * controls, and the project setup its specs need.
 *
 * Kept apart from `test-helpers.ts`, which holds dock and Enhanced Resource helpers, so a spec
 * reads as intent against this view and a UI change lands in one file.
 */
import { expect, FrameLocator, Locator, Page } from '@playwright/test';

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
  /** The "Grid" radio in the View Options VIEW toggle (the verse-aligned grid). */
  gridViewOption: Locator;
  /** Open View Options, switch to Chapter view, dismiss the popover. */
  switchToChapterView: () => Promise<void>;
  /** Open View Options, switch to the verse-aligned Grid view, dismiss the popover. */
  switchToGridView: () => Promise<void>;
};

/** Open (or focus) the Scripture Text Grid tab and return a page object with pre-bound locators. */
export async function openScriptureTextGrid(page: Page): Promise<ScriptureTextGrid> {
  await page.evaluate(async (webViewType) => {
    // `globalThis.papi` is set by the renderer and untyped in the Playwright context.
    // eslint-disable-next-line no-type-assertion/no-type-assertion -- Playwright page has no PAPI types
    const { papi } = window as unknown as ScriptureTextGridPapiWindow;
    await papi.webViews.openWebView(webViewType, undefined, { existingId: '?' });
  }, SCRIPTURE_TEXT_GRID_WEBVIEW_TYPE);

  const tab = page.locator('.dock-tab', { hasText: SCRIPTURE_TEXT_GRID_TAB_TITLE });
  await expect(tab).toBeVisible({ timeout: 15_000 });
  const frame = page.frameLocator(SCRIPTURE_TEXT_GRID_FRAME_SELECTOR);
  return {
    frame,
    viewOptionsButton: viewOptionsButton(frame),
    verseViewOption: verseViewOption(frame),
    chapterViewOption: chapterViewOption(frame),
    gridViewOption: gridViewOption(frame),
    cellDraggable: frame.getByTestId('scripture-text-grid-cell-draggable'),
    switchToChapterView: async () => switchToChapterView(frame),
    switchToGridView: async () => switchToGridView(frame),
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

/** The "Grid" radio in the View Options VIEW toggle — the verse-aligned grid. */
export function gridViewOption(frame: FrameLocator) {
  return frame.getByRole('radio', { name: /^Grid$/ });
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

/** Same three-step sequence as {@link switchToChapterView}, for the verse-aligned Grid view. */
export async function switchToGridView(frame: FrameLocator): Promise<void> {
  await viewOptionsButton(frame).click();
  await gridViewOption(frame).click();
  await gridBody(frame).press('Escape');
}

/**
 * Flags `resourceCount` downloaded resources into the project's text collection, opens the grid,
 * and switches it to the verse-aligned Grid view.
 *
 * The aligned specs all need the same four steps before they can assert anything, and each one is a
 * place to get the setup subtly wrong.
 *
 * @param page The main window.
 * @param projectId Admin-writable text-connection project to flag the resources into.
 * @param resourceIds Downloaded resource project ids (from `E2E_TEST_RESOURCE_IDS`).
 * @param namePrefix Display-name prefix, so a failure names the spec that flagged the resource.
 * @returns The opened grid.
 */
export async function openAlignedGridWithResources(
  page: Page,
  projectId: string,
  resourceIds: string[],
  namePrefix: string,
): Promise<ScriptureTextGrid> {
  await flagResourcesAndOpenScriptureTextGrid(
    page,
    projectId,
    resourceIds.map((id, index) => ({
      type: 'project' as const,
      name: `${namePrefix} ${index + 1}`,
      id,
      isInTextCollection: true,
    })),
  );

  const stg = await openScriptureTextGrid(page);
  await stg.switchToGridView();
  await expect(stg.frame.getByTestId('scripture-text-grid-aligned')).toBeVisible({
    timeout: 15_000,
  });
  return stg;
}
