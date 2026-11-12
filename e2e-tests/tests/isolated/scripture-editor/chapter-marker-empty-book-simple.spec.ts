/**
 * Starting chapter 1 of an empty book in Simple mode, through the empty-chapter view's "Add chapter
 * number" button.
 *
 * Simple mode replaces a blank chapter with that view, and an empty book's chapter 1 is one: it
 * holds the `\id` line and the header lines under it, and no chapter or verse. The button stays
 * enabled there while structure is locked, which is Simple mode's default, since the book has no
 * structure yet. It adds chapter 1 and its empty verses below the header lines, and the book saves
 * with its one `\id` line first and the header lines unchanged.
 *
 * The book has header lines because a book Paratext creates does, and because they are where the
 * chapter can go wrong: above them, or with a second `\id` line. A book of only the `\id` line is
 * covered end to end by the Power mode spec (through the `\` palette), and its "Add chapter number"
 * insert by the editor's own tests.
 *
 * ONE test() per spec file on purpose (see chapter-marker-repair.spec.ts).
 *
 * Runs against an isolated project root (the bundled sample WEB is installed into the empty root):
 * `npm run test:e2e:isolated scripture-editor`.
 */
import { test, expect } from '../../../fixtures/isolated.fixture';
import { waitForAppReady } from '../../../fixtures/helpers';
import {
  getSampleProjectChapterUsfm,
  navigateToolbarBcv,
  openEditableScriptureEditorForProject,
  prepareEmptySampleBook,
  SAMPLE_WEB_PROJECT_ID,
} from '../../../fixtures/scripture-editor-helpers';

test.use({
  interfaceMode: 'simple',
  // Past first run, so Simple mode starts in the app rather than the setup wizard.
  seedSettings: { 'platform.firstRunComplete': true },
  electronLaunchOptions: { isolatedProjectRoot: true, envOverrides: { DEV_NOISY: 'false' } },
});

const JONAH_1 = { book: 'JON', chapterNum: 1, verseNum: 1 };

/** The running header and table-of-contents line a new book holds under its `\id` line. */
const HEADER_LINES = [`\\h ${JONAH_1.book}`, `\\toc2 ${JONAH_1.book}`];

/** Jonah 1 has 17 verses, so its scaffold is `\c 1` then `\v 1` to `\v 17`. */
const CHAPTER_1_SCAFFOLD_USFM = `\\c 1\r\n${Array.from(
  { length: 17 },
  (_, index) => `\\v ${index + 1}\r\n`,
).join('')}`;

test.describe('scripture editor chapter marker in an empty book', () => {
  test('"Add chapter number" starts chapter 1 of an empty book while structure is locked', async ({
    mainPage,
  }) => {
    // Heavy isolated test (own Electron instance + backend-readiness gates). 3x "slow" budget.
    test.slow();

    // Simple mode has no Home tab (simple-layout.data.ts); see formatted-default-simple-mode.spec.ts.
    await waitForAppReady(mainPage);
    const emptyBookUsfm = await prepareEmptySampleBook(JONAH_1, HEADER_LINES);

    const editorId = await openEditableScriptureEditorForProject(mainPage, SAMPLE_WEB_PROJECT_ID);
    const editorFrame = mainPage.frameLocator(`iframe[data-web-view-id="${editorId}"]`);
    await editorFrame.locator('.editor-container').waitFor({ timeout: 60_000 });
    await navigateToolbarBcv(mainPage, 'Jonah 1:1');

    const addChapterNumber = editorFrame.getByRole('button', { name: 'Add chapter number' });

    await test.step('the empty book offers "Add chapter number" while structure is locked', async () => {
      await expect(editorFrame.getByText('This chapter is empty.')).toBeVisible({
        timeout: 60_000,
      });
      await expect(
        editorFrame.getByRole('button', { name: 'Toggle structure protection' }),
      ).toHaveAttribute('aria-pressed', 'true');
      await expect(addChapterNumber).toBeEnabled();
    });

    await test.step('chapter 1 saves below the header lines, with one \\id line', async () => {
      await addChapterNumber.click();
      await expect(editorFrame.locator('[data-marker="c"][data-number="1"]')).toBeAttached({
        timeout: 30_000,
      });
      await expect
        .poll(() => getSampleProjectChapterUsfm(JONAH_1), { timeout: 30_000 })
        .toBe(`${emptyBookUsfm}${CHAPTER_1_SCAFFOLD_USFM}`);
    });
  });
});
