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
 * - A `setAnnotation` fired the instant after typing `|lemma="grace"` mid-sentence into a `\w
 *   grace\w*` span — while an idle-settle clock can still collapse that edit to its bare `|grace`
 *   form at any moment — still marks exactly the RIGHT word LATER IN THE SAME SENTENCE: the harder
 *   case a word in a different, untouched paragraph would pass even if this were broken.
 * - Once that pending edit settles, `setAnnotation` over the settled attribute's value (`['lemma']
 *   propertyOffset …`) and over a verse number (`['number'] propertyOffset …`) holds each
 *   annotation on those display bytes — never wrapping them in a mark — and leaves the document
 *   untouched.
 * - A collapsed `selectRange` into the web view's own verse, sent the instant after another view
 *   moved the scroll group to a different verse, lands where it was asked to, stays there, and
 *   brings the scroll group back to its verse: the newer request wins over the older move the web
 *   view had not rendered yet.
 * - A position at the very end of the chapter's last text resolves to that text's own path and
 *   offset, not to the preceding verse's own `['number']` location.
 * - A `setAnnotation` on a char span's own SAVED content word does not interrupt an UNFINISHED
 *   attribute the user is still typing into that SAME span, right after that word, with the
 *   editor's own idle-settle clock switched off so only the caret leaving (never attempted here)
 *   could settle it: the typed literal survives verbatim, a further keystroke still extends it in
 *   place, and the annotation lands on exactly the saved word — checked once against the word
 *   sharing the pending caret's own text node, and once more, as a control, against a word in a
 *   DIFFERENT text node of the same paragraph.
 *
 * Every scenario that calls `setAnnotation` or `selectRange` talks to the editor through the
 * scripture editor's web view controller network object (`object:webViewController<webViewId>.…`),
 * the same surface extensions use.
 *
 * ONE test() per spec file on purpose: the isolated fixture is test-scoped, and a SECOND Electron
 * instance launched against the shared webpack renderer dev server has a documented failure mode
 * where new dock tabs never render (see isolated.fixture.ts). The scenarios run as test.step()s
 * sharing the one instance and one loaded chapter, in an order that types content only after the
 * read-only scenarios, then addresses what that typing settles to, then the chapter's own last
 * position, and — because a failing step aborts every later one — whether an UNRELATED
 * `setAnnotation` disturbs typing still in progress elsewhere in the same text, last of all.
 *
 * Runs against an isolated project root, so the only project is the bundled sample WEB (installed
 * by the C# backend into the empty root): `npm run test:e2e:isolated
 * tests/isolated/scripture-editor/standard-view-annotation-positions.spec.ts`.
 */
import { FrameLocator } from '@playwright/test';
import { test, expect } from '../../../fixtures/isolated.fixture';
import {
  chapterLocation,
  chapterPropertyLocation,
  contentJsonPath,
  findCharSpanText,
  findVersePath,
  findVerseText,
  getChapterUsj,
  getScrollGroupRef,
  readEditorSelection,
  sendToEditorController,
  SerializedVerseRef,
  setScrollGroupRefFromRenderer,
  setUserSetting,
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
const ATTRIBUTE_ANNOTATION_ID = 'attribute-value-probe';
const VERSE_ANNOTATION_ID = 'verse-number-probe';

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

/** John 2:25, the chapter's last verse, addressed by its own reference for the chapter-end step. */
const LAST_VERSE_REFERENCE = 'John 2:25';
const LAST_VERSE_REF = { book: 'JHN', chapterNum: 2, verseNum: 25 };

/**
 * A verse of the same chapter, well away from {@link TARGET_VERSE_REF}, that the scroll group is
 * moved to right before a `selectRange` addressed to the web view's own verse.
 */
const AWAY_VERSE_REF = { book: 'JHN', chapterNum: 2, verseNum: 17 };
/** An interior offset in the `\wj` span's text: not 0, which reports as the verse marker's end. */
const CROSS_VERSE_CARET_OFFSET = 5;

/**
 * John 2:6 ("Now there were six water pots of stone...") is a plain sentence, untouched by any
 * earlier step, that the last step types a FRESH, COMPLETE `\w` span into (content plus closer) —
 * the same shape {@link SPAN_VERSE_REF}'s span already proved settles into its own carrier
 * immediately (its closer completes the marker, one of the engine's own IMMEDIATE-rebuild triggers;
 * see `markerEditTier2Trigger.utils.ts`'s "backslash sequence completed by a separator or `*`
 * closer" case). Typing an attribute onto that span's content AFTER its closer already exists is a
 * DIFFERENT case in the same engine: a bare `|…` bounded by an existing closer carries no
 * backslash, so the immediate-rebuild path never fires — it just pends the CONTENT node's own key
 * for caret-departure settling, so the span's saved word and the pending attribute bytes stay in
 * that one, same, unsplit text node — confirmed, while this step was under development, by reading
 * each DOM node's own Lexical key (its `__lexicalKey_<editorKey>` own property) for both the caret
 * and the span's saved word right before the setAnnotation call below and finding them equal; that
 * one-off check is not part of the committed step. John 2:7, in the SAME paragraph (a USJ `\p` here
 * spans several verses), gives an ALREADY-SEPARATE text node for the control case.
 */
const TYPING_PROBE_VERSE_REF = { book: 'JHN', chapterNum: 2, verseNum: 6 };
/**
 * Same paragraph as {@link TYPING_PROBE_VERSE_REF} (a USJ `\p` spans several verses here), but its
 * own, already-separate text node — the control.
 */
const CONTROL_VERSE_REF = { book: 'JHN', chapterNum: 2, verseNum: 7 };
/**
 * The saved word the control `setAnnotation` targets, inside {@link CONTROL_VERSE_REF}'s own text
 * node.
 */
const CONTROL_WORD = 'Jesus';
/** The marker content this step types mid-edit and never finishes. */
const INCOMPLETE_MARKER_WORD = 'myrrh';
/** The unfinished prefix of the `lemma` value this step types — no closing quote, no `\w*` closer. */
const INCOMPLETE_ATTRIBUTE_VALUE_PREFIX = 'my';
const SAME_NODE_ANNOTATION_ID = 'same-node-word-probe';
const CONTROL_ANNOTATION_ID = 'different-node-word-probe';

/**
 * `platformScriptureEditor.markerSettleDelayMs`, EXPERIMENTAL: how long the editor's idle clock
 * waits before settling a pending marker edit on its own, in editable marker views. `-1` turns that
 * clock off, so only the caret leaving can settle an edit — see `use-marker-settle-delay.hook.ts`.
 */
const MARKER_SETTLE_DELAY_SETTING_KEY = 'platformScriptureEditor.markerSettleDelayMs';
/** The editor's own built-in idle delay — an unset setting behaves identically to this value. */
const DEFAULT_MARKER_SETTLE_DELAY_MS = 1000;

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

      // Type the attribute and stop. The edit stays pending on caret departure, but ALSO settles on
      // its own on an idle clock, re-armed by every keystroke with no further departure needed, so
      // there is only a narrow window after the last keystroke before it collapses to its bare
      // `|grace` form — narrow enough that even one fast round trip to read the live text back can
      // already land outside it. `setAnnotation` below is the very next call after typing, with
      // nothing else awaited in between, addressing the editor as close to the pending state as this
      // test can reach; whether the edit was still pending at the exact instant the request arrived
      // is therefore asserted best-effort by proximity, not verified directly — the outcome that
      // matters, and the one this step actually checks, is that the mark lands on the right word.
      await editorInput.pressSequentially(`|lemma="${SPAN_WORD}"`, { delay: 30 });

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

    await test.step('annotations on display bytes (a settled attribute value, a verse number) are held on those bytes and leave them intact', async () => {
      // The previous step typed `\w grace\w*` then `|lemma="grace"` in front of "servants"; that
      // settles to `\w grace|grace\w*`. Wait for the settled run on screen.
      await expect(editorInput).toContainText(`${SPAN_WORD}|${SPAN_WORD}\\${WORD_MARKER}*`, {
        timeout: 30_000,
      });
      const verseFiveText = findVerseText(chapterUsj.content ?? [], '5');
      if (!verseFiveText) throw new Error("No plain text found for John 2:5 in the chapter's USJ");
      const textIndex = verseFiveText.indexes.at(-1);
      if (textIndex === undefined) throw new Error('findVerseText returned an empty index chain');
      const wSpanPath = contentJsonPath([...verseFiveText.indexes.slice(0, -1), textIndex + 1]);

      await sendToEditorController(editorId, 'setAnnotation', [
        {
          start: chapterPropertyLocation(SPAN_VERSE_REF, `${wSpanPath}['lemma']`, 0),
          end: chapterPropertyLocation(SPAN_VERSE_REF, `${wSpanPath}['lemma']`, SPAN_WORD.length),
        },
        ANNOTATION_TYPE,
        ATTRIBUTE_ANNOTATION_ID,
      ]);
      const attributeHolder = editorInput.locator(`.annotationId-${ATTRIBUTE_ANNOTATION_ID}`);
      await expect(attributeHolder).toHaveCount(1, { timeout: 30_000 });
      await expect(attributeHolder).toHaveClass(/(^|\s)display-annotation(\s|$)/);
      // Held on the run itself, never a <mark> around (part of) it: the run stays whole.
      await expect(editorInput.locator(`mark.annotationId-${ATTRIBUTE_ANNOTATION_ID}`)).toHaveCount(
        0,
      );
      expect(await attributeHolder.textContent()).toBe(`|${SPAN_WORD}`);
      await expect(editorInput).toContainText(`${SPAN_WORD}|${SPAN_WORD}\\${WORD_MARKER}*`);

      const versePath = findVersePath(chapterUsj.content ?? [], String(TARGET_VERSE_REF.verseNum));
      if (!versePath) throw new Error('No verse 4 marker in the chapter USJ');
      await sendToEditorController(editorId, 'setAnnotation', [
        {
          start: chapterPropertyLocation(TARGET_VERSE_REF, `${versePath}['number']`, 0),
          end: chapterPropertyLocation(TARGET_VERSE_REF, `${versePath}['number']`, 1),
        },
        ANNOTATION_TYPE,
        VERSE_ANNOTATION_ID,
      ]);
      const verseHolder = editorInput.locator(`.annotationId-${VERSE_ANNOTATION_ID}`);
      await expect(verseHolder).toHaveCount(1, { timeout: 30_000 });
      await expect(verseHolder).toHaveClass(/(^|\s)display-annotation(\s|$)/);
      // The verse glyph may render its separator as an NBSP; compare against a plain space so the
      // assertion does not depend on which one the rendered text carries.
      const verseHolderText = (await verseHolder.textContent())?.replaceAll(NBSP, ' ');
      expect(verseHolderText?.startsWith('\\v 4')).toBe(true);
    });

    await test.step("a selectRange to the web view's own verse lands even while the scroll group has just moved away", async () => {
      // Put the web view on John 2:4 and wait until it has RENDERED that verse, not just until the
      // scroll group holds it: the reference scroll marks the verse `highlighted` only once the web
      // view's own reference is 2:4.
      await navigateToolbarBcv(mainPage, TARGET_REFERENCE);
      await expect.poll(getScrollGroupRef, { timeout: 30_000 }).toMatchObject(TARGET_VERSE_REF);
      await expect(
        editorInput
          .locator(`span[data-marker="v"][data-number="${TARGET_VERSE_REF.verseNum}"]`)
          .first(),
      ).toHaveClass(/(^|\s)highlighted(\s|$)/, { timeout: 15_000 });

      // Another view moves the scroll group away, and a `selectRange` back into 2:4 follows at
      // once — before the web view has rendered the move. The request must win: the caret lands in
      // 2:4 and stays there, rather than the late navigation to 2:17 carrying it off to that verse.
      await setScrollGroupRefFromRenderer(mainPage, AWAY_VERSE_REF);
      const location = chapterLocation(TARGET_VERSE_REF, jsonPath, CROSS_VERSE_CARET_OFFSET);
      await sendToEditorController(editorId, 'selectRange', [{ start: location, end: location }]);

      const expectedLocation = { jsonPath, offset: CROSS_VERSE_CARET_OFFSET };
      await expect
        .poll(async () => (await readSelection())?.start?.documentLocation, { timeout: 5_000 })
        .toEqual(expectedLocation);
      // Still there a second later: a navigation that commits after the request must not move it.
      await mainPage.waitForTimeout(1_000);
      const selection = await readSelection();
      expect(selection?.start?.documentLocation).toEqual(expectedLocation);
      expect(selection?.end?.documentLocation).toEqual(expectedLocation);
      // The scroll group follows the request back to 2:4 instead of staying on the move the
      // request overtook, so every view in the group shows the verse the caret is in.
      expect(await getScrollGroupRef()).toMatchObject(TARGET_VERSE_REF);

      // The browser's own caret agrees: inside the span's text, one past the NBSP separator. The
      // earlier annotation over the span's last two characters holds them in their own mark, so the
      // text node the caret sits in ends just before them.
      const browserCaret = await editorInput.evaluate((root) => {
        const sel = root.ownerDocument.getSelection();
        return {
          anchorText: sel?.anchorNode?.textContent ?? undefined,
          anchorOffset: sel?.anchorOffset ?? undefined,
          isCollapsed: sel?.isCollapsed ?? undefined,
        };
      });
      expect(browserCaret).toEqual({
        anchorText: NBSP + charText.slice(0, -2),
        anchorOffset: CROSS_VERSE_CARET_OFFSET + 1,
        isCollapsed: true,
      });
    });

    await test.step("a position at the end of the chapter's last text resolves and reports exactly", async () => {
      const lastVerseText = findVerseText(chapterUsj.content ?? [], '25');
      if (!lastVerseText) throw new Error("No plain text found for John 2:25 in the chapter's USJ");
      const { jsonPath: lastTextPath, text: lastText } = lastVerseText;

      // Navigate to the SAME verseRef the position below addresses, and wait for the app-global
      // scroll group — which this freshly opened editor is subscribed to by default, and which
      // `navigateToolbarBcv` drives — to confirm the commit, before sending any position command.
      // A `selectRange` whose verseRef differs from the web view's OWN current scrRef is applied
      // only after a deferred scroll, and a second scrRef change before that deferred apply runs
      // can silently drop the range (an unreproduced host race). Matching the verseRef up front
      // keeps the editor already on this reference, so the command below applies immediately
      // instead of through that deferred path.
      await navigateToolbarBcv(mainPage, LAST_VERSE_REFERENCE);
      await expect.poll(getScrollGroupRef, { timeout: 30_000 }).toMatchObject(LAST_VERSE_REF);

      const endLocation = chapterLocation(LAST_VERSE_REF, lastTextPath, lastText.length);
      await sendToEditorController(editorId, 'selectRange', [
        { start: endLocation, end: endLocation },
      ]);
      await expect
        .poll(async () => (await readSelection())?.start?.documentLocation, { timeout: 30_000 })
        .toEqual({ jsonPath: lastTextPath, offset: lastText.length });

      const pollLastVerseText = async (expectedText: string) => {
        await expect
          .poll(
            async () => {
              const saved = await getChapterUsj(LAST_VERSE_REF);
              return findVerseText(saved.content ?? [], '25')?.text;
            },
            { timeout: 30_000 },
          )
          .toBe(expectedText);
      };

      await editorInput.pressSequentially('!');
      // Exact, not `endsWith`: proves the caret was really at the end, with nothing after it.
      await pollLastVerseText(`${lastText}!`);

      // Undo the probe so later steps and specs see the original text.
      await editorInput.press('Backspace');
      await pollLastVerseText(lastText);
    });

    await test.step("a setAnnotation on a char span's own saved word does not interrupt an unfinished attribute typed into that SAME span, right after that word", async () => {
      const verseSixText = findVerseText(chapterUsj.content ?? [], '6');
      if (!verseSixText) throw new Error("No plain text found for John 2:6 in the chapter's USJ");
      // The offset right after the text's first word and its following space — the front of
      // the text's own second word, where the fresh span below is inserted.
      const insertionOffset = verseSixText.text.indexOf(' ') + 1;
      if (insertionOffset <= 0)
        throw new Error(
          `Expected at least two words in John 2:6's text, got: ${verseSixText.text}`,
        );

      const controlVerseText = findVerseText(chapterUsj.content ?? [], '7');
      if (!controlVerseText)
        throw new Error("No plain text found for John 2:7 in the chapter's USJ");
      if (!controlVerseText.text.startsWith(CONTROL_WORD))
        throw new Error(
          `Expected John 2:7's text to start with "${CONTROL_WORD}", got: ${controlVerseText.text}`,
        );

      // Turn the idle settle clock off before typing anything below, so no idle timeout can
      // settle either edit at any point — only a caret departure could, and this step
      // deliberately never attempts one: it is the spec's last step, against a throwaway
      // isolated project, so neither the span nor its unfinished attribute needs cleaning up.
      await setUserSetting(MARKER_SETTLE_DELAY_SETTING_KEY, -1);
      try {
        // Place the caret by position, the same collapsed-placement path the very first
        // scenario above verifies.
        const insertionCaret = chapterLocation(
          TYPING_PROBE_VERSE_REF,
          verseSixText.jsonPath,
          insertionOffset,
        );
        await sendToEditorController(editorId, 'selectRange', [
          { start: insertionCaret, end: insertionCaret },
        ]);
        await expect
          .poll(async () => (await readSelection())?.start?.documentLocation, {
            timeout: 30_000,
          })
          .toEqual({ jsonPath: verseSixText.jsonPath, offset: insertionOffset });

        // Type a FRESH, COMPLETE `\w` span — content and closer both — the same
        // literal-USFM-typing technique the pending-attribute step above uses. Its own closer
        // completes the marker, one of the engine's immediate-rebuild triggers, so it settles
        // into its own carrier right away, independent of the idle clock above.
        await editorInput.pressSequentially(
          `\\${WORD_MARKER} ${INCOMPLETE_MARKER_WORD}\\${WORD_MARKER}*`,
          { delay: 30 },
        );
        await expect(editorInput).toContainText(INCOMPLETE_MARKER_WORD, { timeout: 15_000 });
        // `.last()`: the pending-attribute step above already settled its own `\w` span in
        // John 2:5, earlier in the document than this one.
        const wCloser = editorInput.locator(`span.closing[data-marker="${WORD_MARKER}"]`).last();
        await expect(wCloser).toBeAttached({ timeout: 15_000 });

        // Click just inside the left edge of the new span's own closer — the same boundary the
        // pending-attribute step above clicks to append after a span's own text.
        const closerBox = await wCloser.boundingBox();
        if (!closerBox) throw new Error('The new \\w span closing glyph has no bounding box');
        await wCloser.click({ position: { x: 1, y: closerBox.height / 2 } });

        // The settled span splits this text's own array slot into three (text before, the new
        // marker, text after) in place, so the span's own path is this text's index chain with
        // its own last index moved forward by 1 — the same arithmetic the display-bytes step
        // above uses for its own span.
        const textIndex = verseSixText.indexes.at(-1);
        if (textIndex === undefined) throw new Error('findVerseText returned an empty index chain');
        const spanPath = contentJsonPath([...verseSixText.indexes.slice(0, -1), textIndex + 1]);
        // The span's own content — its saved word — one level deeper than the span's own
        // element.
        const spanContentPath = `${spanPath}.content[0]`;

        // Type an UNFINISHED attribute onto the span's own content, right after its saved word
        // — no closing quote, and no need for a new closer since the span's own closer already
        // exists. A bare `|…` bounded by an existing closer carries no backslash, so the
        // engine's immediate-rebuild path never fires for it — it just pends the content node's
        // own key for caret-departure settling, in place, rather than restructuring anything.
        // The caret sits at its own end, mid-edit.
        const incompleteLiteral = `${INCOMPLETE_MARKER_WORD}|lemma="${INCOMPLETE_ATTRIBUTE_VALUE_PREFIX}`;
        await editorInput.pressSequentially(`|lemma="${INCOMPLETE_ATTRIBUTE_VALUE_PREFIX}`, {
          delay: 30,
        });
        await expect(editorInput).toContainText(incompleteLiteral, { timeout: 15_000 });

        // The incomplete literal, and the span itself, each give this paragraph's content
        // array a new slot, shifting every LATER sibling's own index in that SAME paragraph —
        // including John 2:7's, several verses later in the same USJ `\p`. Re-read the chapter
        // fresh right before the control setAnnotation below, rather than reusing the index
        // read at the top of this spec, before any of this spec's own edits.
        const findFreshVerseText = async (verseNumber: string, verseRef: SerializedVerseRef) => {
          const freshChapter = await getChapterUsj(verseRef);
          const freshVerseText = findVerseText(freshChapter.content ?? [], verseNumber);
          if (!freshVerseText)
            throw new Error(`No plain text found for John 2:${verseNumber} in a fresh read`);
          return freshVerseText;
        };

        const assertLiteralSurvives = async (failureMessage: string) => {
          // Poll every 100 ms for 1.5 s, inverted: the poll only stops early if a read is
          // found MISSING the still-unfinished literal (recording that read's live text), and
          // otherwise exhausts the full window.
          let collapsedToLiveText: string | undefined;
          try {
            await expect
              .poll(
                async () => {
                  const liveText = (await editorInput.textContent()) ?? '';
                  if (liveText.includes(incompleteLiteral)) return false;
                  collapsedToLiveText = liveText;
                  return true;
                },
                { timeout: 1_500, intervals: [100] },
              )
              .toBe(true);
          } catch {
            // Timed out without ever finding the literal missing: it survived the whole
            // window.
          }
          expect(collapsedToLiveText, failureMessage).toBeUndefined();
        };

        const assertCaretStillExtendsLiteralInPlace = async () => {
          // The caret is still exactly where the literal left it: one more keystroke extends
          // the SAME literal in place, rather than landing elsewhere or starting a fresh edit.
          await editorInput.pressSequentially('r', { delay: 30 });
          await expect(editorInput).toContainText(`${incompleteLiteral}r`, { timeout: 5_000 });
          await editorInput.press('Backspace');
          await expect(editorInput).toContainText(incompleteLiteral, { timeout: 5_000 });
        };

        // The span's own saved word shares the pending caret's own text node (see this file's
        // own {@link TYPING_PROBE_VERSE_REF} doc comment): typing a bare `|…` after an existing
        // closer pends that content node in place instead of restructuring the paragraph.
        await sendToEditorController(editorId, 'setAnnotation', [
          {
            start: chapterLocation(TYPING_PROBE_VERSE_REF, spanContentPath, 0),
            end: chapterLocation(
              TYPING_PROBE_VERSE_REF,
              spanContentPath,
              INCOMPLETE_MARKER_WORD.length,
            ),
          },
          ANNOTATION_TYPE,
          SAME_NODE_ANNOTATION_ID,
        ]);
        await assertLiteralSurvives(
          "a setAnnotation on the span's own saved word must not disturb the attribute still being typed into that SAME span",
        );
        await assertCaretStillExtendsLiteralInPlace();

        const sameNodeMark = editorInput.locator(`mark.annotationId-${SAME_NODE_ANNOTATION_ID}`);
        await expect(sameNodeMark).toHaveCount(1, { timeout: 15_000 });
        expect(await sameNodeMark.textContent()).toBe(INCOMPLETE_MARKER_WORD);

        // Control: the same kind of call, but against a word in a DIFFERENT, already-separate
        // text node of the same paragraph — isolating whether it is specifically a split of
        // the pending caret's OWN node that matters.
        const controlVerseTextFresh = await findFreshVerseText('7', CONTROL_VERSE_REF);
        if (!controlVerseTextFresh.text.startsWith(CONTROL_WORD))
          throw new Error(
            `Expected the fresh John 2:7 text to start with "${CONTROL_WORD}", got: ${controlVerseTextFresh.text}`,
          );
        await sendToEditorController(editorId, 'setAnnotation', [
          {
            start: chapterLocation(CONTROL_VERSE_REF, controlVerseTextFresh.jsonPath, 0),
            end: chapterLocation(
              CONTROL_VERSE_REF,
              controlVerseTextFresh.jsonPath,
              CONTROL_WORD.length,
            ),
          },
          ANNOTATION_TYPE,
          CONTROL_ANNOTATION_ID,
        ]);
        await assertLiteralSurvives(
          'a setAnnotation on a saved word in a DIFFERENT text node must not disturb typing still in progress either',
        );
        await assertCaretStillExtendsLiteralInPlace();

        const controlMark = editorInput.locator(`mark.annotationId-${CONTROL_ANNOTATION_ID}`);
        await expect(controlMark).toHaveCount(1, { timeout: 15_000 });
        expect(await controlMark.textContent()).toBe(CONTROL_WORD);
      } finally {
        await setUserSetting(MARKER_SETTLE_DELAY_SETTING_KEY, DEFAULT_MARKER_SETTLE_DELAY_MS);
      }
    });
  });
});
