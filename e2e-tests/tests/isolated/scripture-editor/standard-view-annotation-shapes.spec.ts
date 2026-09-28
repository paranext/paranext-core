/**
 * End-to-end verification that Standard view keeps an annotation (a comment, a check result) on the
 * text it names when that text runs across something the editor renders but a mark cannot hold — a
 * verse number, a milestone, a char span's opening glyph, a paragraph break — and that the document
 * the editor saves is untouched by the annotation. The comment UI cannot select across these shapes
 * by hand, so every range here is addressed through the scripture editor's web view controller
 * network object (`object:webViewController<webViewId>.…`), the surface extensions use. Locations
 * come from the chapter's own USJ, read from the project data provider that feeds the editor — the
 * locations a real caller computes.
 *
 * Scenarios, one step each, each on its own paragraph so no step moves another step's locations:
 *
 * - A comment from the last word of one verse to the first word of the next becomes one mark on each
 *   side of the verse number. The verse number stays outside both marks, exactly one space still
 *   precedes it, and the saved paragraph is unchanged.
 * - A comment across a milestone the user typed leaves the milestone (and its attribute) in place,
 *   outside the marks, in the editor and in the saved document.
 * - A comment starting exactly at a char span's first content character marks that text, not the
 *   display separator after the span's opening glyph, and the saved span content gains no space.
 * - A comment across a paragraph break adds no space after the next paragraph's `\p`; a BACKWARD
 *   selection over the same break then reports both of its ends without the editor erroring.
 * - A comment on a word after a `\w` span stays on that word when the span's attribute is re-spelled
 *   (`|lemma="grace"` settling to `|grace`), and the saved span carries the attribute.
 * - A caret clicked past a paragraph's trailing footnote stays there when a marker literal typed
 *   earlier in the same paragraph settles, and is reported at the footnote's closer.
 *
 * Settle timing: a typed marker literal settles when the caret leaves it or after an idle delay,
 * whichever comes first. This test raises the idle delay
 * (`platformScriptureEditor.markerSettleDelayMs`) so the last step can take its geometry reads and
 * click between typing and the settle; every other step leaves its edit by clicking elsewhere, so
 * the delay does not change what they check.
 *
 * Saving: an annotation is not document content, so a correct one triggers no save — and a save is
 * what would expose a byte it fabricated. Steps that check the saved document therefore make a
 * small unrelated edit of their own (see `saveAndReadChapter`) and read the chapter once the
 * project data provider has it.
 *
 * ONE test() per spec file on purpose: the isolated fixture is test-scoped, and a SECOND Electron
 * instance launched against the shared webpack renderer dev server has a documented failure mode
 * where new dock tabs never render (see isolated.fixture.ts).
 *
 * Runs against an isolated project root, so the only project is the bundled sample WEB (installed
 * by the C# backend into an empty root, and discarded with it): `npm run test:e2e:isolated
 * tests/isolated/scripture-editor/standard-view-annotation-shapes.spec.ts`.
 */
import { ConsoleMessage, FrameLocator, Locator } from '@playwright/test';
import { test, expect } from '../../../fixtures/isolated.fixture';
import {
  chapterLocation,
  contentJsonPath,
  findVerseText,
  getChapterUsj,
  readEditorSelection,
  sendToEditorController,
  SerializedVerseRef,
  UsjDocument,
  UsjMarkerObject,
  VerseTextLocation,
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
 * The editor prefixes an externally-set annotation type with `external-` and renders each mark as
 * `<mark class="editor-typed-mark-external-<type> annotationId-<id>">`. A range that crosses
 * something a mark cannot hold renders as one mark per side, all carrying the same id.
 */
const ANNOTATION_TYPE = 'spelling';

/** The display separator after a marker glyph (`\p`, a char opener, a verse number). */
const NBSP = '\u00a0';

/**
 * John 2 in the sample WEB project. Paragraph by paragraph: v1–3 · v4 · v5 · v6–11 · v12 · v13–17 ·
 * v18 · v19 · v20–22 · v23–25. The steps use v1–2, v11, v12, v18–19 and v22; v24 is where the caret
 * goes to leave an edit, and v23 carries the save probes.
 */
const CHAPTER_REFERENCE = 'John 2:1';
/** Pins the fixture data before any location is computed from it. */
const CHAPTER_CONTROL_TEXT = 'six water pots of stone';
/** Clicked to move the caret out of an edited paragraph, which settles the edit. */
const CLICK_AWAY_TEXT = /entrust himself/;

/** John 4:6 ends its paragraph with a footnote: `…the sixth hour.\f + \fr 4:6 \ft noon\f*`. */
const TRAILING_NOTE_REFERENCE = 'John 4:6';

/**
 * The idle settle delay this test runs with — long enough to cover the round trips between typing a
 * literal and clicking elsewhere in its paragraph (about 3 s here), where the default is 1 s.
 */
const MARKER_SETTLE_DELAY_MS = 8_000;

function johnVerse(chapterNum: number, verseNum: number): SerializedVerseRef {
  return { book: 'JHN', chapterNum, verseNum };
}

function requireVerseText(usj: UsjDocument, verseNumber: string): VerseTextLocation {
  const found = findVerseText(usj.content ?? [], verseNumber);
  if (!found) throw new Error(`No plain text follows verse ${verseNumber} in the chapter's USJ`);
  return found;
}

function requireOffset(text: string, word: string, fromEnd = false): number {
  const offset = fromEnd ? text.lastIndexOf(word) : text.indexOf(word);
  if (offset === -1) throw new Error(`Expected "${word}" in: ${text}`);
  return offset;
}

/** The content array of the paragraph at `paragraphIndex` in the chapter's USJ. */
function paragraphContent(usj: UsjDocument, paragraphIndex: number): (string | UsjMarkerObject)[] {
  const paragraph = usj.content?.[paragraphIndex];
  if (typeof paragraph !== 'object' || paragraph.type !== 'para')
    throw new Error(`USJ content[${paragraphIndex}] is not a paragraph`);
  return paragraph.content ?? [];
}

/** The index of the paragraph a verse text sits in, from its `content` index chain. */
function paragraphIndexOf(verseText: VerseTextLocation): number {
  const [index] = verseText.indexes;
  if (index === undefined) throw new Error('findVerseText returned an empty index chain');
  return index;
}

/** The index a verse text has inside its own paragraph. */
function indexInParagraph(verseText: VerseTextLocation): number {
  const index = verseText.indexes.at(-1);
  if (index === undefined) throw new Error('findVerseText returned an empty index chain');
  return index;
}

test.use({
  interfaceMode: 'power',
  electronLaunchOptions: { isolatedProjectRoot: true, envOverrides: { DEV_NOISY: 'false' } },
  seedSettings: { 'platformScriptureEditor.markerSettleDelayMs': MARKER_SETTLE_DELAY_MS },
});

test.describe('scripture editor annotation shapes', () => {
  test('annotations across verse numbers, milestones, char openers and paragraphs keep the text and the document intact', async ({
    mainPage,
  }) => {
    // Heavy isolated test (own Electron instance, backend-readiness gates, two chapter loads,
    // several typed edits each awaited through a save). 3x "slow" budget — see
    // standard-default-power-mode.spec.ts.
    test.slow();

    await waitForHomeTab(mainPage);
    await makeSampleProjectEditable();
    const editorId = await openEditableScriptureEditorForProject(mainPage, SAMPLE_WEB_PROJECT_ID);
    const editorFrame: FrameLocator = mainPage.frameLocator(
      `iframe[data-web-view-id="${editorId}"]`,
    );
    await editorFrame.locator('.editor-container').waitFor({ timeout: 60_000 });

    await navigateToolbarBcv(mainPage, CHAPTER_REFERENCE);
    // `.first()`: an open footnote popover carries its own `.editor-input.marker-editable`.
    const editorInput = editorFrame.locator('.editor-input.marker-editable').first();
    await expect(editorInput).toBeAttached({ timeout: 60_000 });
    // Positive control, and the gate that the chapter finished loading before its USJ is read.
    await expect(editorInput).toContainText(CHAPTER_CONTROL_TEXT, { timeout: 60_000 });
    await waitForEditorControllerMethod(editorId, 'setAnnotation');

    const chapterUsj = await getChapterUsj(johnVerse(2, 1));
    const readSelection = () => readEditorSelection(editorId);

    /** The rendered paragraph whose text contains `text`. */
    const paragraphWith = (text: string): Locator =>
      editorInput.locator(':scope > p', { hasText: text });

    /** Every mark of one annotation, in document order. */
    const marksOf = (annotationId: string): Locator =>
      editorInput.locator(`mark.annotationId-${annotationId}`);

    /**
     * The exact text of each mark of one annotation, in document order. Exact, not `toHaveText`:
     * that normalizes whitespace, and a space moving into or out of a mark is one of the failures
     * these steps look for.
     */
    const expectMarkTexts = async (annotationId: string, texts: string[]) => {
      await expect
        .poll(async () => marksOf(annotationId).allTextContents(), { timeout: 30_000 })
        .toEqual(texts);
    };

    const setAnnotation = async (
      chapterNum: number,
      start: { verse: number; jsonPath: string; offset: number },
      end: { verse: number; jsonPath: string; offset: number },
      annotationId: string,
    ) => {
      await sendToEditorController(editorId, 'setAnnotation', [
        {
          start: chapterLocation(johnVerse(chapterNum, start.verse), start.jsonPath, start.offset),
          end: chapterLocation(johnVerse(chapterNum, end.verse), end.jsonPath, end.offset),
        },
        ANNOTATION_TYPE,
        annotationId,
      ]);
    };

    /** Put a collapsed caret at a settled location and wait until the editor reports it there. */
    const placeCaret = async (
      chapterNum: number,
      verse: number,
      jsonPath: string,
      offset: number,
    ) => {
      const location = chapterLocation(johnVerse(chapterNum, verse), jsonPath, offset);
      await sendToEditorController(editorId, 'selectRange', [{ start: location, end: location }]);
      await expect
        .poll(async () => (await readSelection())?.start?.documentLocation, { timeout: 30_000 })
        .toEqual({ jsonPath, offset });
    };

    /** Move the caret to another paragraph, which settles an edit left in the current one. */
    const clickAway = async () => {
      await editorInput.getByText(CLICK_AWAY_TEXT).click();
    };

    /** Read chapter 2 from the project data provider until `isReady` accepts it. */
    const pollChapter = async (isReady: (usj: UsjDocument) => boolean): Promise<UsjDocument> => {
      let latest: UsjDocument | undefined;
      await expect
        .poll(
          async () => {
            latest = await getChapterUsj(johnVerse(2, 1));
            return isReady(latest);
          },
          { timeout: 30_000 },
        )
        .toBe(true);
      if (!latest) throw new Error('The chapter was never read');
      return latest;
    };

    /**
     * Type `probe` in front of "observing" in John 2:23 and return the chapter once the project
     * data provider has it. The editor saves the whole chapter, so every paragraph the returned USJ
     * carries is what the editor had at that save — including anything an annotation changed. Keep
     * `probe` to plain letters: the save goes through USFM, which reads some punctuation as markup
     * (`~` comes back as a no-break space), and the probe is found by its exact text.
     */
    const saveAndReadChapter = async (probe: string): Promise<UsjDocument> => {
      const current = await getChapterUsj(johnVerse(2, 1));
      const probeVerse = requireVerseText(current, '23');
      await placeCaret(2, 23, probeVerse.jsonPath, requireOffset(probeVerse.text, 'observing'));
      await editorInput.pressSequentially(probe, { delay: 30 });
      return pollChapter((usj) => JSON.stringify(usj.content).includes(probe));
    };

    await test.step('a comment across a verse number keeps the verse outside the marks and adds no space', async () => {
      const verseOne = requireVerseText(chapterUsj, '1');
      const verseTwo = requireVerseText(chapterUsj, '2');
      // "…Jesus’ mother was there. " — the space before `\v 2` is USJ text inside the range.
      const lastWord = 'there. ';
      const firstWord = 'Jesus';
      expect(verseOne.text.endsWith(lastWord)).toBe(true);
      expect(verseTwo.text.startsWith(firstWord)).toBe(true);

      await setAnnotation(
        2,
        { verse: 1, jsonPath: verseOne.jsonPath, offset: verseOne.text.length - lastWord.length },
        { verse: 2, jsonPath: verseTwo.jsonPath, offset: firstWord.length },
        'across-verse',
      );

      await expectMarkTexts('across-verse', [lastWord, firstWord]);
      const paragraph = paragraphWith('wedding in Cana');
      await expect(paragraph.locator('span.verse[data-number="2"]')).toHaveCount(1);
      await expect(editorInput.locator('mark [data-marker="v"]')).toHaveCount(0);
      // Exactly one space between "there." and the verse number: the verse glyph renders as
      // `\v<NBSP>2 `, so any space the verse brought along in addition shows up as a second one.
      expect(await paragraph.textContent()).toContain(
        `mother was there. \\v${NBSP}2 Jesus also was invited`,
      );

      const saved = await saveAndReadChapter('probeverse');
      const paragraphIndex = paragraphIndexOf(verseOne);
      expect(paragraphContent(saved, paragraphIndex)).toEqual(
        paragraphContent(chapterUsj, paragraphIndex),
      );
    });

    await test.step('a comment across a typed milestone keeps the milestone', async () => {
      const verseEleven = requireVerseText(chapterUsj, '11');
      const insertionOffset = requireOffset(verseEleven.text, 'and revealed');
      await placeCaret(2, 11, verseEleven.jsonPath, insertionOffset);
      // The sample ships no milestones; type one mid-verse as literal USFM, the way a user would.
      // `who` is `\qt-s`'s default attribute, so it displays as the bare `|Pilate`.
      await editorInput.pressSequentially('\\qt-s |who="Pilate"\\*', { delay: 30 });
      await clickAway();

      const paragraph = paragraphWith('beginning of his signs');
      const milestone = paragraph.locator('span.ms[data-marker="qt-s"]');
      await expect(milestone).toHaveCount(1, { timeout: 15_000 });
      await expect(paragraph.locator('.attribute-run')).toHaveText(`\\qt-s${NBSP}|Pilate\\*`);

      // The typed milestone split verse 11's text in place: text before, the milestone, text after.
      const paragraphIndex = paragraphIndexOf(verseEleven);
      const textIndex = indexInParagraph(verseEleven);
      const settled = await pollChapter((usj) =>
        paragraphContent(usj, paragraphIndex).some(
          (node) => typeof node === 'object' && node.type === 'ms',
        ),
      );
      const content = paragraphContent(settled, paragraphIndex);
      const textBefore = content[textIndex];
      const textAfter = content[textIndex + 2];
      expect(content[textIndex + 1]).toEqual({ type: 'ms', marker: 'qt-s', who: 'Pilate' });
      expect(textBefore).toBe(verseEleven.text.slice(0, insertionOffset));
      expect(textAfter).toBe(verseEleven.text.slice(insertionOffset));
      if (typeof textBefore !== 'string' || typeof textAfter !== 'string')
        throw new Error('The milestone is not flanked by text');

      const wordBefore = 'Galilee, ';
      const wordAfter = 'and';
      await setAnnotation(
        2,
        {
          verse: 11,
          jsonPath: verseEleven.jsonPath,
          offset: requireOffset(textBefore, wordBefore, true),
        },
        {
          verse: 11,
          jsonPath: contentJsonPath([paragraphIndex, textIndex + 2]),
          offset: wordAfter.length,
        },
        'across-milestone',
      );

      await expectMarkTexts('across-milestone', [wordBefore, wordAfter]);
      await expect(milestone).toHaveCount(1);
      await expect(paragraph.locator('.attribute-run')).toHaveText(`\\qt-s${NBSP}|Pilate\\*`);
      await expect(editorInput.locator('mark .ms, mark .attribute-run')).toHaveCount(0);

      const saved = await saveAndReadChapter('probemilestone');
      expect(paragraphContent(saved, paragraphIndex)).toEqual(content);
    });

    await test.step('a comment starting at a char span opener marks the text, not the separator', async () => {
      const verseTwelve = requireVerseText(chapterUsj, '12');
      const insertionOffset = requireOffset(verseTwelve.text, 'went');
      await placeCaret(2, 12, verseTwelve.jsonPath, insertionOffset);
      await editorInput.pressSequentially('\\nd LORD\\nd* ', { delay: 30 });
      await clickAway();

      const paragraph = paragraphWith('Capernaum');
      const charSpan = paragraph.locator('span.char[data-marker="nd"]');
      await expect(charSpan).toHaveCount(1, { timeout: 15_000 });

      const paragraphIndex = paragraphIndexOf(verseTwelve);
      const textIndex = indexInParagraph(verseTwelve);
      const settled = await pollChapter((usj) =>
        paragraphContent(usj, paragraphIndex).some(
          (node) => typeof node === 'object' && node.marker === 'nd',
        ),
      );
      const content = paragraphContent(settled, paragraphIndex);
      expect(content[textIndex + 1]).toEqual({ type: 'char', marker: 'nd', content: ['LORD'] });
      const textAfter = content[textIndex + 2];
      const wordAfter = ' went';
      if (typeof textAfter !== 'string' || !textAfter.startsWith(wordAfter))
        throw new Error(`Expected text starting "${wordAfter}" after the span, got ${textAfter}`);

      await setAnnotation(
        2,
        { verse: 12, jsonPath: contentJsonPath([paragraphIndex, textIndex + 1, 0]), offset: 0 },
        {
          verse: 12,
          jsonPath: contentJsonPath([paragraphIndex, textIndex + 2]),
          offset: wordAfter.length,
        },
        'at-char-opener',
      );

      // One mark inside the span, one after its closer; the opener's separator is in neither.
      await expectMarkTexts('at-char-opener', ['LORD', wordAfter]);
      expect(await charSpan.textContent()).toBe(`\\nd${NBSP}LORD\\nd*`);

      const saved = await saveAndReadChapter('probecharopener');
      expect(paragraphContent(saved, paragraphIndex)).toEqual(content);
    });

    await test.step('a comment across a paragraph break adds no space, and a backward selection over it reports both ends', async () => {
      const verseEighteen = requireVerseText(chapterUsj, '18');
      const verseNineteen = requireVerseText(chapterUsj, '19');
      const lastWord = 'things?”';
      const firstWord = 'Jesus';
      expect(verseEighteen.text.endsWith(lastWord)).toBe(true);
      expect(verseNineteen.text.startsWith(firstWord)).toBe(true);
      const rangeStart = {
        verse: 18,
        jsonPath: verseEighteen.jsonPath,
        offset: verseEighteen.text.length - lastWord.length,
      };
      const rangeEnd = {
        verse: 19,
        jsonPath: verseNineteen.jsonPath,
        offset: firstWord.length,
      };

      await setAnnotation(2, rangeStart, rangeEnd, 'across-paragraph');

      await expectMarkTexts('across-paragraph', [lastWord, firstWord]);
      // The second paragraph still opens `\p<NBSP>\v<NBSP>19 Jesus` — the separator after `\p`
      // neither doubled nor moved into the mark.
      expect(await paragraphWith('Destroy this temple').textContent()).toMatch(
        new RegExp(`^\\\\p${NBSP}\\\\v${NBSP}19 Jesus answered them, `),
      );

      const editorErrors: string[] = [];
      const onConsole = (message: ConsoleMessage) => {
        if (message.type() === 'error') editorErrors.push(message.text());
      };
      const onPageError = (error: Error) => editorErrors.push(error.message);
      mainPage.on('console', onConsole);
      mainPage.on('pageerror', onPageError);
      try {
        // `end` before `start`: the editor places the anchor after the focus.
        await sendToEditorController(editorId, 'selectRange', [
          {
            start: chapterLocation(
              johnVerse(2, rangeEnd.verse),
              rangeEnd.jsonPath,
              rangeEnd.offset,
            ),
            end: chapterLocation(
              johnVerse(2, rangeStart.verse),
              rangeStart.jsonPath,
              rangeStart.offset,
            ),
          },
        ]);
        // The browser's own selection proves the range really is backward.
        await expect
          .poll(
            async () =>
              editorInput.evaluate((root) => {
                const selection = root.ownerDocument.getSelection();
                if (!selection?.anchorNode || !selection.focusNode || selection.isCollapsed)
                  return 'no range';
                // A range cannot end before it starts: running it from anchor to focus collapses
                // it exactly when the focus comes first.
                const anchorToFocus = root.ownerDocument.createRange();
                anchorToFocus.setStart(selection.anchorNode, selection.anchorOffset);
                anchorToFocus.setEnd(selection.focusNode, selection.focusOffset);
                return anchorToFocus.collapsed ? `backward: ${selection.toString()}` : 'forward';
              }),
            { timeout: 20_000 },
          )
          .toMatch(/^backward: things\?”[\s\S]*Jesus$/);

        // The editor reports the range in document order, both ends present.
        await expect
          .poll(
            async () => {
              const selection = await readSelection();
              return [selection?.start?.documentLocation, selection?.end?.documentLocation];
            },
            { timeout: 30_000 },
          )
          .toEqual([
            { jsonPath: rangeStart.jsonPath, offset: rangeStart.offset },
            { jsonPath: rangeEnd.jsonPath, offset: rangeEnd.offset },
          ]);
      } finally {
        mainPage.off('console', onConsole);
        mainPage.off('pageerror', onPageError);
      }
      expect(editorErrors.filter((error) => /call stack|recursion/i.test(error))).toEqual([]);

      const saved = await saveAndReadChapter('probeparagraph');
      [paragraphIndexOf(verseEighteen), paragraphIndexOf(verseNineteen)].forEach((index) =>
        expect(paragraphContent(saved, index)).toEqual(paragraphContent(chapterUsj, index)),
      );
    });

    await test.step('a comment after a \\w span stays on its word when the span attribute is re-spelled', async () => {
      const verseTwentyTwo = requireVerseText(chapterUsj, '22');
      const insertionOffset = requireOffset(verseTwentyTwo.text, 'Scripture');
      await placeCaret(2, 22, verseTwentyTwo.jsonPath, insertionOffset);
      // The sample ships no `\w` spans; type one mid-verse as literal USFM.
      await editorInput.pressSequentially('\\w grace\\w* ', { delay: 30 });
      await clickAway();

      const paragraph = paragraphWith('which Jesus had said');
      const wordCloser = paragraph.locator('span.closing[data-marker="w"]');
      await expect(wordCloser).toHaveCount(1, { timeout: 15_000 });

      const paragraphIndex = paragraphIndexOf(verseTwentyTwo);
      const textIndex = indexInParagraph(verseTwentyTwo);
      const settled = await pollChapter((usj) =>
        paragraphContent(usj, paragraphIndex).some(
          (node) => typeof node === 'object' && node.marker === 'w',
        ),
      );
      const content = paragraphContent(settled, paragraphIndex);
      expect(content[textIndex + 1]).toEqual({ type: 'char', marker: 'w', content: ['grace'] });
      const textAfter = content[textIndex + 2];
      if (typeof textAfter !== 'string') throw new Error('No text follows the typed \\w span');
      const annotatedWord = 'word';

      await setAnnotation(
        2,
        {
          verse: 22,
          jsonPath: contentJsonPath([paragraphIndex, textIndex + 2]),
          offset: requireOffset(textAfter, annotatedWord),
        },
        {
          verse: 22,
          jsonPath: contentJsonPath([paragraphIndex, textIndex + 2]),
          offset: requireOffset(textAfter, annotatedWord) + annotatedWord.length,
        },
        'after-respelled-span',
      );
      await expectMarkTexts('after-respelled-span', [annotatedWord]);

      // Type the named form of `\w`'s default attribute just inside the closer, then leave: the
      // edit settles to the bare `|grace` form, re-spelling bytes in front of the comment.
      const closerBox = await wordCloser.boundingBox();
      if (!closerBox) throw new Error('The typed \\w span closing glyph has no bounding box');
      await wordCloser.click({ position: { x: 1, y: closerBox.height / 2 } });
      await editorInput.pressSequentially('|lemma="grace"', { delay: 30 });
      await clickAway();

      await expect(paragraph).toContainText('grace|grace', { timeout: 15_000 });
      await expect(paragraph).not.toContainText('lemma=');
      await expectMarkTexts('after-respelled-span', [annotatedWord]);

      const saved = await pollChapter((usj) => {
        const span = paragraphContent(usj, paragraphIndex)[textIndex + 1];
        return typeof span === 'object' && JSON.stringify(span).includes('"lemma":"grace"');
      });
      expect(paragraphContent(saved, paragraphIndex)[textIndex + 1]).toEqual({
        type: 'char',
        marker: 'w',
        lemma: 'grace',
        content: ['grace'],
      });
      expect(paragraphContent(saved, paragraphIndex)[textIndex + 2]).toBe(textAfter);
    });

    await test.step('a caret past a trailing footnote stays there when an earlier literal in the paragraph settles', async () => {
      await navigateToolbarBcv(mainPage, TRAILING_NOTE_REFERENCE);
      await expect(editorInput).toContainText('about the sixth hour', { timeout: 60_000 });
      const chapterFour = await getChapterUsj(johnVerse(4, 1));
      const verseSix = requireVerseText(chapterFour, '6');
      const paragraphIndex = paragraphIndexOf(verseSix);
      const content = paragraphContent(chapterFour, paragraphIndex);
      const noteIndex = content.length - 1;
      const note = content[noteIndex];
      expect(typeof note === 'object' && note.type === 'note' && note.marker === 'f').toBe(true);
      expect(noteIndex).toBe(indexInParagraph(verseSix) + 1);

      await placeCaret(4, 6, verseSix.jsonPath, requireOffset(verseSix.text, 'well was there'));
      await editorInput.pressSequentially('\\nd x\\nd* ', { delay: 30 });
      const typedAt = Date.now();

      // Straight to the far end of the footnote's line, past its caller (a collapsed note shows
      // only its caller), with no click elsewhere first: the literal settles while the caret sits
      // at the paragraph end. The click lands in the text node the editor keeps after a trailing
      // note to hold the caret; a bare element point on the paragraph, which no click here
      // produces, is covered by the editor's own settle tests.
      const paragraph = paragraphWith('about the sixth hour');
      const noteBox = await paragraph.locator('span.note[data-marker="f"]').last().boundingBox();
      const paragraphBox = await paragraph.boundingBox();
      if (!noteBox || !paragraphBox) throw new Error('The trailing footnote is not laid out');
      await mainPage.mouse.click(
        paragraphBox.x + paragraphBox.width - 4,
        noteBox.y + noteBox.height / 2,
      );
      // Otherwise the idle clock settled the literal before the caret got here, and the rest of
      // this step would check nothing.
      expect(Date.now() - typedAt).toBeLessThan(MARKER_SETTLE_DELAY_MS);
      await expect(paragraph.locator('span.char[data-marker="nd"]')).toHaveCount(1);
      // Past the idle clock, so the report below is the caret after the settle, however the
      // settle was triggered.
      await mainPage.waitForTimeout(typedAt + MARKER_SETTLE_DELAY_MS + 1_000 - Date.now());

      // The typed span split verse 6's text in two around it, so the note moved two slots on.
      // A paragraph ending in a note ends at that note's closer, `\f*`, at its length.
      const expected = {
        jsonPath: contentJsonPath([paragraphIndex, noteIndex + 2]),
        closingMarkerOffset: 3,
      };
      await expect
        .poll(
          async () => {
            const selection = await readSelection();
            return [selection?.start?.documentLocation, selection?.end?.documentLocation];
          },
          { timeout: 30_000 },
        )
        .toEqual([expected, expected]);
    });
  });
});
