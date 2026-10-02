/**
 * End-to-end cover for the RESTORE case of the chapter-marker save-boundary repair: a chapter
 * document with no `\c` at all, which the repair gives its marker before the write.
 *
 * Typing into a blank chapter is the way into this case. A chapter the book has not reached yet has
 * no text at all, Power mode shows it as the ordinary empty editor, and what the user types there
 * builds a document with no chapter marker — which Paratext refuses for any chapter after the first
 * ("No chapter marker present."). The repair restores the marker, pushes the document back into the
 * editor and tells the user, as it does for every correction.
 *
 * What only the running app can show is where the caret goes afterwards. The push-back leaves the
 * editor with no caret at all, and a restore puts it back at the end of the text the user was
 * typing. Anywhere in the new marker would be worse than no caret: keys typed there become part of
 * the chapter number, and the next repair corrects them straight back out, silently.
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

// Power mode: Simple mode replaces a blank chapter with the "Add chapter number" view, so the empty
// editor this spec types into is Power mode's. DEV_NOISY=false keeps the normal Home layout (see
// standard-default-power-mode.spec.ts).
test.use({
  interfaceMode: 'power',
  electronLaunchOptions: { isolatedProjectRoot: true, envOverrides: { DEV_NOISY: 'false' } },
});

const WEBSOCKET_PORT = 8876;
const PDP_REQUEST_TIMEOUT_MS = 30_000;

const JONAH_1 = { book: 'JON', chapterNum: 1, verseNum: 1 };
const JONAH_2 = { book: 'JON', chapterNum: 2, verseNum: 1 };

/** How the correction notice reads for the Jonah 2 this spec types into. */
const CORRECTION_MESSAGE =
  'The chapter marker in Jonah 2 did not match the chapter, so it was corrected';

// All-caps tokens that appear nowhere in the WEB text, so a `toContainText` match is unambiguous.
const TYPED_TOKEN = 'ZZTYPEDINBLANK';
const NEXT_TOKEN = 'ZZTYPEDNEXT';

test.describe('scripture editor chapter-marker restore', () => {
  test('restores the marker of a blank chapter typed into, and leaves the caret where the typing was', async ({
    mainPage,
  }) => {
    // Heavy isolated test (own Electron instance, backend-readiness gates, deliberately-paced
    // typing). Playwright's 3x "slow" budget.
    test.slow();

    await waitForHomeTab(mainPage);
    await makeSampleProjectEditable();

    const pdpId = await sendPapiRequestOnce<string>(
      'object:platform.Paratext-pdpf.getProjectDataProviderId',
      [SAMPLE_WEB_PROJECT_ID],
      WEBSOCKET_PORT,
      LAUNCH_PHASE_TIMEOUT_MS,
    );
    const getJonah2Usfm = () =>
      sendPapiRequestOnce<string>(
        `object:${pdpId}.getChapterUSFM`,
        [JONAH_2],
        WEBSOCKET_PORT,
        PDP_REQUEST_TIMEOUT_MS,
      );

    // Cut Jonah back to its first chapter, so Jonah 2 is a chapter the book has not reached yet.
    // Written as a BOOK, which the chapter-marker correction never touches — a chapter write of
    // empty USFM would be given its marker straight back.
    const bookUsfm = await sendPapiRequestOnce<string>(
      `object:${pdpId}.getBookUSFM`,
      [JONAH_1],
      WEBSOCKET_PORT,
      PDP_REQUEST_TIMEOUT_MS,
    );
    const chapter2Start = bookUsfm.indexOf('\\c 2');
    expect(chapter2Start).toBeGreaterThan(0);
    expect(
      await sendPapiRequestOnce<boolean>(
        `object:${pdpId}.setBookUSFM`,
        [JONAH_1, bookUsfm.slice(0, chapter2Start)],
        WEBSOCKET_PORT,
        PDP_REQUEST_TIMEOUT_MS,
      ),
    ).toBe(true);
    expect(await getJonah2Usfm()).toBe('');

    const editorId = await openEditableScriptureEditorForProject(mainPage, SAMPLE_WEB_PROJECT_ID);
    const editorFrame = mainPage.frameLocator(`iframe[data-web-view-id="${editorId}"]`);
    await editorFrame.locator('.editor-container').waitFor({ timeout: 60_000 });
    // `.first()` because the footnote-editor popover renders its own `.editor-input.marker-editable`.
    const editorInput = editorFrame.locator('.editor-input.marker-editable').first();
    const chapterMarker = editorFrame.locator('p.chapter[data-marker="c"]');

    /**
     * Where the caret is, as the web view's own document sees it: whether it sits in the chapter
     * marker's glyph, the text of the node it sits in, and how many characters of that node follow
     * it. Read from the DOM selection rather than inferred from where the next keystroke lands,
     * since that keystroke would change the thing being probed.
     */
    const editorEvalFrame = await findScriptureEditorFrame(mainPage);
    const readCaret = async () =>
      editorEvalFrame.evaluate(() => {
        const selection = document.getSelection();
        const node = selection?.anchorNode;
        if (!selection || !node || node.nodeType !== Node.TEXT_NODE)
          return { where: 'no-text-caret', text: '', charsAfterCaret: -1 };
        const text = node.textContent ?? '';
        return {
          where: node.parentElement?.closest('p.chapter[data-marker="c"]')
            ? 'chapter-marker-glyph'
            : 'text',
          text,
          charsAfterCaret: text.length - selection.anchorOffset,
        };
      });

    await installToastProbe(mainPage);

    // Land on Jonah 1 first so the blank chapter can be told apart from an editor still loading:
    // Jonah 1's text on screen, then gone, is the positive control for "Jonah 2 is empty".
    await navigateToolbarBcv(mainPage, 'Jonah 1:1');
    await expect(editorInput).toContainText('word came to Jonah the son of Amittai', {
      timeout: 60_000,
    });
    await navigateToolbarBcv(mainPage, 'Jonah 2:1');
    await expect(editorInput).not.toContainText('word came to Jonah', { timeout: 60_000 });
    await expect(chapterMarker).toHaveCount(0);

    await test.step('typing into the blank chapter gives it its marker, and the user is told', async () => {
      await editorInput.click();
      await editorInput.pressSequentially(TYPED_TOKEN, { delay: 50 });

      await expect(chapterMarker).toHaveAttribute('data-number', '2', { timeout: 30_000 });
      await expect(editorInput).toContainText(TYPED_TOKEN);
      await expect
        .poll(() => recordedToasts(mainPage), { timeout: 20_000 })
        .toEqual(expect.arrayContaining([expect.stringContaining(CORRECTION_MESSAGE)]));
    });

    await test.step('the caret comes back to the end of the text being typed', async () => {
      await expect
        .poll(readCaret, { timeout: 20_000 })
        .toEqual({ where: 'text', text: TYPED_TOKEN, charsAfterCaret: 0 });
    });

    await test.step('the next keystrokes continue that text rather than the chapter number', async () => {
      // No click first: this is the user carrying on typing across the correction.
      await editorInput.pressSequentially(NEXT_TOKEN, { delay: 50 });

      await expect(editorInput).toContainText(`${TYPED_TOKEN}${NEXT_TOKEN}`, { timeout: 20_000 });
      await expect(chapterMarker).toHaveAttribute('data-number', '2');
    });

    await test.step('the chapter is saved with its marker and everything typed', async () => {
      await expect
        .poll(getJonah2Usfm, { timeout: 30_000 })
        .toMatch(new RegExp(`^\\\\c 2\\s[\\s\\S]*${TYPED_TOKEN}${NEXT_TOKEN}`));
    });
  });
});
