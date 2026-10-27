/**
 * Starting chapter 1 of an empty book in Power mode, through the `\` marker palette.
 *
 * A new book holds nothing but its `\id` line. There, the `\` palette offers `\c` alongside what
 * the line itself takes, and picking it inserts chapter 1 after the `\id` line. The chapter saves
 * as inserted: the chapter-marker repair that runs before every save has nothing to correct.
 *
 * Only the running app puts the palette, the editor's insert and the save together; the editor's
 * own suite covers the insert in detail.
 *
 * ONE test() per spec file on purpose (see chapter-marker-repair.spec.ts).
 *
 * Runs against an isolated project root (the bundled sample WEB is installed into the empty root):
 * `npm run test:e2e:isolated scripture-editor`.
 */
import { test, expect } from '../../../fixtures/isolated.fixture';
import { openMarkerPalette, pickFromMarkerPalette } from '../../../fixtures/marker-palette.page';
import {
  getSampleProjectChapterUsfm,
  makeSampleProjectEditable,
  navigateToolbarBcv,
  openEditableScriptureEditorForProject,
  SAMPLE_WEB_PROJECT_ID,
  setSampleProjectBookUsfm,
  waitForHomeTab,
} from '../../../fixtures/scripture-editor-helpers';
import { installToastProbe, recordedToasts } from '../../../fixtures/toast-recorder';

test.use({
  interfaceMode: 'power',
  electronLaunchOptions: { isolatedProjectRoot: true, envOverrides: { DEV_NOISY: 'false' } },
});

const JONAH_1 = { book: 'JON', chapterNum: 1, verseNum: 1 };

/** An empty book: its `\id` line and nothing else, as a newly created book is. */
const EMPTY_BOOK_USFM = '\\id JON - empty book\r\n';

/** Part of the chapter-marker repair's notice for Jonah 1. */
const CORRECTION_MESSAGE = 'The chapter marker in Jonah 1';

test.describe('scripture editor chapter marker in an empty book', () => {
  test('the \\ palette offers \\c in an empty book, and chapter 1 saves', async ({ mainPage }) => {
    // Heavy isolated test (own Electron instance + backend-readiness gates). 3x "slow" budget.
    test.slow();

    await waitForHomeTab(mainPage);
    await makeSampleProjectEditable();
    await setSampleProjectBookUsfm(JONAH_1, EMPTY_BOOK_USFM);
    expect(await getSampleProjectChapterUsfm(JONAH_1)).toBe(EMPTY_BOOK_USFM);

    const editorId = await openEditableScriptureEditorForProject(mainPage, SAMPLE_WEB_PROJECT_ID);
    const editorFrame = mainPage.frameLocator(`iframe[data-web-view-id="${editorId}"]`);
    await editorFrame.locator('.editor-container').waitFor({ timeout: 60_000 });
    await navigateToolbarBcv(mainPage, 'Jonah 1:1');
    // `.first()` because the footnote-editor popover renders its own `.editor-input.marker-editable`.
    const editorInput = editorFrame.locator('.editor-input.marker-editable').first();
    await expect(editorInput).toContainText('empty book', { timeout: 60_000 });
    const chapterMarker = editorFrame.locator('p.chapter[data-marker="c"]');
    await expect(chapterMarker).toHaveCount(0);

    await installToastProbe(mainPage);

    await test.step('\\ at the end of the \\id line offers \\c', async () => {
      await editorInput.getByText('empty book').click();
      await mainPage.keyboard.press('End');
      // The click moves the reference to the `\id` line's verse 0. Wait for that to land first: the
      // palette refuses a pick once the editor's caret or text has changed under it.
      await expect(mainPage.getByText('Jonah 1:0').first()).toBeVisible({ timeout: 15_000 });
      const palette = await openMarkerPalette(mainPage);
      await expect(palette).toContainText('Chapter number');
    });

    await test.step('picking \\c inserts chapter 1 after the \\id line', async () => {
      // `c` is the only entry in the `\id` line's palette that starts with `c`.
      await pickFromMarkerPalette(mainPage, 'c');

      await expect(chapterMarker).toHaveAttribute('data-number', '1', { timeout: 30_000 });
      await expect(editorInput).toContainText('empty book');
    });

    await test.step('chapter 1 saves as inserted, with nothing corrected', async () => {
      await expect
        .poll(() => getSampleProjectChapterUsfm(JONAH_1), { timeout: 30_000 })
        .toBe('\\id JON - empty book\r\n\\c 1\r\n');
      expect(
        (await recordedToasts(mainPage)).filter((toast) => toast.includes(CORRECTION_MESSAGE)),
      ).toEqual([]);
    });
  });
});
