/**
 * E2E for the Scripture editor's per-area content zoom (PT-4581, epic PT-4575): Ctrl+wheel and the
 * `platform.webViewContentZoom*` commands scale the `main` text and the `footnotes` pane
 * independently, remember each area's level per project, and share that memory with the read-only
 * viewer of the same project.
 *
 * The ticket names `e2e-tests/tests/web-view-content-zoom.spec.ts`, but that path is collected by
 * nothing: `playwright.config.ts` registers only `smoke`, `isolated` and `enhanced-resources`, and
 * this spec launches its own Electron instance, so it belongs under `tests/isolated/` per
 * `e2e-tests/CLAUDE.md` and `tests/attached/README.md`.
 *
 * Jonah 1 carries footnote callers at verses 1, 6 (twice) and 9
 * (`c-sharp/assets/WEB/32JONengWEBUS.SFM`), so navigating to Jonah 1:1 gives the footnotes list
 * real content — though the assertions below never depend on that: the footnotes `ContentZoomRoot`
 * exists once the pane is toggled visible regardless of whether the list is empty.
 *
 * ONE test() per spec file on purpose: the isolated fixture is test-scoped, and a second Electron
 * instance against the shared renderer dev server has a documented dock-tab failure mode (see
 * standard-default-power-mode.spec.ts). Sub-scenarios are test.step()s sharing the one instance.
 *
 * Runs against an isolated project root (the bundled sample WEB is installed into the empty root):
 * `npm run test:e2e:isolated scripture-editor`.
 */
import { type Frame, type Page } from '@playwright/test';
import { test, expect } from '../../../fixtures/isolated.fixture';
import {
  makeSampleProjectEditable,
  navigateToolbarBcv,
  openEditableScriptureEditorForProject,
  openScriptureEditorForProject,
  SAMPLE_WEB_PROJECT_ID,
  waitForHomeTab,
} from '../../../fixtures/scripture-editor-helpers';

test.use({
  interfaceMode: 'power',
  electronLaunchOptions: { isolatedProjectRoot: true, envOverrides: { DEV_NOISY: 'false' } },
});

/**
 * Names of the three content-zoom commands (registered in
 * `src/main/services/web-view.service-router.ts`).
 */
const CONTENT_ZOOM_COMMANDS = {
  in: 'platform.webViewContentZoomIn',
  out: 'platform.webViewContentZoomOut',
  reset: 'platform.webViewContentZoomReset',
} as const;

/**
 * Setting key the memory-key-shape assertion reads directly
 * (`src/renderer/services/web-view-content-zoom.service.ts`).
 */
const CONTENT_ZOOM_MEMORY_SETTING = 'platform.webViewContentZoomMemory';

/**
 * The `id` the platform's zoom indicator badge is created with
 * (`web-view-content-zoom.bootstrap-script.ts`).
 */
const INDICATOR_SELECTOR = '#platform-content-zoom-indicator';

/**
 * The `<iframe data-web-view-id>` element's content frame — a real `Frame`, not a `FrameLocator`,
 * so `evaluate` can read the CSS custom properties the platform writes onto the pane's own
 * `documentElement`.
 */
async function getEditorFrame(page: Page, webViewId: string): Promise<Frame> {
  const handle = await page.locator(`iframe[data-web-view-id="${webViewId}"]`).elementHandle();
  const frame = await handle?.contentFrame();
  if (!frame) throw new Error(`Editor iframe ${webViewId} has no content frame`);
  return frame;
}

/**
 * Reads one zoom area's effective factor straight off the CSS custom property the platform writes
 * as an inline style on the pane's `documentElement` (`pushContentZoom`'s
 * `root.style.setProperty`), so it is readable from inside the frame without going through any DOM
 * measurement. `areaId` is `''` for the `main` area.
 */
async function readFactor(frame: Frame, areaId: string): Promise<number> {
  const value = await frame.evaluate(
    (variableName) =>
      getComputedStyle(document.documentElement).getPropertyValue(variableName).trim(),
    `--platform-content-zoom-${areaId || 'main'}`,
  );
  return Number(value);
}

/** Bounding box (main-frame-relative) of one zoom area's marked root element. */
async function areaBox(
  frame: Frame,
  areaId: string,
): Promise<{ x: number; y: number; width: number; height: number }> {
  const box = await frame.locator(`[data-platform-content-zoom-root="${areaId}"]`).boundingBox();
  if (!box) throw new Error(`Zoom area "${areaId}" has no bounding box`);
  return box;
}

/**
 * Ctrl+wheel over the centre of `box` (main-frame-relative coordinates, as `areaBox` returns).
 * `deltaY: -120` zooms in, `+120` zooms out (`web-view-content-zoom.bootstrap-script.ts`'s
 * `onWheel`: `e.deltaY < 0` is zoom-in). Does not itself wait for the effect — callers poll the
 * resulting factor, never a bare timeout, since geometry inside a zoomed frame moves and a fixed
 * wait would race the debounced write.
 */
async function ctrlWheel(
  page: Page,
  box: { x: number; y: number; width: number; height: number },
  deltaY: number,
): Promise<void> {
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.keyboard.down('Control');
  await page.mouse.wheel(0, deltaY);
  await page.keyboard.up('Control');
}

/**
 * Sends a PAPI command from the renderer, exactly as a menu entry would (`window.papi` is exposed
 * on `globalThis` but not typed there). Used both for the three content-zoom commands (with an area
 * id) and for `platformScriptureEditor.toggleFootnotes` (without one).
 */
async function sendCommandWithId(
  page: Page,
  commandName: string,
  webViewId: string,
  areaId?: string,
): Promise<void> {
  await page.evaluate(
    ([cmd, id, area]) => {
      // The renderer exposes `papi` on `globalThis`, untyped here (same pattern as
      // scripture-text-grid-zoom.spec.ts's afterEach cleanup).
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const win = window as unknown as {
        papi: { commands: { sendCommand: (c: string, ...a: unknown[]) => Promise<unknown> } };
      };
      return area === undefined
        ? win.papi.commands.sendCommand(cmd, id)
        : win.papi.commands.sendCommand(cmd, id, area);
    },
    [commandName, webViewId, areaId] as const,
  );
}

/** Reads the `platform.webViewContentZoomMemory` setting straight from the renderer. */
async function readContentZoomMemory(page: Page): Promise<Record<string, number>> {
  return page.evaluate((settingKey) => {
    // The renderer exposes `papi` on `globalThis`, untyped here (same pattern as
    // scripture-text-grid-zoom.spec.ts's afterEach cleanup).
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const win = window as unknown as {
      papi: { settings: { get: (key: string) => Promise<Record<string, number>> } };
    };
    return win.papi.settings.get(settingKey);
  }, CONTENT_ZOOM_MEMORY_SETTING);
}

/** Indicator text with whitespace stripped, so the narrow no-break space before `%` doesn't matter. */
async function readIndicatorText(frame: Frame): Promise<string | undefined> {
  const text = await frame.locator(INDICATOR_SELECTOR).textContent();
  return text?.replace(/\s/gu, '');
}

/**
 * The bootstrap's own idea of the pane's active area (its `window.__platformContentZoom.activeArea`
 * getter — `web-view-content-zoom.bootstrap-script.ts`). A real click sets this asynchronously (the
 * bootstrap's `pointerdown` listener calls a bound cross-realm function), so callers poll it rather
 * than assuming a click's effect lands within the same tick the click's promise resolves in.
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
 * Shows the footnotes pane, tolerating that it may already be visible: Power mode's footnotes
 * auto-show/hide (`resolveFootnotesPaneAutoVisibility`) shows the pane by itself for any chapter
 * that has notes — which Jonah 1 does, by design (see the file docblock) — so sending
 * `toggleFootnotes` unconditionally would just as often HIDE an already-auto-shown pane.
 */
async function ensureFootnotesVisible(page: Page, frame: Frame, webViewId: string): Promise<void> {
  const footnotesRoot = frame.locator('[data-platform-content-zoom-root="footnotes"]');
  if ((await footnotesRoot.count()) === 0) {
    await sendCommandWithId(page, 'platformScriptureEditor.toggleFootnotes', webViewId);
  }
  await footnotesRoot.waitFor({ state: 'attached', timeout: 20_000 });
}

test.describe('scripture editor content zoom', () => {
  test('Ctrl+wheel and the zoom commands scale the text and footnotes areas independently and remember each level', async ({
    mainPage,
  }) => {
    // Heavy isolated test (own Electron instance, several zoom gestures each waiting on a
    // debounced write). Give it Playwright's 3x "slow" budget for headroom.
    test.slow();

    await waitForHomeTab(mainPage);
    await makeSampleProjectEditable();
    const editorId = await openEditableScriptureEditorForProject(mainPage, SAMPLE_WEB_PROJECT_ID);
    const editorFrame = await getEditorFrame(mainPage, editorId);
    await editorFrame.locator('.editor-container').waitFor({ timeout: 60_000 });

    await navigateToolbarBcv(mainPage, 'Jonah 1:1');
    const verseLocator = editorFrame
      .locator('.editor-container span[data-marker="v"][data-number="1"]')
      .first();
    await expect(verseLocator).toBeVisible({ timeout: 60_000 });

    // Baseline: a fresh pane's main area reads the Settings default (1), unscaled.
    await expect.poll(() => readFactor(editorFrame, '')).toBe(1);

    const toolbarBoxBaseline = await editorFrame.locator('.scripture-editor-tab-nav').boundingBox();
    if (!toolbarBoxBaseline) throw new Error('Toolbar not found');

    await test.step('TC85 "Exercise Zoom" — wheel over the text scales only the text', async () => {
      const verseBoxBefore = await verseLocator.boundingBox();
      if (!verseBoxBefore) throw new Error('Verse 1 not found');

      let mainBox = await areaBox(editorFrame, '');
      await ctrlWheel(mainPage, mainBox, -120);
      await expect.poll(() => readFactor(editorFrame, '')).toBe(1.1);

      // Re-read the box: geometry inside a zoomed frame moves after every zoom change.
      mainBox = await areaBox(editorFrame, '');
      await ctrlWheel(mainPage, mainBox, -120);
      await expect.poll(() => readFactor(editorFrame, '')).toBe(1.2);

      const verseBoxAfter = await verseLocator.boundingBox();
      if (!verseBoxAfter) throw new Error('Verse 1 not found after zoom');
      const ratio = verseBoxAfter.height / verseBoxBefore.height;
      expect(ratio).toBeGreaterThan(1.2 * 0.9);
      expect(ratio).toBeLessThan(1.2 * 1.1);
    });

    await test.step("toolbar geometry is fixed while the text area's zoom changes", async () => {
      const toolbarBoxZoomed = await editorFrame.locator('.scripture-editor-tab-nav').boundingBox();
      if (!toolbarBoxZoomed) throw new Error('Toolbar not found');
      // ±2px absorbs a scrollbar appearing once the zoomed content overflows.
      expect(Math.abs(toolbarBoxZoomed.height - toolbarBoxBaseline.height)).toBeLessThanOrEqual(2);
    });

    await test.step('the zoom indicator carries the area and the current percentage', async () => {
      // Still at 1.2 from the previous step — read the badge before it auto-hides (~1.1s).
      const indicator = editorFrame.locator(INDICATOR_SELECTOR);
      await expect.poll(() => indicator.getAttribute('data-area'), { timeout: 2_000 }).toBe('main');
      await expect.poll(() => readIndicatorText(editorFrame), { timeout: 2_000 }).toBe('120%');
    });

    await test.step('Ctrl+wheel down zooms back out', async () => {
      const mainBox = await areaBox(editorFrame, '');
      await ctrlWheel(mainPage, mainBox, 120);
      await expect.poll(() => readFactor(editorFrame, '')).toBe(1.1);
    });

    await test.step('TC-TO "Zoom menu increments" — the command path drives the same ladder', async () => {
      // Reset first so the ladder below starts from a known rung regardless of the wheel gesture
      // above. The tab-menu entries themselves are PT-4578's PR #2809-sibling work and are not on
      // this branch; the explicit command is what stands in for "the Zoom menu" here.
      await sendCommandWithId(mainPage, CONTENT_ZOOM_COMMANDS.reset, editorId, 'main');
      await expect.poll(() => readFactor(editorFrame, '')).toBe(1);
      await expect
        .poll(() => readIndicatorText(editorFrame), { timeout: 2_000 })
        .toBe('Default·100%');

      await sendCommandWithId(mainPage, CONTENT_ZOOM_COMMANDS.in, editorId, 'main');
      await expect.poll(() => readFactor(editorFrame, '')).toBe(1.1);
      await expect.poll(() => readIndicatorText(editorFrame), { timeout: 2_000 }).toBe('110%');

      await sendCommandWithId(mainPage, CONTENT_ZOOM_COMMANDS.in, editorId, 'main');
      await expect.poll(() => readFactor(editorFrame, '')).toBe(1.2);
      await expect.poll(() => readIndicatorText(editorFrame), { timeout: 2_000 }).toBe('120%');

      await sendCommandWithId(mainPage, CONTENT_ZOOM_COMMANDS.out, editorId, 'main');
      await expect.poll(() => readFactor(editorFrame, '')).toBe(1.1);

      await sendCommandWithId(mainPage, CONTENT_ZOOM_COMMANDS.reset, editorId, 'main');
      await expect.poll(() => readFactor(editorFrame, '')).toBe(1);
    });

    await test.step('footnotes area independence', async () => {
      await ensureFootnotesVisible(mainPage, editorFrame, editorId);

      const footnotesHandleBox = await editorFrame
        .locator('[data-slot="resizable-handle"]')
        .first()
        .boundingBox();
      if (!footnotesHandleBox) throw new Error('Footnotes resize handle not found');

      // Ctrl+wheel over the footnotes list: footnotes steps, main (currently default, 1) stays put.
      let footnotesBox = await areaBox(editorFrame, 'footnotes');
      await ctrlWheel(mainPage, footnotesBox, -120);
      await expect.poll(() => readFactor(editorFrame, 'footnotes')).toBe(1.1);
      expect(await readFactor(editorFrame, '')).toBe(1);
      await expect
        .poll(() => editorFrame.locator(INDICATOR_SELECTOR).getAttribute('data-area'), {
          timeout: 2_000,
        })
        .toBe('footnotes');

      // Ctrl+wheel over the text: main steps, footnotes (just set to 1.1) stays put.
      const mainBox = await areaBox(editorFrame, '');
      await ctrlWheel(mainPage, mainBox, -120);
      await expect.poll(() => readFactor(editorFrame, '')).toBe(1.1);
      expect(await readFactor(editorFrame, 'footnotes')).toBe(1.1);

      // The divider between the two areas never scales with either area's content zoom.
      footnotesBox = await areaBox(editorFrame, 'footnotes');
      const handleBoxAfter = await editorFrame
        .locator('[data-slot="resizable-handle"]')
        .first()
        .boundingBox();
      if (!handleBoxAfter) throw new Error('Footnotes resize handle not found after zoom');
      expect(handleBoxAfter.width).toBeCloseTo(footnotesHandleBox.width, 0);
      expect(handleBoxAfter.height).toBeCloseTo(footnotesHandleBox.height, 0);
    });

    // Memory key shape, checked here (not after the reset-targeting step below) because both areas
    // presently hold a NON-default level: resetContentZoom deletes a memory key entirely rather
    // than writing back the default, so checking after the resets would find `main` absent.
    await test.step('memory key shape — both areas keyed by the same project identity', async () => {
      const normalizedId = SAMPLE_WEB_PROJECT_ID.toUpperCase();
      await expect
        .poll(async () => (await readContentZoomMemory(mainPage))[`editor:${normalizedId}:main`])
        .toBe(1.1);
      await expect
        .poll(
          async () => (await readContentZoomMemory(mainPage))[`editor:${normalizedId}:footnotes`],
        )
        .toBe(1.1);
      const memory = await readContentZoomMemory(mainPage);
      expect(Object.keys(memory).some((key) => key.startsWith(`resource:${normalizedId}:`))).toBe(
        false,
      );
    });

    await test.step('reset with no area id targets the area the user last clicked in', async () => {
      // Click a REAL footnote row (`.note-caller`, `footnote-item.component.tsx`), not empty pane
      // background: the pointerdown listener resolves the clicked element's closest marked
      // ancestor, and only an actual descendant of the footnotes ContentZoomRoot is guaranteed to
      // register as the click target under a CSS-zoomed layout. Selecting a row also sends the
      // caret back into the editor text (`selectNote`), so this click is exactly the case where the
      // pointer and the resulting focus name different areas and the pointer has to win.
      await editorFrame.locator('.note-caller').first().click({ force: true });
      // Wait for the click's effect (the bootstrap's active-area tracking crosses a realm boundary
      // to reach the renderer's resolver) rather than assuming it lands within the click's own tick.
      await expect.poll(() => readActiveArea(editorFrame)).toBe('footnotes');
      await sendCommandWithId(mainPage, CONTENT_ZOOM_COMMANDS.reset, editorId);
      await expect.poll(() => readFactor(editorFrame, 'footnotes')).toBe(1);
      expect(await readFactor(editorFrame, '')).toBe(1.1);

      // Give footnotes a fresh custom level so the mirror-image case below (main resets while
      // footnotes keeps a level) is checking something other than two defaults.
      const footnotesBox = await areaBox(editorFrame, 'footnotes');
      await ctrlWheel(mainPage, footnotesBox, -120);
      await expect.poll(() => readFactor(editorFrame, 'footnotes')).toBe(1.1);

      await verseLocator.click({ force: true });
      await expect.poll(() => readActiveArea(editorFrame)).toBe('main');
      await sendCommandWithId(mainPage, CONTENT_ZOOM_COMMANDS.reset, editorId);
      await expect.poll(() => readFactor(editorFrame, '')).toBe(1);
      expect(await readFactor(editorFrame, 'footnotes')).toBe(1.1);
    });

    await test.step('a read-only editor of the same project shares the same memory identity', async () => {
      // Wait for the debounced memory write to land before opening a second pane that seeds from it.
      const normalizedId = SAMPLE_WEB_PROJECT_ID.toUpperCase();
      await expect
        .poll(
          async () => (await readContentZoomMemory(mainPage))[`editor:${normalizedId}:footnotes`],
        )
        .toBe(1.1);

      const readOnlyId = await openScriptureEditorForProject(mainPage, SAMPLE_WEB_PROJECT_ID);
      const readOnlyFrame = await getEditorFrame(mainPage, readOnlyId);
      await readOnlyFrame.locator('.editor-container').waitFor({ timeout: 60_000 });

      // `main` has no memory (the reset above deleted its key), so it opens at the Settings default;
      // `footnotes` carries the level remembered for `editor:<projectId>:*`, shared case-insensitively.
      await expect.poll(() => readFactor(readOnlyFrame, '')).toBe(1);
      await ensureFootnotesVisible(mainPage, readOnlyFrame, readOnlyId);
      await expect.poll(() => readFactor(readOnlyFrame, 'footnotes')).toBe(1.1);

      // Wheel zoom works in the read-only viewer too — it is the same web-view type, marked the
      // same way, just rendered with `state.isReadOnly`.
      const mainBox = await areaBox(readOnlyFrame, '');
      await ctrlWheel(mainPage, mainBox, -120);
      await expect.poll(() => readFactor(readOnlyFrame, '')).toBe(1.1);
    });
  });
});
