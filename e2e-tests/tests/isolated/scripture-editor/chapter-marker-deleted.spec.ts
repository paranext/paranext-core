/**
 * End-to-end cover for backspacing a later chapter's marker, which the chapter-marker save-boundary
 * repair undoes: Paratext refuses a later chapter without its marker ("No chapter marker present.")
 * or its number, so the repair puts them back, pushes the document back into the editor and tells
 * the user. The push-back leaves the editor with no caret, and where it goes back is what only the
 * running app can show. The user was working on the chapter line, so it goes back there — just past
 * the number.
 *
 * Two speeds reach two different repairs:
 *
 * - Backspacing the whole marker faster than the save debounce removes the chapter before anything is
 *   saved, so the repair RESTORES it. (A marker restored into a blank chapter being typed into
 *   sends the caret to the end of that text instead — chapter-marker-restore.spec.ts.)
 * - Backspacing the number one key at a time, pausing each time, saves a chapter whose number is
 *   gone, so the repair RENUMBERS it. The number was still mid-edit in the editor when the repair
 *   put it back, which is what once made the push-back a no-op: the numberless marker stayed on
 *   screen, the caret went to the end of the chapter, and the next keys deleted text there.
 *
 * ONE test() per spec file on purpose (see chapter-marker-repair.spec.ts).
 *
 * Runs against an isolated project root (the bundled sample WEB is installed into the empty root):
 * `npm run test:e2e:isolated scripture-editor`.
 */
import { test, expect } from '../../../fixtures/isolated.fixture';
import { sendPapiRequestOnce, LAUNCH_PHASE_TIMEOUT_MS } from '../../../fixtures/helpers';
import {
  findScriptureEditorFrame,
  makeSampleProjectEditable,
  navigateToolbarBcv,
  openEditableScriptureEditorForProject,
  SAMPLE_WEB_PROJECT_ID,
  waitForHomeTab,
} from '../../../fixtures/scripture-editor-helpers';
import { installToastProbe, recordedToasts } from '../../../fixtures/toast-recorder';

// Power mode: the editable Standard view whose chapter line this spec edits. DEV_NOISY=false keeps
// the normal Home layout (see standard-default-power-mode.spec.ts).
test.use({
  interfaceMode: 'power',
  electronLaunchOptions: { isolatedProjectRoot: true, envOverrides: { DEV_NOISY: 'false' } },
});

const WEBSOCKET_PORT = 8876;
const PDP_REQUEST_TIMEOUT_MS = 30_000;

const RUTH_2 = { book: 'RUT', chapterNum: 2, verseNum: 1 };

/** How the correction notice reads for the Ruth 2 whose marker this spec deletes. */
const CORRECTION_MESSAGE =
  'The chapter marker in Ruth 2 did not match the chapter, so it was corrected';

test.describe('scripture editor chapter-marker deletion', () => {
  test('puts a backspaced chapter marker back and leaves the caret on the chapter line', async ({
    mainPage,
  }) => {
    // Heavy isolated test (own Electron instance, backend-readiness gates). Playwright's 3x "slow"
    // budget.
    test.slow();

    await waitForHomeTab(mainPage);
    await makeSampleProjectEditable();

    const pdpId = await sendPapiRequestOnce<string>(
      'object:platform.Paratext-pdpf.getProjectDataProviderId',
      [SAMPLE_WEB_PROJECT_ID],
      WEBSOCKET_PORT,
      LAUNCH_PHASE_TIMEOUT_MS,
    );
    const getRuth2Usfm = () =>
      sendPapiRequestOnce<string>(
        `object:${pdpId}.getChapterUSFM`,
        [RUTH_2],
        WEBSOCKET_PORT,
        PDP_REQUEST_TIMEOUT_MS,
      );
    // The chapter's text after its marker, whitespace-normalized: saving through the editor
    // rewrites the file's line-end spacing, and only the text has to survive.
    const textAfterMarker = (usfm: string) =>
      usfm
        .replace(/^\\c 2\s*/, '')
        .replace(/\s+/g, ' ')
        .trim();

    const editorId = await openEditableScriptureEditorForProject(mainPage, SAMPLE_WEB_PROJECT_ID);
    const editorFrame = mainPage.frameLocator(`iframe[data-web-view-id="${editorId}"]`);
    await editorFrame.locator('.editor-container').waitFor({ timeout: 60_000 });
    // `.first()` because the footnote-editor popover renders its own `.editor-input.marker-editable`.
    const editorInput = editorFrame.locator('.editor-input.marker-editable').first();
    const chapterMarker = editorFrame.locator('p.chapter[data-marker="c"]');

    /**
     * The chapter line as the web view's own document shows it — its text, with the separator's
     * no-break space read as a plain one — and where the caret is: whether it sits in the chapter
     * marker's glyph, and how many characters of that node follow it.
     */
    const editorEvalFrame = await findScriptureEditorFrame(mainPage);
    const readChapterLine = async () =>
      editorEvalFrame.evaluate(() => {
        const glyph = (
          document.querySelector('p.chapter[data-marker="c"]')?.textContent ?? ''
        ).replace(/\s/g, ' ');
        const selection = document.getSelection();
        const node = selection?.anchorNode;
        if (!selection || !node || node.nodeType !== Node.TEXT_NODE)
          return { glyph, where: 'no-text-caret', charsAfterCaret: -1 };
        return {
          glyph,
          where: node.parentElement?.closest('p.chapter[data-marker="c"]')
            ? 'chapter-marker-glyph'
            : 'text',
          charsAfterCaret: (node.textContent ?? '').length - selection.anchorOffset,
        };
      });
    // Just past the number, as for any corrected marker: one glyph byte follows the caret.
    const CARET_PAST_THE_NUMBER = {
      glyph: '\\c 2 ',
      where: 'chapter-marker-glyph',
      charsAfterCaret: 1,
    };

    await installToastProbe(mainPage);

    // Ruth 2's own text, not just a chapter numbered 2: any chapter 2 would match that.
    await navigateToolbarBcv(mainPage, 'Ruth 2:1');
    await expect(editorInput).toContainText('Naomi had a relative of her husband', {
      timeout: 60_000,
    });
    await expect(chapterMarker).toHaveAttribute('data-number', '2');
    const storedText = textAfterMarker(await getRuth2Usfm());

    await test.step('the whole marker is backspaced away', async () => {
      // Every byte of `\c 2 ` — five keys, faster than the save debounce — so the chapter is gone
      // before anything is saved. Keys go to the editor itself (see chapter-marker-repair.spec.ts
      // for why focusing the glyph's own span drops the caret).
      await chapterMarker.locator('span').first().click();
      await editorInput.press('End');
      for (let press = 0; press < 5; press += 1) {
        // Sequential on purpose: each Backspace acts on what the previous one left.
        // eslint-disable-next-line no-await-in-loop
        await editorInput.press('Backspace');
      }
    });

    await test.step('the marker is restored and the user is told', async () => {
      await expect
        .poll(() => recordedToasts(mainPage), { timeout: 20_000 })
        .toEqual(expect.arrayContaining([expect.stringContaining(CORRECTION_MESSAGE)]));
      await expect(chapterMarker).toHaveAttribute('data-number', '2', { timeout: 30_000 });
    });

    await test.step('the caret comes back to the end of the chapter line', async () => {
      await expect.poll(readChapterLine, { timeout: 20_000 }).toEqual(CARET_PAST_THE_NUMBER);
    });

    await test.step('the number, backspaced a key at a time, comes back each time', async () => {
      for (let press = 0; press < 3; press += 1) {
        // Sequential on purpose: each Backspace waits out the save and correction of the last one.
        // eslint-disable-next-line no-await-in-loop
        await editorInput.press('Backspace');
        // Until the save, the number is gone and the caret sits where it was, so this waits for
        // the correction itself rather than passing on the keystroke.
        // eslint-disable-next-line no-await-in-loop
        await expect.poll(readChapterLine, { timeout: 20_000 }).toEqual(CARET_PAST_THE_NUMBER);
      }
    });

    await test.step('the chapter is saved with its marker and all of its text', async () => {
      await expect.poll(getRuth2Usfm, { timeout: 30_000 }).toMatch(/^\\c 2\s/);
      expect(textAfterMarker(await getRuth2Usfm())).toBe(storedText);
    });
  });
});
