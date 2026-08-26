import { expect, test } from '../../fixtures/isolated.fixture';
import { preConfigureSettings, waitForAppReady } from '../../fixtures/helpers';
import { openScriptureEditorForProject } from '../../fixtures/scripture-editor-helpers';
import {
  cleanupCommentTestProject,
  createCommentTestProject,
  removeRevelationFromProject,
  type CommentTestProject,
} from '../../fixtures/comment-test-helpers';

/**
 * End-to-end proof that the top toolbar's book/chapter/verse control can reach a book that exists
 * only in an OTHER open project, and navigate to it.
 *
 * ## Why two Scripture editors, and why power mode
 *
 * The control offers extra books only when some open web view other than the navigation target
 * carries a project whose `platformScripture.booksPresent` contains a book the target lacks. That
 * needs two projects open at once, which power mode allows and simple mode does not: simple mode's
 * editor column hosts exactly one Scripture editor, so a second open replaces the first (see
 * `resolveOpenEditorDispatch` in `extensions/src/platform-scripture-editor/src/`).
 *
 * ## Why the projects are created in `beforeAll`
 *
 * The app scans the projects folder exactly once at startup (`LocalParatextProjects.Initialize`) —
 * there is no on-demand rescan — so both project copies must exist on disk before Electron
 * launches. `beforeAll` runs before the test-scoped `electronApp` fixture, which is what makes that
 * ordering hold.
 */

/** The top toolbar's BookChapterControl trigger is the first one in the DOM (above the dock). */
const BCV_TRIGGER = '[aria-label="book-chapter-trigger"]';

/**
 * Book rows carry an accessible name of `English Name (ID)`, with the dimmed explanation appended
 * when the book is reachable but outside the target project — so match on the prefix.
 */
const bookItemSelector = (englishName: string, bookId: string) =>
  `[role="option"][aria-label^="${englishName} (${bookId})"]`;

const REVELATION_ITEM = bookItemSelector('Revelation', 'REV');
const JUDE_ITEM = bookItemSelector('Jude', 'JUD');
const GENESIS_ITEM = bookItemSelector('Genesis', 'GEN');

/** Class the control applies to a book that is reachable but not in the navigation target project. */
const DIMMED_BOOK_CLASS_PATTERN = /tw:text-muted-foreground\/50/;

// DEV_NOISY=false keeps the test-only extensions and their tabs out of the layout, so the only
// Scripture editors open are the two this test opens.
test.use({ electronLaunchOptions: { envOverrides: { DEV_NOISY: 'false' } } });

test.describe('book/chapter/verse control reaches books in an open resource', () => {
  // Full app startup plus two editors plus the project-books subscriptions they drive.
  test.setTimeout(300_000);

  let targetProject: CommentTestProject;
  let resourceProject: CommentTestProject;
  let restoreSettings: (() => void) | undefined;

  test.beforeAll(async () => {
    restoreSettings = preConfigureSettings({
      'platform.firstRunComplete': true,
      'platform.interfaceLanguage': ['en'],
      // Load-bearing, not cosmetic: simple mode allows only one Scripture editor at a time.
      'platform.interfaceMode': 'power',
    });

    // Two disposable copies of the bundled WEB project. The helper is comment-flavored only in
    // name — it creates a plain project copy with a unique id. The suffixes keep the two copies'
    // short names (and therefore their folders and dock tab titles) distinct even when both are
    // created within the same millisecond.
    targetProject = await createCommentTestProject([], '_target');
    resourceProject = await createCommentTestProject([], '_resource');

    // The whole point of the pair: the navigation target lacks Revelation, the other project has
    // it, so Revelation is reachable only through the other project.
    removeRevelationFromProject(targetProject);
  });

  test.afterAll(() => {
    cleanupCommentTestProject(targetProject);
    cleanupCommentTestProject(resourceProject);
    restoreSettings?.();
  });

  test('offers a book from another open project, greyed, and navigates to it', async ({
    mainPage,
  }) => {
    await waitForAppReady(mainPage, 180_000);

    const trigger = mainPage.locator(BCV_TRIGGER).first();
    const showMoreBooks = mainPage.getByRole('button', { name: 'Show more books' });
    const searchInput = mainPage.locator('[cmdk-input]');

    // ── Phase 1: only the Revelation-less project is open ──────────────────────────────────────
    const targetEditorId = await openScriptureEditorForProject(mainPage, targetProject.projectId);
    // Clicking a web view's tab is what pins the navigation target: it sets the window service's
    // focus subject, which stamps the tracked last-selected scripture-navigable web view that
    // `resolveTargetWebView` resolves first. Doing it explicitly makes the target deterministic
    // instead of dependent on which editor happens to come first out of the dock enumeration.
    await mainPage.locator(`.platform-tab-title[data-web-view-id="${targetEditorId}"]`).click();

    await expect(trigger).toBeVisible({ timeout: 15_000 });
    await expect(trigger).toBeEnabled({ timeout: 15_000 });

    await trigger.click();
    await expect(searchInput).toBeVisible({ timeout: 15_000 });
    // The book list is populated from the target project, right up to the book before Revelation.
    await expect(mainPage.locator(GENESIS_ITEM)).toBeVisible({ timeout: 30_000 });
    await expect(mainPage.locator(JUDE_ITEM)).toBeVisible();
    // Baseline for the phase-2 assertions: with nothing else open there is no book to reach
    // beyond the project's own, so neither the expansion control nor Revelation exists at all.
    await expect(showMoreBooks).toHaveCount(0);
    await expect(mainPage.locator(REVELATION_ITEM)).toHaveCount(0);
    await mainPage.keyboard.press('Escape');
    await expect(searchInput).toHaveCount(0);

    // ── Phase 2: open the project that does have Revelation ────────────────────────────────────
    await openScriptureEditorForProject(mainPage, resourceProject.projectId);
    // Opening the second editor focuses its tab, so re-pin the target back to the first editor.
    await mainPage.locator(`.platform-tab-title[data-web-view-id="${targetEditorId}"]`).click();

    await trigger.click();
    await expect(searchInput).toBeVisible({ timeout: 15_000 });
    await expect(mainPage.locator(GENESIS_ITEM)).toBeVisible({ timeout: 30_000 });

    // The expansion control appears only when the navigation target is missing a book some other
    // open project has. It can therefore only be the Revelation-less project that the toolbar is
    // driving — the other copy is a superset of it, so were IT the target there would be nothing
    // extra to offer and no control to click.
    await expect(showMoreBooks).toBeVisible({ timeout: 60_000 });

    // Still absent while the list is collapsed. Asserted AFTER the control is on screen, so the
    // open-resource book ids have demonstrably arrived — this is Revelation being withheld, not
    // Revelation not having loaded yet.
    await expect(mainPage.locator(JUDE_ITEM)).toBeVisible();
    await expect(mainPage.locator(REVELATION_ITEM)).toHaveCount(0);

    // ── Expand, and Revelation shows up greyed but selectable ──────────────────────────────────
    await showMoreBooks.click();
    const revelationItem = mainPage.locator(REVELATION_ITEM);
    await expect(revelationItem).toBeVisible({ timeout: 15_000 });
    await expect(revelationItem).toHaveClass(DIMMED_BOOK_CLASS_PATTERN);
    // The greying is not colour-only: the explanation is appended to the accessible name.
    await expect(revelationItem).toHaveAttribute('aria-label', /is not in this project/);

    // ── Navigate there ─────────────────────────────────────────────────────────────────────────
    await revelationItem.click();
    await mainPage.getByRole('option', { name: '1', exact: true }).first().click();
    await expect(trigger).toContainText(/Revelation|REV/, { timeout: 15_000 });
    await expect(trigger).toContainText('1:1');
  });
});
