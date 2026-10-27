/**
 * The Scripture text and the footnotes pane's row editor share one ownership rule for incoming
 * updates to the chapter: while focus is in either and the user edited in either within
 * `EDITOR_OWNERSHIP_WINDOW_MS`, a differing update is held back and this view's content pushed back
 * up; past that window, the update applies (and ends a row session).
 *
 * Inserting a footnote moves focus to its row in the pane before anything has been typed there, so
 * the insert itself is the edit that counts. An update arriving in that moment must not replace the
 * document under the new row, which would close the row editor the user was about to type in.
 *
 * The second half pins the other side of the rule: a row left idle past the window lets an external
 * write land rather than overwriting it with this view's copy.
 *
 * ONE test() per spec file (isolated-fixture constraint — see standard-default-power-mode.spec.ts).
 * Run: `npm run test:e2e:isolated
 * tests/isolated/scripture-editor/footnote-pane-holds-updates-after-insert.spec.ts`.
 */
import { test, expect } from '../../../fixtures/isolated.fixture';
import {
  getEditorFrame,
  makeSampleProjectEditable,
  navigateToolbarBcv,
  openEditableScriptureEditorForProject,
  readSampleProjectChapterUsfm,
  rewriteSampleProjectChapterUsfm,
  SAMPLE_WEB_PROJECT_ID,
  waitForHomeTab,
} from '../../../fixtures/scripture-editor-helpers';

test.use({
  interfaceMode: 'power',
  electronLaunchOptions: { isolatedProjectRoot: true, envOverrides: { DEV_NOISY: 'false' } },
});

const FOOTNOTES_PANE_SELECTOR = '[data-footnotes-pane]';
const JONAH_1 = { book: 'JON', chapterNum: 1, verseNum: 1 };
/** Longer than `EDITOR_OWNERSHIP_WINDOW_MS` (15 s), so the view no longer owns the chapter. */
const PAST_OWNERSHIP_WINDOW_MS = 17_000;

test.describe('footnotes pane: incoming updates around a new footnote', () => {
  test('an update right after inserting a footnote keeps its row editor; one after an idle window lands', async ({
    mainPage,
  }) => {
    // Heavy isolated test (own Electron instance, backend-readiness gates, an idle window).
    test.slow();

    await waitForHomeTab(mainPage);
    await makeSampleProjectEditable();
    const editorId = await openEditableScriptureEditorForProject(mainPage, SAMPLE_WEB_PROJECT_ID);
    const editorFrame = mainPage.frameLocator(`iframe[data-web-view-id="${editorId}"]`);
    await editorFrame.locator('.editor-container').waitFor({ timeout: 60_000 });
    await navigateToolbarBcv(mainPage, 'Jonah 1:2');

    const editorInput = editorFrame.locator('.editor-input.marker-editable');
    await expect(editorInput).toContainText('preach against it', { timeout: 60_000 });
    const pane = editorFrame.locator(FOOTNOTES_PANE_SELECTOR);
    const verse3Para = editorInput.locator('p:has(span[data-marker="v"][data-number="3"])');
    const frame = await getEditorFrame(mainPage, editorId);
    const isFocusInPane = () =>
      frame.evaluate(
        (paneSelector) => !!document.activeElement?.closest(paneSelector),
        FOOTNOTES_PANE_SELECTOR,
      );

    await test.step('Insert Footnote at the end of verse 2 opens the new footnote in the pane', async () => {
      // The end of the verse 2 paragraph: just before the next paragraph's marker, then left.
      const nextMarker = verse3Para.locator('span.opening').first();
      const box = await nextMarker.boundingBox();
      if (!box) throw new Error('The verse 3 paragraph marker is not rendered');
      await nextMarker.click({ position: { x: 1, y: box.height / 2 } });
      await mainPage.keyboard.press('ArrowLeft');
      await mainPage.keyboard.press('Control+t');
      await expect(pane).toHaveCount(1, { timeout: 20_000 });
      await expect.poll(isFocusInPane, { timeout: 10_000 }).toBe(true);
      // The insert's own save reaches the project first, so the write below is plainly external.
      await expect
        .poll(() => readSampleProjectChapterUsfm(JONAH_1), { timeout: 10_000 })
        .toContain('\\fr 1:2');
    });

    await test.step('an external write before anything is typed leaves the row editor open', async () => {
      await rewriteSampleProjectChapterUsfm(JONAH_1, (usfm) =>
        usfm.replace('that great city', 'that great city EXTERNALA'),
      );
      // Held back: the view pushes its own copy over the write. Waiting for that is what shows the
      // update was processed before the checks below.
      await expect
        .poll(() => readSampleProjectChapterUsfm(JONAH_1), { timeout: 15_000 })
        .not.toContain('EXTERNALA');
      expect(await isFocusInPane()).toBe(true);
      await mainPage.keyboard.type('zqx');
      await expect(pane).toContainText('zqx', { timeout: 10_000 });
      await expect
        .poll(() => readSampleProjectChapterUsfm(JONAH_1), { timeout: 10_000 })
        .toContain('zqx');
    });

    await test.step('an external write after the row sits idle past the window lands', async () => {
      await mainPage.waitForTimeout(PAST_OWNERSHIP_WINDOW_MS);
      await rewriteSampleProjectChapterUsfm(JONAH_1, (usfm) =>
        usfm.replace('that great city', 'that great city EXTERNALB'),
      );
      await expect(editorInput).toContainText('EXTERNALB', { timeout: 15_000 });
      expect(await readSampleProjectChapterUsfm(JONAH_1)).toContain('EXTERNALB');
    });
  });
});
