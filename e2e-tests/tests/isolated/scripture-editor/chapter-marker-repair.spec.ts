/**
 * End-to-end cover for the chapter-marker save-boundary repair.
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
 * correction, that the chapter goes on saving afterwards, and that a repair carried by the
 * chapter-switch flush reports without overwriting the chapter the user moved to.
 *
 * ONE test() per spec file on purpose (the isolated fixture is test-scoped and a second Electron
 * instance against the shared renderer dev server has a documented dock-tab failure mode — see
 * standard-default-power-mode.spec.ts). Sub-scenarios are test.step()s sharing the one instance.
 *
 * Runs against an isolated project root (the bundled sample WEB is installed into the empty root):
 * `npm run test:e2e:isolated scripture-editor`.
 */
import { type Page } from '@playwright/test';
import { test, expect } from '../../../fixtures/isolated.fixture';
import {
  findScriptureEditorFrame,
  makeSampleProjectEditable,
  navigateToolbarBcv,
  openEditableScriptureEditorForProject,
  SAMPLE_WEB_PROJECT_ID,
  waitForHomeTab,
} from '../../../fixtures/scripture-editor-helpers';

// Power mode so the editor opens in Standard view, where the chapter marker is editable text at
// all. DEV_NOISY=false keeps the normal Home layout (see standard-default-power-mode.spec.ts).
test.use({
  interfaceMode: 'power',
  electronLaunchOptions: { isolatedProjectRoot: true, envOverrides: { DEV_NOISY: 'false' } },
});

/**
 * How `%webView_platformScriptureEditor_error_chapterMarkerCorrected_format%` reads for Jonah 1,
 * the chapter every repair in this spec is made to. The chapter is part of the match on purpose:
 * the notice has to name the chapter it repaired, which is not always the chapter on screen.
 */
const CORRECTION_MESSAGE =
  'The chapter marker in Jonah 1 did not match the chapter, so it was corrected';

// All-caps tokens that appear nowhere in the WEB text, so a `toContainText` match is unambiguous.
const AFTER_REPAIR_TOKEN = 'ZZAFTERREPAIR';
const FLUSH_TOKEN = 'ZZFLUSHSAVE';

/**
 * The toast recorder installed into the app window by {@link installToastProbe}. Declared on
 * `Window` rather than reached for with a type assertion, since the page-side callbacks below run
 * in the renderer and cannot import anything.
 */
interface ToastProbe {
  /** Every toast text recorded since installation or the last {@link ToastProbe.clear}. */
  texts: () => string[];
  /** Forget the toasts recorded so far. */
  clear: () => void;
}

declare global {
  interface Window {
    toastProbe?: ToastProbe;
  }
}

/**
 * Records every notification toast that renders, so a test can assert one appeared without having
 * to sample for it.
 *
 * A toast cannot be asserted with a plain locator here: the correction notice carries no `duration:
 * 0`, so it closes itself on a length-derived timer — observed between 1.3s and 4s — and the
 * gesture that raises it resolves only once the repair has already run. An
 * `expect(...).toBeVisible()` started at that point is racing a toast that may have seconds of life
 * left or a few hundred milliseconds. Watching the DOM from BEFORE the gesture removes the race:
 * the observer records the text, and the assertion reads the record whenever it likes.
 */
async function installToastProbe(mainPage: Page): Promise<void> {
  await mainPage.evaluate(() => {
    if (window.toastProbe) return;
    // Keyed by element so a toast whose text arrives after insertion is corrected in place rather
    // than logged twice, and so two separate notices with the same wording stay two entries.
    const seen = new Map<Element, string>();
    const record = () => {
      document.querySelectorAll('.notification-toast').forEach((toast) => {
        const text = toast.textContent ?? '';
        if (text) seen.set(toast, text);
      });
    };
    new MutationObserver(record).observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });
    record();
    window.toastProbe = {
      texts: () => [...seen.values()],
      clear: () => seen.clear(),
    };
  });
}

/** Forget the toasts recorded so far, so the next assertion can only see new ones. */
async function clearRecordedToasts(mainPage: Page): Promise<void> {
  await mainPage.evaluate(() => window.toastProbe?.clear());
}

/** Every toast text recorded since the probe was installed or last cleared. */
async function recordedToasts(mainPage: Page): Promise<string[]> {
  return mainPage.evaluate(() => window.toastProbe?.texts() ?? []);
}

test.describe('scripture editor chapter-marker repair', () => {
  test('repairs a mistyped chapter marker, reports it, and keeps the chapter saving', async ({
    mainPage,
  }) => {
    // Heavy isolated test (own Electron instance, backend-readiness gates, then several rounds of
    // deliberately-paced typing and chapter navigation). Playwright's 3x "slow" budget.
    test.slow();

    await waitForHomeTab(mainPage);
    await makeSampleProjectEditable();
    const editorId = await openEditableScriptureEditorForProject(mainPage, SAMPLE_WEB_PROJECT_ID);
    const editorFrame = mainPage.frameLocator(`iframe[data-web-view-id="${editorId}"]`);
    await editorFrame.locator('.editor-container').waitFor({ timeout: 60_000 });

    // `.first()` because the footnote-editor popover renders its own `.editor-input.marker-editable`.
    const editorInput = editorFrame.locator('.editor-input.marker-editable').first();
    // The editable chapter node renders as `<p class="chapter" data-marker="c" data-number="N">`
    // holding the `\c<NBSP>N ` glyph text, so `data-number` is a direct read of the chapter number
    // the document currently claims.
    const chapterMarker = editorFrame.locator('p.chapter[data-marker="c"]').first();
    const chapterGlyph = chapterMarker.locator('span[data-lexical-text="true"]').first();

    /**
     * Retype the chapter number the way a user would: put the caret just after it and type a digit,
     * so `\c 1 ` becomes `\c 1<digit> `. The terminating space is what makes the editor's chapter
     * transform take the typed word as the new number.
     *
     * The click lands on the glyph but every KEY goes to the contenteditable: Playwright's
     * `press`/`pressSequentially` focus their target first, and focusing the unfocusable inner
     * `<span>` drops the caret the click just placed — the keys then reach no Lexical selection at
     * all and the document is left untouched (a silently vacuous test, confirmed by probe).
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
        .toEqual(expect.arrayContaining([expect.stringContaining(CORRECTION_MESSAGE)]));
    });

    await test.step('the caret comes back to the number that was corrected', async () => {
      // The push-back replaces the whole document (`setUsj`), which regenerates every Lexical key
      // and so leaves the editor with no caret at all; the save path places one afresh at the
      // correction. This is the assertion that pins the offset the repair util computes from the
      // glyph's byte layout — the unit suite can only state that layout, not check it.
      await expect
        .poll(readCaret, { timeout: 20_000 })
        .toEqual({ where: 'chapter-marker-glyph', charsAfterCaret: 1 });
    });

    await test.step('the keystrokes that follow the push-back are not dropped', async () => {
      // Click into the body first: the restored caret sits in the chapter marker, where typed
      // characters are marker bytes that the next repair would correct straight back out again.
      await editorInput.click();
      await editorInput.press('End');
      await editorInput.pressSequentially(AFTER_REPAIR_TOKEN, { delay: 40 });
      await expect(editorInput).toContainText(AFTER_REPAIR_TOKEN, { timeout: 20_000 });
    });

    await test.step('the chapter still saves after a repair', async () => {
      // The regression this whole change exists for: before the repair, the refused document stayed
      // in the editor and every later save of the chapter was refused too, so everything typed
      // after the mistyped marker was silently lost at the chapter switch.
      //
      // Positive control first: wait for Jonah 2's own verse text so the negative assertion runs
      // against RENDERED chapter-2 content — `not.toContainText` alone is satisfied by the empty
      // mid-navigation editor and would pass vacuously.
      await navigateToolbarBcv(mainPage, 'Jonah 2:1');
      await expect(editorInput).toContainText('prayed to Yahweh, his God', { timeout: 60_000 });
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
      // Naming the chapter is what this assertion is for; see CORRECTION_MESSAGE.
      await expect
        .poll(() => recordedToasts(mainPage), { timeout: 20_000 })
        .toEqual(expect.arrayContaining([expect.stringContaining(CORRECTION_MESSAGE)]));

      // ...and the chapter left behind was written repaired, with the edit that went with it.
      await navigateToolbarBcv(mainPage, 'Jonah 1:1');
      await expect(editorInput).toContainText(FLUSH_TOKEN, { timeout: 60_000 });
      await expect(chapterMarker).toHaveAttribute('data-number', '1', { timeout: 30_000 });
    });
  });
});
