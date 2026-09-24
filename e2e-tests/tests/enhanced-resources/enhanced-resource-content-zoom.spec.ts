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
 * - Closing and reopening the same resource restores the remembered `main` level (its own test, run
 *   unconditionally). A different resource starts at the Settings default rather than inheriting
 *   the first resource's level (a separate test, gated at the top on a second installed resource,
 *   so a missing one skips only that case rather than the unconditional one above it).
 *
 * Not covered here (need real Marble/DBL fixtures and a running app; see below): Ctrl+wheel over
 * these areas (covered for the same mechanism by the Scripture editor and comment-list specs), the
 * tab context-menu zoom entries, and the footnotes auto-show interaction with F7 (Enhanced
 * Resources' `showFootnotes` has no auto-show of its own, unlike the Scripture editor's Power-mode
 * behavior — F7 is the only thing that opens or closes it here).
 *
 * Runnability: this is a CDP-attach suite (`tests/enhanced-resources/`) that needs a dev app
 * already running with a real Marble resource installed, so it does not run in CI. `ESV16UK+` is
 * the one resource the fixture environment reliably has (see `HARDCODED_DEFAULT_RESOURCE_ID` in
 * `platform-enhanced-resources/src/main.ts`); the "different resource" case additionally needs a
 * SECOND installed Marble resource, which nothing in this repository guarantees, so it is opt-in
 * via `E2E_TEST_ENHANCED_RESOURCE_ID_2` and skips without one.
 *
 * `npx playwright test --config e2e-tests/playwright-cdp.config.ts
 * tests/enhanced-resources/enhanced-resource-content-zoom.spec.ts`
 */
import type { Frame, Page } from '@playwright/test';
import { test, expect } from '../../fixtures/enhanced-resources.fixture';
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
 * The bootstrap's own idea of the pane's active area (its `window.__platformContentZoom.activeArea`
 * getter — `web-view-content-zoom.bootstrap-script.ts`), set by its capture-phase `pointerdown`
 * listener regardless of whether the click actually moved DOM focus. Used for the click-driven
 * steps below (a plain click on a pane wrapper, or on a dictionary row, may or may not land on a
 * focusable element), matching the same fallback `targetFor` uses to resolve a chord's area. Same
 * shape as `readActiveArea` in `content-zoom.spec.ts`.
 */
async function readActiveArea(frame: Frame): Promise<string | undefined> {
  return frame.evaluate(() => {
    // The bootstrap script defines this global; untyped here since it is an internal
    // platform/pane contract, not part of this test's own types.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const win = window as unknown as { __platformContentZoom?: { activeArea?: string } };
    // Same internal platform/pane contract as above — the double underscore is the bootstrap's own name.
    // eslint-disable-next-line no-underscore-dangle
    return win.__platformContentZoom?.activeArea;
  });
}

/**
 * The zoom area the pane's focused element sits in — the same `closest()` lookup the in-iframe
 * chord handler runs on `document.activeElement` (`targetFor` in
 * `web-view-content-zoom.bootstrap-script.ts`). Used for the footnotes step below, where focus is
 * moved by keyboard (`ArrowDown`) rather than by a click. Same shape as `readFocusedAreaId` in
 * `content-zoom-chords.spec.ts`.
 */
async function readFocusedAreaId(frame: Frame): Promise<string | undefined> {
  return frame.evaluate(() => {
    const root = document.activeElement?.closest('[data-platform-content-zoom-root]');
    if (!root) return undefined;
    return root.getAttribute('data-platform-content-zoom-root') || 'main';
  });
}

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

    // Wait for a genuinely rendered pane before reading anything off it: the panel's pre-content
    // states (loading, error, no chapter data) carry the same testid but mark no zoom area at all,
    // so reading a factor or a geometry box before real content arrives would fail for that reason
    // rather than a real one.
    await expect(frame.getByTestId('er-scripture-pane')).toBeVisible({ timeout: 15_000 });

    const topBeforeAnyZoom = await scripturePaneTop(frame);

    // The Dictionary tab is the default `activeTab` and shows entries for the current scope with
    // no filter needed; a row inside it sits inside the `entries` ContentZoomRoot, unlike the tab
    // trigger itself which sits in the tab bar above it. Excludes `dictionary-entry-detail-*`,
    // which shares the `dictionary-entry-` prefix and would otherwise make `.first()` depend on
    // whether a row has already expanded.
    const entryRow = frame
      .locator('[data-testid^="dictionary-entry-"]:not([data-testid^="dictionary-entry-detail-"])')
      .first();
    const footnotesList = frame.locator(
      '[data-platform-content-zoom-root="footnotes"] [role="listbox"]',
    );

    // Every memory key exercised below is `resource:<DEFAULT_RESOURCE_ID>:<area>` — keyed by the
    // hardcoded resource id rather than anything this run creates — so it persists across runs
    // against the same attached app. Each area is reset to the known Settings default with Ctrl+0
    // immediately before it is exercised, and every area is put back at that baseline once the test
    // is done, so repeated runs assert a stable delta from a known starting point instead of
    // ratcheting the memory entry toward the 3.0 clamp.
    let mainBaseline = 0;
    let entriesBaseline = 0;
    let footnotesBaseline = 0;

    await test.step('Ctrl+= with the Bible text focused raises --platform-content-zoom-main and leaves --platform-content-zoom-entries where it was', async () => {
      // The pane itself, not a word inside it: Editorial renders words as
      // `mark.editor-typed-mark-external-marble-word`, never `role="link"`. A primary-button
      // pointerdown anywhere inside a marked area aims the next chord at that area
      // (`onPointerDown`/`targetFor` in `web-view-content-zoom.bootstrap-script.ts`).
      await frame.getByTestId('er-scripture-pane').click();
      await expect.poll(() => readActiveArea(frame)).toBe('main');
      await mainPage.keyboard.press('Control+0');
      // Guarded before recording either baseline: `readFactor` returns `Number('') === 0` if the
      // platform ever stops writing that area's variable, which would otherwise let the "entries
      // didn't move" assertion below pass vacuously against a baseline that was itself 0.
      await expect.poll(() => readFactor(frame, '')).toBeGreaterThan(0);
      mainBaseline = await readFactor(frame, '');
      await expect.poll(() => readFactor(frame, 'entries')).toBeGreaterThan(0);
      const entriesFactorBefore = await readFactor(frame, 'entries');

      await mainPage.keyboard.press('Control+=');
      await expect.poll(() => readFactor(frame, '')).toBeCloseTo(mainBaseline + 0.1, 5);
      expect(await readFactor(frame, 'entries')).toBe(entriesFactorBefore);
    });

    await test.step('Ctrl+= with the entries panel focused does the opposite', async () => {
      await expect.poll(() => readFactor(frame, '')).toBeGreaterThan(0);
      const mainFactorBefore = await readFactor(frame, '');

      await expect(entryRow).toBeVisible({ timeout: 15_000 });
      await entryRow.click();
      await expect.poll(() => readActiveArea(frame)).toBe('entries');
      await mainPage.keyboard.press('Control+0');
      await expect.poll(() => readFactor(frame, 'entries')).toBeGreaterThan(0);
      entriesBaseline = await readFactor(frame, 'entries');

      await mainPage.keyboard.press('Control+=');
      await expect.poll(() => readFactor(frame, 'entries')).toBeCloseTo(entriesBaseline + 0.1, 5);
      expect(await readFactor(frame, '')).toBe(mainFactorBefore);
    });

    await test.step('with F7 on, the footnotes list zooms as --platform-content-zoom-footnotes, independently of both', async () => {
      await expect.poll(() => readFactor(frame, '')).toBeGreaterThan(0);
      const mainFactorBefore = await readFactor(frame, '');
      await expect.poll(() => readFactor(frame, 'entries')).toBeGreaterThan(0);
      const entriesFactorBefore = await readFactor(frame, 'entries');

      await mainPage.keyboard.press('F7');
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
      await expect.poll(() => readFocusedAreaId(frame)).toBe('footnotes');
      await mainPage.keyboard.press('Control+0');
      await expect.poll(() => readFactor(frame, 'footnotes')).toBeGreaterThan(0);
      footnotesBaseline = await readFactor(frame, 'footnotes');

      await mainPage.keyboard.press('Control+=');
      await expect
        .poll(() => readFactor(frame, 'footnotes'))
        .toBeCloseTo(footnotesBaseline + 0.1, 5);
      expect(await readFactor(frame, '')).toBe(mainFactorBefore);
      expect(await readFactor(frame, 'entries')).toBe(entriesFactorBefore);
    });

    await test.step('the ribbons row and the top toolbar keep their heights through all of it', async () => {
      const topAfterAllZoom = await scripturePaneTop(frame);
      expect(Math.abs(topAfterAllZoom - topBeforeAnyZoom)).toBeLessThanOrEqual(2);
    });

    await test.step('every area is left back at its Settings-default baseline', async () => {
      await frame.getByTestId('er-scripture-pane').click();
      await expect.poll(() => readActiveArea(frame)).toBe('main');
      await mainPage.keyboard.press('Control+0');
      await expect.poll(() => readFactor(frame, '')).toBe(mainBaseline);

      await entryRow.click();
      await expect.poll(() => readActiveArea(frame)).toBe('entries');
      await mainPage.keyboard.press('Control+0');
      await expect.poll(() => readFactor(frame, 'entries')).toBe(entriesBaseline);

      await footnotesList.focus();
      await mainPage.keyboard.press('ArrowDown');
      await expect.poll(() => readFocusedAreaId(frame)).toBe('footnotes');
      await mainPage.keyboard.press('Control+0');
      await expect.poll(() => readFactor(frame, 'footnotes')).toBe(footnotesBaseline);
    });
  });

  test('closing and reopening the same resource restores the remembered zoom level', async ({
    mainPage,
  }) => {
    test.skip(!!process.env.CI, 'Opens a real Marble resource — local runs only');
    await waitForAppReady(mainPage);

    const settingsDefault = await readSettingsDefaultZoom(mainPage);

    const editorId = await openEnhancedResourceForId(mainPage, DEFAULT_RESOURCE_ID);
    await dismissMarbleGuideIfShown(mainPage);
    const frame = await getEditorFrame(mainPage, editorId);
    await expect(frame.getByTestId('er-scripture-pane')).toBeVisible({ timeout: 15_000 });

    // Start from the known Settings default (Ctrl+0), rather than whatever level a prior run against
    // this same attached app may have left in memory, then zoom in twice — two steps away from a
    // KNOWN starting point is what makes `zoomedFactor` reliably distinct from `settingsDefault`
    // below, rather than merely "not equal to whatever it happened to start at".
    await frame.getByTestId('er-scripture-pane').click();
    await expect.poll(() => readActiveArea(frame)).toBe('main');
    await mainPage.keyboard.press('Control+0');
    await expect.poll(() => readFactor(frame, '')).toBe(settingsDefault);
    // Polled to the expected value between presses: `adjustContentZoom` awaits `getDefaultZoom()`
    // before writing, and the memory write is debounced, so a poll gated only on "≠ default" could
    // observe the first step and read `zoomedFactor` there while the second step is still landing.
    await mainPage.keyboard.press('Control+=');
    await expect.poll(() => readFactor(frame, '')).toBeCloseTo(settingsDefault + 0.1, 5);
    await mainPage.keyboard.press('Control+=');
    await expect.poll(() => readFactor(frame, '')).toBeCloseTo(settingsDefault + 0.2, 5);
    const zoomedFactor = await readFactor(frame, '');

    // The memory key is `resource:<state.resourceId>:main` — the definition carries no `projectId`,
    // so the platform falls back to `state.resourceId` as the identity (content-zoom.util.ts's
    // `buildContentZoomMemoryKey`, fed by `resourceIdFromState` in web-view-content-zoom.service.ts).
    await expect
      .poll(
        async () => (await readContentZoomMemory(mainPage))[`resource:${DEFAULT_RESOURCE_ID}:main`],
      )
      .toBe(zoomedFactor);

    await closeEnhancedResourceTab(mainPage, editorId);
    const reopenedId = await openEnhancedResourceForId(mainPage, DEFAULT_RESOURCE_ID);
    await dismissMarbleGuideIfShown(mainPage);
    const reopenedFrame = await getEditorFrame(mainPage, reopenedId);
    await expect(reopenedFrame.getByTestId('er-scripture-pane')).toBeVisible({ timeout: 15_000 });
    await expect.poll(() => readFactor(reopenedFrame, '')).toBe(zoomedFactor);
    await closeEnhancedResourceTab(mainPage, reopenedId);
  });

  test('a different resource starts at the Settings default, not a previously zoomed resource’s level', async ({
    mainPage,
  }) => {
    test.skip(!!process.env.CI, 'Opens a real Marble resource — local runs only');
    // Gated at the top: this case needs a second installed Marble resource nothing in this
    // repository guarantees, and running the whole test past its first assertion only to skip
    // partway through would report the unconditional case above as skipped too (Playwright's
    // `expectedStatus` is set for the whole test, not the assertions already run).
    test.skip(
      !SECOND_RESOURCE_ID,
      'Set E2E_TEST_ENHANCED_RESOURCE_ID_2 with a second installed Marble resource ID',
    );
    await waitForAppReady(mainPage);

    const settingsDefault = await readSettingsDefaultZoom(mainPage);

    const editorId = await openEnhancedResourceForId(mainPage, DEFAULT_RESOURCE_ID);
    await dismissMarbleGuideIfShown(mainPage);
    const frame = await getEditorFrame(mainPage, editorId);
    await expect(frame.getByTestId('er-scripture-pane')).toBeVisible({ timeout: 15_000 });

    // Move the first resource two steps away from the known Settings default, so the "different
    // resource starts fresh" assertion below compares against a level demonstrably distinct from
    // the default rather than a coincidence of equal values.
    await frame.getByTestId('er-scripture-pane').click();
    await expect.poll(() => readActiveArea(frame)).toBe('main');
    await mainPage.keyboard.press('Control+0');
    await expect.poll(() => readFactor(frame, '')).toBe(settingsDefault);
    await mainPage.keyboard.press('Control+=');
    await expect.poll(() => readFactor(frame, '')).toBeCloseTo(settingsDefault + 0.1, 5);
    await mainPage.keyboard.press('Control+=');
    await expect.poll(() => readFactor(frame, '')).toBeCloseTo(settingsDefault + 0.2, 5);

    const secondId = await openEnhancedResourceForId(mainPage, SECOND_RESOURCE_ID);
    await dismissMarbleGuideIfShown(mainPage);
    const secondFrame = await getEditorFrame(mainPage, secondId);
    // The second resource is arbitrary (nothing in this repository guarantees it has data), so its
    // pane may render the `showShellEmpty` shell instead of a real chapter — which mounts no
    // `ContentZoomRoot` and reports no zoom area at all, rather than one at the Settings default.
    // Detected here and skipped with that as the reason, rather than failing on a `readFactor` that
    // would otherwise poll to 0 forever.
    const hasContent = await secondFrame
      .getByTestId('er-scripture-pane')
      .waitFor({ state: 'visible', timeout: 15_000 })
      .then(() => true)
      .catch(() => false);
    test.skip(
      !hasContent,
      `${SECOND_RESOURCE_ID} reported no zoom areas — no chapter data available`,
    );
    await expect.poll(() => readFactor(secondFrame, '')).toBe(settingsDefault);
  });
});
