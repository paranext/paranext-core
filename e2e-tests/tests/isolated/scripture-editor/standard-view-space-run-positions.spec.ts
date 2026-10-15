/**
 * End-to-end verification that Standard view's programmatic positions still address the text a
 * caller names after the user types a run of spaces. Standard view shows every space of a run of
 * two or more as an NBSP, so the run stays visible while the user types, and the editor→USJ
 * conversion collapses the run to one space — so the USJ a caller computes positions against never
 * has the run. A coordinate model that counts the run's extra spaces puts every position after it
 * that many characters off, in both directions, with nothing pending and nothing to settle.
 *
 * Positions come from the chapter's own USJ, read from the project data provider that feeds the
 * editor. The run is typed between `Woman,` and `what` at the start of John 2:4's `\wj` text, so
 * every scenario below addresses characters AFTER it:
 *
 * - A caret CLICKED to the end of the span's text reports that text's own length as its offset (live
 *   → USJ), not the length plus the run's extra space.
 * - `selectRange` over the span's last two offsets highlights exactly those two characters (USJ →
 *   live), judged by the browser's own selection.
 * - `setAnnotation` over the same offsets marks exactly those two characters.
 *
 * ONE test() per spec file on purpose: the isolated fixture is test-scoped, and a SECOND Electron
 * instance launched against the shared webpack renderer dev server has a documented failure mode
 * where new dock tabs never render (see isolated.fixture.ts). The scenarios run as test.step()s
 * sharing the one instance, leaving the tree-splitting annotation until last.
 *
 * Runs against an isolated project root, so the only project is the bundled sample WEB: `npm run
 * test:e2e:isolated tests/isolated/scripture-editor/standard-view-space-run-positions.spec.ts`.
 *
 * A cold first run can fail mid-test when the app tears the editor's web view down and rebuilds it
 * (an `OutPortal` portal error, the web view controller going missing, or `useWebViewState` reading
 * `papi` before it exists) — a known product bug, PT-4863, not a position regression.
 */
import { test, expect } from '../../../fixtures/isolated.fixture';
import {
  chapterLocation,
  NBSP,
  openTargetVerseEditor,
  readDomCaret,
  readDomSelectedText,
  readEditorSelection,
  sendToEditorController,
  TARGET_CHAR_MARKER as CHAR_MARKER,
  TARGET_VERSE_REF,
} from '../../../fixtures/settled-positions-helpers';
import { clickBeforeGlyph } from '../../../fixtures/scripture-editor-helpers';

/** Where the run goes: right after the existing space that follows `Woman,`. */
const RUN_AFTER = '“Woman, ';

const ANNOTATION_TYPE = 'spelling';
const ANNOTATION_ID = 'space-run-probe';

test.use({
  interfaceMode: 'power',
  electronLaunchOptions: { isolatedProjectRoot: true, envOverrides: { DEV_NOISY: 'false' } },
});

test.describe('scripture editor settled positions', () => {
  test('positions past a space run the user typed address the text they name', async ({
    mainPage,
  }) => {
    // Heavy isolated test (own Electron instance, backend-readiness gates, a chapter load, typing,
    // and three editor round trips). 3x "slow" budget — see standard-default-power-mode.spec.ts.
    test.slow();

    const { editorId, editorInput, jsonPath, charText } = await openTargetVerseEditor(mainPage);

    /** The span's content as the browser holds it: the separator NBSP, then the display text. */
    const spanDomText = () =>
      editorInput
        .locator(`span.opening[data-marker="${CHAR_MARKER}"]`)
        .first()
        .evaluate((glyph) => glyph.nextSibling?.textContent ?? '');

    /**
     * The typed run is never saved — it differs from the project only in whitespace — so anything
     * that reloads the editor drops it and puts the caret at the verse start. Every assertion after
     * the run is typed addresses text AFTER the run, so each one reads exactly the same with the
     * run gone: a reload part-way through would leave the spec green having exercised none of the
     * space-run coordinate path. Checked at the end of every step, not once, so there is no window
     * a reload can hide in.
     */
    const expectRunStillOnScreen = async () =>
      expect(await spanDomText(), 'the typed run is gone: the editor reloaded').toContain(
        `,${NBSP}${NBSP}`,
      );

    await test.step('a second space typed after an existing one displays as a run', async () => {
      // Place the caret by position rather than by gesture — the collapsed-placement path the
      // annotation-positions spec already verifies — before any run exists to disturb it.
      const caret = chapterLocation(TARGET_VERSE_REF, jsonPath, RUN_AFTER.length);
      await sendToEditorController(editorId, 'selectRange', [{ start: caret, end: caret }]);
      // Node identity as well as the offset: a bare offset is satisfied by any caret anywhere in
      // the document that happens to sit there — including the one `navigateToolbarBcv` left —
      // so the space would be typed somewhere else and the failure would surface below as a
      // confusing display-run diff instead of here.
      await expect
        .poll(() => readDomCaret(editorInput), { timeout: 20_000 })
        // One past the USJ offset: the separator NBSP precedes the span's text in the DOM.
        .toEqual({
          anchorText: NBSP + charText,
          anchorOffset: RUN_AFTER.length + 1,
          isCollapsed: true,
        });

      // Typed through a locator inside the editor frame: the page's own keyboard targets the
      // parent document, where the editor's key handling never sees it.
      await editorInput.pressSequentially(' ');

      await expect
        .poll(spanDomText, { timeout: 20_000 })
        .toBe(`${NBSP}“Woman,${NBSP}${NBSP}${charText.slice(RUN_AFTER.length)}`);
    });

    await test.step("a caret clicked to the span's end reports the span text's own last offset", async () => {
      await expectRunStillOnScreen();
      // Just inside the left edge of the closing glyph is the insertion point immediately before
      // `\wj*`, the end of the span's text. Reaching it by gesture makes this the live → USJ
      // direction: nothing translated coordinates on the way in.
      await clickBeforeGlyph(
        editorInput.locator(`span.closing[data-marker="${CHAR_MARKER}"]`).first(),
      );

      // Poll on the offset: the caret sat in this same span's text before the click.
      await expect
        .poll(async () => (await readEditorSelection(editorId))?.start?.documentLocation, {
          timeout: 30_000,
        })
        // The span text's own length, not one more: the run's extra space is not in the USJ.
        .toEqual({ jsonPath, offset: charText.length });
      await expectRunStillOnScreen();
    });

    await test.step("selecting the span's last two characters highlights exactly those characters", async () => {
      await sendToEditorController(editorId, 'selectRange', [
        {
          start: chapterLocation(TARGET_VERSE_REF, jsonPath, charText.length - 2),
          end: chapterLocation(TARGET_VERSE_REF, jsonPath, charText.length),
        },
      ]);

      // What the browser highlights is the oracle; a shift applied on the way in and again on the
      // way out would cancel in anything the editor reports back.
      await expect
        .poll(() => readDomSelectedText(editorInput), { timeout: 20_000 })
        .toBe(charText.slice(-2));
      await expectRunStillOnScreen();
    });

    await test.step("an annotation over the span's last two characters marks exactly those characters", async () => {
      await sendToEditorController(editorId, 'setAnnotation', [
        {
          start: chapterLocation(TARGET_VERSE_REF, jsonPath, charText.length - 2),
          end: chapterLocation(TARGET_VERSE_REF, jsonPath, charText.length),
        },
        ANNOTATION_TYPE,
        ANNOTATION_ID,
      ]);

      const annotatedMark = editorInput.locator(`mark.annotationId-${ANNOTATION_ID}`);
      await expect(annotatedMark).toHaveCount(1, { timeout: 30_000 });
      // Exact: an off-by-one marks two characters just like a correct call does. Counting the
      // run's extra space yields `charText.slice(-3, -1)`, the two characters before the ones
      // addressed.
      expect(await annotatedMark.textContent()).toBe(charText.slice(-2));
      await expectRunStillOnScreen();
    });
  });
});
