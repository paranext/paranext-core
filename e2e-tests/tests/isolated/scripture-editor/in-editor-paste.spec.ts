/**
 * Pasting in Simple mode's editable view — the paragraph-structure preset, markers hidden,
 * structure locked — through the editor's own paste, which reads the clipboard with
 * `navigator.clipboard.read()`. That read returns no custom clipboard format, so a copy's node copy
 * travels in an attribute of its html (`scripture-editors`' `docs/clipboard-semantics.md`, S5). The
 * tests of the editor's own repo model the read; this spec goes through the real one. Judged by the
 * book file on disk:
 *
 * 1. **Ctrl+V.** Matthew 3:13's text across its footnote, copied and pasted into 3:14, saves exactly
 *    the copied USFM: the footnote comes back as it was, with no closers added.
 * 2. **The Edit flyout's Paste, and the right-click menu's Paste.** The same copy, pasted from each
 *    menu, saves the same bytes, in the editor.
 * 3. **A note's attributes through the real read.** A copy across a note with a category shows the
 *    read returning the html's attribute and no custom format. Rewritten to hold only its text and
 *    html, so that nothing else could carry the note, the copy pastes the note back with its
 *    `\cat`. The same clipboard with the attribute taken out of the html loses the `\cat`, which
 *    shows the attribute is what carried it.
 * 4. **A copy from the footnotes pane's row editor**, which shows markers as Standard view does,
 *    pasted into the text. The editor's own format of a Standard-view copy is not taken in a view
 *    that hides markers, so the paste reads the copy's text, which is its USFM marked as such: it
 *    goes in as text without its marker tokens, with no notice — no note and no marker of the row
 *    editor's comes with it.
 * 5. **Ctrl+V pressed while the next chapter is loading lands nowhere.** The keys are recorded inside
 *    the web view: every paste the chapter being left showed is what it saved, and at least one
 *    press while it was showing was held off. The new chapter holds no more pastes than were
 *    pressed once it had arrived.
 *
 * Saved text is compared whitespace-normalized, because the chapter's first save rewrites line
 * endings and trailing spaces (catalog rows S-2 and E-1 in
 * `.context/standards/Scripture-Data-Fidelity-Catalog.md`); `no-unasked-edits.body.ts` pins the
 * Ctrl+V paste of step 1 byte for byte.
 *
 * ONE test() per spec file on purpose (the isolated fixture is test-scoped); the steps share the
 * one Electron instance, in order.
 *
 * Runs against an isolated project root: `npm run test:e2e:isolated
 * tests/isolated/scripture-editor/in-editor-paste.spec.ts`.
 */
import fs from 'fs';
import type { Locator } from '@playwright/test';
import { test, expect } from '../../../fixtures/isolated.fixture';
import { sendPapiRequestOnce, waitForAppReady } from '../../../fixtures/helpers';
import {
  COPY_KEY,
  installedBookPath,
  noUnaskedEditsTestOptions,
  PASTE_KEY,
  selectInEditor,
  SIMPLE_PARAGRAPH_STRUCTURE_VIEW,
  waitForSaveToSettle,
} from '../../../fixtures/no-unasked-edits.body';
import {
  EDITOR_HAMBURGER_SELECTOR,
  findScriptureEditorFrame,
  getSampleProjectChapterUsfm,
  makeSampleProjectEditable,
  navigateToolbarBcv,
  openEditableScriptureEditorForProject,
  rewriteSampleProjectChapterUsfm,
  SAMPLE_WEB_PROJECT_ID,
  sendCommandWithId,
} from '../../../fixtures/scripture-editor-helpers';
import {
  clearRecordedToasts,
  installToastProbe,
  recordedToasts,
} from '../../../fixtures/toast-recorder';

test.use(noUnaskedEditsTestOptions(SIMPLE_PARAGRAPH_STRUCTURE_VIEW));

const MATTHEW_BOOK_FILE = '41MATengWEBUS.SFM';
const WEBSOCKET_PORT = 8876;

/** Text near the end of Matthew 3, proving the chapter's own content has rendered. */
const MATTHEW_3_RENDERED_TEXT = 'with whom I am well pleased';

/** Written to the OS clipboard before a copy, so the poll measures the copy's own text. */
const CLIPBOARD_SENTINEL = 'INEDITORPASTESENTINELNOTCOPIED';

/** The structure-lock toggle's accessible name; `aria-pressed` is whether structure is locked. */
const STRUCTURE_LOCK_BUTTON_NAME = 'Toggle structure protection';

/** Part of the notice for a paste that lost `\` or `//`. */
const REMOVED_FROM_PASTE_NOTICE = 'Removed \\ and //';

// Steps 1 and 2. 3:13, from "Galilee" across the footnote after "Jordan" to the end of " to John".
const NOTE_COPY_FROM = 'from |Galilee to the';
const NOTE_COPY_TO = ' to John|, to be';
/** The copied range's USFM, whitespace-normalized. */
const COPIED_USFM = 'Galilee to the Jordan\\f + \\fr 3:13 \\ft i.e., the Jordan River\\f* to John';
/** Where the copy is pasted in 3:14, by Ctrl+V, the Edit flyout and the right-click menu. */
const CTRL_V_POINT = 'saying, |“I need';
const EDIT_MENU_POINT = 'baptized by |you, and you come';
const CONTEXT_MENU_POINT = 'and you come |to me?';

// Step 3. A note with a category, written into 3:6 for this spec, since the sample text has none.
const CATEGORY_NOTE_FOLLOWS = 'They were baptized by him';
const CATEGORY_MARKUP = '\\cat TN\\cat*';
const CATEGORY_NOTE = `\\f + ${CATEGORY_MARKUP}\\fr 3:6 \\ft a categorized note\\f*`;
/** Text of the copied range ahead of its note, to count pastes whatever became of the note. */
const CATEGORY_COPIED_TEXT = 'were baptized by him';
const CATEGORY_COPY_FROM = 'They |were baptized';
const CATEGORY_COPY_TO = 'in the |Jordan, confessing';
/** The copied range's USFM, whitespace-normalized. */
const CATEGORY_COPIED_USFM = `were baptized by him${CATEGORY_NOTE} in the `;
const CATEGORY_PASTE_POINT = 'Therefore |produce fruit';
const CATEGORY_LOST_PASTE_POINT = 'and cast |into the fire';
/** The html attribute that carries the editor's node copy. */
const NODE_COPY_HTML_ATTRIBUTE = 'data-platform-editor-node-copy';

// Step 4. The 3:11 footnote's row, copied from inside its `\fr` text across the `\ft` marker into
// its `\ft` text, and pasted into 3:16.
const PANE_NOTE_TEXT = 'and with fire';
const PANE_COPY_FROM = '3:1|1';
const PANE_COPY_TO = 'TR and |NU add';
/** Part of the row editor's copy of that range, so only a copy of the range counts as one. */
const PANE_COPIED_MARKER_TEXT = '\\ft TR and';
const PANE_PASTE_POINT = 'Spirit of God |descending';
/** What the paste saves at that point: the copied USFM (`1 \ft TR and `) without its marker. */
const PANE_PASTED_TEXT = '1 TR and ';

// Step 5. Pasted while Matthew moves on a chapter.
const LOAD_PASTE_POINT = 'with whom I am |well pleased';
/** Pasted while the chapter changes. Matthew's own text has no `qzq` in it. */
const LOAD_PASTE_TOKEN = 'qzq';
const PASTES_PER_MOVE = 30;
const PASTE_INTERVAL_MS = 15;
/** The most chapter moves tried before concluding no press landed during one. */
const MOST_MOVES = 3;

/** What the web view recorded around one chapter move. */
interface MoveProbe {
  /** Ctrl+V presses while the editor still showed the chapter being left. */
  pressesWhileOld: number;
  /** Ctrl+V presses once it showed another chapter. */
  pressesAfter: number;
  /** Pasted tokens the chapter being left showed when recording started. */
  tokensShownAtStart: number;
  /** The most pasted tokens it ever showed. */
  mostTokensShown: number;
}

/** The book file's text with every whitespace run as one space. */
function readNormalizedBook(): string {
  return fs.readFileSync(installedBookPath(MATTHEW_BOOK_FILE), 'utf8').replace(/\s+/g, ' ').trim();
}

/** Occurrences of `needle` in `haystack`. */
function countOf(haystack: string, needle: string): number {
  return haystack.split(needle).length - 1;
}

/** `point`'s text without its caret, and with `inserted` at its caret. */
function pointWith(point: string, inserted = ''): string {
  return point.split('|').join(inserted);
}

/** `text` as a regular expression that matches it literally. */
function literally(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Whether the editor's root holds the focus in a document that has it. */
function isEditorFocused(editorInput: Locator): Promise<boolean> {
  return editorInput.evaluate(
    (root) => root.ownerDocument.hasFocus() && root.ownerDocument.activeElement === root,
  );
}

test.describe('the editor’s own paste in Simple mode’s paragraph-structure view', () => {
  test('a copied footnote pastes back exactly from Ctrl+V and both menus, a note’s category survives the real clipboard read, a pane copy pastes as text, and a paste during a chapter load lands nowhere', async ({
    mainPage,
    electronApp,
  }) => {
    // Heavy isolated test: its own Electron instance and several saves, each waited out on disk.
    test.setTimeout(600_000);

    // Simple mode's layout has no Home tab; this also suppresses the onboarding tour.
    await waitForAppReady(mainPage);
    await makeSampleProjectEditable();
    await rewriteSampleProjectChapterUsfm({ book: 'MAT', chapterNum: 3, verseNum: 1 }, (usfm) => {
      expect(countOf(usfm, CATEGORY_NOTE_FOLLOWS)).toBe(1);
      return usfm.replace(CATEGORY_NOTE_FOLLOWS, `${CATEGORY_NOTE_FOLLOWS}${CATEGORY_NOTE}`);
    });

    const editorId = await openEditableScriptureEditorForProject(mainPage, SAMPLE_WEB_PROJECT_ID);
    const editorFrame = mainPage.frameLocator(`iframe[data-web-view-id="${editorId}"]`);
    await editorFrame.locator('.editor-container').waitFor({ timeout: 60_000 });
    // `.first()`: the footnotes pane's row editor renders an editor input of its own.
    const editorInput = editorFrame.locator('.editor-input').first();
    const structureLockButton = editorFrame.getByRole('button', {
      name: STRUCTURE_LOCK_BUTTON_NAME,
    });
    const bookPath = installedBookPath(MATTHEW_BOOK_FILE);

    await installToastProbe(mainPage);
    await navigateToolbarBcv(mainPage, 'Matthew 3:13');
    await expect(editorInput).toContainText(MATTHEW_3_RENDERED_TEXT, { timeout: 60_000 });
    // The positive view checks: this is the paragraph-structure view, with structure locked.
    await expect
      .poll(
        () =>
          editorInput.evaluate(
            (root, selector) => root.matches(selector),
            SIMPLE_PARAGRAPH_STRUCTURE_VIEW.rootSelector,
          ),
        { message: 'the editor should be showing the paragraph-structure view', timeout: 30_000 },
      )
      .toBe(true);
    await expect(structureLockButton).toHaveAttribute('aria-pressed', 'true', { timeout: 30_000 });

    /**
     * Runs `paste` with the copy on the clipboard and the caret at `point`, waits for the save, and
     * checks that the book gained exactly `copiedUsfm` there.
     */
    const expectPastedAt = async (
      point: string,
      copiedUsfm: string,
      paste: () => Promise<void>,
    ) => {
      const before = fs.readFileSync(bookPath);
      const normalizedBefore = readNormalizedBook();
      expect(countOf(normalizedBefore, pointWith(point))).toBe(1);

      await clearRecordedToasts(mainPage);
      await selectInEditor(editorInput, point);
      await paste();
      const afterPaste = await waitForSaveToSettle(mainPage, bookPath, before);
      expect(afterPaste, 'the paste never saved to disk').toBeDefined();

      const normalizedAfter = readNormalizedBook();
      const expected = normalizedBefore.replace(pointWith(point), pointWith(point, copiedUsfm));
      if (normalizedAfter !== expected) {
        const at = normalizedAfter.indexOf(pointWith(point).split(' ')[0]);
        test.info().annotations.push({
          type: `saved near ${point}`,
          description: JSON.stringify(normalizedAfter.slice(Math.max(0, at - 300), at + 300)),
        });
      }
      expect(normalizedAfter, 'the book should gain exactly the copied USFM').toBe(expected);
      expect(
        await recordedToasts(mainPage),
        'a copy of the view pasted into it removes nothing, so it raises no notice',
      ).not.toEqual(expect.arrayContaining([expect.stringContaining(REMOVED_FROM_PASTE_NOTICE)]));
    };

    await test.step('Ctrl+V: a copy across a footnote pastes back exactly', async () => {
      expect(
        countOf(readNormalizedBook(), `from ${COPIED_USFM}, to be`),
        'the copied range should read as COPIED_USFM in the book',
      ).toBe(1);

      await electronApp.evaluate(
        ({ clipboard }, sentinel) => clipboard.writeText(sentinel),
        CLIPBOARD_SENTINEL,
      );
      await selectInEditor(editorInput, NOTE_COPY_FROM, NOTE_COPY_TO);
      await editorInput.press(COPY_KEY);
      // The copy reaches the OS clipboard asynchronously; the sentinel makes the poll measure it.
      await expect
        .poll(() => electronApp.evaluate(({ clipboard }) => clipboard.readText()), {
          message: 'the copy never reached the OS clipboard',
          timeout: 15_000,
        })
        .not.toBe(CLIPBOARD_SENTINEL);

      await expectPastedAt(CTRL_V_POINT, COPIED_USFM, () => editorInput.press(PASTE_KEY));
    });

    await test.step('the Edit flyout’s Paste lands in the editor, which keeps the focus', async () => {
      const hamburger = editorFrame.locator(EDITOR_HAMBURGER_SELECTOR);
      await expectPastedAt(EDIT_MENU_POINT, COPIED_USFM, async () => {
        await expect(hamburger).toBeVisible({ timeout: 15_000 });
        await hamburger.click();
        await editorFrame.getByRole('menuitem', { name: /^Edit/ }).click();
        await editorFrame.getByRole('menuitem', { name: 'Paste', exact: true }).click();
      });
      await expect(editorFrame.getByRole('menu')).toHaveCount(0);
      await expect
        .poll(() => isEditorFocused(editorInput), {
          message: 'the editor should have the focus after the Edit flyout’s Paste',
        })
        .toBe(true);
      await expect(hamburger).not.toBeFocused();
    });

    await test.step('the right-click menu’s Paste lands in the editor, which keeps the focus', async () => {
      const contextMenu = editorFrame.locator('.typeahead-popover.auto-embed-menu');
      await expectPastedAt(CONTEXT_MENU_POINT, COPIED_USFM, async () => {
        // Right-clicked at the caret, on the left edge of the character after it, so the click
        // leaves the caret where the paste belongs.
        const at = await editorInput.evaluate((root) => {
          const selection = root.ownerDocument.getSelection();
          if (!selection || selection.rangeCount === 0) throw new Error('No caret to click at');
          const caret = selection.getRangeAt(0);
          const next = root.ownerDocument.createRange();
          next.setStart(caret.startContainer, caret.startOffset);
          next.setEnd(caret.startContainer, caret.startOffset + 1);
          const rect = next.getBoundingClientRect();
          return { x: rect.left + 1, y: rect.top + rect.height / 2 };
        });
        const frameBox = await mainPage
          .locator(`iframe[data-web-view-id="${editorId}"]`)
          .boundingBox();
        if (!frameBox) throw new Error('The editor frame has no bounding box');
        await mainPage.mouse.click(frameBox.x + at.x, frameBox.y + at.y, { button: 'right' });
        await expect(contextMenu).toBeAttached({ timeout: 15_000 });
        await contextMenu.getByRole('option', { name: 'Paste', exact: true }).click();
      });
      await expect(contextMenu).not.toBeAttached({ timeout: 15_000 });
      await expect
        .poll(() => isEditorFocused(editorInput), {
          message: 'the editor should have the focus after the right-click menu’s Paste',
        })
        .toBe(true);
    });

    await test.step('a note’s category survives Ctrl+V through the real clipboard read', async () => {
      expect(
        countOf(readNormalizedBook(), `They ${CATEGORY_COPIED_USFM}Jordan, confessing`),
        'the copied range should read as CATEGORY_COPIED_USFM in the book',
      ).toBe(1);
      const categoriesBefore = countOf(readNormalizedBook(), CATEGORY_MARKUP);
      const copiesBefore = countOf(readNormalizedBook(), CATEGORY_COPIED_TEXT);

      await electronApp.evaluate(
        ({ clipboard }, sentinel) => clipboard.writeText(sentinel),
        CLIPBOARD_SENTINEL,
      );
      await selectInEditor(editorInput, CATEGORY_COPY_FROM, CATEGORY_COPY_TO);
      await editorInput.press(COPY_KEY);
      await expect
        .poll(() => electronApp.evaluate(({ clipboard }) => clipboard.readText()), {
          message: 'the copy never reached the OS clipboard',
          timeout: 15_000,
        })
        .not.toBe(CLIPBOARD_SENTINEL);

      // What the editor's paste will get: the same read it makes, in its own frame.
      const read = await editorInput.evaluate(async (root, attribute) => {
        const items = await root.ownerDocument.defaultView?.navigator.clipboard.read();
        const item = items?.[0];
        if (!item) throw new Error('The clipboard read returned nothing');
        const html = await (await item.getType('text/html')).text();
        const parsed = new DOMParser().parseFromString(html, 'text/html');
        return {
          types: [...item.types],
          nodeCopy: parsed.querySelector(`[${attribute}]`)?.getAttribute(attribute) ?? undefined,
        };
      }, NODE_COPY_HTML_ATTRIBUTE);
      test.info().annotations.push({ type: 'read types', description: read.types.join(', ') });
      expect(read.types, 'the read returns no custom format').not.toContain(
        'application/x-lexical-editor',
      );
      expect(read.nodeCopy, 'the read keeps the html’s attribute').toBeDefined();
      expect(read.nodeCopy, 'the attribute holds the note’s category').toContain('"TN"');

      // Only the text and the html from here on, so the attribute is all that differs below.
      await electronApp.evaluate(({ clipboard }) =>
        clipboard.write({ text: clipboard.readText(), html: clipboard.readHTML() }),
      );
      await expectPastedAt(CATEGORY_PASTE_POINT, CATEGORY_COPIED_USFM, () =>
        editorInput.press(PASTE_KEY),
      );
      expect(countOf(readNormalizedBook(), CATEGORY_MARKUP)).toBe(categoriesBefore + 1);

      // The control: the same clipboard with only the attribute taken out, as another program's html.
      await electronApp.evaluate(
        ({ clipboard }, attribute) =>
          clipboard.write({
            text: clipboard.readText(),
            html: clipboard.readHTML().replace(new RegExp(`\\s${attribute}="[^"]*"`), ''),
          }),
        NODE_COPY_HTML_ATTRIBUTE,
      );
      const before = fs.readFileSync(bookPath);
      await selectInEditor(editorInput, CATEGORY_LOST_PASTE_POINT);
      await editorInput.press(PASTE_KEY);
      const afterControl = await waitForSaveToSettle(mainPage, bookPath, before);
      expect(afterControl, 'the control paste never saved to disk').toBeDefined();
      const normalizedAfter = readNormalizedBook();
      expect(
        countOf(normalizedAfter, CATEGORY_COPIED_TEXT),
        'the control paste should have gone in',
      ).toBe(copiesBefore + 2);
      expect(
        countOf(normalizedAfter, CATEGORY_MARKUP),
        'without the attribute the html cannot carry the category',
      ).toBe(categoriesBefore + 1);
    });

    await test.step('a copy from the footnotes pane’s row editor pastes into the text as the view shows it', async () => {
      const footnotesPane = editorFrame.locator('[data-footnotes-pane]');
      const rowEditor = footnotesPane.locator('li[data-state="editing"] .editor-input');
      if ((await footnotesPane.count()) === 0)
        await sendCommandWithId(mainPage, 'platformScriptureEditor.toggleFootnotes', editorId);
      await expect(footnotesPane).toHaveCount(1, { timeout: 20_000 });
      await footnotesPane.locator('li[role="option"]').filter({ hasText: PANE_NOTE_TEXT }).click();
      await expect(rowEditor).toContainText(PANE_NOTE_TEXT, { timeout: 20_000 });
      // The row editor shows markers as Standard view does.
      await expect(rowEditor).toHaveClass(/\bmarker-editable\b/);
      // The row editor places its caret over a timeout and an animation frame after it loads, which
      // can replace a selection made before then, so the copy is retried until it holds the range.
      await expect(async () => {
        await electronApp.evaluate(
          ({ clipboard }, sentinel) => clipboard.writeText(sentinel),
          CLIPBOARD_SENTINEL,
        );
        await selectInEditor(rowEditor, PANE_COPY_FROM, PANE_COPY_TO);
        await rowEditor.press(COPY_KEY);
        await expect
          .poll(() => electronApp.evaluate(({ clipboard }) => clipboard.readText()), {
            message: 'the row editor’s copy never reached the OS clipboard',
            timeout: 2_000,
          })
          .toContain(PANE_COPIED_MARKER_TEXT);
      }).toPass({ timeout: 20_000 });
      const copiedText = await electronApp.evaluate(({ clipboard }) => clipboard.readText());
      test
        .info()
        .annotations.push({ type: 'row editor copy', description: JSON.stringify(copiedText) });
      await mainPage.keyboard.press('Escape');
      await expect(footnotesPane.locator('li[data-state="editing"]')).toHaveCount(0, {
        timeout: 20_000,
      });

      const before = fs.readFileSync(bookPath);
      const normalizedBefore = readNormalizedBook();
      const site = pointWith(PANE_PASTE_POINT);
      expect(countOf(normalizedBefore, site)).toBe(1);
      await clearRecordedToasts(mainPage);
      await selectInEditor(editorInput, PANE_PASTE_POINT);
      await editorInput.press(PASTE_KEY);
      const afterPaste = await waitForSaveToSettle(mainPage, bookPath, before);
      expect(afterPaste, 'the paste never saved to disk').toBeDefined();

      const normalizedAfter = readNormalizedBook();
      const [beforeCaret, afterCaret] = PANE_PASTE_POINT.split('|');
      const pasted = new RegExp(`${literally(beforeCaret)}(.*?)${literally(afterCaret)}`).exec(
        normalizedAfter,
      );
      test.info().annotations.push({
        type: 'pasted from the row editor',
        description: JSON.stringify(pasted?.[1]),
      });
      test.info().annotations.push({
        type: 'notices',
        description: JSON.stringify(await recordedToasts(mainPage)),
      });
      expect(pasted, '3:16 should hold the paste at the paste point').not.toBeNull();
      if (!pasted) return;
      const inserted = pasted[1];
      expect(inserted, "the copy's USFM should go in as text, without its marker").toBe(
        PANE_PASTED_TEXT,
      );
      expect(
        await recordedToasts(mainPage),
        'removing a marker is not news: the view never asked the user to type one',
      ).not.toEqual(expect.arrayContaining([expect.stringContaining(REMOVED_FROM_PASTE_NOTICE)]));
      // Nothing else changed: taking the paste back out leaves the book as it was.
      expect(normalizedAfter.replace(pasted[0], site)).toBe(normalizedBefore);
    });

    await test.step('Ctrl+V pressed while the next chapter loads lands nowhere', async () => {
      const editorEvalFrame = await findScriptureEditorFrame(mainPage);
      const chapterMarker = editorInput.locator('[data-marker="c"][data-number]');
      const book = { book: 'MAT', verseNum: 1 };
      const tokensSaved = async (chapterNum: number) =>
        countOf(
          (await getSampleProjectChapterUsfm({ ...book, chapterNum })) ?? '',
          LOAD_PASTE_TOKEN,
        );

      await electronApp.evaluate(
        ({ clipboard }, token) => clipboard.writeText(`${token} `),
        LOAD_PASTE_TOKEN,
      );
      await selectInEditor(editorInput, LOAD_PASTE_POINT);

      /**
       * Starts recording for a move away from chapter `fromChapter`, inside the web view. The
       * counts are kept on the document element, where {@link stopProbe} reads them back.
       */
      const startProbe = (fromChapter: number) =>
        editorEvalFrame.evaluate(
          ({ from, token }) => {
            const { dataset } = document.documentElement;
            const editorRoot = document.querySelector('.editor-input');
            const showsOldChapter = () =>
              editorRoot
                ?.querySelector('[data-marker="c"][data-number]')
                ?.getAttribute('data-number') === String(from);
            let pressesWhileOld = 0;
            let pressesAfter = 0;
            let mostTokensShown = 0;
            const tokensShown = () => (editorRoot?.textContent ?? '').split(token).length - 1;
            dataset.probeTokensShownAtStart = String(tokensShown());
            const record = () => {
              dataset.probePressesWhileOld = String(pressesWhileOld);
              dataset.probePressesAfter = String(pressesAfter);
              dataset.probeMostTokensShown = String(mostTokensShown);
            };
            const recordShown = () => {
              if (!showsOldChapter()) return;
              mostTokensShown = Math.max(mostTokensShown, tokensShown());
              record();
            };
            recordShown();
            // Capture phase on the window, ahead of everything in the editor, so a press held off
            // is still counted.
            const onKeyDown = (event: KeyboardEvent) => {
              if (event.key.toLowerCase() !== 'v' || !(event.ctrlKey || event.metaKey)) return;
              if (showsOldChapter()) pressesWhileOld += 1;
              else pressesAfter += 1;
              record();
            };
            window.addEventListener('keydown', onKeyDown, true);
            const observer = new MutationObserver(recordShown);
            if (editorRoot)
              observer.observe(editorRoot, { subtree: true, childList: true, characterData: true });
            document.addEventListener(
              'paste-probe-stop',
              () => {
                window.removeEventListener('keydown', onKeyDown, true);
                observer.disconnect();
              },
              { once: true },
            );
          },
          { from: fromChapter, token: LOAD_PASTE_TOKEN },
        );
      const stopProbe = (): Promise<MoveProbe> =>
        editorEvalFrame.evaluate(() => {
          document.dispatchEvent(new Event('paste-probe-stop'));
          const { dataset } = document.documentElement;
          return {
            pressesWhileOld: Number(dataset.probePressesWhileOld),
            pressesAfter: Number(dataset.probePressesAfter),
            tokensShownAtStart: Number(dataset.probeTokensShownAtStart),
            mostTokensShown: Number(dataset.probeMostTokensShown),
          };
        });

      let heldOffAPaste = false;
      for (let move = 0; move < MOST_MOVES && !heldOffAPaste; move += 1) {
        const fromChapter = 3 + move;
        // Sequential on purpose: each move starts from the chapter the one before arrived at.
        // eslint-disable-next-line no-await-in-loop
        heldOffAPaste =
          await test.step(`pasting while moving from Matthew ${fromChapter}`, async () => {
            await expect(chapterMarker).toHaveAttribute('data-number', String(fromChapter), {
              timeout: 30_000,
            });
            const tokensBefore = {
              old: await tokensSaved(fromChapter),
              next: await tokensSaved(fromChapter + 1),
            };
            await startProbe(fromChapter);
            // One stream of presses spanning the move: `keyboard` reaches the editor because its
            // frame holds the focus.
            await Promise.all([
              (async () => {
                // Paced presses, each one after the one before.
                /* eslint-disable no-await-in-loop */
                for (let i = 0; i < PASTES_PER_MOVE; i += 1) {
                  await mainPage.keyboard.press(PASTE_KEY);
                  await mainPage.waitForTimeout(PASTE_INTERVAL_MS);
                }
                /* eslint-enable no-await-in-loop */
              })(),
              (async () => {
                await mainPage.waitForTimeout(PASTE_INTERVAL_MS * 3);
                await sendPapiRequestOnce('command:platform.goToNextChapter', [], WEBSOCKET_PORT);
              })(),
            ]);
            await expect(chapterMarker).toHaveAttribute('data-number', String(fromChapter + 1), {
              timeout: 30_000,
            });
            // Let pastes asked for during the move finish, wherever they are going to land.
            await mainPage.waitForTimeout(3_000);
            const probe = await stopProbe();
            test.info().annotations.push({ type: 'probe', description: JSON.stringify(probe) });

            // Every paste the chapter being left showed is what it saved, and nothing more.
            await expect
              .poll(async () => (await tokensSaved(fromChapter)) - tokensBefore.old, {
                timeout: 30_000,
              })
              .toBe(probe.mostTokensShown - probe.tokensShownAtStart);
            // The new chapter holds no paste pressed before it arrived.
            const landedInNext = (await tokensSaved(fromChapter + 1)) - tokensBefore.next;
            expect(landedInNext).toBeLessThanOrEqual(probe.pressesAfter);

            return probe.pressesWhileOld > probe.mostTokensShown - probe.tokensShownAtStart;
          });
      }
      // Without a press while the chapter changed there was nothing to hold off, and the checks
      // above proved nothing.
      expect(heldOffAPaste, 'no Ctrl+V was pressed while the editor was changing chapter').toBe(
        true,
      );
    });
  });
});
