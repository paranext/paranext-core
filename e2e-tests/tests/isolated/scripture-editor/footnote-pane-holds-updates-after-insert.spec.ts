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
 * The third step pins the other side of the rule: a row left idle past the window lets an external
 * write land rather than overwriting it with this view's copy. The last two pin the stamp being
 * shared in both directions: a text edit holds updates back for a row clicked right after it, and a
 * row edit holds them back for the text clicked right after it. Each waits out the window first, so
 * the only recent edit is the one made on the other surface.
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
  getSampleProjectChapterUsfm,
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
/**
 * Longer than `EDITOR_OWNERSHIP_WINDOW_MS` (15 s, defined in
 * `extensions/src/platform-scripture-editor/src/use-editor-pdp-sync.hook.ts`), so the view no
 * longer owns the chapter. Update this wait if that constant changes.
 */
const PAST_OWNERSHIP_WINDOW_MS = 17_000;
/**
 * The most time an edit may be old when a step's external write is sent and still be meant to be
 * held back: under `EDITOR_OWNERSHIP_WINDOW_MS`, with room for the write and its push-back.
 */
const WITHIN_OWNERSHIP_WINDOW_MS = 12_000;
/** The row editor places its caret over a timeout and an animation frame after it loads. */
const ROW_CARET_PLACED_MS = 600;

/**
 * Fails with a plain message when a slow runner took so long getting to the external write that the
 * window had already passed, rather than as a misleading "the write was not held back".
 */
function expectEditStillInWindow(editAt: number): void {
  expect(
    Date.now() - editAt,
    'the ownership window passed before the external write was sent (slow runner)',
  ).toBeLessThan(WITHIN_OWNERSHIP_WINDOW_MS);
}

test.describe('footnotes pane: incoming updates around a new footnote', () => {
  test('the text and a footnote row share one edit window for incoming updates', async ({
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
    const editingRow = pane.locator('li[data-state="editing"]');
    const newNoteRow = pane.locator('li[role="option"]').filter({ hasText: 'zqx' });
    // A verse paragraph with no note, so a click puts the caret in the text rather than opening one.
    const plainVersePara = editorInput
      .locator('p:has(span[data-marker="v"]):not(:has(.note))')
      .first();
    const verse3Para = editorInput.locator('p:has(span[data-marker="v"][data-number="3"])');
    const frame = await getEditorFrame(mainPage, editorId);
    let insertedAt = 0;
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
      insertedAt = Date.now();
      await expect(pane).toHaveCount(1, { timeout: 20_000 });
      await expect.poll(isFocusInPane, { timeout: 10_000 }).toBe(true);
      // The insert's own save reaches the project first, so the write below is plainly external.
      await expect
        .poll(() => getSampleProjectChapterUsfm(JONAH_1), { timeout: 10_000 })
        .toContain('\\fr 1:2');
    });

    await test.step('an external write before anything is typed leaves the row editor open', async () => {
      expectEditStillInWindow(insertedAt);
      await rewriteSampleProjectChapterUsfm(JONAH_1, (usfm) =>
        usfm.replace('that great city', 'that great city EXTERNALA'),
      );
      // Held back: the view pushes its own copy over the write. Waiting for that is what shows the
      // update was processed before the checks below.
      await expect
        .poll(() => getSampleProjectChapterUsfm(JONAH_1), { timeout: 15_000 })
        .not.toContain('EXTERNALA');
      expect(await isFocusInPane()).toBe(true);
      await mainPage.keyboard.type('zqx');
      await expect(pane).toContainText('zqx', { timeout: 10_000 });
      await expect
        .poll(() => getSampleProjectChapterUsfm(JONAH_1), { timeout: 10_000 })
        .toContain('zqx');
    });

    await test.step('an external write after the row sits idle past the window lands', async () => {
      await mainPage.waitForTimeout(PAST_OWNERSHIP_WINDOW_MS);
      await rewriteSampleProjectChapterUsfm(JONAH_1, (usfm) =>
        usfm.replace('that great city', 'that great city EXTERNALB'),
      );
      await expect(editorInput).toContainText('EXTERNALB', { timeout: 15_000 });
      expect(await getSampleProjectChapterUsfm(JONAH_1)).toContain('EXTERNALB');
    });

    await test.step('a row clicked right after typing in the text holds an external write back', async () => {
      await plainVersePara.click();
      await mainPage.keyboard.type('wvw');
      const textEditAt = Date.now();
      await expect(editorInput).toContainText('wvw', { timeout: 10_000 });
      await newNoteRow.click();
      await expect(editingRow).toHaveCount(1, { timeout: 20_000 });
      await expect.poll(isFocusInPane, { timeout: 10_000 }).toBe(true);
      await expect
        .poll(() => getSampleProjectChapterUsfm(JONAH_1), { timeout: 10_000 })
        .toContain('wvw');

      expectEditStillInWindow(textEditAt);
      await rewriteSampleProjectChapterUsfm(JONAH_1, (usfm) =>
        usfm.replace('that great city', 'that great city EXTERNALC'),
      );
      await expect
        .poll(() => getSampleProjectChapterUsfm(JONAH_1), { timeout: 15_000 })
        .not.toContain('EXTERNALC');
      await expect(editingRow).toHaveCount(1);
      expect(await isFocusInPane()).toBe(true);
    });

    await test.step('the text clicked right after typing in a row holds an external write back', async () => {
      await mainPage.waitForTimeout(PAST_OWNERSHIP_WINDOW_MS);
      // The row editor from the last step is still open with focus in it.
      await mainPage.waitForTimeout(ROW_CARET_PLACED_MS);
      await mainPage.keyboard.type('kjk');
      const rowEditAt = Date.now();
      await expect(editingRow).toContainText('kjk', { timeout: 10_000 });
      await plainVersePara.click();
      await expect(editingRow).toHaveCount(0, { timeout: 20_000 });
      await expect
        .poll(() => getSampleProjectChapterUsfm(JONAH_1), { timeout: 10_000 })
        .toContain('kjk');

      expectEditStillInWindow(rowEditAt);
      await rewriteSampleProjectChapterUsfm(JONAH_1, (usfm) =>
        usfm.replace('that great city', 'that great city EXTERNALD'),
      );
      await expect
        .poll(() => getSampleProjectChapterUsfm(JONAH_1), { timeout: 15_000 })
        .not.toContain('EXTERNALD');
      await expect(editorInput).not.toContainText('EXTERNALD');
    });
  });
});
