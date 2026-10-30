/**
 * The clipboard in Simple mode's editable view — the paragraph-structure preset, markers hidden and
 * paragraph markers drawn in a gutter — judged by the book file on disk and the OS clipboard:
 *
 * 1. **Locked structure (Simple's default), copy across a paragraph break and paste elsewhere.** The
 *    OS clipboard's text carries the prose and the copied footnote's text but no marker bytes (the
 *    gutter glyph `\q1 ` is display, not text). The paste joins the copied lines into the verse it
 *    lands in with one space, its footnote included, and adds no paragraph.
 * 2. **Locked structure, paste a URL from another app.** The view cannot store `\` or `//`, so the
 *    paste goes in without them (`https:example.org`) and the user is told.
 * 3. **Unlocked structure, cut across a paragraph break and paste it straight back.** The book file is
 *    byte-identical to before the cut: the paragraph break and its marker come back.
 *
 * Saved text is compared whitespace-normalized in steps 1 and 2, because the chapter's first save
 * rewrites line endings and trailing spaces (catalog rows S-2 and E-1 in
 * `.context/standards/Scripture-Data-Fidelity-Catalog.md`); step 3 compares bytes, from a file the
 * app has already saved.
 *
 * The pasted footnote's own markup is not pinned here; `native-paste.spec.ts` and
 * `no-unasked-edits.body.ts` pin it byte for byte.
 *
 * ONE test() per spec file on purpose (the isolated fixture is test-scoped); the steps share the
 * one Electron instance, in order.
 *
 * Runs against an isolated project root: `npm run test:e2e:isolated
 * tests/isolated/scripture-editor/hidden-view-clipboard.spec.ts`.
 */
import fs from 'fs';
import { test, expect } from '../../../fixtures/isolated.fixture';
import { waitForAppReady } from '../../../fixtures/helpers';
import {
  COPY_KEY,
  CUT_KEY,
  installedBookPath,
  noUnaskedEditsTestOptions,
  PASTE_KEY,
  selectInEditor,
  SIMPLE_PARAGRAPH_STRUCTURE_VIEW,
  waitForSaveToSettle,
} from '../../../fixtures/no-unasked-edits.body';
import {
  makeSampleProjectEditable,
  navigateToolbarBcv,
  openEditableScriptureEditorForProject,
  SAMPLE_WEB_PROJECT_ID,
  unlockSampleProjectStructure,
} from '../../../fixtures/scripture-editor-helpers';
import {
  clearRecordedToasts,
  installToastProbe,
  recordedToasts,
} from '../../../fixtures/toast-recorder';

test.use(noUnaskedEditsTestOptions(SIMPLE_PARAGRAPH_STRUCTURE_VIEW));

const JONAH_BOOK_FILE = '32JONengWEBUS.SFM';

/** Text near the end of Jonah 2, proving the chapter's own content has rendered. */
const JONAH_2_RENDERED_TEXT = 'the bottoms of the mountains';

/** Written to the OS clipboard before a copy, so the poll measures the copy's own text. */
const CLIPBOARD_SENTINEL = 'HIDDENVIEWCLIPBOARDSENTINELNOTCOPIED';

/** The structure-lock toggle's accessible name; `aria-pressed` is whether structure is locked. */
const STRUCTURE_LOCK_BUTTON_NAME = 'Toggle structure protection';

/** The notice for a paste that lost `\` or `//`. */
const REMOVED_FROM_PASTE_MESSAGE =
  "Removed \\ and // from the pasted text. They can't be added in this view.";

// Step 1. Jonah 2:2, from the `\q2` line "He answered me." across the `\q1` break into "Out of the
// belly of Sheol", past its footnote, to just before "cried.". Pasted into 2:1.
const COPY_FROM = 'He |answered me.';
const COPY_TO = ' I |cried.';
const COPIED_NOTE_TEXT = 'Sheol is the place of the dead.';
const PASTE_POINT = 'his God, |out of the fish’s belly';
/** 2:1's text at the paste point, before the paste. */
const PASTE_SITE = 'his God, out of the fish’s belly';
/**
 * 2:1 after the paste, whitespace-normalized: the two copied lines joined by one space, the copied
 * footnote (group 1) where it stood.
 */
const PASTED_SITE =
  /his God, answered me\. Out of the belly of Sheol(\\f \+ .*?\\f\*) I out of the fish’s belly/;

// Step 2. Jonah 2:4.
const URL_PASTE_POINT = 'yet I will look |again toward';
const PASTED_URL = 'https://example.org ';
const URL_SITE = 'yet I will look again toward';
const URL_SITE_AFTER = 'yet I will look https:example.org again toward';

// Step 3. Jonah 2:3, from the `\q2` line "in the heart of the seas." across the `\q1` break.
const CUT_FROM = 'in the heart |of the seas.';
const CUT_TO = 'The flood |was all around me.';
const CUT_TEXT_GONE = 'in the heart was all around me.';

/** The book file's text with every whitespace run as one space. */
function readNormalizedBook(): string {
  return fs.readFileSync(installedBookPath(JONAH_BOOK_FILE), 'utf8').replace(/\s+/g, ' ').trim();
}

/** Occurrences of `needle` in `haystack`. */
function countOf(haystack: string, needle: string): number {
  return haystack.split(needle).length - 1;
}

test.describe('the clipboard in Simple mode’s paragraph-structure view', () => {
  test('a copy across a paragraph break pastes as joined text, a URL loses its slashes with a notice, and an unlocked cut pastes back byte for byte', async ({
    mainPage,
    electronApp,
  }) => {
    // Heavy isolated test: its own Electron instance and several saves, each waited out on disk.
    test.setTimeout(600_000);

    // Simple mode's layout has no Home tab; this also suppresses the onboarding tour.
    await waitForAppReady(mainPage);
    await makeSampleProjectEditable();

    const editorId = await openEditableScriptureEditorForProject(mainPage, SAMPLE_WEB_PROJECT_ID);
    const editorFrame = mainPage.frameLocator(`iframe[data-web-view-id="${editorId}"]`);
    await editorFrame.locator('.editor-container').waitFor({ timeout: 60_000 });
    // `.first()`: a footnote popover renders an editor input of its own.
    const editorInput = editorFrame.locator('.editor-input').first();
    const structureLockButton = editorFrame.getByRole('button', {
      name: STRUCTURE_LOCK_BUTTON_NAME,
    });
    const bookPath = installedBookPath(JONAH_BOOK_FILE);

    await installToastProbe(mainPage);
    await navigateToolbarBcv(mainPage, 'Jonah 2:1');
    await expect(editorInput).toContainText(JONAH_2_RENDERED_TEXT, { timeout: 60_000 });
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

    await test.step('locked: a copy across a paragraph break pastes as one line of the verse', async () => {
      const before = fs.readFileSync(bookPath);
      const normalizedBefore = readNormalizedBook();
      expect(countOf(normalizedBefore, PASTE_SITE)).toBe(1);

      await electronApp.evaluate(
        ({ clipboard }, sentinel) => clipboard.writeText(sentinel),
        CLIPBOARD_SENTINEL,
      );
      await selectInEditor(editorInput, COPY_FROM, COPY_TO);
      await editorInput.press(COPY_KEY);
      // The copy reaches the OS clipboard asynchronously; the sentinel makes the poll measure it.
      await expect
        .poll(() => electronApp.evaluate(({ clipboard }) => clipboard.readText()), {
          message: 'the copy never reached the OS clipboard',
          timeout: 15_000,
        })
        .not.toBe(CLIPBOARD_SENTINEL);
      const copiedText = await electronApp.evaluate(({ clipboard }) => clipboard.readText());
      test
        .info()
        .annotations.push({ type: 'copied text', description: JSON.stringify(copiedText) });
      expect.soft(copiedText, 'the copy should carry no marker bytes').not.toContain('\\');
      expect.soft(copiedText, 'the copy should carry both copied lines').toContain('answered me.');
      expect.soft(copiedText).toContain('Out of the belly of Sheol');
      expect
        .soft(copiedText, "the copy should carry the footnote's text")
        .toContain(COPIED_NOTE_TEXT);

      await clearRecordedToasts(mainPage);
      await selectInEditor(editorInput, PASTE_POINT);
      await editorInput.press(PASTE_KEY);
      const afterPaste = await waitForSaveToSettle(mainPage, bookPath, before);
      expect(afterPaste, 'the paste never saved to disk').toBeDefined();

      const normalizedAfter = readNormalizedBook();
      test.info().annotations.push({
        type: 'saved',
        description: JSON.stringify(
          normalizedAfter.slice(normalizedAfter.indexOf('\\v 1 Then Jonah prayed')).slice(0, 400),
        ),
      });
      const pasted = PASTED_SITE.exec(normalizedAfter);
      expect(
        pasted,
        '2:1 should hold the copied lines joined by a space, footnote included',
      ).not.toBeNull();
      if (!pasted) return;
      expect
        .soft(pasted[1], 'the pasted footnote should carry its text')
        .toContain(COPIED_NOTE_TEXT);
      // Nothing else changed: taking the paste back out leaves the book as it was.
      expect(normalizedAfter.replace(pasted[0], PASTE_SITE)).toBe(normalizedBefore);
      expect(
        await recordedToasts(mainPage),
        'a copy of the view pasted into it removes nothing, so it raises no notice',
      ).not.toEqual(expect.arrayContaining([expect.stringContaining('Removed \\ and //')]));
    });

    await test.step('locked: a URL pasted from another app goes in without its slashes, with a notice', async () => {
      const before = fs.readFileSync(bookPath);
      const normalizedBefore = readNormalizedBook();
      expect(countOf(normalizedBefore, URL_SITE)).toBe(1);

      await clearRecordedToasts(mainPage);
      await electronApp.evaluate(({ clipboard }, plain) => clipboard.writeText(plain), PASTED_URL);
      await selectInEditor(editorInput, URL_PASTE_POINT);
      await editorInput.press(PASTE_KEY);
      const afterPaste = await waitForSaveToSettle(mainPage, bookPath, before);
      expect(afterPaste, 'the paste never saved to disk').toBeDefined();

      expect(readNormalizedBook()).toBe(normalizedBefore.replace(URL_SITE, URL_SITE_AFTER));
      await expect
        .poll(() => recordedToasts(mainPage), {
          message: 'the paste should tell the user that \\ and // were removed',
          timeout: 20_000,
        })
        .toEqual(expect.arrayContaining([expect.stringContaining(REMOVED_FROM_PASTE_MESSAGE)]));
    });

    await test.step('unlocked: a cut across a paragraph break pasted straight back restores the file byte for byte', async () => {
      await unlockSampleProjectStructure();
      await expect(structureLockButton).toHaveAttribute('aria-pressed', 'false', {
        timeout: 30_000,
      });

      const before = fs.readFileSync(bookPath);
      expect(countOf(readNormalizedBook(), CUT_TEXT_GONE)).toBe(0);

      await electronApp.evaluate(
        ({ clipboard }, sentinel) => clipboard.writeText(sentinel),
        CLIPBOARD_SENTINEL,
      );
      await selectInEditor(editorInput, CUT_FROM, CUT_TO);
      await editorInput.press(CUT_KEY);
      await expect
        .poll(() => electronApp.evaluate(({ clipboard }) => clipboard.readText()), {
          message: 'the cut never reached the OS clipboard',
          timeout: 15_000,
        })
        .not.toBe(CLIPBOARD_SENTINEL);
      const afterCut = await waitForSaveToSettle(mainPage, bookPath, before);
      expect(afterCut, 'the cut never saved to disk').toBeDefined();
      if (!afterCut) return;
      expect(countOf(readNormalizedBook(), CUT_TEXT_GONE), 'the cut should remove the range').toBe(
        1,
      );

      // The caret is where the cut range was.
      await editorInput.press(PASTE_KEY);
      const afterPaste = await waitForSaveToSettle(mainPage, bookPath, afterCut);
      expect(afterPaste, 'the paste never saved to disk').toBeDefined();
      if (!afterPaste) return;
      expect(afterPaste.toString('utf8')).toBe(before.toString('utf8'));
      expect(afterPaste.equals(before), 'the file should be byte-identical to before the cut').toBe(
        true,
      );
    });
  });
});
