/**
 * End-to-end cover for typing while the editor moves to another chapter.
 *
 * From the moment another chapter is selected until its content arrives, the editor still shows the
 * chapter being left, and nothing typed there can be saved to either chapter. The editor holds
 * those edits off rather than showing keys it is about to lose, and it stays focused throughout, so
 * the user moving on from the keyboard can go on typing in the new chapter without clicking back
 * in.
 *
 * The move is made the way F8 makes it — the `platform.goToNextChapter` command — because F8 is a
 * main-process shortcut that Playwright's key events never reach (see
 * verse-navigation-shortcuts.spec.ts), and because it leaves the focus in the editor, which is the
 * case this is about. One stream of keys spans the move.
 *
 * What would go wrong without the hold-off is a key shown in the chapter being left and then never
 * saved (and, since each such key moves the caret there, the reference pulled back to that
 * chapter). So the spec records, inside the web view, every key typed while the editor still showed
 * the old chapter and how many of them ever showed there, and compares that with what the old
 * chapter saved. A move whose content arrives before any key lands gives nothing to measure, so the
 * spec moves on until one does.
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

// Power mode: the editable Standard view. DEV_NOISY=false keeps the normal Home layout (see
// standard-default-power-mode.spec.ts).
test.use({
  interfaceMode: 'power',
  electronLaunchOptions: { isolatedProjectRoot: true, envOverrides: { DEV_NOISY: 'false' } },
});

const WEBSOCKET_PORT = 8876;
const PDP_REQUEST_TIMEOUT_MS = 30_000;

/** Jonah has four chapters, so a run starting at 1 can move on three times. */
const LAST_CHAPTER = 4;

/** The key typed during a move. Jonah's own text has no capital Q in it. */
const TYPED_KEY = 'Q';
const KEYS_PER_MOVE = 100;
const KEY_DELAY_MS = 10;

/** What the web view recorded while the editor still showed the chapter being left. */
interface MoveProbe {
  /** Keys typed while it showed that chapter. */
  keysTyped: number;
  /** The most typed keys that chapter ever showed. */
  mostKeysShown: number;
}

const countTypedKeys = (text: string) => text.split(TYPED_KEY).length - 1;

test.describe('scripture editor typing during a chapter move', () => {
  test('holds off keys typed while the chapter changes, and keeps the editor focused', async ({
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
    const getJonahUsfm = (chapterNum: number) =>
      sendPapiRequestOnce<string>(
        `object:${pdpId}.getChapterUSFM`,
        [{ book: 'JON', chapterNum, verseNum: 1 }],
        WEBSOCKET_PORT,
        PDP_REQUEST_TIMEOUT_MS,
      );

    const editorId = await openEditableScriptureEditorForProject(mainPage, SAMPLE_WEB_PROJECT_ID);
    const editorFrame = mainPage.frameLocator(`iframe[data-web-view-id="${editorId}"]`);
    await editorFrame.locator('.editor-container').waitFor({ timeout: 60_000 });
    // `.first()` because the footnote-editor popover renders its own `.editor-input.marker-editable`.
    const editorInput = editorFrame.locator('.editor-input.marker-editable').first();
    const chapterMarker = editorFrame.locator('p.chapter[data-marker="c"]');
    const editorEvalFrame = await findScriptureEditorFrame(mainPage);

    await navigateToolbarBcv(mainPage, 'Jonah 1:1');
    await expect(editorInput).toContainText('word came to Jonah the son of Amittai', {
      timeout: 60_000,
    });
    await expect(chapterMarker).toHaveAttribute('data-number', '1');

    // The toolbar navigation took the focus; put it back at the end of the chapter's text.
    await editorInput.locator('p').last().click();
    await editorInput.press('Control+End');

    /**
     * Starts recording for a move away from `fromChapter`, inside the web view itself. The counts
     * are kept on the document element, where {@link stopProbe} can read them back.
     */
    const startProbe = (fromChapter: number) =>
      editorEvalFrame.evaluate(
        ({ from, key }) => {
          const { dataset } = document.documentElement;
          const showsOldChapter = () =>
            document.querySelector('p.chapter[data-marker="c"]')?.getAttribute('data-number') ===
            String(from);
          const editorRoot = document.querySelector('.editor-input.marker-editable');
          let keysTyped = 0;
          let mostKeysShown = 0;
          const record = () => {
            dataset.probeKeysTyped = String(keysTyped);
            dataset.probeMostKeysShown = String(mostKeysShown);
          };
          const recordShown = () => {
            if (!showsOldChapter()) return;
            const shown = (editorRoot?.textContent ?? '').split(key).length - 1;
            mostKeysShown = Math.max(mostKeysShown, shown);
            record();
          };
          recordShown();
          record();
          // Capture phase on the window, ahead of everything in the editor, so a key held off is
          // still counted.
          const onKeyDown = (event: KeyboardEvent) => {
            if (event.key !== key || !showsOldChapter()) return;
            keysTyped += 1;
            record();
          };
          window.addEventListener('keydown', onKeyDown, true);
          const observer = new MutationObserver(recordShown);
          if (editorRoot)
            observer.observe(editorRoot, { subtree: true, childList: true, characterData: true });
          document.addEventListener(
            'move-probe-stop',
            () => {
              window.removeEventListener('keydown', onKeyDown, true);
              observer.disconnect();
            },
            { once: true },
          );
        },
        { from: fromChapter, key: TYPED_KEY },
      );
    const stopProbe = (): Promise<MoveProbe> =>
      editorEvalFrame.evaluate(() => {
        document.dispatchEvent(new Event('move-probe-stop'));
        const { dataset } = document.documentElement;
        return {
          keysTyped: Number(dataset.probeKeysTyped),
          mostKeysShown: Number(dataset.probeMostKeysShown),
        };
      });

    let heldOffAMove = false;
    for (let fromChapter = 1; fromChapter < LAST_CHAPTER && !heldOffAMove; fromChapter += 1) {
      // Sequential on purpose: each move starts from the chapter the one before arrived at.
      // eslint-disable-next-line no-await-in-loop
      heldOffAMove = await test.step(`typing while moving from Jonah ${fromChapter}`, async () => {
        await startProbe(fromChapter);
        // One stream of keys spanning the move: some land before it, some while the new chapter
        // is on its way, and the rest once it has arrived. `keyboard` reaches the editor because
        // its frame holds the focus; a locator's `press` would re-resolve the frame on every key,
        // which is far slower than the move itself.
        await Promise.all([
          mainPage.keyboard.type(TYPED_KEY.repeat(KEYS_PER_MOVE), { delay: KEY_DELAY_MS }),
          (async () => {
            await mainPage.waitForTimeout(KEY_DELAY_MS * 5);
            await sendPapiRequestOnce('command:platform.goToNextChapter', [], WEBSOCKET_PORT);
          })(),
        ]);
        await expect(chapterMarker).toHaveAttribute('data-number', String(fromChapter + 1), {
          timeout: 30_000,
        });
        const probe = await stopProbe();

        // Nothing the chapter being left showed was lost: every key it showed is in what it saved.
        await expect
          .poll(async () => countTypedKeys(await getJonahUsfm(fromChapter)), { timeout: 30_000 })
          .toBe(probe.mostKeysShown);

        return probe.keysTyped > probe.mostKeysShown;
      });
    }
    // Without a key typed during a move there was nothing to hold off, and the check above proved
    // nothing.
    expect(heldOffAMove, 'no key was typed while the editor was changing chapter').toBe(true);

    await test.step('the editor kept the focus, and typing goes on in the new chapter', async () => {
      // Read before typing again: `press` focuses its target, so it would mask a lost focus.
      const focus = await editorEvalFrame.evaluate(() => ({
        hasFocus: document.hasFocus(),
        isEditorFocused: document.activeElement?.classList.contains('editor-input') ?? false,
      }));
      expect(focus).toEqual({ hasFocus: true, isEditorFocused: true });

      const arrivedAt = Number(await chapterMarker.getAttribute('data-number'));
      const keysBefore = countTypedKeys((await editorInput.textContent()) ?? '');
      await editorInput.press(TYPED_KEY);
      await expect
        .poll(async () => countTypedKeys((await editorInput.textContent()) ?? ''))
        .toBe(keysBefore + 1);
      await expect
        .poll(async () => countTypedKeys(await getJonahUsfm(arrivedAt)), { timeout: 30_000 })
        .toBe(keysBefore + 1);
    });
  });
});
