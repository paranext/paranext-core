/**
 * End-to-end cover for the chapter-marker save-boundary repair of a marker that is WRONG: a
 * mistyped number, a second `\c` typed into a chapter, and the backend's own correction of the same
 * documents. (A marker that is MISSING, or left as text, is `chapter-marker-restore.spec.ts`.)
 *
 * Retyping the number on a `\c` marker in Standard view is a legal gesture (Paratext 9 parity:
 * whole word, valid or not), but the document it produces is one `ScrText.ValidateChapterNumber`
 * refuses — and because the refused document STAYS in the editor, every later debounced save of
 * that chapter is refused identically. The chapter silently stops saving. The repair util fixes the
 * document on the way out, pushes the repaired document back into the editor, and tells the user.
 *
 * The unit suites pin the repair algorithm and the save-path plumbing. What only the running app
 * can show is the part those suites stub: that the gesture really does poison the document, that
 * the push-back reaches the editor, that the caret the push-back destroyed is put back at the
 * correction, that the chapter goes on saving afterwards, that a repair carried by the
 * chapter-switch flush reports without overwriting the chapter the user moved to, that a repair
 * carried by the save on leaving still reaches the screen — the one case the save runs in with the
 * user's last keystroke still fresh — and that a `\c` typed into the middle of a paragraph is
 * removed with the paragraph kept whole.
 *
 * The backend half (`ChapterMarkerCorrection.cs`, wired into the Paratext PDP's chapter setters as
 * the backstop for writers that never go through the editor) has no UI: its steps go straight to
 * the project data provider over PAPI. `ChapterMarkerCorrectionTests.cs` pins the algorithm to
 * Paratext 9's own `[TestCase]` table and `ChapterMarkerCorrectionWiringTests.cs` pins the setters
 * to calling it, but only a live write reaches `ScrText.ValidateChapterNumber`, the code that
 * refuses these documents — so a correction that fixed the marker but left, say, content ahead of
 * it would pass every unit test and still fail every save.
 *
 * Each test() launches its own Electron instance and edits the project on disk, so a test that
 * leaves a chapter changed gets its own start. The first test's steps share one instance: each
 * works on a chapter the steps before it did not edit (Jonah 1 through the editor, then Jonah 2
 * through the provider, which the editor never saves).
 *
 * Runs against an isolated project root (the bundled sample WEB is installed into the empty root):
 * `npm run test:e2e:isolated scripture-editor`.
 */
import { test, expect } from '../../../fixtures/isolated.fixture';
import {
  chapterMarkerCorrectionMessage,
  getChapterUsfmFromProvider,
  getSampleProjectDataProviderId,
  openSampleEditorInStandardView,
  PDP_REQUEST_TIMEOUT_MS,
  WEBSOCKET_PORT,
} from '../../../fixtures/chapter-marker-helpers';
import { sendPapiRequestOnce } from '../../../fixtures/helpers';
import {
  findScriptureEditorFrame,
  makeSampleProjectEditable,
  navigateToolbarBcv,
  waitForHomeTab,
} from '../../../fixtures/scripture-editor-helpers';
import {
  clearRecordedToasts,
  installToastProbe,
  recordedToasts,
} from '../../../fixtures/toast-recorder';

// Power mode so the editor opens in Standard view, where the chapter marker is editable text at
// all. DEV_NOISY=false keeps the normal Home layout (see preview-read-only-power-mode.spec.ts).
test.use({
  interfaceMode: 'power',
  electronLaunchOptions: { isolatedProjectRoot: true, envOverrides: { DEV_NOISY: 'false' } },
});

/** The config's per-test default (`e2e-tests/playwright.config.ts`), `test.slow()` triples it. */
const DEFAULT_TEST_TIMEOUT_MS = 120_000;
/** The cold-start budget: Playwright's 3x "slow" allowance on the config's default. */
const COLD_START_TIMEOUT_MS = 3 * DEFAULT_TEST_TIMEOUT_MS;
/** The budget of a step added after the cold start: the app is up, so the config's default. */
const WARM_STEP_TIMEOUT_MS = DEFAULT_TEST_TIMEOUT_MS;

/** The correction notice for Jonah 1, the chapter every editor repair in the first test is made to. */
const JONAH_1_CORRECTION_MESSAGE = chapterMarkerCorrectionMessage(1, 'Jonah');

// All-caps tokens that appear nowhere in the WEB text, so a `toContainText` match is unambiguous.
const AFTER_REPAIR_TOKEN = 'ZZAFTERREPAIR';
const FLUSH_TOKEN = 'ZZFLUSHSAVE';

/** Jonah 2 — a chapter after the first, so its document must BEGIN with its chapter marker. */
const JONAH_2 = { book: 'JON', chapterNum: 2, verseNum: 1 };
/** A phrase from Jonah 2:1 that must survive every round trip, proving the write kept the content. */
const JONAH_2_PHRASE = 'prayed to Yahweh, his God';

/** Every `\c N` marker in a USFM document, in order. `\ca`/`\cl`/`\cp` do not match. */
function chapterMarkers(usfm: string): string[] {
  return [...usfm.matchAll(/\\c\s+(\d+)/g)].map((match) => match[1]);
}

/** The text the marker is typed into the middle of, split where it goes. */
const TEXT_BEFORE_MARKER = 'Naomi had ';
const TEXT_AFTER_MARKER = 'a relative of her husband';

/** Between keys, so each is handled before the next arrives. */
const KEY_DELAY_MS = 80;

/** Typed once the correction is on screen, to show where the caret came back. */
const CARET_TOKEN = 'ZZMID';

test.describe('scripture editor chapter-marker repair', () => {
  test('repairs a mistyped chapter marker, reports it, and keeps the chapter saving', async ({
    mainPage,
  }) => {
    // Heavy isolated test (own Electron instance, backend-readiness gates, then several rounds of
    // deliberately-paced typing and chapter navigation), plus one warm step for the backend half.
    test.setTimeout(COLD_START_TIMEOUT_MS + WARM_STEP_TIMEOUT_MS);

    await waitForHomeTab(mainPage);
    await makeSampleProjectEditable();
    const { editorFrame, editorInput } = await openSampleEditorInStandardView(mainPage);

    // The editable chapter node renders as `<p class="chapter" data-marker="c" data-number="N">`
    // holding the `\c<NBSP>N ` glyph text, so `data-number` is a direct read of the chapter number
    // the document currently claims.
    const chapterMarker = editorFrame.locator('p.chapter[data-marker="c"]').first();
    const chapterGlyph = chapterMarker.locator('span[data-lexical-text="true"]').first();
    // The toolbar's book/chapter control, in the app around the editor: clicking it is how these
    // steps leave the editor's web view.
    const bookChapterTrigger = mainPage
      .locator('button[aria-label="book-chapter-trigger"]')
      .first();

    /**
     * Retype the chapter number the way a user would: put the caret just after it and type a digit,
     * so `\c 1 ` becomes `\c 1<digit> `. The terminating space is what makes the editor's chapter
     * transform take the typed word as the new number.
     *
     * The click lands on the glyph but every KEY goes to the contenteditable: Playwright's
     * `press`/`pressSequentially` focus their target first, and focusing the unfocusable inner
     * `<span>` drops the caret the click just placed (see `clickChapterMarkerGlyph`).
     */
    const retypeChapterNumber = async (digit: string) => {
      await chapterGlyph.click();
      await editorInput.press('End');
      await editorInput.press('ArrowLeft');
      await editorInput.pressSequentially(digit, { delay: 60 });
    };

    /**
     * Where the caret is, as the web view's own document sees it: whether it sits in the chapter
     * marker's glyph text and, if so, how many characters of that glyph follow it. The glyph reads
     * `\c<NBSP><number><space>`, so exactly one character after the caret means the caret is
     * immediately after the number — where deleting the errant text by hand would have left it.
     *
     * Read from the DOM selection rather than inferred from where the next keystroke lands: a
     * keystroke at this position goes INTO the marker, so using one to probe would change the thing
     * being probed.
     */
    const editorEvalFrame = await findScriptureEditorFrame(mainPage);
    const readCaret = async () =>
      editorEvalFrame.evaluate(() => {
        const selection = document.getSelection();
        const node = selection?.anchorNode;
        if (!selection || !node || node.nodeType !== Node.TEXT_NODE)
          return { where: 'no-text-caret', charsAfterCaret: -1 };
        if (!node.parentElement?.closest('p.chapter[data-marker="c"]'))
          return { where: 'outside-the-chapter-marker', charsAfterCaret: -1 };
        return {
          where: 'chapter-marker-glyph',
          charsAfterCaret: (node.textContent ?? '').length - selection.anchorOffset,
        };
      });

    await installToastProbe(mainPage);

    // Jonah (4 chapters) lets one book cover the chapter-switch steps below.
    await navigateToolbarBcv(mainPage, 'Jonah 1:1');
    await expect(editorInput).toContainText('word came to Jonah the son of Amittai', {
      timeout: 60_000,
    });
    await expect(chapterMarker).toHaveAttribute('data-number', '1', { timeout: 30_000 });

    await test.step('a mistyped chapter number is put back, and the user is told', async () => {
      await clearRecordedToasts(mainPage);
      await retypeChapterNumber('5');

      // Deliberately NOT asserted: that `data-number` is ever observed as "15". The repair rides
      // the ordinary trailing save, so the document is poisoned for the length of the 700ms
      // debounce (measured in-page: keystroke to push-back, 766ms) and then is not — pinning a
      // window that narrow would buy a flaky test and no coverage. It does not need pinning
      // either: the correction notice is raised ONLY when the repair actually changed the
      // document, so the toast below is itself the proof that the gesture poisoned it.
      await expect(chapterMarker).toHaveAttribute('data-number', '1', { timeout: 30_000 });
      await expect
        .poll(() => recordedToasts(mainPage), { timeout: 20_000 })
        .toEqual(expect.arrayContaining([expect.stringContaining(JONAH_1_CORRECTION_MESSAGE)]));
    });

    await test.step('the caret comes back to the number that was corrected', async () => {
      // The push-back replaces the whole document (`setUsj`), which regenerates every Lexical key
      // and so leaves the editor with no caret at all; the save path places one afresh at the
      // correction. This is the assertion that pins where the editor puts the repair util's target
      // on screen — the unit suite can only state the target, not check where it lands.
      await expect
        .poll(readCaret, { timeout: 20_000 })
        .toEqual({ where: 'chapter-marker-glyph', charsAfterCaret: 1 });
    });

    await test.step('the keystrokes that follow the push-back are not dropped', async () => {
      // Click into the body first: after a renumber the caret sits in the chapter marker, where
      // typed characters are marker bytes that the next repair would correct straight back out.
      await editorInput.click();
      await editorInput.press('End');
      await editorInput.pressSequentially(AFTER_REPAIR_TOKEN, { delay: 40 });
      await expect(editorInput).toContainText(AFTER_REPAIR_TOKEN, { timeout: 20_000 });
    });

    await test.step('the chapter still saves after a repair', async () => {
      // A document Paratext refuses stays in the editor, so unless the repair lets the write
      // through, every later save of the chapter is refused too and everything typed after the
      // mistyped marker is silently lost at the chapter switch.
      //
      // Positive control first: wait for Jonah 2's own verse text so the negative assertion runs
      // against RENDERED chapter-2 content — `not.toContainText` alone is satisfied by the empty
      // mid-navigation editor and would pass vacuously.
      await navigateToolbarBcv(mainPage, 'Jonah 2:1');
      await expect(editorInput).toContainText(JONAH_2_PHRASE, { timeout: 60_000 });
      await expect(editorInput).not.toContainText(AFTER_REPAIR_TOKEN, { timeout: 20_000 });

      await navigateToolbarBcv(mainPage, 'Jonah 1:1');
      await expect(editorInput).toContainText(AFTER_REPAIR_TOKEN, { timeout: 60_000 });
      await expect(chapterMarker).toHaveAttribute('data-number', '1', { timeout: 30_000 });
    });

    await test.step('a repair carried by the chapter-switch flush reports without touching the chapter moved to', async () => {
      await editorInput.click();
      await editorInput.press('End');
      await editorInput.pressSequentially(FLUSH_TOKEN, { delay: 40 });
      await expect(editorInput).toContainText(FLUSH_TOKEN, { timeout: 20_000 });

      await clearRecordedToasts(mainPage);
      await retypeChapterNumber('7');
      // Navigating immediately leaves the repair to the chapter-switch flush rather than the
      // debounce, so the save runs through the closure captured for the chapter left behind.
      await navigateToolbarBcv(mainPage, 'Jonah 3:1');

      // The chapter moved to must end up holding its OWN content: the repaired document belongs
      // to Jonah 1 and must not reach the editor now showing Jonah 3. This does not prove
      // `applyChapterSavePreparation`'s chapter guard on its own — the flush runs in an effect
      // cleanup, so the incoming chapter's load lands right after it and would paper over a
      // push-back made without the guard (verified by deleting the guard: this spec stayed green).
      // The guard is pinned directly in `chapter-marker-repair.util.test.ts`; what this covers is
      // the end-to-end outcome, which no unit suite can see. Positive control first, as above.
      await expect(editorInput).toContainText('word came to Jonah the second time', {
        timeout: 60_000,
      });
      await expect(editorInput).not.toContainText(FLUSH_TOKEN, { timeout: 20_000 });

      // The user is still told — and the notice names Jonah 1, the chapter that was repaired,
      // rather than leaving the reader to assume it means the Jonah 3 they are now looking at.
      // Naming the chapter is what this assertion is for; see `chapterMarkerCorrectionMessage`.
      await expect
        .poll(() => recordedToasts(mainPage), { timeout: 20_000 })
        .toEqual(expect.arrayContaining([expect.stringContaining(JONAH_1_CORRECTION_MESSAGE)]));

      // ...and the chapter left behind was written repaired, with the edit that went with it.
      await navigateToolbarBcv(mainPage, 'Jonah 1:1');
      await expect(editorInput).toContainText(FLUSH_TOKEN, { timeout: 60_000 });
      await expect(chapterMarker).toHaveAttribute('data-number', '1', { timeout: 30_000 });
    });

    await test.step("the save's read of whether the user is still typing follows the window", async () => {
      // What the next step rests on, checked on its own so a failure there says which half broke:
      // the window's focus is what tells the save that the keys have stopped coming here.
      await editorInput.click();
      expect(await editorEvalFrame.evaluate(() => document.hasFocus())).toBe(true);

      await bookChapterTrigger.click();
      await expect
        .poll(() => editorEvalFrame.evaluate(() => document.hasFocus()), { timeout: 10_000 })
        .toBe(false);
      await mainPage.keyboard.press('Escape');
    });

    await test.step('a marker corrected by the save on leaving keeps the caret out of the editor', async () => {
      // Leaving the editor within the debounce window flushes the pending save, so the repair runs
      // with the last keystroke newer than the window the editor is otherwise left alone for. The
      // correction has to reach the editor there and then — a chapter left with the wrong marker is
      // corrected by the next edit instead, which takes the caret to the chapter line, away from
      // wherever the user had started typing — and it has to reach it WITHOUT the caret restore,
      // which focuses the editor and would pull the user out of the control they moved to. The
      // editor stays its own document's `activeElement` after the window around it loses focus, so
      // the editor's own `isFocused()` cannot tell those apart; the window's can.
      await clearRecordedToasts(mainPage);
      await retypeChapterNumber('7');
      // Nothing between the last keystroke and the click: a probe here costs enough round trips to
      // let the ordinary trailing save fire first, which would pass this step through the path it
      // is meant to leave out.
      await bookChapterTrigger.click();

      // The toast is raised only when the repair CHANGED the document, so it is the proof that the
      // gesture poisoned the chapter and the save repaired it — the glyph assertion below is then
      // about where that repair landed, and cannot pass vacuously.
      await expect
        .poll(() => recordedToasts(mainPage), { timeout: 20_000 })
        .toEqual(expect.arrayContaining([expect.stringContaining(JONAH_1_CORRECTION_MESSAGE)]));
      await expect.poll(() => chapterGlyph.textContent(), { timeout: 20_000 }).toBe('\\c\u00A01 ');

      // ...and the control the user moved to still has the caret.
      await expect(mainPage.locator('[data-radix-popper-content-wrapper] input')).toBeFocused();
      await mainPage.keyboard.press('Escape');
    });

    await test.step('accepts a chapter whose markers disagree with it, and stores it corrected', async () => {
      // The provider's own half, on Jonah 2: the editor above only viewed that chapter, so its
      // document on disk is still the sample's.
      const pdpId = await getSampleProjectDataProviderId();
      const getChapterUsfm = () => getChapterUsfmFromProvider(pdpId, 'JON', 2);
      const setChapterUsfm = (usfm: string) =>
        sendPapiRequestOnce<boolean>(
          `object:${pdpId}.setChapterUSFM`,
          [JONAH_2, usfm],
          WEBSOCKET_PORT,
          PDP_REQUEST_TIMEOUT_MS,
        );

      const original = await getChapterUsfm();
      expect(chapterMarkers(original)).toEqual(['2']);
      expect(original).toContain(JONAH_2_PHRASE);

      await test.step('a wrong chapter number is put back rather than refused', async () => {
        // Without the correction this write is rejected outright ("Wrong chapter number"), so the
        // request below rejects and the test fails before reaching any assertion — which is exactly
        // the silent, unsurfaced save failure this correction exists to prevent.
        await setChapterUsfm(original.replace(/\\c\s+2/, '\\c 9'));

        const stored = await getChapterUsfm();
        expect(chapterMarkers(stored)).toEqual(['2']);
        expect(stored).toContain(JONAH_2_PHRASE);
      });

      await test.step('a second chapter marker typed into the chapter is dropped', async () => {
        // "Multiple chapter markers present." — the rejection a `\c` typed mid-chapter produces.
        const stored = await getChapterUsfm();
        await setChapterUsfm(`${stored.trimEnd()}\n\\c 9\n`);

        const repaired = await getChapterUsfm();
        expect(chapterMarkers(repaired)).toEqual(['2']);
        expect(repaired).toContain(JONAH_2_PHRASE);
      });

      await test.step('a deleted chapter marker is restored at the very start of the document', async () => {
        // "No chapter marker present." — and the restored marker has to go at position 0, because
        // Paratext also refuses any content ahead of a chapter marker after the first
        // ("Text present before chapter marker.").
        const stored = await getChapterUsfm();
        await setChapterUsfm(stored.replace(/\\c\s+2\s*/, ''));

        const repaired = await getChapterUsfm();
        expect(chapterMarkers(repaired)).toEqual(['2']);
        expect(repaired.trimStart().startsWith('\\c 2')).toBe(true);
        expect(repaired).toContain(JONAH_2_PHRASE);
      });
    });
  });

  test('removes the marker, keeps the paragraph whole, and returns the caret to where it was', async ({
    mainPage,
  }) => {
    // Heavy isolated test (own Electron instance, backend-readiness gates). Playwright's 3x "slow"
    // budget.
    test.slow();

    await waitForHomeTab(mainPage);
    await makeSampleProjectEditable();

    // The marker is typed key by key, which is what makes the editor save: the `\` opens the marker
    // menu, and the space after `c` commits what was typed as the same bytes typing alone would
    // leave. Keys go through `mainPage.keyboard` with the editor focused (`locator.press` focuses
    // its target first and is slow per key).
    const pdpId = await getSampleProjectDataProviderId();
    const getRuth2Usfm = () => getChapterUsfmFromProvider(pdpId, 'RUT', 2);
    // Whitespace-normalized: saving through the editor rewrites the file's line-end spacing.
    const normalized = (usfm: string) => usfm.replace(/\s+/g, ' ').trim();

    const { editorFrame, editorInput } = await openSampleEditorInStandardView(mainPage);
    const editorEvalFrame = await findScriptureEditorFrame(mainPage);

    await installToastProbe(mainPage);

    await navigateToolbarBcv(mainPage, 'Ruth 2:1');
    await expect(editorInput).toContainText(TEXT_BEFORE_MARKER + TEXT_AFTER_MARKER, {
      timeout: 60_000,
    });
    const storedUsfm = normalized(await getRuth2Usfm());
    expect(storedUsfm).toContain(TEXT_BEFORE_MARKER + TEXT_AFTER_MARKER);

    await test.step('a chapter marker is typed into the middle of verse 1', async () => {
      const placed = await editorEvalFrame.evaluate(
        ({ before, after }) => {
          const root = document.querySelector<HTMLElement>('.editor-input.marker-editable');
          if (!root) return false;
          const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
          for (let node = walker.nextNode(); node; node = walker.nextNode()) {
            const offset = (node.textContent ?? '').indexOf(before + after);
            if (offset >= 0) {
              root.focus();
              document.getSelection()?.collapse(node, offset + before.length);
              return true;
            }
          }
          return false;
        },
        { before: TEXT_BEFORE_MARKER, after: TEXT_AFTER_MARKER },
      );
      expect(placed).toBe(true);
      await mainPage.keyboard.type('\\c 5 ', { delay: KEY_DELAY_MS });
    });

    await test.step('the marker is removed and the user is told', async () => {
      await expect
        .poll(() => recordedToasts(mainPage), { timeout: 20_000 })
        .toEqual(
          expect.arrayContaining([
            expect.stringContaining(chapterMarkerCorrectionMessage(2, 'Ruth')),
          ]),
        );
      await expect(editorFrame.locator('p.chapter[data-marker="c"]')).toHaveCount(1, {
        timeout: 30_000,
      });
      await expect(editorInput).toContainText(TEXT_BEFORE_MARKER + TEXT_AFTER_MARKER, {
        timeout: 30_000,
      });
    });

    await test.step('the caret is back where the marker was typed', async () => {
      // The caret restore runs once the corrected document has loaded; until then a key would go
      // wherever the load left the caret, so wait for the caret to sit in the rejoined text.
      await expect
        .poll(
          () =>
            editorEvalFrame.evaluate((before) => {
              const selection = document.getSelection();
              const node = selection?.anchorNode;
              if (!selection || !node || node.nodeType !== Node.TEXT_NODE) return '';
              return (node.textContent ?? '').slice(0, selection.anchorOffset).endsWith(before)
                ? 'after-the-text-before-the-marker'
                : (node.textContent ?? '').slice(0, selection.anchorOffset);
            }, TEXT_BEFORE_MARKER),
          { timeout: 20_000 },
        )
        .toBe('after-the-text-before-the-marker');
      await mainPage.keyboard.type(CARET_TOKEN, { delay: KEY_DELAY_MS });
    });

    await test.step('the chapter saves with its one marker and the paragraph whole', async () => {
      const expected = storedUsfm.replace(
        TEXT_BEFORE_MARKER + TEXT_AFTER_MARKER,
        TEXT_BEFORE_MARKER + CARET_TOKEN + TEXT_AFTER_MARKER,
      );
      await expect
        .poll(async () => normalized(await getRuth2Usfm()), { timeout: 30_000 })
        .toBe(expected);
    });
  });
});
