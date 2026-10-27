/**
 * End-to-end cover for the caret after a chapter-marker repair in a view that hides markers.
 *
 * In Simple mode's Formatted view, deleting a selection that runs from a later chapter's number
 * into its first verse removes the chapter marker; the save-boundary repair puts it back and sends
 * the caret to just past its number. That view cannot show a caret on a chapter number, so the
 * editor puts the caret at the start of the next paragraph instead and reports it there. The caret
 * restore must take that as placed: placing it again every 50 ms for its whole two-second retry
 * window would drag a caret the user had moved in the meantime back to the start of the paragraph,
 * and what they typed with it.
 *
 * A keyboard Backspace at the start of the chapter's first paragraph cannot do this here: in
 * Simple's view the structure guard arms the verse marker instead and never reaches the chapter
 * number. The selection is the one gesture that reaches it, and the guard still asks for a second
 * Delete.
 *
 * ONE test() per spec file on purpose (see chapter-marker-repair.spec.ts).
 *
 * Runs against an isolated project root (the bundled sample WEB is installed into the empty root):
 * `npm run test:e2e:isolated scripture-editor/chapter-marker-formatted-caret.spec.ts`.
 */
import { test, expect } from '../../../fixtures/isolated.fixture';
import {
  sendPapiRequestOnce,
  LAUNCH_PHASE_TIMEOUT_MS,
  waitForAppReady,
} from '../../../fixtures/helpers';
import {
  findScriptureEditorFrame,
  makeSampleProjectEditable,
  navigateToolbarBcv,
  openEditableScriptureEditorForProject,
  SAMPLE_WEB_PROJECT_ID,
  unlockSampleProjectStructure,
} from '../../../fixtures/scripture-editor-helpers';
import { installToastProbe, recordedToasts } from '../../../fixtures/toast-recorder';

// Simple mode: its one view is the editable Formatted view. Power mode's formatted view is the
// read-only Preview, where the edit below could not happen. DEV_NOISY=false: the noisy dev test
// layout replaces the normal layouts (see scroll-group-sync.spec.ts).
test.use({
  interfaceMode: 'simple',
  // Past first run, so Simple mode starts in the app rather than the setup wizard.
  seedSettings: { 'platform.firstRunComplete': true },
  electronLaunchOptions: { isolatedProjectRoot: true, envOverrides: { DEV_NOISY: 'false' } },
});

const WEBSOCKET_PORT = 8876;
const PDP_REQUEST_TIMEOUT_MS = 30_000;

const RUTH_2 = { book: 'RUT', chapterNum: 2, verseNum: 1 };

const CORRECTION_MESSAGE =
  'The chapter marker in Ruth 2 did not match the chapter, so it was corrected';

test.describe('scripture editor chapter-marker repair in the Formatted view', () => {
  test('leaves the caret where the editor put it, so typing after the repair stays in order', async ({
    mainPage,
  }) => {
    // Heavy isolated test (own Electron instance, backend-readiness gates). Playwright's 3x "slow"
    // budget.
    test.slow();

    await waitForAppReady(mainPage);
    // No `waitForHomeTab` here: simple mode loads the static simpleLayout, which has NO Home tab
    // (simple-layout.data.ts). The open helper below carries its own app-readiness gates.
    await makeSampleProjectEditable();
    // Simple mode locks paragraph structure by default and then refuses the delete below outright;
    // unlocked, the structure guard still asks for a second press.
    await unlockSampleProjectStructure();

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

    const editorId = await openEditableScriptureEditorForProject(mainPage, SAMPLE_WEB_PROJECT_ID);
    const editorFrame = mainPage.frameLocator(`iframe[data-web-view-id="${editorId}"]`);
    await editorFrame.locator('.editor-container').waitFor({ timeout: 60_000 });
    const editorInput = editorFrame.locator('.editor-input').first();

    // The view every step below depends on: Simple mode's formatted view (`marker-hidden`).
    await expect(editorFrame.locator('.editor-input.marker-hidden').first()).toBeVisible({
      timeout: 30_000,
    });

    await installToastProbe(mainPage);
    await navigateToolbarBcv(mainPage, 'Ruth 2:1');
    await expect(editorInput).toContainText('Naomi had a relative of her husband', {
      timeout: 60_000,
    });

    const editorEvalFrame = await findScriptureEditorFrame(mainPage);
    // Measured in the page, where the timing is exact: a Playwright click can take longer than the
    // whole retry window. Once the repair has replaced the document, the caret is moved into verse 2
    // as a click would, and read back a little later.
    const caretAfterMove = editorEvalFrame.evaluate(
      () =>
        new Promise<string>((resolve) => {
          const findVerse2Text = () =>
            Array.from(document.querySelectorAll('.editor-input *'))
              .flatMap((element) => Array.from(element.childNodes))
              .find(
                (node) =>
                  node.nodeType === Node.TEXT_NODE &&
                  (node.textContent ?? '').startsWith('Ruth the Moabitess'),
              );
          const original = findVerse2Text();
          const deadline = performance.now() + 20_000;
          const waitForReplacement = () => {
            const current = findVerse2Text();
            if (performance.now() > deadline) {
              resolve('the document was never replaced');
              return;
            }
            if (!current || current === original) {
              setTimeout(waitForReplacement, 10);
              return;
            }
            setTimeout(() => {
              const moved = findVerse2Text();
              if (!moved) {
                resolve('verse 2 is gone');
                return;
              }
              document.getSelection()?.collapse(moved, 5);
              setTimeout(() => {
                const selection = document.getSelection();
                resolve(
                  `${(selection?.anchorNode?.textContent ?? '').slice(0, 18)}@${selection?.anchorOffset}`,
                );
              }, 400);
            }, 150);
          };
          waitForReplacement();
        }),
    );

    await test.step('deleting a selection from the chapter number into verse 1 removes the marker', async () => {
      // The click puts the focus in the editor, so the keys below reach it.
      await editorInput.getByText('Naomi had a relative').first().click();
      // From the chapter number to three characters into verse 1, as a mouse drag would select it.
      const selected = await editorEvalFrame.evaluate(() => {
        const chapter = document.querySelector('.editor-input [data-marker="c"]');
        const verse1Text = Array.from(document.querySelectorAll('.editor-input *'))
          .flatMap((element) => Array.from(element.childNodes))
          .find(
            (node) =>
              node.nodeType === Node.TEXT_NODE &&
              (node.textContent ?? '').startsWith('Naomi had a relative'),
          );
        if (!chapter?.parentElement || !verse1Text) return false;
        const range = document.createRange();
        range.setStart(
          chapter.parentElement,
          Array.from(chapter.parentElement.childNodes).indexOf(chapter),
        );
        range.setEnd(verse1Text, 3);
        const selection = document.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
        return true;
      });
      expect(selected, 'the chapter number and verse 1 are in the DOM').toBe(true);
      // The structure guard's two-step delete: the first Delete arms, the second removes.
      await mainPage.keyboard.press('Delete');
      await expect(editorInput).toHaveClass(/\bverse-delete-armed\b/, { timeout: 10_000 });
      await mainPage.keyboard.press('Delete');
      await expect
        .poll(() => recordedToasts(mainPage), { timeout: 20_000 })
        .toEqual(expect.arrayContaining([expect.stringContaining(CORRECTION_MESSAGE)]));
    });

    await test.step('a caret moved right after the repair stays where it was moved', async () => {
      expect(await caretAfterMove).toBe('Ruth the Moabitess@5');
      expect(await getRuth2Usfm()).toMatch(/^\\c 2\s/);
    });
  });
});
