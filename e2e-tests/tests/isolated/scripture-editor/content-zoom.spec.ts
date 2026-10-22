/**
 * E2E for the Scripture editor's per-area content zoom: Ctrl+wheel and the
 * `platform.webViewContentZoom*` commands scale the `main` text and the `footnotes` pane
 * independently, remember each area's level per project, and share that memory with the read-only
 * viewer of the same project.
 *
 * Jonah 1 carries footnote callers at verses 1, 6 (twice) and 9
 * (`c-sharp/assets/WEB/32JONengWEBUS.SFM`), so navigating to Jonah 1:1 gives the footnotes list
 * real content — though the assertions below never depend on that: the footnotes `ContentZoomRoot`
 * exists once the pane is toggled visible regardless of whether the list is empty.
 *
 * The sub-scenarios below are test.step()s sharing one Electron instance rather than separate
 * test()s, because each test() launches its own instance and this file has no reason to pay for
 * three.
 *
 * Runs against an isolated project root (the bundled sample WEB is installed into the empty root):
 * `npm run test:e2e:isolated scripture-editor`.
 */
import { type Frame, type Locator, type Page } from '@playwright/test';
import { test, expect } from '../../../fixtures/isolated.fixture';
import {
  areaBox,
  ctrlWheel,
  expectPopupBesideTriggerAndInsideFrame,
  frameBox,
  INDICATOR_SELECTOR,
  type PageBox,
  readContentZoomMemory,
  readIndicatorText,
  triggerBox,
  waitForPopupAnimations,
  zoomAreaTo,
} from '../../../fixtures/content-zoom-helpers';
import {
  CONTENT_ZOOM_COMMANDS,
  ensureFootnotesVisible,
  getEditorFrame,
  makeSampleProjectEditable,
  navigateToolbarBcv,
  openEditableScriptureEditorForProject,
  openScriptureEditorForProject,
  readFactor,
  SAMPLE_WEB_PROJECT_ID,
  sendCommandWithId,
  waitForHomeTab,
} from '../../../fixtures/scripture-editor-helpers';
import { DEFAULT_WINDOW_SIZE, setWindowWidth } from '../../../fixtures/helpers';

/**
 * The in-text caller that opens the footnote editor popover (`.immutable-note-caller > button`,
 * shared with cross-references). Scoped to `data-note-kind="footnote"` so it lands on a real
 * footnote — the sample WEB project's Jonah 1 carries footnote callers at verses 1, 6 and 9
 * (`c-sharp/assets/WEB/32JONengWEBUS.SFM`), and this suite navigates to Jonah 1:1.
 */
const TEXT_NOTE_CALLER_SELECTOR =
  '.note[data-note-kind="footnote"] .immutable-note-caller > button';

test.use({
  interfaceMode: 'power',
  electronLaunchOptions: { isolatedProjectRoot: true, envOverrides: { DEV_NOISY: 'false' } },
});

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
 * The main text editor's container. `.first()`: an open footnote popover renders a second
 * `.editor-container` of its own (portaled after the main one), so the bare selector is ambiguous
 * while it is open.
 */
function mainEditorContainer(frame: Frame): Locator {
  return frame.locator('.editor-container').first();
}

/**
 * Scrolls the main text to `to`, or by `by`, and returns its scroll position before and after, the
 * scroll container's main-frame-relative box, and how far that container can scroll at all
 * (`maxScroll`). The text scrolls in its nearest scrollable ancestor (inside the footnotes layout),
 * not in the pane's outer `overflow-auto` wrapper, which never overflows. Called with neither, it
 * only reads.
 */
async function scrollText(
  frame: Frame,
  target: { to?: number; by?: number },
): Promise<{
  before: number;
  after: number;
  box: PageBox;
  maxScroll: number;
}> {
  const editorFrameBox = await frameBox(frame);
  const result = await mainEditorContainer(frame).evaluate((element, { to, by }) => {
    let node: Element | null = element;
    while (node) {
      const { overflowY } = getComputedStyle(node);
      if ((overflowY === 'auto' || overflowY === 'scroll') && node.scrollHeight > node.clientHeight)
        break;
      node = node.parentElement;
    }
    if (!node) throw new Error('The main text has no scrollable ancestor');
    const before = node.scrollTop;
    if (to !== undefined) node.scrollTop = to;
    else if (by !== undefined) node.scrollTop = before + by;
    const rect = node.getBoundingClientRect();
    return {
      before,
      after: node.scrollTop,
      box: { x: rect.left, y: rect.top, width: rect.width, height: rect.height },
      maxScroll: node.scrollHeight - node.clientHeight,
    };
  }, target);
  return {
    ...result,
    box: { ...result.box, x: result.box.x + editorFrameBox.x, y: result.box.y + editorFrameBox.y },
  };
}

/**
 * Scrolls the main text by `delta` (negative scrolls back up) while a pop-up is open, and checks
 * the scroll really moved and left `trigger` visible, so a following "still beside its trigger"
 * check is meaningful. Returns the distance scrolled.
 */
async function scrollTextKeepingVisible(
  frame: Frame,
  delta: number,
  trigger: Locator | PageBox,
): Promise<number> {
  const { before, after, box: scrollerBox } = await scrollText(frame, { by: delta });
  const moved = after - before;
  expect(Math.abs(moved)).toBeGreaterThanOrEqual(Math.abs(delta) / 2);
  expect(Math.sign(moved)).toBe(Math.sign(delta));
  const triggerRect = await triggerBox(trigger);
  // A pre-scroll box (a caret) is shifted by the distance scrolled.
  const top = 'boundingBox' in trigger ? triggerRect.y : triggerRect.y - moved;
  expect(top).toBeGreaterThanOrEqual(scrollerBox.y);
  expect(top + triggerRect.height).toBeLessThanOrEqual(scrollerBox.y + scrollerBox.height);
  return moved;
}

/**
 * Distance below the top of the main text's scroll container at which this spec parks a pop-up's
 * trigger before opening the pop-up. At 200 % a pop-up like the comment editor is about half the
 * pane tall, so a trigger left mid-pane has room for it neither above nor below, and the pop-up
 * falls back to covering its own line — real behavior in a pane that short, but not what a "sits
 * beside its trigger" check is about. Near the top of the pane, the whole pane height is below the
 * trigger, with room to spare for the scroll that follows.
 */
const TRIGGER_TOP_MARGIN_PX = 40;

/**
 * How far the marker palette's box may sit from its trigger and still count as "beside" it, in
 * {@link expectBesideTriggerAndInsideWindow}. Covers the anchored palette's own `sideOffset` (4px,
 * `overlay-command-palette.component.tsx`) plus the slack Radix's collision avoidance can add to
 * keep the palette inside the window rather than the narrower, shorter pane — a fixed,
 * zoom-independent gap, not something a different trigger position avoids, so this is a constant
 * rather than a value derived from the zoom factor.
 */
const MAX_PALETTE_TRIGGER_GAP_PX = 24;

/**
 * Scrolls the main text as near as it goes to putting `trigger`'s box {@link TRIGGER_TOP_MARGIN_PX}
 * below the top of the text's scroll container, and returns the box it has there. The room a pop-up
 * opened on that trigger then has is the pane's, rather than whatever the preceding steps left the
 * text scrolled to.
 *
 * Landing higher than that margin is fine and needs no scroll: a trigger already near the top of
 * the pane has the whole pane below it. So the check is a range, not a target — scrolling up is
 * clamped at the top of the text, and demanding an exact offset would fail there instead of
 * accepting the room it asked for. Below the pane's top edge, on the other hand, the trigger is
 * scrolled out of sight.
 *
 * Scrolling down clamps too, at the bottom of the text, and then the trigger stays lower than the
 * margin — so the margin is allowed exactly the distance the scroll came up short by, and the
 * scroll itself is held to moving every pixel that was available. A scroll that simply did not take
 * effect fails on that, rather than buying itself room here. The shortfall only ever arises where
 * it costs nothing: the text comes up short only when the chapter barely overflows the pane, which
 * is the unzoomed case, where a pop-up is a fraction of the pane's height and has room below a
 * trigger wherever it sits. At the zoom levels this step is about, the chapter is several
 * pane-heights tall and the full margin is demanded.
 */
async function scrollTriggerNearPaneTop(frame: Frame, trigger: PageBox): Promise<PageBox> {
  const { box: scroller, before: scrollTop, maxScroll } = await scrollText(frame, {});
  const requested = Math.round(trigger.y - scroller.y - TRIGGER_TOP_MARGIN_PX);
  const available = Math.min(Math.max(scrollTop + requested, 0), maxScroll) - scrollTop;
  const { before, after } = await scrollText(frame, { by: requested });
  // Sub-pixel: scrollTop is fractional while scrollHeight and clientHeight are whole pixels.
  expect(Math.abs(after - before - available), 'the text scrolled as far as it can').toBeLessThan(
    1,
  );
  const scrolled = { ...trigger, y: trigger.y - (after - before) };
  const belowPaneTop = scrolled.y - scroller.y;
  expect(belowPaneTop, 'trigger inside the pane').toBeGreaterThanOrEqual(0);
  expect(
    belowPaneTop,
    'trigger as near the top of the pane as the text scrolls',
  ).toBeLessThanOrEqual(TRIGGER_TOP_MARGIN_PX + 2 + Math.max(requested - available, 0));
  return scrolled;
}

/** The text caret's (or the text selection's) box, main-frame-relative. */
async function readCaretBox(frame: Frame): Promise<PageBox> {
  const editorFrameBox = await frameBox(frame);
  const caret = await frame.evaluate(() => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return undefined;
    const rect = selection.getRangeAt(0).getBoundingClientRect();
    return { x: rect.left, y: rect.top, width: rect.width, height: rect.height };
  });
  if (!caret) throw new Error('No text caret');
  return { ...caret, x: caret.x + editorFrameBox.x, y: caret.y + editorFrameBox.y };
}

/**
 * {@link expectPopupBesideTriggerAndInsideFrame}, retried until it holds: a pop-up that has just
 * opened is still being positioned, so its first boxes are not its settled ones. A pop-up that
 * never settles beside its trigger still fails. Once this returns, the pop-up's open animation has
 * ended and its size can be measured.
 */
async function expectSettledBeside(
  frame: Frame,
  popup: Locator,
  trigger: Locator | PageBox,
): Promise<void> {
  await expect(async () => expectPopupBesideTriggerAndInsideFrame(frame, popup, trigger)).toPass({
    timeout: 5_000,
  });
}

/** A locator's main-frame box; throws when it has none. */
async function boxOf(locator: Locator): Promise<PageBox> {
  const box = await locator.boundingBox();
  if (!box) throw new Error('Element has no box');
  return box;
}

/**
 * Selects verse 2's text from "great" onto the line below it with a click and a Shift+click, and
 * returns the selection's main-frame box. Checks that the selection really spans more than one
 * line.
 *
 * Where the line below starts is read from the laid-out text rather than named as a second word:
 * which word verse 2 wraps after is a property of the Scripture font's metrics at the pane's width
 * and zoom, so a fixed pair of words pins the selection to one line or two by luck of the current
 * font.
 */
async function selectWrappedText(page: Page, frame: Frame, input: Locator): Promise<PageBox> {
  const editorFrameBox = await frameBox(frame);
  await input.getByText('that great city', { exact: false }).first().scrollIntoViewIfNeeded();
  const points = await input.evaluate((root) => {
    const walker = root.ownerDocument.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      const text = node.textContent ?? '';
      const from = text.indexOf('great city');
      if (from >= 0) {
        const textNode = node;
        const charRect = (offset: number) => {
          const range = root.ownerDocument.createRange();
          range.setStart(textNode, offset);
          range.setEnd(textNode, offset + 1);
          return range.getBoundingClientRect();
        };
        const center = (rect: DOMRect) => ({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });
        const start = from + 1;
        const startTop = Math.round(charRect(start).top);
        // The first character painted below the start's line, then a few more of its line, so the
        // Shift+click lands well inside the second line rather than on its very first glyph.
        let end = -1;
        for (let offset = start + 1; offset < text.length; offset += 1) {
          const rect = charRect(offset);
          if (rect.width > 0 && Math.round(rect.top) > startTop) {
            end = offset;
            for (
              let more = offset + 1;
              more < text.length && more <= offset + 3 && Math.round(charRect(more).top) > startTop;
              more += 1
            )
              end = more;
            break;
          }
        }
        if (end < 0) return undefined;
        return { start: center(charRect(start)), end: center(charRect(end)) };
      }
    }
    return undefined;
  });
  if (!points) throw new Error('Verse 2 does not wrap onto a second line');
  await page.mouse.click(editorFrameBox.x + points.start.x, editorFrameBox.y + points.start.y);
  await page.keyboard.down('Shift');
  await page.mouse.click(editorFrameBox.x + points.end.x, editorFrameBox.y + points.end.y);
  await page.keyboard.up('Shift');
  const lines = await frame.evaluate(() => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return [];
    return Array.from(selection.getRangeAt(0).getClientRects())
      .filter((rect) => rect.width > 0)
      .map((rect) => ({
        left: rect.left,
        top: rect.top,
        right: rect.right,
        bottom: rect.bottom,
      }));
  });
  expect(new Set(lines.map((line) => Math.round(line.top))).size).toBeGreaterThan(1);
  const left = Math.min(...lines.map((line) => line.left));
  const top = Math.min(...lines.map((line) => line.top));
  const right = Math.max(...lines.map((line) => line.right));
  const bottom = Math.max(...lines.map((line) => line.bottom));
  return {
    x: editorFrameBox.x + left,
    y: editorFrameBox.y + top,
    width: right - left,
    height: bottom - top,
  };
}

test.describe('scripture editor content zoom', () => {
  test('Ctrl+wheel and the zoom commands scale the text and footnotes areas independently and remember each level', async ({
    electronApp,
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
      // above. The explicit command stands in for "the Zoom menu" here: this spec covers the zoom
      // mechanism itself, independent of whatever UI (tab menu, keyboard chord) drives it.
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

    await test.step('the footnote popover stays at interface scale and beside its caller, even scrolled, re-zoomed and in a narrow pane', async () => {
      const caller = editorFrame.locator(TEXT_NOTE_CALLER_SELECTOR).first();
      const popover = editorFrame.locator('[data-slot="popover-content"]').filter({
        has: editorFrame.locator('.editor-input'),
      });
      const cancel = popover.getByRole('button', { name: 'Cancel', exact: true });
      // The editor controls this popover and does not close it on Escape or an outside click; its
      // own Cancel button closes it, leaving an existing note unchanged.
      const closeFootnotePopover = async () => {
        await cancel.click();
        await expect(popover).toBeHidden();
      };
      const openFootnotePopover = async () => {
        await caller.click({ force: true });
        await expect(popover).toBeVisible();
        await expect(popover).not.toHaveAttribute('data-platform-content-zoom-root', /.*/);
        await expectSettledBeside(editorFrame, popover, caller);
      };

      await zoomAreaTo(mainPage, editorFrame, editorId, 'main', 1);
      await openFootnotePopover();
      // The popover keeps its 500 px minimum width at 100 %.
      expect((await boxOf(popover)).width).toBeGreaterThanOrEqual(499);
      const cancelAtDefault = await boxOf(cancel);
      await closeFootnotePopover();

      // Size is measured on the popover's controls: the popover's own width is sized by its
      // content (`w-max`) and capped by the pane.
      await zoomAreaTo(mainPage, editorFrame, editorId, 'main', 1.5);
      await openFootnotePopover();
      expect((await boxOf(cancel)).height / cancelAtDefault.height).toBeCloseTo(1, 1);
      await closeFootnotePopover();

      await zoomAreaTo(mainPage, editorFrame, editorId, 'main', 2);
      // Scroll the text before opening, so the caller is no longer where it sat at the top.
      expect((await scrollText(editorFrame, { to: 120 })).after).toBe(120);
      await openFootnotePopover();
      expect((await boxOf(cancel)).height / cancelAtDefault.height).toBeCloseTo(1, 1);

      // Scroll after opening: the popover moves with its caller.
      await scrollTextKeepingVisible(editorFrame, 60, caller);
      await expect(async () =>
        expectPopupBesideTriggerAndInsideFrame(editorFrame, popover, caller),
      ).toPass({ timeout: 5_000 });

      // Change the text zoom while the popover is open: the text reflows under it and the popover
      // follows its caller.
      await sendCommandWithId(mainPage, CONTENT_ZOOM_COMMANDS.out, editorId, 'main');
      await expect.poll(() => readFactor(editorFrame, '')).toBe(1.9);
      await expect(async () =>
        expectPopupBesideTriggerAndInsideFrame(editorFrame, popover, caller),
      ).toPass({ timeout: 5_000 });
      // The text reflowed under the open popover; the popover kept its size.
      expect((await boxOf(cancel)).height / cancelAtDefault.height).toBeCloseTo(1, 1);
      await sendCommandWithId(mainPage, CONTENT_ZOOM_COMMANDS.in, editorId, 'main');
      await expect.poll(() => readFactor(editorFrame, '')).toBe(2);
      await closeFootnotePopover();

      // Narrow pane: the popover and its content must still fit inside it, at 200 % and at the
      // 300 % maximum (the app does not allow a narrower window). A real OS window resize, never
      // `mainPage.setViewportSize()` — on this CDP-attached fixture that applies an emulation
      // override that bypasses the app's enforced `minWidth` instead of actually narrowing the
      // window (see `setWindowWidth` in fixtures/helpers.ts).
      await setWindowWidth(electronApp, mainPage, 900);
      // Sequential: each zoom level's pop-up must be opened, checked and closed before the next.
      /* eslint-disable no-await-in-loop */
      const narrowFactors = [2, 3];
      for (let i = 0; i < narrowFactors.length; i += 1) {
        await zoomAreaTo(mainPage, editorFrame, editorId, 'main', narrowFactors[i]);
        await openFootnotePopover();
        await closeFootnotePopover();
      }
      /* eslint-enable no-await-in-loop */
      await zoomAreaTo(mainPage, editorFrame, editorId, 'main', 2);
      // Restore the window width and the text's scroll position for the steps that follow: they
      // click verses with `{ force: true }`, which skips Playwright's visibility checks, so a verse
      // left scrolled out of view would be clicked where it is no longer painted.
      await setWindowWidth(electronApp, mainPage, DEFAULT_WINDOW_SIZE.width);
      expect((await scrollText(editorFrame, { to: 0 })).after).toBe(0);
    });

    await test.step("the standard view's marker palette stays at interface scale beside its trigger", async () => {
      // The standard view asks the platform for a command palette rather than rendering its own
      // menu, so this pop-up is drawn by the renderer, outside the web view.
      const mainInput = editorFrame.locator('.editor-input').first();
      // Standard view carries `marker-editable` (`_usj-nodes.scss`: "standard view
      // (.marker-editable)"); `marker-hidden` and `marker-visible` belong to the formatted and
      // markers views this step must run before.
      await expect(mainInput).toHaveClass(/\bmarker-editable\b/, { timeout: 20_000 });
      // Verse 1's own text, near the chapter's start rather than "that great city" (verse 2, used
      // by the sibling in-iframe step below): that trigger sits near the pane's right edge. This
      // text can span more than one line, so the trigger's box deliberately moves between zoom
      // levels as the text reflows — `openPalette` below re-reads the caret box on every open
      // rather than reusing a position captured once.
      const text = mainInput.getByText('Yahweh', { exact: false }).first();
      // The anchored branch puts `data-overlay-command-palette` on both its `PopoverContent` (the
      // sized box) and, nested inside it, the `Command` that fills that box — so the bare
      // attribute selector is ambiguous. `data-slot="popover-content"` narrows to the outer element.
      const palette = mainPage.locator(
        '[data-slot="popover-content"][data-overlay-command-palette]',
      );

      const openPalette = async () => {
        await text.click();
        const caret = await scrollTriggerNearPaneTop(editorFrame, await readCaretBox(editorFrame));
        await mainPage.keyboard.press('\\');
        await expect(palette).toBeVisible();
        // Before returning: a pop-up mid-open animation reports a smaller box than its settled
        // one, and the width read right after this call is what the growth ratio is measured on.
        await waitForPopupAnimations(palette);
        return caret;
      };
      const closePalette = async () => {
        await mainPage.keyboard.press('Escape');
        await expect(palette).toBeHidden();
      };
      /**
       * Unlike the in-iframe pop-ups this file otherwise checks with
       * {@link expectPopupBesideTriggerAndInsideFrame}, this palette is portalled to the MAIN
       * document (`OverlayHost`, `createPortal(..., document.body)`), so Radix collision-avoids it
       * against the app window's own viewport, not the narrower, shorter pane — it can paint a few
       * pixels outside the pane while staying inside the window. So this checks the weaker, but
       * real, guarantee: beside its trigger and inside the WINDOW.
       */
      const expectBesideTriggerAndInsideWindow = async (trigger: PageBox) => {
        await waitForPopupAnimations(palette);
        const popupBox = await boxOf(palette);
        const viewport = await mainPage.evaluate(() => ({
          width: window.innerWidth,
          height: window.innerHeight,
        }));
        const gapY = Math.max(
          popupBox.y - (trigger.y + trigger.height),
          trigger.y - (popupBox.y + popupBox.height),
        );
        const gapX = Math.max(
          popupBox.x - (trigger.x + trigger.width),
          trigger.x - (popupBox.x + popupBox.width),
        );
        const tolerance = 1;
        expect(Math.min(Math.max(gapY, 0), Math.max(gapX, 0)), 'separated on one axis only').toBe(
          0,
        );
        expect(Math.max(gapX, gapY), 'not covering the trigger').toBeGreaterThanOrEqual(-tolerance);
        expect(Math.max(gapX, gapY), 'close to the trigger').toBeLessThanOrEqual(
          MAX_PALETTE_TRIGGER_GAP_PX,
        );
        expect(popupBox.x, 'inside the window').toBeGreaterThanOrEqual(-tolerance);
        expect(popupBox.y, 'inside the window').toBeGreaterThanOrEqual(-tolerance);
        expect(popupBox.x + popupBox.width, 'inside the window').toBeLessThanOrEqual(
          viewport.width + tolerance,
        );
        expect(popupBox.y + popupBox.height, 'inside the window').toBeLessThanOrEqual(
          viewport.height + tolerance,
        );
      };

      const widths = new Map<number, number>();
      // Sequential: each level's palette must be opened, measured and closed before the next.
      /* eslint-disable no-await-in-loop */
      const factors = [1, 1.5, 2];
      for (let i = 0; i < factors.length; i += 1) {
        const factor = factors[i];
        await zoomAreaTo(mainPage, editorFrame, editorId, 'main', factor);
        const caret = await openPalette();
        widths.set(factor, (await boxOf(palette)).width);
        // Same size at every zoom, placed against its trigger and inside the window.
        await expectBesideTriggerAndInsideWindow(caret);
        await closePalette();
      }
      /* eslint-enable no-await-in-loop */

      const atDefault = widths.get(1);
      if (!atDefault) throw new Error('No 100 % palette width recorded');
      [1.5, 2].forEach((factor) => {
        expect((widths.get(factor) ?? 0) / atDefault).toBeCloseTo(1, 1);
      });

      // Back to the default so the next step starts from its own baseline.
      await zoomAreaTo(mainPage, editorFrame, editorId, 'main', 1);
    });

    await test.step('the inline marker menu and the comment editor stay at interface scale and follow the text', async () => {
      // The inline marker menu is the non-standard views' `\` menu (the standard view opens the
      // platform's command palette instead), and the markers view is read-only, so cycle
      // standard -> markers -> formatted.
      const mainInput = editorFrame.locator('.editor-input').first();
      await sendCommandWithId(mainPage, 'platformScriptureEditor.changeView', editorId);
      await expect(mainInput).toHaveClass(/\bmarker-visible\b/, { timeout: 20_000 });
      await sendCommandWithId(mainPage, 'platformScriptureEditor.changeView', editorId);
      await expect(mainInput).toHaveClass(/\bmarker-hidden\b/, { timeout: 20_000 });

      const text = mainInput.getByText('that great city', { exact: false }).first();
      const markerMenu = editorFrame.locator('[data-slot="popover-content"]').filter({
        has: editorFrame.locator('input'),
      });
      const commentEditor = editorFrame
        .locator('[data-slot="popover-content"]')
        .filter({ hasNot: editorFrame.locator('.editor-input') })
        .last();

      // Both pop-ups are anchored to the text caret (or selection), so its box is their trigger.
      const placeCaret = async () => {
        await text.click();
        return scrollTriggerNearPaneTop(editorFrame, await readCaretBox(editorFrame));
      };
      const openMarkerMenu = async () => {
        const caret = await placeCaret();
        await mainPage.keyboard.press('\\');
        await expect(markerMenu).toBeVisible();
        await expect(markerMenu).not.toHaveAttribute('data-platform-content-zoom-root', /.*/);
        await expectSettledBeside(editorFrame, markerMenu, caret);
        return caret;
      };
      const closeMarkerMenu = async () => {
        await mainPage.keyboard.press('Escape');
        await expect(markerMenu).toBeHidden();
      };
      const openCommentEditor = async (trigger: PageBox) => {
        await mainPage.keyboard.press('Control+Shift+N');
        await expect(commentEditor).toBeVisible();
        await expect(commentEditor).not.toHaveAttribute('data-platform-content-zoom-root', /.*/);
        await expectSettledBeside(editorFrame, commentEditor, trigger);
      };
      const closeCommentEditor = async () => {
        // The comment editor takes focus shortly after it opens, and only its focused text box
        // closes it on Escape.
        await expect(commentEditor.locator('[contenteditable="true"]')).toBeFocused();
        await mainPage.keyboard.press('Escape');
        await expect(commentEditor).toBeHidden();
      };
      /** Scrolls the text while a pop-up is open and checks it stays beside its moved trigger. */
      const expectFollowsScroll = async (popup: Locator, trigger: PageBox, delta: number) => {
        const moved = await scrollTextKeepingVisible(editorFrame, delta, trigger);
        await expect(async () =>
          expectPopupBesideTriggerAndInsideFrame(editorFrame, popup, {
            ...trigger,
            y: trigger.y - moved,
          }),
        ).toPass({ timeout: 5_000 });
      };

      // Both pop-ups have fixed widths (500 px and 400 px), so at interface scale their painted
      // width is the same at every text zoom.
      const widths = new Map<number, { menu: number; comment: number }>();
      // Sequential: each zoom level's pop-ups must be opened, measured and closed before the next.
      /* eslint-disable no-await-in-loop */
      const factors = [1, 1.5, 2];
      for (let i = 0; i < factors.length; i += 1) {
        const factor = factors[i];
        await zoomAreaTo(mainPage, editorFrame, editorId, 'main', factor);
        await openMarkerMenu();
        const menu = (await boxOf(markerMenu)).width;
        await closeMarkerMenu();
        await openCommentEditor(await placeCaret());
        const comment = (await boxOf(commentEditor)).width;
        await closeCommentEditor();
        widths.set(factor, { menu, comment });
      }
      /* eslint-enable no-await-in-loop */
      const atDefault = widths.get(1);
      if (!atDefault) throw new Error('No 100 % widths recorded');
      [1.5, 2].forEach((factor) => {
        expect((widths.get(factor)?.menu ?? 0) / atDefault.menu).toBeCloseTo(1, 1);
        expect((widths.get(factor)?.comment ?? 0) / atDefault.comment).toBeCloseTo(1, 1);
      });

      // Still at 200 %: scroll after opening, and each pop-up moves with its caret. The text
      // scrolls back up (a negative delta), which moves the trigger down: every trigger here is
      // parked near the top of the pane, so scrolling the other way would take it out of the pane
      // and leave nothing to compare the pop-up's position against.
      const caretForMenu = await openMarkerMenu();
      await expectFollowsScroll(markerMenu, caretForMenu, -60);
      await closeMarkerMenu();

      const caretForComment = await placeCaret();
      await openCommentEditor(caretForComment);
      await expectFollowsScroll(commentEditor, caretForComment, -60);
      await closeCommentEditor();

      // A selection that wraps onto a second line: the comment editor sits beside the whole
      // selection, never on part of it, also once the editor has re-rendered the selection as the
      // pending comment and the text scrolls.
      const selection = await scrollTriggerNearPaneTop(
        editorFrame,
        await selectWrappedText(mainPage, editorFrame, mainInput),
      );
      await openCommentEditor(selection);
      await expectFollowsScroll(commentEditor, selection, -60);
      await closeCommentEditor();
      // Stays in the formatted view: the next step needs it too.
    });

    await test.step("the footnote editor's marker menu sits beside the selection at interface scale", async () => {
      // The footnote editor opens its own inline marker menu on `\` only outside the standard
      // view (which opens the platform's command palette instead); the previous step left the
      // pane in the formatted view.
      const mainInput = editorFrame.locator('.editor-input').first();
      await expect(mainInput).toHaveClass(/\bmarker-hidden\b/);
      const caller = editorFrame.locator(TEXT_NOTE_CALLER_SELECTOR).first();
      const popover = editorFrame.locator('[data-slot="popover-content"]').filter({
        has: editorFrame.locator('.editor-input'),
      });
      const noteInput = popover.locator('.editor-input');
      const menu = editorFrame.locator('[data-slot="popover-content"]').filter({
        has: editorFrame.locator('[cmdk-input]'),
      });
      const menuItem = menu.locator('[cmdk-item]').first();

      const openFootnotePopover = async () => {
        await caller.scrollIntoViewIfNeeded();
        await caller.click({ force: true });
        await expect(popover).toBeVisible();
        await expectSettledBeside(editorFrame, popover, caller);
      };
      const closeFootnotePopover = async () => {
        await popover.getByRole('button', { name: 'Cancel', exact: true }).click();
        await expect(popover).toBeHidden();
      };
      /**
       * Selects the note text from its reference (`\fr`) into its text (`\ft`) and returns the
       * selection's box. The menu lists the markers allowed inside the selection's innermost
       * marker, and only a note (`\f`) has any: a caret inside one `\ft` run offers nothing, so no
       * menu opens there.
       */
      const selectAcrossNoteMarkers = async (): Promise<PageBox> => {
        const selected = await noteInput.evaluate((root) => {
          const firstText = (selector: string) => {
            const element = root.querySelector(selector);
            if (!element) return undefined;
            return root.ownerDocument.createTreeWalker(element, NodeFilter.SHOW_TEXT).nextNode();
          };
          const from = firstText('[data-marker="fr"]');
          const to = firstText('[data-marker="ft"]');
          if (!from || !to) return false;
          root.ownerDocument
            .getSelection()
            ?.setBaseAndExtent(
              from,
              Math.min(1, from.textContent?.length ?? 0),
              to,
              Math.min(3, to.textContent?.length ?? 0),
            );
          return true;
        });
        if (!selected) throw new Error('The note has no \\fr and \\ft text to select');
        return readCaretBox(editorFrame);
      };
      /**
       * Presses `\` until the menu opens: the editor reports the selection's marker after the
       * selection changes, and the key does nothing until it has.
       */
      const openMenu = async () => {
        await expect(async () => {
          await mainPage.keyboard.press('\\');
          await expect(menu).toBeVisible({ timeout: 1_000 });
        }).toPass({ timeout: 10_000 });
        await expect(menuItem).toBeVisible();
      };
      const closeMenu = async () => {
        await mainPage.keyboard.press('Escape');
        await expect(menu).toBeHidden();
      };

      // Control at 100 %: the menu opens for this selection at all.
      await zoomAreaTo(mainPage, editorFrame, editorId, 'main', 1);
      await openFootnotePopover();
      await selectAcrossNoteMarkers();
      await openMenu();
      await waitForPopupAnimations(menu);
      const itemHeightAtDefault = (await boxOf(menuItem)).height;
      await closeMenu();
      await closeFootnotePopover();

      await zoomAreaTo(mainPage, editorFrame, editorId, 'main', 2);
      await openFootnotePopover();
      const selection = await selectAcrossNoteMarkers();
      await openMenu();
      await expect(menu).not.toHaveAttribute('data-platform-content-zoom-root', /.*/);
      await waitForPopupAnimations(menu);
      await expectSettledBeside(editorFrame, menu, selection);
      const itemHeightRatio = (await boxOf(menuItem)).height / itemHeightAtDefault;
      expect(itemHeightRatio).toBeGreaterThan(0.85);
      expect(itemHeightRatio).toBeLessThan(1.15);
      await closeMenu();
      await closeFootnotePopover();

      // Back to the standard view (formatted -> standard) for the steps that follow, still at 200 %.
      await sendCommandWithId(mainPage, 'platformScriptureEditor.changeView', editorId);
      await expect(mainInput).toHaveClass(/\bmarker-editable\b/, { timeout: 20_000 });
    });

    await test.step('a toolbar pop-up stays at interface scale while the text is zoomed', async () => {
      const toolbarMenuTrigger = editorFrame
        .locator('.scripture-editor-tab-nav button[aria-haspopup="menu"]')
        .first();
      await toolbarMenuTrigger.click();
      const toolbarMenu = editorFrame.locator('[data-slot="dropdown-menu-content"]').last();
      await expect(toolbarMenu).toBeVisible();
      // Positive control that the text really is zoomed right now.
      expect(await readFactor(editorFrame, '')).toBe(2);
      await expect(toolbarMenu).not.toHaveAttribute('data-platform-content-zoom-root', /.*/);
      await mainPage.keyboard.press('Escape');
      await zoomAreaTo(mainPage, editorFrame, editorId, 'main', 1);
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
