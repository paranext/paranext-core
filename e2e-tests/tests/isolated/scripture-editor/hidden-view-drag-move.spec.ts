/**
 * A drag-move in Simple mode's editable view — the paragraph-structure preset, markers hidden —
 * with structure unlocked, made with a real mouse drag (Chromium's native drag and drop in the
 * editor's frame) and judged by the editor and the book file on disk:
 *
 * 1. **A move that loses nothing goes through.** The `/` of `one/two` dragged to just after `three`
 *    leaves `onetwo three/`, saved. This also proves the drag below is a real move.
 * 2. **A move whose `/` would land against a `/` is refused, with a notice.** The `/` after `three`
 *    dragged to just after `four/` would make `four//`, USFM's optional line break, which the view
 *    cannot store, so the drop would leave the `/` out after the browser had already removed it
 *    from `three/`. The editor refuses the drop instead: nothing moves, the user is told, and the
 *    file keeps the `/` (checked after a later edit saves the chapter).
 *
 * ONE test() per spec file on purpose (the isolated fixture is test-scoped); the steps share the
 * one Electron instance, in order.
 *
 * Runs against an isolated project root: `npm run test:e2e:isolated
 * tests/isolated/scripture-editor/hidden-view-drag-move.spec.ts`.
 */
import fs from 'fs';
import type { Locator, Page } from '@playwright/test';
import { test, expect } from '../../../fixtures/isolated.fixture';
import { waitForAppReady } from '../../../fixtures/helpers';
import {
  installedBookPath,
  noUnaskedEditsTestOptions,
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

/** The structure-lock toggle's accessible name; `aria-pressed` is whether structure is locked. */
const STRUCTURE_LOCK_BUTTON_NAME = 'Toggle structure protection';

/** The notice for a drag-move refused because it would join two `/` into `//`. */
const REFUSED_MOVE_MESSAGE =
  "Not moved: where it was dropped, it would put \\ or // in the text, which can't be added in this view.";

// Jonah 2:4. The text the steps drag within is typed here first.
const TYPING_POINT = 'yet I will look |again toward';
const TYPED_TEXT = 'one/two three four/ five ';
const TYPED_SITE = 'yet I will look one/two three four/ five again toward';

// Step 1: the `/` of `one/two`, dropped just after `three`.
const MOVED_FROM = 'one|/two three';
const MOVED_TO = 'one/|two three';
const MOVE_DROP_POINT = 'two three| four/';
const MOVED_SITE = 'yet I will look onetwo three/ four/ five again toward';

// Step 2: the `/` after `three`, dropped just after `four/`.
const REFUSED_FROM = 'three|/ four/';
const REFUSED_TO = 'three/| four/';
const REFUSED_DROP_POINT = 'four/| five';
/** Typed after the refused drop, so the chapter saves and the file can show the refusal. */
const LATER_EDIT_POINT = 'four/ five| again';
const LATER_EDIT = 'X';
const SITE_AFTER_LATER_EDIT = 'yet I will look onetwo three/ four/ fiveX again toward';

/** The book file's text with every whitespace run as one space. */
function readNormalizedBook(): string {
  return fs.readFileSync(installedBookPath(JONAH_BOOK_FILE), 'utf8').replace(/\s+/g, ' ').trim();
}

/** Occurrences of `needle` in `haystack`. */
function countOf(haystack: string, needle: string): number {
  return haystack.split(needle).length - 1;
}

/**
 * The viewport point, in the editor frame, of `point` (text with one `|`, occurring once in the
 * editor's text nodes): with `at: 'caret'`, the boundary the `|` marks, measured at the right edge
 * of the character before it, where a drop lands after that character; with `at: 'character'`, the
 * middle of the character right after the `|`, where a press picks up a selection holding it.
 */
async function framePointAt(
  editorInput: Locator,
  point: string,
  at: 'caret' | 'character',
): Promise<{ x: number; y: number }> {
  return editorInput.evaluate(
    (root, { point: textPoint, at: where }) => {
      const caret = textPoint.indexOf('|');
      const text = textPoint.split('|').join('');
      const hits: Array<{ node: Text; offset: number }> = [];
      const walker = root.ownerDocument.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      for (let node = walker.nextNode(); node; node = walker.nextNode()) {
        // SHOW_TEXT yields only Text nodes.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        const textNode = node as Text;
        for (let i = textNode.data.indexOf(text); i >= 0; i = textNode.data.indexOf(text, i + 1))
          hits.push({ node: textNode, offset: i + caret });
      }
      if (hits.length !== 1)
        throw new Error(`${JSON.stringify(text)} occurs ${hits.length} times in the editor's text`);
      const { node, offset } = hits[0];
      node.parentElement?.scrollIntoView({ block: 'center' });
      const range = root.ownerDocument.createRange();
      if (where === 'caret') range.setStart(node, offset - 1);
      else range.setStart(node, offset);
      range.setEnd(node, where === 'caret' ? offset : offset + 1);
      const rect = range.getBoundingClientRect();
      return {
        x: where === 'caret' ? rect.right : rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
    },
    { point, at },
  );
}

/**
 * Selects `from`…`to` and drags it with the mouse to `dropPoint`, the way a user does: press on the
 * selection, move in steps (Chromium starts a drag only once the pointer has moved), release.
 */
async function dragSelection(
  mainPage: Page,
  frame: Locator,
  editorInput: Locator,
  from: string,
  to: string,
  dropPoint: string,
): Promise<void> {
  await selectInEditor(editorInput, from, to);
  const start = await framePointAt(editorInput, from, 'character');
  const end = await framePointAt(editorInput, dropPoint, 'caret');
  const frameBox = await frame.boundingBox();
  if (!frameBox) throw new Error('the editor frame has no box');
  await mainPage.mouse.move(frameBox.x + start.x, frameBox.y + start.y);
  await mainPage.mouse.down();
  await mainPage.mouse.move(frameBox.x + start.x + 4, frameBox.y + start.y, { steps: 4 });
  await mainPage.mouse.move(frameBox.x + end.x, frameBox.y + end.y, { steps: 12 });
  await mainPage.mouse.up();
}

test.describe('a drag-move in Simple mode’s paragraph-structure view, structure unlocked', () => {
  test('a move that loses nothing goes through, and a move whose / would land against a / is refused with a notice and keeps the /', async ({
    mainPage,
  }) => {
    // Heavy isolated test: its own Electron instance and several saves, each waited out on disk.
    test.setTimeout(600_000);

    // Simple mode's layout has no Home tab; this also suppresses the onboarding tour.
    await waitForAppReady(mainPage);
    await makeSampleProjectEditable();

    const editorId = await openEditableScriptureEditorForProject(mainPage, SAMPLE_WEB_PROJECT_ID);
    const frameSelector = `iframe[data-web-view-id="${editorId}"]`;
    const frame = mainPage.locator(frameSelector);
    const editorFrame = mainPage.frameLocator(frameSelector);
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
    await unlockSampleProjectStructure();
    await expect(structureLockButton).toHaveAttribute('aria-pressed', 'false', {
      timeout: 30_000,
    });

    await test.step('the text to drag within is typed and saved', async () => {
      const before = fs.readFileSync(bookPath);
      await selectInEditor(editorInput, TYPING_POINT);
      await editorInput.pressSequentially(TYPED_TEXT);
      const afterTyping = await waitForSaveToSettle(mainPage, bookPath, before);
      expect(afterTyping, 'the typing never saved to disk').toBeDefined();
      expect(countOf(readNormalizedBook(), TYPED_SITE)).toBe(1);
    });

    await test.step('a move that loses nothing goes through', async () => {
      const before = fs.readFileSync(bookPath);
      await clearRecordedToasts(mainPage);
      await dragSelection(mainPage, frame, editorInput, MOVED_FROM, MOVED_TO, MOVE_DROP_POINT);
      const afterMove = await waitForSaveToSettle(mainPage, bookPath, before);
      expect(afterMove, 'the drag-move never saved to disk').toBeDefined();
      expect(countOf(readNormalizedBook(), MOVED_SITE), 'the / should have moved').toBe(1);
      expect(
        await recordedToasts(mainPage),
        'a move that loses nothing raises no notice',
      ).not.toEqual(expect.arrayContaining([expect.stringContaining('Not moved')]));
    });

    await test.step('a move whose / would land against a / is refused with a notice', async () => {
      const before = fs.readFileSync(bookPath);
      await clearRecordedToasts(mainPage);
      await dragSelection(
        mainPage,
        frame,
        editorInput,
        REFUSED_FROM,
        REFUSED_TO,
        REFUSED_DROP_POINT,
      );
      await expect
        .poll(() => recordedToasts(mainPage), {
          message: 'the refused move should tell the user why',
          timeout: 20_000,
        })
        .toEqual(expect.arrayContaining([expect.stringContaining(REFUSED_MOVE_MESSAGE)]));
      await expect(editorInput).toContainText('onetwo three/ four/ five again');

      // The file cannot show a refusal by itself: an accepted move would not have saved by now
      // either. A later edit saves the chapter, and the file must still hold the `/`.
      await selectInEditor(editorInput, LATER_EDIT_POINT);
      await editorInput.pressSequentially(LATER_EDIT);
      const afterEdit = await waitForSaveToSettle(mainPage, bookPath, before);
      expect(afterEdit, 'the later edit never saved to disk').toBeDefined();
      expect(
        countOf(readNormalizedBook(), SITE_AFTER_LATER_EDIT),
        'the / should still be there',
      ).toBe(1);
    });
  });
});
