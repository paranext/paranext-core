/**
 * E2E checks for the Scripture Text Grid's View Options panel (PT-4053).
 *
 * Covered: opening the panel from the header icon button shows the expected controls — the VIEW
 * toggle with Verse active and Chapter enabled, the TEXTS section, and the Get Resources button.
 * The panel renders these controls without a bound project (the TEXTS list is simply empty), so
 * this does not depend on project fixtures.
 *
 * The test opens the grid directly via `window.papi.webViews.openWebView` and addresses the web
 * view iframe by its `data-web-view-id`, which identifies this instance whatever the tab shows.
 *
 * NOT covered here (needs an app relaunch the CDP fixture can't do, plus resource fixtures;
 * verified manually): the user-scope round-trip — add via Get Resources, hover-✕ to remove, uncheck
 * an admin entry, restart, and assert the per-user state (added present, removed stays removed,
 * admin entry stays in the top section) persists.
 */
import { Page } from '@playwright/test';
import { test, expect } from '../../fixtures/enhanced-resources.fixture';
import { waitForAppReady } from '../../fixtures/helpers';
import { closeAllNonHomeDockTabs } from './test-helpers';
import { chapterViewOption, verseViewOption, viewOptionsButton } from './scripture-text-grid.page';

const SCRIPTURE_TEXT_GRID_WEBVIEW_TYPE = 'platformScriptureEditor.scriptureTextGrid';

/** Opens the grid (reusing any existing instance) and returns its web view id. */
async function openScriptureTextGrid(page: Page): Promise<string> {
  const webViewId = await page.evaluate(async (webViewType) => {
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
  // `webViewId` is truthy per the assertion above.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return webViewId as string;
}

test.describe('Scripture Text Grid — View Options panel', () => {
  test.beforeEach(async ({ mainPage }) => {
    await closeAllNonHomeDockTabs(mainPage);
  });

  // Close the grid so it does not leak into later specs (shared app, persisted layout).
  test.afterEach(async ({ mainPage }) => {
    await closeAllNonHomeDockTabs(mainPage);
  });

  test('opens with the VIEW toggle, TEXTS section, and Get Resources button', async ({
    mainPage,
  }) => {
    await waitForAppReady(mainPage);

    const webViewId = await openScriptureTextGrid(mainPage);
    const grid = mainPage.frameLocator(`iframe[data-web-view-id="${webViewId}"]`);

    // Open the popover from the header View Options icon button (aria-label is localized to English
    // in the test locale).
    await viewOptionsButton(grid).click();

    // VIEW toggle: Verse is the active option; Chapter is enabled, so no "not yet available" hint
    // renders.
    const verse = verseViewOption(grid);
    const chapter = chapterViewOption(grid);
    await expect(verse).toBeVisible({ timeout: 15_000 });
    await expect(verse).toHaveAttribute('data-state', 'on');
    await expect(chapter).toBeEnabled();
    await expect(grid.getByText('Chapter view is not yet available')).toHaveCount(0);
    await expect(grid.getByText('Coming soon')).toHaveCount(0);

    // TEXTS section header and the Get Resources button are always present (the list itself is empty
    // without a bound project). Get Resources also stays enabled without one: browsing and
    // installing resources needs no project, so only the controls that persist to a text collection
    // are disabled.
    await expect(grid.getByText('Texts')).toBeVisible();
    await expect(grid.getByRole('button', { name: 'Get resources…' })).toBeEnabled();
  });
});
