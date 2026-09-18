/**
 * E2E for Enhanced Resources' three content-zoom areas: the Bible text (the view's unnamed `main`
 * area), the entries panel (`entries` — dictionary / encyclopedia / images / maps), and the
 * footnotes list (`footnotes`, shown only when F7 is on). Each pane answers Ctrl+`=`/`-`/`0`
 * independently, and the view's own memory is keyed on `state.resourceId` (its definition carries
 * no `projectId`), so closing and reopening the same resource restores the level while a different
 * resource starts fresh.
 *
 * Covered:
 *
 * - Ctrl+`=` with the Bible text focused raises `main` and leaves `entries` where it was; with the
 *   entries panel focused it does the opposite; with F7 on and focus in the footnotes list it
 *   raises `footnotes`, independently of the other two.
 * - The ribbons row and the top toolbar sit above every marked area and keep their height throughout.
 * - Closing and reopening the same resource restores the remembered `main` level; a different
 *   resource starts at the Settings default rather than inheriting it.
 *
 * Not covered here (need real Marble/DBL fixtures and a running app; see below): Ctrl+wheel over
 * these areas (covered for the same mechanism by the Scripture editor and comment-list specs), the
 * tab context-menu zoom entries, and the footnotes auto-show interaction with F7 (Enhanced
 * Resources' `showFootnotes` has no auto-show of its own, unlike the Scripture editor's Power-mode
 * behavior — F7 is the only thing that opens or closes it here).
 *
 * Honest runnability: this is a CDP-attach suite (`tests/enhanced-resources/`) that needs a dev app
 * already running with a real Marble resource installed — this repository's dev container has
 * neither. Written and typechecked here; NOT run. `ESV16UK+` is the one resource the fixture
 * environment reliably has (see `HARDCODED_DEFAULT_RESOURCE_ID` in
 * `platform-enhanced-resources/src/main.ts`); the "different resource" case additionally needs a
 * SECOND installed Marble resource, which nothing in this repository guarantees, so it is opt-in
 * via `E2E_TEST_ENHANCED_RESOURCE_ID_2` and skips without one.
 *
 * `npx playwright test --config e2e-tests/playwright-cdp.config.ts
 * tests/enhanced-resources/enhanced-resource-content-zoom.spec.ts`
 */
import type { Frame, Page } from '@playwright/test';
import { test, expect } from '../../fixtures/cdp.fixture';
import { waitForAppReady } from '../../fixtures/helpers';
import { readContentZoomMemory } from '../../fixtures/content-zoom-helpers';
import { getEditorFrame, readFactor } from '../../fixtures/scripture-editor-helpers';
import { closeAllNonHomeDockTabs, dismissMarbleGuideIfShown } from './test-helpers';

/** `platformEnhancedResources.enhancedResource` (`main.ts`'s `ENHANCED_RESOURCE_WEB_VIEW_TYPE`). */
const ENHANCED_RESOURCE_WEBVIEW_TYPE = 'platformEnhancedResources.enhancedResource';

/**
 * The one Marble resource reliably installed in the E2E fixture environment
 * (`HARDCODED_DEFAULT_RESOURCE_ID` in `main.ts`, restated here for the same reason
 * `CONTENT_ZOOM_COMMANDS` restates its literal in `scripture-editor-helpers.ts`: e2e specs cannot
 * import extension source).
 */
const DEFAULT_RESOURCE_ID = 'ESV16UK+';

/**
 * A second Marble resource, distinct from {@link DEFAULT_RESOURCE_ID}, for the "a different resource
 * starts fresh" case. Nothing in this repository guarantees a second resource is installed, so this
 * is opt-in; the one case that needs it is skipped without it.
 */
const SECOND_RESOURCE_ID = process.env.E2E_TEST_ENHANCED_RESOURCE_ID_2 ?? '';

/**
 * Opens the Enhanced Resource web view directly for `resourceId`, bypassing the hardcoded-default
 * menu command (`platformEnhancedResources.openEnhancedResource`) so the "different resource" case
 * can open one the menu never would. Waits for the iframe to attach before returning, the same
 * proof of placement `openEditorViaCommand` in `scripture-editor-helpers.ts` uses.
 */
async function openEnhancedResourceForId(page: Page, resourceId: string): Promise<string> {
  const id = await page.evaluate(async (rid) => {
    // The renderer exposes `papi` on `globalThis`, untyped here (same pattern as
    // scripture-text-grid-zoom.spec.ts's afterEach cleanup).
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const win = window as unknown as {
      papi: {
        webViews: {
          openWebView: (
            webViewType: string,
            layout: unknown,
            options: unknown,
          ) => Promise<string | undefined>;
        };
      };
    };
    return win.papi.webViews.openWebView(
      ENHANCED_RESOURCE_WEBVIEW_TYPE,
      { type: 'tab' },
      { resourceId: rid },
    );
  }, resourceId);
  if (!id) throw new Error(`Could not open Enhanced Resource for "${resourceId}"`);
  await page
    .locator(`iframe[data-web-view-id="${id}"]`)
    .waitFor({ state: 'attached', timeout: 20_000 });
  return id;
}

/**
 * Closes a dock tab by web view id. Modelled on `closeDockTab` in
 * `comment-list-content-zoom.spec.ts`: `dispatchEvent` rather than a real hover+click, because on a
 * crowded tab strip the close button can sit outside the visible/scrollable area, and rc-dock
 * renders a hit-testing sibling over the same region that can make a real click report the button
 * as non-actionable.
 */
async function closeEnhancedResourceTab(page: Page, webViewId: string): Promise<void> {
  const tabTitle = page.locator(`.platform-tab-title[data-web-view-id="${webViewId}"]`);
  const dockTab = tabTitle.locator('xpath=ancestor::*[contains(@class,"dock-tab")][1]');
  await dockTab.locator('.dock-tab-close-btn').dispatchEvent('click');
  await expect(tabTitle).not.toBeVisible({ timeout: 10_000 });
}

/**
 * The app-wide default zoom level (`platform.webViewContentZoom`) a pane with no remembered level
 * starts at — read directly rather than assumed to be 1, since this suite attaches to an
 * already-running app whose Settings may not hold the factory default.
 */
async function readSettingsDefaultZoom(page: Page): Promise<number> {
  return page.evaluate(async () => {
    // The renderer exposes `papi` on `globalThis`, untyped here (same pattern as
    // scripture-text-grid-zoom.spec.ts's afterEach cleanup).
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const win = window as unknown as {
      papi: { settings: { get: (key: string) => Promise<number> } };
    };
    return win.papi.settings.get('platform.webViewContentZoom');
  });
}

/**
 * The scripture pane's top edge, in main-frame coordinates. The ribbons row and the top toolbar are
 * the only things above it, and CSS `zoom` scales an element from its own top-left origin, so a
 * stable value here through every zoom gesture below is exactly what "the ribbons row and the top
 * toolbar keep their heights" means geometrically — neither one has a dedicated test id to measure
 * directly.
 */
async function scripturePaneTop(frame: Frame): Promise<number> {
  const box = await frame.getByTestId('er-scripture-pane').boundingBox();
  if (!box) throw new Error('Scripture pane has no bounding box');
  return box.y;
}

test.describe('Enhanced Resources content zoom', () => {
  test.beforeEach(async ({ mainPage }) => {
    await closeAllNonHomeDockTabs(mainPage);
  });

  test.afterEach(async ({ mainPage }) => {
    await closeAllNonHomeDockTabs(mainPage);
  });

  test('Ctrl+= raises the focused area independently across the Bible text, entries and footnotes panes', async ({
    mainPage,
  }) => {
    test.skip(!!process.env.CI, 'Opens a real Marble resource — local runs only');
    await waitForAppReady(mainPage);

    const editorId = await openEnhancedResourceForId(mainPage, DEFAULT_RESOURCE_ID);
    await dismissMarbleGuideIfShown(mainPage);
    const frame = await getEditorFrame(mainPage, editorId);

    const topBeforeAnyZoom = await scripturePaneTop(frame);

    await test.step('Ctrl+= with the Bible text focused raises --platform-content-zoom-main and leaves --platform-content-zoom-entries where it was', async () => {
      const mainFactorBefore = await readFactor(frame, '');
      const entriesFactorBefore = await readFactor(frame, 'entries');
      // A linked word inside the scripture pane, the same target the enhanced-resources-journey
      // spec clicks to drive the pane — any click inside `er-scripture-pane` puts focus in `main`.
      await frame.getByTestId('er-scripture-pane').getByRole('link').first().click();
      await mainPage.keyboard.press('Control+=');
      await expect.poll(() => readFactor(frame, '')).not.toBe(mainFactorBefore);
      expect(await readFactor(frame, 'entries')).toBe(entriesFactorBefore);
    });

    await test.step('Ctrl+= with the entries panel focused does the opposite', async () => {
      const mainFactorBefore = await readFactor(frame, '');
      const entriesFactorBefore = await readFactor(frame, 'entries');
      // The Dictionary tab is the default `activeTab` and shows entries for the current scope with
      // no filter needed; a row inside it sits inside the `entries` ContentZoomRoot, unlike the tab
      // trigger itself which sits in the tab bar above it.
      const entryRow = frame.locator('[data-testid^="dictionary-entry-"]').first();
      await expect(entryRow).toBeVisible({ timeout: 15_000 });
      await entryRow.click();
      await mainPage.keyboard.press('Control+=');
      await expect.poll(() => readFactor(frame, 'entries')).not.toBe(entriesFactorBefore);
      expect(await readFactor(frame, '')).toBe(mainFactorBefore);
    });

    await test.step('with F7 on, the footnotes list zooms as --platform-content-zoom-footnotes, independently of both', async () => {
      const mainFactorBefore = await readFactor(frame, '');
      const entriesFactorBefore = await readFactor(frame, 'entries');
      await mainPage.keyboard.press('F7');
      const footnotesList = frame.locator(
        '[data-platform-content-zoom-root="footnotes"] [role="listbox"]',
      );
      await expect(footnotesList).toBeVisible({ timeout: 20_000 });
      // Keyboard, not a click: clicking a row selects that note and sends the caret back into the
      // Bible text, which would resolve the chord's area from `main` instead (same reasoning as
      // the Scripture editor's own chord test, content-zoom-chords.spec.ts). Arrowing onto a row
      // moves focus into the pane without selecting. The area is already resolvable once the list
      // itself is focused — this list has `role="listbox"` and its own `data-platform-content-zoom-
      // root="footnotes"` ancestor — the ArrowDown is for parity with that precedent, not a
      // requirement of the focus check itself.
      await footnotesList.focus();
      await mainPage.keyboard.press('ArrowDown');
      const footnotesFactorBefore = await readFactor(frame, 'footnotes');
      await mainPage.keyboard.press('Control+=');
      await expect.poll(() => readFactor(frame, 'footnotes')).not.toBe(footnotesFactorBefore);
      expect(await readFactor(frame, '')).toBe(mainFactorBefore);
      expect(await readFactor(frame, 'entries')).toBe(entriesFactorBefore);
    });

    await test.step('the ribbons row and the top toolbar keep their heights through all of it', async () => {
      const topAfterAllZoom = await scripturePaneTop(frame);
      expect(Math.abs(topAfterAllZoom - topBeforeAnyZoom)).toBeLessThanOrEqual(2);
    });
  });

  test('closing and reopening the same resource restores the remembered level; a different resource starts at the Settings default', async ({
    mainPage,
  }) => {
    test.skip(!!process.env.CI, 'Opens a real Marble resource — local runs only');
    await waitForAppReady(mainPage);

    const settingsDefault = await readSettingsDefaultZoom(mainPage);

    const editorId = await openEnhancedResourceForId(mainPage, DEFAULT_RESOURCE_ID);
    await dismissMarbleGuideIfShown(mainPage);
    const frame = await getEditorFrame(mainPage, editorId);

    // Start from the known Settings default (Ctrl+0), rather than whatever level a prior run against
    // this same attached app may have left in memory, then zoom in twice — two steps away from a
    // KNOWN starting point is what makes `zoomedFactor` reliably distinct from `settingsDefault`
    // below, rather than merely "not equal to whatever it happened to start at".
    await frame.getByTestId('er-scripture-pane').getByRole('link').first().click();
    await mainPage.keyboard.press('Control+0');
    await expect.poll(() => readFactor(frame, '')).toBe(settingsDefault);
    await mainPage.keyboard.press('Control+=');
    await mainPage.keyboard.press('Control+=');
    await expect.poll(() => readFactor(frame, '')).not.toBe(settingsDefault);
    const zoomedFactor = await readFactor(frame, '');

    // The memory key is `resource:<state.resourceId>:main` — the definition carries no `projectId`,
    // so the platform falls back to `state.resourceId` as the identity (content-zoom.util.ts's
    // `buildContentZoomMemoryKey`, fed by `resourceIdFromState` in web-view-content-zoom.service.ts).
    await expect
      .poll(
        async () => (await readContentZoomMemory(mainPage))[`resource:${DEFAULT_RESOURCE_ID}:main`],
      )
      .toBe(zoomedFactor);

    await test.step('closing and reopening the same resource restores the remembered level', async () => {
      await closeEnhancedResourceTab(mainPage, editorId);
      const reopenedId = await openEnhancedResourceForId(mainPage, DEFAULT_RESOURCE_ID);
      await dismissMarbleGuideIfShown(mainPage);
      const reopenedFrame = await getEditorFrame(mainPage, reopenedId);
      await expect.poll(() => readFactor(reopenedFrame, '')).toBe(zoomedFactor);
      await closeEnhancedResourceTab(mainPage, reopenedId);
    });

    test.skip(
      !SECOND_RESOURCE_ID,
      'Set E2E_TEST_ENHANCED_RESOURCE_ID_2 with a second installed Marble resource ID',
    );

    await test.step('a different resource starts at the Settings default, not the first resource’s level', async () => {
      // `zoomedFactor` was already confirmed distinct from `settingsDefault` above, so a fresh pane
      // landing on `settingsDefault` here is a real assertion, not a coincidence of equal values.
      const secondId = await openEnhancedResourceForId(mainPage, SECOND_RESOURCE_ID);
      await dismissMarbleGuideIfShown(mainPage);
      const secondFrame = await getEditorFrame(mainPage, secondId);
      await expect.poll(() => readFactor(secondFrame, '')).toBe(settingsDefault);
    });
  });
});
