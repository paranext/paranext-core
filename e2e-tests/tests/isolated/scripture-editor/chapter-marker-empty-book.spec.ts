/**
 * Starting chapter 1 of an empty book: in Simple mode through the empty-chapter view's "Add chapter
 * number" button, and in Power mode through the `\` marker palette.
 *
 * Simple mode replaces a blank chapter with that view, and an empty book's chapter 1 is one: it
 * holds nothing but the `\id` line. The button stays enabled there while structure is locked, which
 * is Simple mode's default, since the book has no structure yet. It adds chapter 1 and its empty
 * verses after the `\id` line, and the book saves with its one `\id` line first.
 *
 * Power mode has no such view: a new book holds nothing but its `\id` line, and there the `\`
 * palette offers `\c` alongside what the line itself takes. Picking it inserts chapter 1 after the
 * `\id` line, which saves as inserted. Only the running app puts the palette, the editor's insert
 * and the save together; the editor's own suite covers the insert in detail.
 *
 * The two modes are separate tests because each launch seeds one interface mode, and each rewrites
 * the same book on disk. Every `test.use({ interfaceMode })` sits in its own describe so that each
 * test is launched in its own mode (the option fixture is test-scoped, so a describe-level
 * `test.use` applies only to the tests inside it).
 *
 * Runs against an isolated project root (the bundled sample WEB is installed into the empty root):
 * `npm run test:e2e:isolated scripture-editor`.
 */
import { test, expect } from '../../../fixtures/isolated.fixture';
import { waitForAppReady } from '../../../fixtures/helpers';
import { openMarkerPalette, pickFromMarkerPalette } from '../../../fixtures/marker-palette.page';
import {
  EMPTY_BOOK_ID_TEXT,
  getSampleProjectChapterUsfm,
  navigateToolbarBcv,
  openEditableScriptureEditorForProject,
  prepareEmptySampleBook,
  SAMPLE_WEB_PROJECT_ID,
  waitForHomeTab,
} from '../../../fixtures/scripture-editor-helpers';

test.use({
  electronLaunchOptions: { isolatedProjectRoot: true, envOverrides: { DEV_NOISY: 'false' } },
});

const JONAH_1 = { book: 'JON', chapterNum: 1, verseNum: 1 };

/** Jonah 1 has 17 verses, so its scaffold is `\c 1` then `\v 1` to `\v 17`. */
const CHAPTER_1_SCAFFOLD_USFM = `\\c 1\r\n${Array.from(
  { length: 17 },
  (_, index) => `\\v ${index + 1}\r\n`,
).join('')}`;

test.describe('scripture editor chapter marker in an empty book', () => {
  test.describe('in Simple mode', () => {
    test.use({
      interfaceMode: 'simple',
      // Past first run, so Simple mode starts in the app rather than the setup wizard.
      seedSettings: { 'platform.firstRunComplete': true },
    });

    test('"Add chapter number" starts chapter 1 of an empty book while structure is locked', async ({
      mainPage,
    }) => {
      // Heavy isolated test (own Electron instance + backend-readiness gates). 3x "slow" budget.
      test.slow();

      // Simple mode has no Home tab (simple-layout.data.ts); see formatted-default-simple-mode.spec.ts.
      await waitForAppReady(mainPage);
      const emptyBookUsfm = await prepareEmptySampleBook(JONAH_1);

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

      await test.step('chapter 1 saves after the \\id line, with one \\id line', async () => {
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

  test.describe('in Power mode', () => {
    test.use({ interfaceMode: 'power' });

    // Skipped until PT-5053 is fixed: right after End, the editor can still report the caret the
    // click left, so the palette's change guard sees a caret move and drops the `\c` pick.
    test.fixme(
      'the \\ palette offers \\c in an empty book, and chapter 1 saves',
      {
        annotation: {
          type: 'fixme',
          description:
            'PT-5053: a marker picked right after a keyboard caret move is silently dropped (fails ~1 run in 3)',
        },
      },
      async ({ mainPage }) => {
        // Heavy isolated test (own Electron instance + backend-readiness gates). 3x "slow" budget.
        test.slow();

        await waitForHomeTab(mainPage);
        const emptyBookUsfm = await prepareEmptySampleBook(JONAH_1);

        const editorId = await openEditableScriptureEditorForProject(
          mainPage,
          SAMPLE_WEB_PROJECT_ID,
        );
        const editorFrame = mainPage.frameLocator(`iframe[data-web-view-id="${editorId}"]`);
        await editorFrame.locator('.editor-container').waitFor({ timeout: 60_000 });
        await navigateToolbarBcv(mainPage, 'Jonah 1:1');
        // `.first()` because the footnote-editor popover renders its own `.editor-input.marker-editable`.
        const editorInput = editorFrame.locator('.editor-input.marker-editable').first();
        await expect(editorInput).toContainText(EMPTY_BOOK_ID_TEXT, { timeout: 60_000 });
        const chapterMarker = editorFrame.locator('p.chapter[data-marker="c"]');
        await expect(chapterMarker).toHaveCount(0);

        await test.step('\\ at the end of the \\id line offers \\c', async () => {
          await editorInput.getByText(EMPTY_BOOK_ID_TEXT).click();
          await mainPage.keyboard.press('End');
          // The click moves the reference to the `\id` line's verse 0. Wait for that to land first: the
          // palette refuses a pick once the editor's caret or text has changed under it.
          await expect(mainPage.getByText('Jonah 1:0').first()).toBeVisible({ timeout: 15_000 });
          const palette = await openMarkerPalette(mainPage);
          await expect(palette).toContainText('Chapter number');
        });

        await test.step('picking \\c inserts chapter 1 after the \\id line', async () => {
          await pickFromMarkerPalette(mainPage, 'c');

          await expect(chapterMarker).toHaveAttribute('data-number', '1', { timeout: 30_000 });
          await expect(editorInput).toContainText(EMPTY_BOOK_ID_TEXT);
        });

        await test.step('chapter 1 saves after the \\id line', async () => {
          await expect
            .poll(() => getSampleProjectChapterUsfm(JONAH_1), { timeout: 30_000 })
            .toBe(`${emptyBookUsfm}\\c 1\r\n`);
        });
      },
    );
  });
});
