/**
 * E2E for closing an unclosed footnote in the Scripture text by typing its closer, then undoing.
 *
 * An unclosed note (`\f + \ft asdf`, no `\f*`) at the end of a paragraph shows expanded in the
 * text. Typing `\f*` between `as` and `df` closes the note there: the note keeps `as` and `df`
 * moves out after it. One undo must put everything back as it was before the closer was typed — the
 * note open again, holding all of `asdf`, and no `\f*` anywhere.
 *
 * The note is built the way a person would: `\f + \ft as` pasted (typing `\f ` would insert a
 * whole, closed note, as the marker palette does), then `df` typed into it after a pause, so the
 * paste, the typing and the closer are separate steps in the text's undo history. The typed `\f*`
 * goes through the `\` marker palette, which commits the closer into the text in one update.
 *
 * Closing the note is an edit of an existing note, not a new one: focus stays in the Scripture
 * text, no row editor opens in the footnotes pane, and a closed pane stays closed. The undo is
 * pressed both straight after the close and after clicking elsewhere in the text first.
 *
 * With the footnotes pane closed and with it open. ONE test() per spec file on purpose: the
 * isolated fixture is test-scoped, and a second Electron instance against the shared renderer dev
 * server can fail to render new dock tabs (see isolated.fixture.ts). The cases run as test.step()s
 * sharing one instance, each at the end of its own chapter.
 *
 * Runs against an isolated project root (the bundled sample WEB is installed into the empty root):
 * `npm run test:e2e:isolated tests/isolated/scripture-editor/unclosed-note-close-undo.spec.ts`.
 */
import { type ElectronApplication, type Frame, type Page } from '@playwright/test';
import { test, expect } from '../../../fixtures/isolated.fixture';
import {
  getEditorFrame,
  makeSampleProjectEditable,
  navigateToolbarBcv,
  openEditableScriptureEditorForProject,
  SAMPLE_WEB_PROJECT_ID,
  sendCommandWithId,
  waitForHomeTab,
} from '../../../fixtures/scripture-editor-helpers';

// Power mode: the editor opens in Standard view, where notes are edited in the footnotes pane.
test.use({
  interfaceMode: 'power',
  electronLaunchOptions: { isolatedProjectRoot: true, envOverrides: { DEV_NOISY: 'false' } },
});

const FOOTNOTES_PANE_SELECTOR = '[data-footnotes-pane]';

/** The unclosed footnote pasted at the end of the chapter; `df` is typed into it afterwards. */
const UNCLOSED_NOTE_USFM = ' \\f + \\ft as';

/** Longer than the editor's undo-merge window, so the steps around it get undo entries of their own. */
const PAUSE_MS = 1_500;

/** What the end of the chapter holds. */
type ChapterEnd = {
  /** Text content of the chapter's last note, markers included. */
  noteText: string;
  /** Text after that note, to the end of its paragraph. */
  afterNote: string;
  /** The end of the Scripture text, for failure messages. */
  tail: string;
  /** Where DOM focus is: `text`, `pane`, or the focused element's tag. */
  focus: string;
  /** Whether the footnotes pane is shown. */
  paneOpen: boolean;
  /** Whether a note's row editor is open in the footnotes pane. */
  rowEditorOpen: boolean;
};

async function readChapterEnd(frame: Frame): Promise<ChapterEnd> {
  return frame.evaluate((paneSelector) => {
    const pane = document.querySelector(paneSelector);
    const text = Array.from(document.querySelectorAll<HTMLElement>('.editor-input')).find(
      (input) => !pane?.contains(input) && !input.closest('[data-radix-popper-content-wrapper]'),
    );
    if (!text) throw new Error('No Scripture text editor in the frame');
    const note = Array.from(text.querySelectorAll<HTMLElement>('.note')).at(-1);
    let afterNote = '';
    const paragraph = note?.parentElement;
    if (note && paragraph) {
      const range = document.createRange();
      range.setStartAfter(note);
      range.setEnd(paragraph, paragraph.childNodes.length);
      afterNote = range.toString();
    }
    const { activeElement } = document;
    let focus = activeElement?.tagName ?? 'none';
    if (activeElement && text.contains(activeElement)) focus = 'text';
    else if (activeElement && pane?.contains(activeElement)) focus = 'pane';
    return {
      noteText: note?.textContent ?? '',
      afterNote,
      tail: (text.textContent ?? '').slice(-80),
      focus,
      paneOpen: !!pane,
      rowEditorOpen: !!pane?.querySelector('.editor-input'),
    };
  }, FOOTNOTES_PANE_SELECTOR);
}

/** Where the undo is pressed from: straight after the close, or after clicking in the text. */
type UndoFrom = 'right-after-close' | 'after-clicking-in-the-text';

/**
 * Builds the unclosed note at the very end of the chapter, closes it between `as` and `df` by
 * typing its closer, then undoes once. Returns what the chapter end held after the close and after
 * the undo.
 */
async function closeThenUndo(
  electronApp: ElectronApplication,
  mainPage: Page,
  frame: Frame,
  undoFrom: UndoFrom,
): Promise<{ afterClose: ChapterEnd; afterUndo: ChapterEnd }> {
  const text = frame.locator('.editor-input').first();
  await text.click();
  await text.press('Control+End');
  await electronApp.evaluate(
    ({ clipboard }, usfm) => clipboard.writeText(usfm),
    UNCLOSED_NOTE_USFM,
  );
  await text.press('Control+V');
  await expect.poll(async () => (await readChapterEnd(frame)).noteText).toContain('as');
  await mainPage.waitForTimeout(PAUSE_MS);
  await mainPage.keyboard.type('df', { delay: 150 });
  await expect.poll(async () => (await readChapterEnd(frame)).noteText).toContain('asdf');
  // Positive control: the note is unclosed.
  expect((await readChapterEnd(frame)).noteText).not.toContain('\\f*');
  await mainPage.waitForTimeout(PAUSE_MS);

  // Caret between `as` and `df`: it is at the end of `asdf`, the note's last text.
  await mainPage.keyboard.press('ArrowLeft');
  await mainPage.keyboard.press('ArrowLeft');
  const caret = await frame.evaluate(() => {
    const selection = window.getSelection();
    const content = selection?.anchorNode?.textContent ?? '';
    const offset = selection?.anchorOffset ?? 0;
    return { before: content.slice(0, offset), after: content.slice(offset) };
  });
  expect(caret.before.endsWith('as') && caret.after.startsWith('df'), JSON.stringify(caret)).toBe(
    true,
  );
  await mainPage.keyboard.type('\\f*', { delay: 150 });
  await expect.poll(async () => (await readChapterEnd(frame)).afterNote).toContain('df');
  await mainPage.waitForTimeout(PAUSE_MS);
  const afterClose = await readChapterEnd(frame);

  if (undoFrom === 'after-clicking-in-the-text') {
    await text.click();
    await text.press('Control+End');
  }
  await mainPage.keyboard.press('Control+z');
  await mainPage.waitForTimeout(PAUSE_MS);
  const afterUndo = await readChapterEnd(frame);
  return { afterClose, afterUndo };
}

test.describe('closing an unclosed note in the text, then undoing', () => {
  test('one undo opens the note again holding all of its text', async ({
    electronApp,
    mainPage,
  }) => {
    // Heavy isolated test (own Electron instance, backend-readiness gates, typed marker sequences).
    test.slow();

    await waitForHomeTab(mainPage);
    await makeSampleProjectEditable();
    const editorId = await openEditableScriptureEditorForProject(mainPage, SAMPLE_WEB_PROJECT_ID);
    const editorFrameLocator = mainPage.frameLocator(`iframe[data-web-view-id="${editorId}"]`);
    await editorFrameLocator.locator('.editor-container').waitFor({ timeout: 60_000 });
    const frame = await getEditorFrame(mainPage, editorId);
    const pane = frame.locator(FOOTNOTES_PANE_SELECTOR);

    const runCase = async (
      reference: string,
      chapterEnd: string,
      paneOpen: boolean,
      undoFrom: UndoFrom,
    ) => {
      await navigateToolbarBcv(mainPage, reference);
      await expect(frame.locator('.editor-input').first()).toContainText(chapterEnd, {
        timeout: 60_000,
      });
      if ((await pane.count()) > 0 !== paneOpen)
        await sendCommandWithId(mainPage, 'platformScriptureEditor.toggleFootnotes', editorId);
      await expect(pane).toHaveCount(paneOpen ? 1 : 0, { timeout: 20_000 });

      const { afterClose, afterUndo } = await closeThenUndo(electronApp, mainPage, frame, undoFrom);

      // The close itself: the note keeps `as`, and `df` is after it.
      expect.soft(afterClose.noteText, JSON.stringify(afterClose)).toContain('as');
      expect.soft(afterClose.noteText, JSON.stringify(afterClose)).not.toContain('asdf');
      expect.soft(afterClose.afterNote, JSON.stringify(afterClose)).toContain('df');
      // Closing an existing note keeps the user typing in the text: no row editor, same pane.
      expect.soft(afterClose.focus, JSON.stringify(afterClose)).toBe('text');
      expect.soft(afterClose.paneOpen, JSON.stringify(afterClose)).toBe(paneOpen);
      expect.soft(afterClose.rowEditorOpen, JSON.stringify(afterClose)).toBe(false);
      // One undo: the note open again with all of its text, and no closer anywhere.
      expect.soft(afterUndo.noteText, JSON.stringify(afterUndo)).toContain('asdf');
      expect.soft(afterUndo.tail, JSON.stringify(afterUndo)).not.toContain('\\f*');
    };

    await test.step('pane closed, undo right after the close', () =>
      runCase('Luke 1:1', 'appearance to Israel', false, 'right-after-close'));
    await test.step('pane open, undo right after the close', () =>
      runCase('Luke 2:1', 'favor with God and men', true, 'right-after-close'));
    await test.step('pane closed, undo after clicking in the text', () =>
      runCase('Luke 3:1', 'the son of God', false, 'after-clicking-in-the-text'));
    await test.step('pane open, undo after clicking in the text', () =>
      runCase('Luke 4:1', 'synagogues of Galilee', true, 'after-clicking-in-the-text'));
  });
});
