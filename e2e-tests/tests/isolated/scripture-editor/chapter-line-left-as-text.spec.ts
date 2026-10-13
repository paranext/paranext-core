/**
 * End-to-end cover for a chapter line whose bytes stop being a chapter marker, which Paratext 9
 * keeps as they are: it saves the bytes it holds and puts a chapter marker back above them. So the
 * editor saves what the user left on the line as text, the save-boundary repair restores the marker
 * at the top of the chapter, and the user's text stays below it with the caret where it was.
 *
 * Two edits reach it:
 *
 * - Deleting the `c` of `\c 2` leaves `\ 2`, which is not a marker.
 * - Typing ahead of the `\` leaves text before the marker; the repair puts the marker first, so the
 *   text moves to the line below it.
 *
 * Keys go through `mainPage.keyboard` once a click has put the focus in the editor (`locator.press`
 * focuses its target first and is slow per key).
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

/** How the correction notice reads for chapter `chapterNum` of Ruth. */
const correctionMessage = (chapterNum: number) =>
  `The chapter marker in Ruth ${chapterNum} did not match the chapter, so it was corrected`;

test.describe('scripture editor chapter line left as text', () => {
  test('keeps what is left on a chapter line below a restored marker, with the caret in it', async ({
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
    const getRuthUsfm = (chapterNum: number) =>
      sendPapiRequestOnce<string>(
        `object:${pdpId}.getChapterUSFM`,
        [{ book: 'RUT', chapterNum, verseNum: 1 }],
        WEBSOCKET_PORT,
        PDP_REQUEST_TIMEOUT_MS,
      );

    const editorId = await openEditableScriptureEditorForProject(mainPage, SAMPLE_WEB_PROJECT_ID);
    const editorFrame = mainPage.frameLocator(`iframe[data-web-view-id="${editorId}"]`);
    await editorFrame.locator('.editor-container').waitFor({ timeout: 60_000 });
    // `.first()` because the footnote-editor popover renders its own `.editor-input.marker-editable`.
    const editorInput = editorFrame.locator('.editor-input.marker-editable').first();
    const chapterMarker = editorFrame.locator('p.chapter[data-marker="c"]');

    /**
     * The chapter line and the line after it, as the web view's own document shows them, with the
     * separator's no-break space read as a plain one — and whether the caret is in that next line,
     * and what of that line comes before it.
     */
    const editorEvalFrame = await findScriptureEditorFrame(mainPage);
    const readLines = async () =>
      editorEvalFrame.evaluate(() => {
        const chapterLine = document.querySelector('p.chapter[data-marker="c"]');
        const nextLine = chapterLine?.nextElementSibling;
        const selection = document.getSelection();
        const caretNode = selection?.anchorNode;
        const caretInNextLine = !!caretNode && !!nextLine?.contains(caretNode);
        // What of the line comes before the caret, so the check does not depend on whether the
        // browser spells the position as a text offset or as an offset among the line's children.
        let textBeforeCaret = '';
        if (caretInNextLine && nextLine && caretNode && selection) {
          const range = document.createRange();
          range.setStart(nextLine, 0);
          range.setEnd(caretNode, selection.anchorOffset);
          textBeforeCaret = range.toString().replace(/\s/g, ' ');
        }
        return {
          chapterLine: (chapterLine?.textContent ?? '').replace(/\s/g, ' '),
          nextLine: (nextLine?.textContent ?? '').replace(/\s/g, ' '),
          caretInNextLine,
          textBeforeCaret,
        };
      });

    await installToastProbe(mainPage);

    await test.step('deleting the c of \\c 2 leaves \\ 2', async () => {
      await navigateToolbarBcv(mainPage, 'Ruth 2:1');
      await expect(editorInput).toContainText('Naomi had a relative of her husband', {
        timeout: 60_000,
      });
      await expect(chapterMarker).toHaveAttribute('data-number', '2');

      // `\c 2 ` with the caret at its end; three keys left puts it just past the `c`. Keys go to
      // the editor itself (see chapter-marker-repair.spec.ts for why focusing the glyph's own span
      // drops the caret).
      await chapterMarker.locator('span').first().click();
      await mainPage.keyboard.press('End');
      for (let press = 0; press < 3; press += 1) {
        // Sequential on purpose: each key moves from where the previous one left the caret.
        // eslint-disable-next-line no-await-in-loop
        await mainPage.keyboard.press('ArrowLeft');
      }
      await mainPage.keyboard.press('Backspace');
    });

    await test.step('the marker is restored above \\ 2, which keeps the caret', async () => {
      await expect
        .poll(() => recordedToasts(mainPage), { timeout: 20_000 })
        .toEqual(expect.arrayContaining([expect.stringContaining(correctionMessage(2))]));
      // `\\ 2` is a paragraph with no marker name, as ParatextData reads it. Its `\\ ` holds no
      // caret, so the caret that was between the `\\` and the space is at the start of its text.
      await expect.poll(readLines, { timeout: 20_000 }).toEqual({
        chapterLine: '\\c 2 ',
        nextLine: '\\ 2',
        caretInNextLine: true,
        textBeforeCaret: '\\ ',
      });
      await expect.poll(() => getRuthUsfm(2), { timeout: 30_000 }).toMatch(/^\\c 2\s+\\ 2\s+\\p/);
    });

    await test.step('typing ahead of the \\ of \\c 3 puts the typing below the marker', async () => {
      await navigateToolbarBcv(mainPage, 'Ruth 3:1');
      await expect(chapterMarker).toHaveAttribute('data-number', '3', { timeout: 60_000 });
      await chapterMarker.locator('span').first().click();
      await mainPage.keyboard.press('Home');
      await mainPage.keyboard.type('X');
    });

    await test.step('the typing lands below the marker, with the caret after it', async () => {
      await expect
        .poll(() => recordedToasts(mainPage), { timeout: 20_000 })
        .toEqual(expect.arrayContaining([expect.stringContaining(correctionMessage(3))]));
      await expect.poll(readLines, { timeout: 20_000 }).toEqual({
        chapterLine: '\\c 3 ',
        nextLine: 'X',
        caretInNextLine: true,
        textBeforeCaret: 'X',
      });
      await expect.poll(() => getRuthUsfm(3), { timeout: 30_000 }).toMatch(/^\\c 3\s+X\s+\\p/);
    });

    await test.step('\\ 2 loads back as itself and saves as itself', async () => {
      await navigateToolbarBcv(mainPage, 'Ruth 2:1');
      await expect(chapterMarker).toHaveAttribute('data-number', '2', { timeout: 60_000 });
      await expect.poll(async () => (await readLines()).nextLine, { timeout: 20_000 }).toBe('\\ 2');
      // An edit to the line makes the chapter save again, from what was loaded.
      await editorFrame.locator('p.chapter[data-marker="c"] + *').click();
      await mainPage.keyboard.press('End');
      await mainPage.keyboard.type('9');
      await expect.poll(() => getRuthUsfm(2), { timeout: 30_000 }).toMatch(/^\\c 2\s+\\ 29\s+\\p/);
    });
  });
});
