/**
 * End-to-end verification that Standard view's programmatic positions address the text a caller
 * names. In editable marker mode a char span renders as `[MarkerNode "\wj", TextNode "<NBSP>Come
 * and see.", MarkerNode "\wj*"]` — the NBSP between the opening glyph and the span's content is
 * display scaffolding the editor→USJ conversion strips, so it occupies no USJ offset. A coordinate
 * model that counts it shifts every USJ text offset inside a char marker by one in BOTH directions
 * — an annotation over the span's last two characters wraps the two before them, and a caret
 * reported from inside the span comes back one too high.
 *
 * USJ→Lexical→USJ round-trip checks cannot see that class of defect: a shift applied consistently
 * in both directions cancels out. So each scenario below pins ONE direction against an outside
 * oracle. The USJ offsets themselves come from the chapter's own USJ, read from the project data
 * provider that feeds the editor — the offsets a real caller (a checks result, a comment anchor)
 * computes.
 *
 * Scenarios:
 *
 * - A caret CLICKED to the end of the span's text reports that text's own length as its offset (live
 *   → USJ). The gesture is the oracle: nothing translated coordinates on the way in.
 * - `selectRange` over the span's last two settled offsets highlights exactly those two characters
 *   (USJ → live). The browser's own selection is the oracle, not a report the editor derives back
 *   through the same model.
 * - A collapsed `selectRange` (`start` and `end` at the same location) at settled offset 0 lands the
 *   caret right after the NBSP separator, not on it and not on the marker glyph — against both the
 *   browser's own selection and the editor's own `getSelection()` report.
 * - `setAnnotation` over those same settled offsets marks exactly those two characters — not the
 *   separator, not the two before them.
 * - A pending, un-departed attribute edit inside a `\w grace\w*` span typed MID-SENTENCE does not
 *   shift `setAnnotation`'s resolution of a word LATER IN THE SAME SENTENCE: the live tree carries
 *   the raw, un-collapsed `|lemma="grace"` text the settled document does not count at all, so the
 *   highlight must still land on exactly that word despite the byte-count mismatch between them —
 *   the harder case a word in a different, untouched paragraph would pass even if this were
 *   broken.
 *
 * The last two talk to the editor through the scripture editor's web view controller network object
 * (`object:webViewController<webViewId>.…`), the same surface extensions use.
 *
 * ONE test() per spec file on purpose: the isolated fixture is test-scoped, and a SECOND Electron
 * instance launched against the shared webpack renderer dev server has a documented failure mode
 * where new dock tabs never render (see isolated.fixture.ts). The scenarios run as test.step()s
 * sharing the one instance and one loaded chapter, in an order that leaves the tree-splitting
 * annotation and the typed-content scenario until last.
 *
 * Runs against an isolated project root, so the only project is the bundled sample WEB (installed
 * by the C# backend into the empty root): `npm run test:e2e:isolated
 * tests/isolated/scripture-editor/standard-view-annotation-positions.spec.ts`.
 */
import { FrameLocator } from '@playwright/test';
import { test, expect } from '../../../fixtures/isolated.fixture';
import {
  chapterLocation,
  contentJsonPath,
  findCharSpanText,
  findVerseText,
  getChapterUsj,
  readEditorSelection,
  sendToEditorController,
  waitForEditorControllerMethod,
} from '../../../fixtures/settled-positions-helpers';
import {
  makeSampleProjectEditable,
  navigateToolbarBcv,
  openEditableScriptureEditorForProject,
  SAMPLE_WEB_PROJECT_ID,
  waitForHomeTab,
} from '../../../fixtures/scripture-editor-helpers';

/**
 * John 2:4 is `\wj "Woman, what does that have to do with you and me? My hour has not yet
 * come."\wj*` — one plain text string, so its settled offsets are the string's own indexes with
 * nothing in between. Chapter 2 deliberately: a `ScriptureRange` built from USJ document locations
 * carries no verse number, so the editor extension derives one by walking the loaded chapter's USJ
 * for a book id (`convertScriptureRangeToEditorRange` in platform-scripture-editor.utils.ts); only
 * a chapter-1 USJ carries the `id` marker, so a chapter-2 target exercises that book-id fallback
 * end to end on every `ScriptureRange` this spec sends.
 */
const TARGET_REFERENCE = 'John 2:4';
const TARGET_VERSE_REF = { book: 'JHN', chapterNum: 2, verseNum: 4 };
const CHAR_MARKER = 'wj';
/**
 * Pins the fixture data: a sample project whose `\wj` content at this verse drifted would silently
 * move the offsets.
 */
const EXPECTED_CHAR_TEXT =
  '“Woman, what does that have to do with you and me? My hour has not yet come.”';

/**
 * Annotation identity. The editor prefixes an externally-set annotation type with `external-` and
 * renders the mark as `<mark class="editor-typed-mark-external-<type> annotationId-<id>">`, so both
 * halves double as locators. Both are spelled to be valid CSS class name suffixes.
 */
const ANNOTATION_TYPE = 'spelling';
const ANNOTATION_ID = 'settled-offset-probe';
const PENDING_ANNOTATION_ID = 'pending-attribute-word-after';

/** The display separator the editor places between an opening marker glyph and its content. */
const NBSP = '\u00a0';

const WORD_MARKER = 'w';
/**
 * The content this spec types into its own `\w` span, and (unrelatedly) the pending attribute's
 * value — `lemma` is the marker's own default attribute, so the named form collapses to `|grace`.
 */
const SPAN_WORD = 'grace';
/**
 * John 2:5 ("His mother said to the servants, "Whatever he says to you, do it."") is a plain,
 * char-span-free sentence this spec types a `\w grace\w*` span into, MID-SENTENCE — right in front
 * of "servants" — so real text from the SAME verse still follows the span. The verse's pre-edit
 * text (read once, up front) is enough to compute the settled location of a word further into that
 * same text: inserting the span there replaces the text's own single array slot with three slots
 * (text before, the new marker, text after) in place, so the trailing text's own new index is
 * knowable without a second read. See `findVerseText`.
 */
const SPAN_VERSE_REF = { book: 'JHN', chapterNum: 2, verseNum: 5 };
/** Where the new span goes: right in front of this word, still inside verse 5's own text. */
const SPAN_INSERTION_ANCHOR = 'servants';
/** The word after the span, in the SAME sentence, that `setAnnotation` addresses while pending. */
const WORD_AFTER_TARGET = 'Whatever';

test.use({
  interfaceMode: 'power',
  electronLaunchOptions: { isolatedProjectRoot: true, envOverrides: { DEV_NOISY: 'false' } },
});

test.describe('scripture editor settled positions', () => {
  test('programmatic positions inside a char marker address the text they name', async ({
    mainPage,
  }) => {
    // Heavy isolated test (own Electron instance, backend-readiness gates, a chapter load and
    // three editor round trips). 3x "slow" budget — see standard-default-power-mode.spec.ts.
    test.slow();

    await waitForHomeTab(mainPage);
    await makeSampleProjectEditable();
    const editorId = await openEditableScriptureEditorForProject(mainPage, SAMPLE_WEB_PROJECT_ID);
    const editorFrame: FrameLocator = mainPage.frameLocator(
      `iframe[data-web-view-id="${editorId}"]`,
    );
    await editorFrame.locator('.editor-container').waitFor({ timeout: 60_000 });

    await navigateToolbarBcv(mainPage, TARGET_REFERENCE);
    // `.first()`: an open footnote popover carries its own `.editor-input.marker-editable`.
    const editorInput = editorFrame.locator('.editor-input.marker-editable').first();
    await expect(editorInput).toBeAttached({ timeout: 60_000 });
    // Positive control, and the gate that the chapter finished loading before its USJ is read.
    await expect(editorInput).toContainText(EXPECTED_CHAR_TEXT, { timeout: 60_000 });
    // Standard view actually renders the char span's marker glyphs, so the NBSP separator that
    // makes these coordinates non-trivial is really present.
    await expect(
      editorInput.locator(`span.opening[data-marker="${CHAR_MARKER}"]`).first(),
    ).toBeAttached({ timeout: 30_000 });

    const chapterUsj = await getChapterUsj(TARGET_VERSE_REF);
    const charSpanText = findCharSpanText(chapterUsj.content ?? [], CHAR_MARKER);
    if (!charSpanText)
      throw new Error(
        `No \\${CHAR_MARKER} char span with plain text content in ${TARGET_REFERENCE}'s USJ`,
      );
    expect(charSpanText.text).toBe(EXPECTED_CHAR_TEXT);

    const { jsonPath, text: charText } = charSpanText;
    await waitForEditorControllerMethod(editorId, 'setAnnotation');
    const readSelection = () => readEditorSelection(editorId);

    await test.step("a caret clicked to the span's end reports the span text's own last offset", async () => {
      // Click just inside the left edge of the closing glyph — the insertion point immediately
      // BEFORE `\wj*`, which is the end of the span's text (a plain click lands mid-glyph at an
      // unpredictable offset). Reaching the position by gesture is what makes this the LIVE→USJ
      // direction: nothing translated coordinates on the way in, so the number the editor reports
      // answers only to where the caret physically sits.
      const closingGlyph = editorInput
        .locator(`span.closing[data-marker="${CHAR_MARKER}"]`)
        .first();
      const glyphBox = await closingGlyph.boundingBox();
      if (!glyphBox) throw new Error('The char span closing glyph has no bounding box');
      await closingGlyph.click({ position: { x: 1, y: glyphBox.height / 2 } });

      // The editor reports asynchronously, so poll for the caret to land in the span's text; the
      // offset below is then a hard assertion.
      await expect
        .poll(async () => (await readSelection())?.start?.documentLocation?.jsonPath, {
          timeout: 30_000,
        })
        .toBe(jsonPath);

      const selection = await readSelection();
      // The span text's own length, not one more: the NBSP separator physically precedes that text
      // in the editor and is not part of the text the USJ addresses.
      expect(selection?.start?.documentLocation?.offset).toBe(charText.length);
      expect(selection?.end?.documentLocation?.offset).toBe(charText.length);
    });

    await test.step("selecting the span's last two characters highlights exactly those characters", async () => {
      await sendToEditorController(editorId, 'selectRange', [
        {
          start: chapterLocation(TARGET_VERSE_REF, jsonPath, charText.length - 2),
          end: chapterLocation(TARGET_VERSE_REF, jsonPath, charText.length),
        },
      ]);

      // What the browser highlights is the oracle. Asking the editor to report the range back
      // would prove nothing: a shift applied on the way in and again on the way out cancels.
      await expect
        .poll(
          async () =>
            editorInput.evaluate((root) => root.ownerDocument.getSelection()?.toString() ?? ''),
          { timeout: 20_000 },
        )
        .toBe(charText.slice(-2));
    });

    await test.step('a collapsed selectRange at settled offset 0 lands inside the span text, not on the separator', async () => {
      const location = chapterLocation(TARGET_VERSE_REF, jsonPath, 0);
      // `start` and `end` at the same location is how a caller asks for a collapsed selection (a
      // cursor position, not a range) — the shape `comment-list.web-view.tsx` sends.
      await sendToEditorController(editorId, 'selectRange', [{ start: location, end: location }]);

      // The browser's own selection is the oracle for where the caret visually lands: the span's
      // content is one DOM text node holding `<NBSP>` followed by the span's text, so a caret at
      // settled offset 0 must sit at DOM offset 1 in that node — immediately after the NBSP,
      // immediately before the first character of the span's text.
      await expect
        .poll(
          async () =>
            editorInput.evaluate((root) => {
              const sel = root.ownerDocument.getSelection();
              return {
                anchorText: sel?.anchorNode?.textContent ?? undefined,
                anchorOffset: sel?.anchorOffset ?? undefined,
                isCollapsed: sel?.isCollapsed ?? undefined,
              };
            }),
          { timeout: 20_000 },
        )
        .toEqual({ anchorText: NBSP + charText, anchorOffset: 1, isCollapsed: true });

      // The editor reports app-placed selections explicitly, so the webViewController's own
      // getSelection() is checked too, not just the DOM. Poll on the OFFSET, not the jsonPath: the
      // previous step's selection already sits at this same jsonPath (offset `charText.length - 2`),
      // so polling on jsonPath alone would match the stale selection immediately.
      await expect
        .poll(async () => (await readSelection())?.start?.documentLocation?.offset, {
          timeout: 30_000,
        })
        .toBe(0);

      const selection = await readSelection();
      // Offset 0, not 1: the NBSP separator is display scaffolding the USJ the editor reports
      // through does not address.
      expect(selection?.start?.documentLocation).toEqual({ jsonPath, offset: 0 });
      expect(selection?.end?.documentLocation).toEqual({ jsonPath, offset: 0 });
    });

    await test.step("an annotation over the span's last two characters marks exactly those characters", async () => {
      const expectedAnnotatedText = charText.slice(-2);
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
      // The annotation type routed through as well, not just some mark.
      await expect(annotatedMark).toHaveClass(
        new RegExp(`(^|\\s)editor-typed-mark-external-${ANNOTATION_TYPE}(\\s|$)`),
      );

      const annotatedText = await annotatedMark.textContent();
      // Exact, not `toContainText`: an off-by-one marks two characters just like a correct call
      // does, so only the identity of those characters separates the two outcomes. The failure
      // this guards against yields `charText.slice(-3, -1)` — the two characters BEFORE the ones
      // the caller addressed — because the span's NBSP display separator occupies no USJ offset.
      expect(annotatedText).toBe(expectedAnnotatedText);
      expect(annotatedText).not.toContain(NBSP);
      // Marking a range must not move or consume the span's marker glyphs.
      await expect(annotatedMark.locator('span.opening, span.closing')).toHaveCount(0);
      await expect(editorInput).toContainText(charText);
    });

    await test.step('setAnnotation on a later word in the same sentence as a pending mid-sentence attribute edit marks exactly that word', async () => {
      // Computed against the chapter USJ read before any typing in this spec. Inserting the new
      // span mid-string replaces this text's own array slot with three slots (text before, the
      // marker, text after) in place, so the trailing text's path is this same text's index chain
      // with its own last index moved forward by 2 — derivable from this one read, with no second
      // (PDP-staleness-prone) read after the edit.
      const verseFiveText = findVerseText(chapterUsj.content ?? [], '5');
      if (!verseFiveText) throw new Error("No plain text found for John 2:5 in the chapter's USJ");
      const insertionOffset = verseFiveText.text.indexOf(SPAN_INSERTION_ANCHOR);
      if (insertionOffset === -1)
        throw new Error(
          `Expected "${SPAN_INSERTION_ANCHOR}" in John 2:5's text, got: ${verseFiveText.text}`,
        );
      const textAfterSplit = verseFiveText.text.slice(insertionOffset);
      const wordOffsetAfterSplit = textAfterSplit.indexOf(WORD_AFTER_TARGET);
      if (wordOffsetAfterSplit === -1)
        throw new Error(
          `Expected "${WORD_AFTER_TARGET}" after "${SPAN_INSERTION_ANCHOR}" in John 2:5's text, got: ${textAfterSplit}`,
        );
      const textIndex = verseFiveText.indexes.at(-1);
      if (textIndex === undefined) throw new Error('findVerseText returned an empty index chain');
      const textAfterSplitPath = contentJsonPath([
        ...verseFiveText.indexes.slice(0, -1),
        textIndex + 2,
      ]);

      // Place the caret by position (the collapsed-placement path the first scenario above already
      // verifies) rather than by a click-then-keyboard gesture: verse 5 is mid-sentence content, so
      // a click near the insertion point followed by End would land at the end of whatever VISUAL
      // line the caret happens to be on, not at this exact character — a distinction a click near
      // the true end of a short verse (used elsewhere in this file) does not have to make.
      const insertionCaret = chapterLocation(
        SPAN_VERSE_REF,
        verseFiveText.jsonPath,
        insertionOffset,
      );
      await sendToEditorController(editorId, 'selectRange', [
        { start: insertionCaret, end: insertionCaret },
      ]);
      await expect
        .poll(async () => (await readSelection())?.start?.documentLocation, { timeout: 30_000 })
        .toEqual({ jsonPath: verseFiveText.jsonPath, offset: insertionOffset });

      // The bundled sample WEB project ships no `\w` markers, so this step creates one by typing
      // literal USFM marker syntax — the same technique attribute-display-settle.spec.ts uses —
      // directly in front of "servants", leaving that word and the rest of the sentence as real
      // trailing text in the SAME paragraph.
      await editorInput.pressSequentially(`\\${WORD_MARKER} ${SPAN_WORD}\\${WORD_MARKER}*`, {
        delay: 30,
      });
      await expect(editorInput).toContainText(SPAN_WORD, { timeout: 15_000 });
      await expect(editorInput).toContainText(WORD_AFTER_TARGET, { timeout: 15_000 });
      const wCloser = editorInput.locator(`span.closing[data-marker="${WORD_MARKER}"]`).last();
      await expect(wCloser).toBeAttached({ timeout: 15_000 });

      // Click just inside the left edge of the new span's own closer — the same boundary the
      // first scenario above clicks to reach a span's text end. This is a click on a specific
      // ELEMENT's own edge, not a keyboard gesture relative to visual line layout, so it is
      // unaffected by the wrapping concern above. It appends after the span's own text and never
      // touches the opening glyph's leading NBSP separator, which sits at the other end of the span
      // entirely.
      const closerBox = await wCloser.boundingBox();
      if (!closerBox) throw new Error('The new \\w span closing glyph has no bounding box');
      await wCloser.click({ position: { x: 1, y: closerBox.height / 2 } });

      // Type the attribute and stop — no caret departure, so the edit stays PENDING (the tokenizer
      // only re-derives attributes on caret departure for an already-closed span; see
      // attribute-display-settle.spec.ts). `setAnnotation` below addresses a word later in the SAME
      // sentence while this edit is still mid-flight, with the raw, un-collapsed attribute text
      // sitting between the two.
      await editorInput.pressSequentially(`|lemma="${SPAN_WORD}"`, { delay: 30 });
      await expect(editorInput).toContainText(`${SPAN_WORD}|lemma="${SPAN_WORD}"`, {
        timeout: 15_000,
      });

      await sendToEditorController(editorId, 'setAnnotation', [
        {
          start: chapterLocation(SPAN_VERSE_REF, textAfterSplitPath, wordOffsetAfterSplit),
          end: chapterLocation(
            SPAN_VERSE_REF,
            textAfterSplitPath,
            wordOffsetAfterSplit + WORD_AFTER_TARGET.length,
          ),
        },
        ANNOTATION_TYPE,
        PENDING_ANNOTATION_ID,
      ]);

      const annotatedMark = editorInput.locator(`mark.annotationId-${PENDING_ANNOTATION_ID}`);
      await expect(annotatedMark).toHaveCount(1, { timeout: 30_000 });
      await expect(annotatedMark).toHaveClass(
        new RegExp(`(^|\\s)editor-typed-mark-external-${ANNOTATION_TYPE}(\\s|$)`),
      );
      // Exact, not `toContainText`: the pending edit sits earlier in the SAME sentence, so any
      // offset this location resolves wrong marks a neighboring word instead of the one addressed.
      expect(await annotatedMark.textContent()).toBe(WORD_AFTER_TARGET);
    });
  });
});
