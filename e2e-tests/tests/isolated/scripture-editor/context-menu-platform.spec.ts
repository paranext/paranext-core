/**
 * Every Scripture editor shows the platform's own right-click menu, rendered in the app window's
 * top document (see `platformContextMenu`), with items declared in each extension's `menus.json`.
 * What each surface offers:
 *
 * - The main text of an editable project: Cut, Copy, Paste, Paste as plain text, Find, then the four
 *   Insert items. Cut and Copy are disabled without a selection. Each clipboard item acts on the
 *   text, Find opens with the selected text, Shift+F10 opens the menu at the caret, a wheel scroll
 *   closes it, and Escape hands the keyboard back to the text at the old caret.
 * - The footnotes pane's row editor: the four clipboard items and Find, no Insert items, and a pick
 *   leaves the row session open.
 * - A read-only project: the same items, the editing ones disabled. A Copy pick leaves the selection
 *   and the toolbar reference where they were, and the keyboard returns to the tab. The top menu's
 *   Copy follows a selection in a read-only footnote row.
 * - The Bible Texts panel (read-only): Copy and Find only.
 *
 * Every pick is real input: a mouse right-click or Shift+F10, then a click or Enter on the item.
 * Text is selected by a real double-click. The clipboard is the operating system's, read and
 * written through Electron's main-process `clipboard` (see `readClipboardText` in
 * `fixtures/helpers.ts`), and seeded with a sentinel before each copy so a stale clipboard cannot
 * pass. Every edit is undone and the saved chapter compared with the one read at the start; the
 * book is then written back with its exact starting bytes.
 *
 * Jonah 1 of the bundled sample WEB (`c-sharp/assets/WEB/32JONengWEBUS.SFM`): verse 2 holds
 * "wickedness", verse 1 "Amittai", the 1:1 footnote "translations" and the 1:9 footnote "Elohim",
 * each once in the chapter.
 *
 * One test() per launch state (the isolated fixture starts a new app for every test()), with
 * test.step()s inside. Run: `npm run test:e2e:isolated
 * tests/isolated/scripture-editor/context-menu-platform.spec.ts`.
 */
import fs from 'fs';
import { type Frame, type Page } from '@playwright/test';
import { test as isolatedTest, expect } from '../../../fixtures/isolated.fixture';
import {
  readClipboardText,
  sendPapiRequestOnce,
  waitForOpenWebViewIdByType,
  waitForPapiMethodRegistered,
  writeClipboardText,
} from '../../../fixtures/helpers';
import {
  cleanupCommentTestProject,
  createCommentTestProject,
  type CommentTestProject,
} from '../../../fixtures/comment-test-helpers';
import {
  contextMenuItem,
  EDITOR_HAMBURGER_SELECTOR,
  ensureFootnotesVisible,
  getEditorFrame,
  getSampleProjectBookUsfm,
  getSampleProjectChapterUsfm,
  makeSampleProjectEditable,
  navigateToolbarBcv,
  openEditableScriptureEditorForProject,
  openScriptureEditorForProject,
  platformContextMenu,
  readContextMenuLabels,
  readHighlightedContextMenuLabel,
  SAMPLE_WEB_PROJECT_ID,
  setSampleProjectBookUsfm,
  waitForHomeTab,
} from '../../../fixtures/scripture-editor-helpers';

/**
 * On a failure, attaches the app's own log lines about Scripture-editor context menus (each
 * request, how it ended, and any rejection such as a dropped duplicate) to the report. A
 * right-click that opens no menu leaves no other trace: the menu request runs in the app, not in
 * the test.
 */
const test = isolatedTest.extend<{ contextMenuLog: void }>({
  contextMenuLog: [
    async ({ electronApp }, use, testInfo) => {
      const chunks: string[] = [];
      const onData = (chunk: Buffer | string) => chunks.push(chunk.toString());
      electronApp.process().stdout?.on('data', onData);
      electronApp.process().stderr?.on('data', onData);
      await use();
      electronApp.process().stdout?.off('data', onData);
      electronApp.process().stderr?.off('data', onData);
      if (testInfo.status === testInfo.expectedStatus) return;
      const lines = chunks.join('').split('\n');
      // The log writes each entry's timestamp on the line before its text.
      const relevant = lines.flatMap((line, index) =>
        /context menu|debounce/i.test(line) ? [lines[index - 1] ?? '', line] : [],
      );
      // Written to a file beside the failure screenshot, so it can be read without the report.
      const logPath = testInfo.outputPath('context-menu-log.txt');
      fs.writeFileSync(logPath, relevant.join('\n'));
      await testInfo.attach('context-menu-log', { path: logPath, contentType: 'text/plain' });
    },
    { auto: true },
  ],
});

const JONAH_1 = { book: 'JON', chapterNum: 1, verseNum: 1 };
const FIND_WEB_VIEW_TYPE = 'platformScripture.find';
const FOOTNOTES_PANE = '[data-footnotes-pane]';
const ROW_EDITOR_INPUT = `${FOOTNOTES_PANE} li[data-state="editing"] .editor-input`;
/** Written to the clipboard before each copy, so a read cannot be satisfied by an earlier copy. */
const CLIPBOARD_SENTINEL = 'CTXMENUSENTINELNOTCOPIED';
/** Fabricated tokens that occur nowhere in the sample text. */
const PASTE_TOKEN = 'CTXMENUPASTEALPHA';
const PLAIN_PASTE_TOKEN = 'CTXMENUPLAINBETA';
/** How far the keyboard-opened menu may sit from the caret; it opens exactly there. */
const CARET_TOLERANCE_PX = 6;

const MAIN_TEXT_PROJECT_ITEMS = [
  'Cut',
  'Copy',
  'Paste',
  'Paste as plain text',
  'Find',
  'Insert comment',
  'Insert footnote',
  'Insert cross-reference',
  'Insert endnote',
];

const isMac = process.platform === 'darwin';
const UNDO_KEY = isMac ? 'Meta+Z' : 'Control+Z';
const COPY_KEY = isMac ? 'Meta+C' : 'Control+C';
const FIND_KEY = isMac ? 'Meta+F' : 'Control+F';

/** A point in the coordinate space `Page.mouse` works in. */
interface PagePoint {
  x: number;
  y: number;
}

/** A word's box in page coordinates. */
interface PageBox extends PagePoint {
  width: number;
  height: number;
}

/**
 * Page coordinates of a frame-relative point: the frame's iframe offset plus the point scaled by
 * the iframe's rendered width over the frame's own width (1 unless the app is zoomed).
 */
async function frameToPage(page: Page, webViewId: string, frame: Frame, point: PagePoint) {
  const iframeBox = await page.locator(`iframe[data-web-view-id="${webViewId}"]`).boundingBox();
  if (!iframeBox) throw new Error(`Web view ${webViewId} has no box on screen`);
  const frameWidth = await frame.evaluate(() => window.innerWidth);
  const scale = iframeBox.width / frameWidth;
  return { x: iframeBox.x + point.x * scale, y: iframeBox.y + point.y * scale, scale };
}

/**
 * The on-screen box of the first occurrence of `word` under `rootSelector` in `frame`, scrolled
 * into view first. Text inside a note caller or note is skipped unless `insideNotes` is set: in the
 * main text the word must be the Scripture text's, never a note's.
 */
async function wordBox(
  page: Page,
  webViewId: string,
  frame: Frame,
  rootSelector: string,
  word: string,
  { insideNotes = false } = {},
): Promise<PageBox> {
  const rect = await frame.evaluate(
    ({ selector, target, allowNotes }) => {
      const root = document.querySelector(selector);
      if (!root) return undefined;
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      for (let node = walker.nextNode(); node; node = walker.nextNode()) {
        const index = node.textContent?.indexOf(target) ?? -1;
        if (index >= 0 && (allowNotes || !node.parentElement?.closest('.note'))) {
          node.parentElement?.scrollIntoView({ block: 'nearest' });
          const range = document.createRange();
          range.setStart(node, index);
          range.setEnd(node, index + target.length);
          const box = range.getBoundingClientRect();
          return { x: box.x, y: box.y, width: box.width, height: box.height };
        }
      }
      return undefined;
    },
    { selector: rootSelector, target: word, allowNotes: insideNotes },
  );
  if (!rect) throw new Error(`"${word}" is not rendered under ${rootSelector}`);
  const topLeft = await frameToPage(page, webViewId, frame, rect);
  return {
    x: topLeft.x,
    y: topLeft.y,
    width: rect.width * topLeft.scale,
    height: rect.height * topLeft.scale,
  };
}

/**
 * The chapter as an editor save writes it. The sample file carries spaces an editor save does not
 * reproduce — at line ends, after `\c 1`, and doubled after each `\fr` reference — so a chapter
 * that went through a save is compared with the sample in this form.
 */
function asSavedByEditor(usfm: string): string {
  return usfm.replace(/ {2,}/g, ' ').replace(/ +(\r?\n)/g, '$1');
}

function centreOf(box: PageBox): PagePoint {
  return { x: box.x + box.width / 2, y: box.y + box.height / 2 };
}

function readSelection(frame: Frame): Promise<string> {
  return frame.evaluate(() => window.getSelection()?.toString() ?? '');
}

function frameHasFocus(frame: Frame): Promise<boolean> {
  return frame.evaluate(() => document.hasFocus());
}

/** Polls the OS clipboard until it holds `expected`; the copy can reach it asynchronously. */
async function expectClipboard(readClipboard: () => Promise<string>, expected: string) {
  await expect.poll(readClipboard, { timeout: 15_000 }).toBe(expected);
}

test.describe('platform right-click menu in Scripture editors', () => {
  test.describe('an editable project', () => {
    test.use({
      interfaceMode: 'power',
      electronLaunchOptions: { isolatedProjectRoot: true },
    });

    test('main text and footnote row editor: items, clipboard picks, Find, keyboard, wheel', async ({
      mainPage,
      electronApp,
    }) => {
      // Heavy isolated test: one launch, a dozen menu round trips, each edit awaiting its save.
      test.setTimeout(480_000);

      await waitForHomeTab(mainPage);
      await makeSampleProjectEditable();
      const editorId = await openEditableScriptureEditorForProject(mainPage, SAMPLE_WEB_PROJECT_ID);
      const frame = await getEditorFrame(mainPage, editorId);
      await frame.locator('.editor-container').first().waitFor({ timeout: 60_000 });
      await navigateToolbarBcv(mainPage, 'Jonah 1:2');
      // `.first()`: the footnotes pane's row editor renders an editor input of its own, after this.
      const mainEditor = frame.locator('.editor-input.marker-editable').first();
      await expect(mainEditor).toContainText('wickedness', { timeout: 60_000 });
      const verse2Para = mainEditor.locator('p:has(span[data-marker="v"][data-number="2"])');
      const menu = platformContextMenu(mainPage);
      const readClipboard = () => readClipboardText(electronApp);
      const originalUsfm = await getSampleProjectChapterUsfm(JONAH_1);
      const originalBookUsfm = await getSampleProjectBookUsfm(JONAH_1);
      if (!originalUsfm || !originalBookUsfm) throw new Error('The sample project has no Jonah');
      expect(originalUsfm).toContain('wickedness');
      const word = (text: string, options?: { insideNotes?: boolean }) =>
        wordBox(mainPage, editorId, frame, '.editor-input', text, options);
      const paraText = () => verse2Para.evaluate((element) => element.textContent ?? '');
      const verse2Before = await paraText();

      /** Opens the menu with a right-click at `point` and waits until it holds the keyboard. */
      const rightClickAt = async (point: PagePoint) => {
        await expect(menu).toHaveCount(0);
        await mainPage.mouse.click(point.x, point.y, { button: 'right' });
        await expect(menu).toBeVisible({ timeout: 15_000 });
        await expect
          .poll(() => menu.evaluate((element) => element.contains(document.activeElement)))
          .toBe(true);
      };
      const closeWithEscape = async () => {
        await mainPage.keyboard.press('Escape');
        await expect(menu).toHaveCount(0, { timeout: 15_000 });
      };
      const selectWordWithDoubleClick = async (text: string) => {
        const point = centreOf(await word(text));
        await mainPage.mouse.dblclick(point.x, point.y);
        await expect.poll(() => readSelection(frame)).toBe(text);
        return point;
      };
      const savedChapter = async () =>
        asSavedByEditor((await getSampleProjectChapterUsfm(JONAH_1)) ?? '');
      const originalAsSaved = asSavedByEditor(originalUsfm);
      /** Undoes the last edit and waits until verse 2 and the saved chapter are as they were. */
      const undoAndExpectOriginal = async () => {
        await mainPage.keyboard.press(UNDO_KEY);
        await expect.poll(paraText, { timeout: 15_000 }).toBe(verse2Before);
        await expect.poll(savedChapter, { timeout: 20_000 }).toBe(originalAsSaved);
      };

      await test.step('with no selection: every item in order, Cut and Copy disabled, Paste enabled', async () => {
        const point = centreOf(await word('wickedness'));
        await mainPage.mouse.click(point.x, point.y);
        await rightClickAt(point);
        expect(await readContextMenuLabels(menu)).toEqual(MAIN_TEXT_PROJECT_ITEMS);
        await expect(await contextMenuItem(menu, 'Cut')).toBeDisabled();
        await expect(await contextMenuItem(menu, 'Copy')).toBeDisabled();
        await expect(await contextMenuItem(menu, 'Paste')).toBeEnabled();
        await expect(await contextMenuItem(menu, 'Paste as plain text')).toBeEnabled();
      });

      await test.step('Escape closes the menu and typing continues at the old caret without a click', async () => {
        // The caret the right-click left, as an offset into verse 2's paragraph text.
        const caretOffset = await verse2Para.evaluate((paragraph) => {
          const selection = window.getSelection();
          if (!selection?.anchorNode || !paragraph.contains(selection.anchorNode)) return -1;
          const range = document.createRange();
          range.setStart(paragraph, 0);
          range.setEnd(selection.anchorNode, selection.anchorOffset);
          return range.toString().length;
        });
        expect(caretOffset).toBeGreaterThan(0);
        await closeWithEscape();
        await expect.poll(() => frameHasFocus(frame)).toBe(true);
        await mainPage.keyboard.type('Q');
        await expect
          .poll(paraText)
          .toBe(`${verse2Before.slice(0, caretOffset)}Q${verse2Before.slice(caretOffset)}`);
        await undoAndExpectOriginal();
      });

      await test.step('Shift+F10 opens the menu at the caret; the arrow keys move from the first enabled item', async () => {
        // A word near the start of its line, so the menu has room to open at the caret rather
        // than being moved back inside the window.
        const point = centreOf(await word('Amittai'));
        await mainPage.mouse.click(point.x, point.y);
        const caretInFrame = await frame.evaluate(() => {
          const selection = window.getSelection();
          if (!selection?.focusNode) return undefined;
          const range = document.createRange();
          range.setStart(selection.focusNode, selection.focusOffset);
          range.collapse(true);
          const rects = range.getClientRects();
          const box = rects.length ? rects[rects.length - 1] : range.getBoundingClientRect();
          return { x: box.left, y: box.bottom };
        });
        if (!caretInFrame) throw new Error('No caret after the click');
        const caret = await frameToPage(mainPage, editorId, frame, caretInFrame);
        await mainPage.keyboard.press('Shift+F10');
        await expect(menu).toBeVisible({ timeout: 15_000 });
        const menuBox = await menu.boundingBox();
        if (!menuBox) throw new Error('The menu has no box');
        expect(Math.abs(menuBox.x - caret.x)).toBeLessThanOrEqual(CARET_TOLERANCE_PX);
        expect(Math.abs(menuBox.y - caret.y)).toBeLessThanOrEqual(CARET_TOLERANCE_PX);
        // The menu holds the keyboard at once: Cut and Copy are disabled, so the first ArrowDown
        // lands on Paste.
        await mainPage.keyboard.press('ArrowDown');
        await expect.poll(() => readHighlightedContextMenuLabel(menu)).toBe('Paste');
        await mainPage.keyboard.press('ArrowDown');
        await expect.poll(() => readHighlightedContextMenuLabel(menu)).toBe('Paste as plain text');
        await closeWithEscape();
        expect(await paraText()).toBe(verse2Before);
      });

      await test.step('Shift+F10 with a selection, then ArrowDown and Enter on Copy, copies it', async () => {
        await selectWordWithDoubleClick('wickedness');
        await writeClipboardText(electronApp, CLIPBOARD_SENTINEL);
        await mainPage.keyboard.press('Shift+F10');
        await expect(menu).toBeVisible({ timeout: 15_000 });
        await mainPage.keyboard.press('ArrowDown');
        await expect.poll(() => readHighlightedContextMenuLabel(menu)).toBe('Cut');
        await mainPage.keyboard.press('ArrowDown');
        await expect.poll(() => readHighlightedContextMenuLabel(menu)).toBe('Copy');
        await mainPage.keyboard.press('Enter');
        await expect(menu).toHaveCount(0, { timeout: 15_000 });
        await expectClipboard(readClipboard, 'wickedness');
        expect(await paraText()).toBe(verse2Before);
      });

      await test.step('with a selection: Cut and Copy enabled; Copy copies it and keeps it shown', async () => {
        const point = await selectWordWithDoubleClick('wickedness');
        await writeClipboardText(electronApp, CLIPBOARD_SENTINEL);
        await rightClickAt(point);
        await expect(await contextMenuItem(menu, 'Cut')).toBeEnabled();
        await expect(await contextMenuItem(menu, 'Copy')).toBeEnabled();
        await (await contextMenuItem(menu, 'Copy')).click();
        await expect(menu).toHaveCount(0, { timeout: 15_000 });
        await expectClipboard(readClipboard, 'wickedness');
        await expect.poll(() => readSelection(frame)).toBe('wickedness');
        expect(await paraText()).toBe(verse2Before);
      });

      await test.step('Paste replaces the selection, and the change is saved; undo restores it', async () => {
        await writeClipboardText(electronApp, PASTE_TOKEN);
        const point = await selectWordWithDoubleClick('wickedness');
        await rightClickAt(point);
        await (await contextMenuItem(menu, 'Paste')).click();
        await expect
          .poll(paraText, { timeout: 15_000 })
          .toBe(verse2Before.replace('wickedness', PASTE_TOKEN));
        await expect
          .poll(savedChapter, { timeout: 20_000 })
          .toBe(originalAsSaved.replace('wickedness', PASTE_TOKEN));
        await undoAndExpectOriginal();
      });

      await test.step('Paste as plain text replaces the selection, and the change is saved; undo restores it', async () => {
        await writeClipboardText(electronApp, PLAIN_PASTE_TOKEN);
        const point = await selectWordWithDoubleClick('wickedness');
        await rightClickAt(point);
        await (await contextMenuItem(menu, 'Paste as plain text')).click();
        await expect
          .poll(paraText, { timeout: 15_000 })
          .toBe(verse2Before.replace('wickedness', PLAIN_PASTE_TOKEN));
        await expect
          .poll(savedChapter, { timeout: 20_000 })
          .toBe(originalAsSaved.replace('wickedness', PLAIN_PASTE_TOKEN));
        await undoAndExpectOriginal();
      });

      await test.step('Cut removes the selection and puts it on the clipboard; undo restores it', async () => {
        await writeClipboardText(electronApp, CLIPBOARD_SENTINEL);
        const point = await selectWordWithDoubleClick('wickedness');
        await rightClickAt(point);
        await (await contextMenuItem(menu, 'Cut')).click();
        await expectClipboard(readClipboard, 'wickedness');
        await expect.poll(paraText, { timeout: 15_000 }).not.toContain('wickedness');
        await undoAndExpectOriginal();
      });

      await test.step('a wheel scroll over the text closes the menu', async () => {
        const point = centreOf(await word('wickedness'));
        await mainPage.mouse.click(point.x, point.y);
        await rightClickAt(point);
        const menuBox = await menu.boundingBox();
        if (!menuBox) throw new Error('The menu has no box');
        // A word on the same line, further left, that the menu does not cover: the menu opens at
        // the click and extends right and down from there. Not a corner of the text's own box,
        // which lies above the editor's frame once the text has scrolled.
        const wheelAt = centreOf(await word('Amittai'));
        expect(
          wheelAt.x >= menuBox.x &&
            wheelAt.x <= menuBox.x + menuBox.width &&
            wheelAt.y >= menuBox.y &&
            wheelAt.y <= menuBox.y + menuBox.height,
        ).toBe(false);
        await mainPage.mouse.move(wheelAt.x, wheelAt.y);
        await mainPage.mouse.wheel(0, 200);
        await expect(menu).toHaveCount(0, { timeout: 15_000 });
        await mainPage.mouse.wheel(0, -200);
      });

      await test.step('footnote row editor: clipboard items and Find, no Insert items; Copy copies and the row stays open', async () => {
        await ensureFootnotesVisible(mainPage, frame, editorId);
        const row = frame.locator(`${FOOTNOTES_PANE} li[role="option"]`, {
          hasText: 'translations',
        });
        await expect(row).toHaveCount(1, { timeout: 20_000 });
        const inRow = centreOf(
          await wordBox(mainPage, editorId, frame, FOOTNOTES_PANE, 'translations', {
            insideNotes: true,
          }),
        );
        await mainPage.mouse.click(inRow.x, inRow.y);
        const rowEditor = frame.locator(ROW_EDITOR_INPUT);
        await expect(rowEditor).toContainText('translations', { timeout: 20_000 });

        const inRowEditor = centreOf(
          await wordBox(mainPage, editorId, frame, ROW_EDITOR_INPUT, 'translations', {
            insideNotes: true,
          }),
        );
        await mainPage.mouse.dblclick(inRowEditor.x, inRowEditor.y);
        await expect.poll(() => readSelection(frame)).toBe('translations');
        await writeClipboardText(electronApp, CLIPBOARD_SENTINEL);
        await rightClickAt(inRowEditor);
        expect(await readContextMenuLabels(menu)).toEqual([
          'Cut',
          'Copy',
          'Paste',
          'Paste as plain text',
          'Find',
        ]);
        await (await contextMenuItem(menu, 'Copy')).click();
        await expect(menu).toHaveCount(0, { timeout: 15_000 });
        await expectClipboard(readClipboard, 'translations');
        await expect(rowEditor).toHaveCount(1);
        await expect(rowEditor).toContainText('translations');
        expect(await savedChapter()).toBe(originalAsSaved);
      });

      await test.step('Find opens the Find tab with the selected text as its search text', async () => {
        const point = await selectWordWithDoubleClick('wickedness');
        await rightClickAt(point);
        await (await contextMenuItem(menu, 'Find')).click();
        const findId = await waitForOpenWebViewIdByType(mainPage, FIND_WEB_VIEW_TYPE, 30_000);
        const findFrame = await getEditorFrame(mainPage, findId);
        await expect(findFrame.locator('#search-term')).toHaveValue('wickedness', {
          timeout: 20_000,
        });
        // The search term and history persist outside the isolated project root.
        await clearSampleProjectFindState();
      });

      await test.step('the chapter is put back byte for byte', async () => {
        expect(await savedChapter()).toBe(originalAsSaved);
        // Off the chapter first: an editor that edited the chapter moments ago holds back an
        // incoming change to it and writes its own copy back over it.
        await navigateToolbarBcv(mainPage, 'Jonah 2:1');
        await expect(mainEditor).toContainText('prayed to Yahweh, his God', { timeout: 60_000 });
        await setSampleProjectBookUsfm(JONAH_1, originalBookUsfm);
        await expect
          .poll(() => getSampleProjectBookUsfm(JONAH_1), { timeout: 20_000 })
          .toBe(originalBookUsfm);
        await navigateToolbarBcv(mainPage, 'Jonah 1:2');
        await expect(mainEditor).toContainText('wickedness', { timeout: 60_000 });
        expect(await getSampleProjectBookUsfm(JONAH_1)).toBe(originalBookUsfm);
        expect(await getSampleProjectChapterUsfm(JONAH_1)).toBe(originalUsfm);
      });
    });
  });

  test.describe('a read-only project', () => {
    test.use({
      interfaceMode: 'power',
      electronLaunchOptions: { isolatedProjectRoot: true },
    });

    // The isolated project root holds no resource: `platform.project.<id>.isResource` is true only
    // for an installed DBL resource (`ScrText.IsResourceProject`), which cannot be built from the
    // bundled sample. The resource-only menu (exactly Copy and Find, "Copy selection" in the top
    // menu) is therefore checked here on a read-only project, whose editor is read-only in the same
    // way, and the resource-only shape is left to the test.fixme below.
    test('main text and footnote rows: Copy keeps the selection and the reference, and the keyboard returns', async ({
      mainPage,
      electronApp,
    }) => {
      test.slow();

      await waitForHomeTab(mainPage);
      // The sample ships `<Editable>F</Editable>`, so this opens read-only.
      const editorId = await openScriptureEditorForProject(mainPage, SAMPLE_WEB_PROJECT_ID);
      const frame = await getEditorFrame(mainPage, editorId);
      await frame.locator('.editor-container').first().waitFor({ timeout: 60_000 });
      await navigateToolbarBcv(mainPage, 'Jonah 1:2');
      const mainEditor = frame.locator('.editor-input').first();
      await expect(mainEditor).toContainText('wickedness', { timeout: 60_000 });
      const menu = platformContextMenu(mainPage);
      const readClipboard = () => readClipboardText(electronApp);
      const bcvTrigger = mainPage.locator('button[aria-label="book-chapter-trigger"]').first();
      const word = (text: string) => wordBox(mainPage, editorId, frame, '.editor-input', text);

      await test.step('with no selection: Copy disabled, the editing items disabled, Find enabled', async () => {
        const point = centreOf(await word('wickedness'));
        await mainPage.mouse.click(point.x, point.y);
        await mainPage.mouse.click(point.x, point.y, { button: 'right' });
        await expect(menu).toBeVisible({ timeout: 15_000 });
        expect(await readContextMenuLabels(menu)).toEqual(MAIN_TEXT_PROJECT_ITEMS);
        await Promise.all(
          [
            'Cut',
            'Copy',
            'Paste',
            'Paste as plain text',
            'Insert footnote',
            'Insert cross-reference',
            'Insert endnote',
          ].map(async (label) => expect(await contextMenuItem(menu, label)).toBeDisabled()),
        );
        await expect(await contextMenuItem(menu, 'Find')).toBeEnabled();
        await mainPage.keyboard.press('Escape');
        await expect(menu).toHaveCount(0, { timeout: 15_000 });
      });

      await test.step('Copy with a selection copies it; the selection and the reference stay put', async () => {
        const point = centreOf(await word('wickedness'));
        await mainPage.mouse.dblclick(point.x, point.y);
        await expect.poll(() => readSelection(frame)).toBe('wickedness');
        // The selection is in verse 2, so the reference follows it there; read once it has.
        await expect(bcvTrigger).toHaveText('Jonah 1:2');
        await writeClipboardText(electronApp, CLIPBOARD_SENTINEL);
        await mainPage.mouse.click(point.x, point.y, { button: 'right' });
        await expect(menu).toBeVisible({ timeout: 15_000 });
        await expect(await contextMenuItem(menu, 'Copy')).toBeEnabled();
        await (await contextMenuItem(menu, 'Copy')).click();
        await expectClipboard(readClipboard, 'wickedness');
        // Both waits above put these checks well past the frame in which a read-only editor's
        // selection used to collapse to the end of the chapter and take the reference with it.
        await expect.poll(() => frameHasFocus(frame)).toBe(true);
        expect(await readSelection(frame)).toBe('wickedness');
        await expect(bcvTrigger).toHaveText('Jonah 1:2');
      });

      await test.step('Ctrl+C after the Copy pick copies again: the keyboard is back in the tab', async () => {
        await writeClipboardText(electronApp, CLIPBOARD_SENTINEL);
        await mainPage.keyboard.press(COPY_KEY);
        await expectClipboard(readClipboard, 'wickedness');
      });

      await test.step('after Escape the keyboard is back in the tab too: Ctrl+C copies the selection', async () => {
        const point = centreOf(await word('Amittai'));
        await mainPage.mouse.dblclick(point.x, point.y);
        await expect.poll(() => readSelection(frame)).toBe('Amittai');
        await mainPage.mouse.click(point.x, point.y, { button: 'right' });
        await expect(menu).toBeVisible({ timeout: 15_000 });
        await mainPage.keyboard.press('Escape');
        await expect(menu).toHaveCount(0, { timeout: 15_000 });
        await expect.poll(() => frameHasFocus(frame)).toBe(true);
        await writeClipboardText(electronApp, CLIPBOARD_SENTINEL);
        await mainPage.keyboard.press(COPY_KEY);
        await expectClipboard(readClipboard, 'Amittai');
      });

      await test.step("the top menu's Copy copies a selection in a read-only footnote row", async () => {
        await ensureFootnotesVisible(mainPage, frame, editorId);
        const inRow = centreOf(
          await wordBox(mainPage, editorId, frame, FOOTNOTES_PANE, 'Elohim', { insideNotes: true }),
        );
        await mainPage.mouse.dblclick(inRow.x, inRow.y);
        await expect.poll(() => readSelection(frame)).toBe('Elohim');
        await writeClipboardText(electronApp, CLIPBOARD_SENTINEL);
        await frame.locator(EDITOR_HAMBURGER_SELECTOR).first().click();
        // A project's Copy sits in the Edit flyout.
        await frame.getByRole('menuitem', { name: 'Edit', exact: true }).first().hover();
        const copyItem = frame.getByRole('menuitem', { name: /^Copy/ }).first();
        await expect(copyItem).toBeVisible({ timeout: 10_000 });
        await copyItem.click();
        await expectClipboard(readClipboard, 'Elohim');
      });
    });

    test.fixme(
      'a resource: exactly Copy and Find, and the top menu\'s "Copy selection" follows a footnote row selection',
      // No resource can be installed into the isolated project root (see the comment above the
      // read-only test). Needs: right-click on a resource's text shows exactly Copy (disabled
      // without a selection) and Find; with a selection in a read-only footnote row, the top menu's
      // "Copy selection" is enabled and copies it.
      async () => {},
    );
  });

  test.describe('the Bible Texts panel', () => {
    // Power mode, as in `bible-texts-panel-content-zoom.spec.ts`, whose way of giving the panel real
    // chapter text without a DBL resource this reuses: the container project's personal reference
    // list points at a second disposable project copy. Those copies live in the real projects
    // folder, so this launch cannot use the isolated project root.
    test.use({ interfaceMode: 'power' });

    let containerProject: CommentTestProject;
    let sourceProject: CommentTestProject;

    test.beforeAll(async () => {
      containerProject = await createCommentTestProject([], '_ctxContainer');
      sourceProject = await createCommentTestProject([], '_ctxSource');
    });

    test.afterAll(() => {
      cleanupCommentTestProject(containerProject);
      cleanupCommentTestProject(sourceProject);
    });

    test('Copy and Find only; Copy and Shift+F10 work, and Ctrl+F still works after a Copy pick', async ({
      mainPage,
      electronApp,
    }) => {
      test.slow();

      await waitForHomeTab(mainPage);
      const editorId = await openEditableScriptureEditorForProject(
        mainPage,
        containerProject.projectId,
      );
      await (await getEditorFrame(mainPage, editorId))
        .locator('.editor-container')
        .first()
        .waitFor({ timeout: 60_000 });
      await referenceProjectAsBibleText(mainPage, containerProject.projectId, sourceProject);
      await waitForPapiMethodRegistered('command:platformScriptureEditor.openResourceText');
      const panelId = await sendPapiRequestOnce<string | undefined>(
        'command:platformScriptureEditor.openResourceText',
        ['ScriptureResource', containerProject.projectId],
        undefined,
        60_000,
      );
      if (!panelId) throw new Error('openResourceText returned no web view id');
      await mainPage
        .locator(`iframe[data-web-view-id="${panelId}"]`)
        .waitFor({ state: 'attached', timeout: 60_000 });
      const panelFrame = await getEditorFrame(mainPage, panelId);
      // `resource-text-editor-container` (`RESOURCE_TEXT_EDITOR_CONTAINER_TEST_ID`) mounts only once
      // the panel has resolved a chapter.
      const panelText = panelFrame.getByTestId('resource-text-editor-container');
      await panelText.waitFor({ timeout: 60_000 });
      await expect(panelText).toContainText('beginning', { timeout: 60_000 });
      const menu = platformContextMenu(mainPage);
      const readClipboard = () => readClipboardText(electronApp);
      const panelWord = (text: string) =>
        wordBox(
          mainPage,
          panelId,
          panelFrame,
          '[data-testid="resource-text-editor-container"]',
          text,
        );

      await test.step('right-click: exactly Copy and Find, Copy disabled without a selection', async () => {
        const point = centreOf(await panelWord('beginning'));
        await mainPage.mouse.click(point.x, point.y);
        await mainPage.mouse.click(point.x, point.y, { button: 'right' });
        await expect(menu).toBeVisible({ timeout: 15_000 });
        expect(await readContextMenuLabels(menu)).toEqual(['Copy', 'Find']);
        await expect(await contextMenuItem(menu, 'Copy')).toBeDisabled();
        await mainPage.keyboard.press('Escape');
        await expect(menu).toHaveCount(0, { timeout: 15_000 });
      });

      await test.step('Copy with a selection copies it', async () => {
        const point = centreOf(await panelWord('beginning'));
        await mainPage.mouse.dblclick(point.x, point.y);
        await expect.poll(() => readSelection(panelFrame)).toBe('beginning');
        await writeClipboardText(electronApp, CLIPBOARD_SENTINEL);
        await mainPage.mouse.click(point.x, point.y, { button: 'right' });
        await expect(menu).toBeVisible({ timeout: 15_000 });
        await (await contextMenuItem(menu, 'Copy')).click();
        await expectClipboard(readClipboard, 'beginning');
        await expect.poll(() => readSelection(panelFrame)).toBe('beginning');
      });

      await test.step('Shift+F10 with the selection opens the same menu', async () => {
        await expect.poll(() => frameHasFocus(panelFrame)).toBe(true);
        await mainPage.keyboard.press('Shift+F10');
        await expect(menu).toBeVisible({ timeout: 15_000 });
        expect(await readContextMenuLabels(menu)).toEqual(['Copy', 'Find']);
        await expect(await contextMenuItem(menu, 'Copy')).toBeEnabled();
        await mainPage.keyboard.press('Escape');
        await expect(menu).toHaveCount(0, { timeout: 15_000 });
      });

      await test.step('Ctrl+F after a Copy pick opens Find with the selection: the keyboard is in the panel', async () => {
        const point = centreOf(await panelWord('beginning'));
        await mainPage.mouse.click(point.x, point.y, { button: 'right' });
        await expect(menu).toBeVisible({ timeout: 15_000 });
        await (await contextMenuItem(menu, 'Copy')).click();
        await expect(menu).toHaveCount(0, { timeout: 15_000 });
        await expect.poll(() => frameHasFocus(panelFrame)).toBe(true);
        await mainPage.keyboard.press(FIND_KEY);
        const findId = await waitForOpenWebViewIdByType(mainPage, FIND_WEB_VIEW_TYPE, 30_000);
        const findFrame = await getEditorFrame(mainPage, findId);
        await expect(findFrame.locator('#search-term')).toHaveValue('beginning', {
          timeout: 20_000,
        });
      });
    });
  });

  // The Enhanced Resources Scripture pane needs a Marble resource, which no isolated launch has:
  // its specs live in the local-only `tests/enhanced-resources/` tree. Needs: a right-click in the
  // pane's text shows the platform menu with Copy, and a right-click on an annotated word shows it
  // too, with no page error.
  test.fixme('Enhanced Resources Scripture pane: the platform menu shows Copy', async () => {});
});

/**
 * Clears the Find tab's search term and history for the sample project: both persist in the shared
 * `dev-appdata`, outside the isolated project root.
 */
async function clearSampleProjectFindState(): Promise<void> {
  await sendPapiRequestOnce(
    'object:platformScripture.findHistory-data.setHistory',
    [SAMPLE_WEB_PROJECT_ID, []],
    undefined,
    15_000,
  );
  await sendPapiRequestOnce(
    'object:platformScripture.findHistory-data.setLastSearchTerm',
    [SAMPLE_WEB_PROJECT_ID, ''],
    undefined,
    15_000,
  );
}

/**
 * Points `containerProjectId`'s personal reference list at `source`, so the Bible Texts panel
 * opened for the container shows `source`'s text. The same call as in
 * `bible-texts-panel-content-zoom.spec.ts`; see its comment for why the user-scope list.
 */
async function referenceProjectAsBibleText(
  page: Page,
  containerProjectId: string,
  source: CommentTestProject,
): Promise<void> {
  await page.evaluate(
    async ({ containerId, sourceId, sourceName }) => {
      // The renderer exposes `papi` on `globalThis`, untyped here.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const win = window as unknown as {
        papi: {
          projectDataProviders: {
            get: (
              pdpType: string,
              projectId: string,
            ) => Promise<{
              setUserReferencedProjectsAndResources: (value: unknown) => Promise<boolean>;
            }>;
          };
        };
      };
      const pdp = await win.papi.projectDataProviders.get(
        'platformScripture.textConnectionSettings',
        containerId,
      );
      await pdp.setUserReferencedProjectsAndResources({
        dataVersion: '1.1.0',
        items: [{ type: 'project', name: sourceName, id: sourceId }],
      });
    },
    { containerId: containerProjectId, sourceId: source.projectId, sourceName: source.shortName },
  );
}
