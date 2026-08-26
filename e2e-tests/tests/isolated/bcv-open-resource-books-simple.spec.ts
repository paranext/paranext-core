import { expect, test } from '../../fixtures/isolated.fixture';
import {
  preConfigureRecentlyOpenedProjects,
  preConfigureSettings,
  sendPapiRequestOnce,
  waitForAppReady,
  waitForOverlayGone,
  waitForPapiMethodRegistered,
} from '../../fixtures/helpers';
import {
  cleanupCommentTestProject,
  createCommentTestProject,
  removeRevelationFromProject,
  type CommentTestProject,
} from '../../fixtures/comment-test-helpers';

/**
 * End-to-end proof that the top toolbar's book/chapter/verse control reaches a book that exists
 * only in an open RESOURCE — in SIMPLE interface mode, where that control is the only
 * book/chapter/verse control the user has.
 *
 * ## Why simple mode is the only mode covered
 *
 * The toolbar disables the open-project book lookup outright in power mode, so there is no widened
 * list and no toggle to assert there — power mode's own controls are left for that team to adopt
 * the component API as they see fit. Simple mode is where the feature ships, and its single global
 * control is the whole surface.
 *
 * ## How a second project gets into simple mode
 *
 * Simple mode's fixed layout (`src/renderer/components/docking/simple-layout.data.ts`) already has
 * a Bible-texts panel in Column 3. Its provider (`createResourceTextPanelProvider`) writes the
 * requested project onto the web view DEFINITION's `projectId`, and
 * `platformScriptureEditor.openResourceText` re-points the already-open panel at any project id
 * handed to it. `useOpenResourceBookIds` enumerates every open web view's `projectId`, so the panel
 * carrying a second project is all the control needs — the `navigableProjectIds` state key that the
 * Scripture Text Grid uses is not involved here.
 *
 * Note that a resource panel's `projectId` is the CONTAINER project whose reference list the panel
 * shows, not an installed DBL resource. That is exactly the property under test: any open web view
 * carrying a project contributes that project's books.
 *
 * ## Why the projects are created in `beforeAll`
 *
 * The app scans the projects folder exactly once at startup (`LocalParatextProjects.Initialize`) —
 * there is no on-demand rescan — so both project copies must exist on disk before Electron
 * launches. `beforeAll` runs before the test-scoped `electronApp` fixture, which is what makes that
 * ordering hold.
 */

/** The top toolbar's BookChapterControl trigger. In simple mode it is the only one on the page. */
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

/**
 * Fixed simple-layout tab ids, from `src/renderer/components/docking/simple-layout.data.ts`.
 * Matched as a PREFIX because the renderer suffixes ids loaded from a shared layout with the window
 * they were loaded into (`-w1`, ...), so the rendered attribute is the UUID plus that suffix.
 *
 * The Scripture editor slot must be in the dock state before `openScriptureEditor` is called —
 * simple mode routes the open to that slot as a tab replacement, which fails outright if the target
 * tab is not there yet.
 */
const SCRIPTURE_EDITOR_SLOT_UUID = '3cf575f0-2cc2-464b-8765-b588f216dfce';
const BIBLE_TEXTS_PANEL_UUID = '27616073-bf60-4f2b-9518-922d1a7d3601';

/**
 * `openScriptureEditor` sequentially awaits the four `openOrUpdateRelatedPanels` commands, each of
 * which opens or re-points a Column 3 panel, so the combined response routinely exceeds the default
 * 30 s PAPI request timeout.
 */
const OPEN_EDITOR_TIMEOUT_MS = 150_000;

/**
 * Opens the editable Scripture editor for `projectId`, retrying a dock "Replacing tab failed"
 * rejection. That failure is a known race: `openOrUpdateRelatedPanels` re-points the Column 3
 * panels, and the resulting dock rebuild can briefly remove the editor slot this open is trying to
 * replace. A short delay and retry settles it.
 *
 * @param projectId The project to open in the editor column
 * @returns The web view id of the editor the open produced
 */
async function openScriptureEditor(projectId: string, maxRetries = 2): Promise<string> {
  // Sequential retry loop: each attempt must await the PAPI response and find out whether it was
  // the dock race before deciding whether to retry, so the awaits cannot be parallelized.
  /* eslint-disable no-await-in-loop */
  for (let attempt = 0; attempt <= maxRetries; attempt += 1) {
    if (attempt > 0)
      await new Promise<void>((resolve) => {
        setTimeout(resolve, 2_000);
      });
    try {
      const editorId = await sendPapiRequestOnce<string | undefined>(
        'command:platformScriptureEditor.openScriptureEditor',
        [projectId],
        undefined,
        OPEN_EDITOR_TIMEOUT_MS,
      );
      if (editorId) return editorId;
      throw new Error(`openScriptureEditor returned no web view id for project ${projectId}`);
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      if (attempt >= maxRetries || !message.includes('Replacing tab failed')) throw e;
    }
  }
  /* eslint-enable no-await-in-loop */
  throw new Error(`Could not open a Scripture editor for project ${projectId}`);
}

// DEV_NOISY=false keeps the test-only extensions and their tabs out of the layout, so the only web
// views carrying a project are the ones this test puts there.
test.use({ electronLaunchOptions: { envOverrides: { DEV_NOISY: 'false' } } });

test.describe('simple mode: book/chapter/verse control reaches books in an open resource', () => {
  // App startup, the editor open with its four related-panel commands, the resource panel re-point,
  // and the project-books subscriptions all of that drives.
  test.setTimeout(420_000);

  let targetProject: CommentTestProject;
  let resourceProject: CommentTestProject;
  let restoreSettings: (() => void) | undefined;
  let restoreRecentProjects: (() => void) | undefined;

  test.beforeAll(async () => {
    restoreSettings = preConfigureSettings({
      'platform.firstRunComplete': true,
      'platform.interfaceLanguage': ['en'],
      // 'simple' is also the shipped default, but this test is only meaningful in simple mode, so it
      // states its own precondition rather than inheriting one.
      'platform.interfaceMode': 'simple',
    });

    // Two disposable copies of the bundled WEB project. The helper is comment-flavored only in name
    // — it creates a plain project copy with a unique id. The suffixes keep the two copies' short
    // names (and therefore their folders and dock tab titles) distinct even when both are created
    // within the same millisecond.
    targetProject = await createCommentTestProject([], '_target');
    resourceProject = await createCommentTestProject([], '_resource');

    // The whole point of the pair: the navigation target lacks Revelation, the other project has it,
    // so Revelation is reachable only through the open resource.
    removeRevelationFromProject(targetProject);

    // Simple mode auto-opens the most recent project into its empty editor slot, asynchronously and
    // late enough to replace an editor this test opened and drag every Column 3 panel along with it.
    // Pointing the list at the target project makes that auto-open agree with this test's own open
    // instead of competing with it. Seeded after the projects exist so the id is known.
    restoreRecentProjects = preConfigureRecentlyOpenedProjects([targetProject.projectId]);
  });

  test.afterAll(() => {
    cleanupCommentTestProject(targetProject);
    cleanupCommentTestProject(resourceProject);
    restoreRecentProjects?.();
    restoreSettings?.();
  });

  test('offers a book from an open resource, greyed, and navigates to it', async ({ mainPage }) => {
    await waitForAppReady(mainPage, 180_000);

    // The fixed layout has to be in the dock before either open below: the editor open replaces the
    // Column 2 slot, and the resource open re-points the Column 3 Bible-texts panel. Neither can
    // find its target until the dock has processed the simple layout.
    await Promise.all([
      expect(
        mainPage.locator(`.platform-tab-title[data-web-view-id^="${SCRIPTURE_EDITOR_SLOT_UUID}"]`),
      ).toBeAttached({ timeout: 120_000 }),
      expect(
        mainPage.locator(`.platform-tab-title[data-web-view-id^="${BIBLE_TEXTS_PANEL_UUID}"]`),
      ).toBeAttached({ timeout: 120_000 }),
    ]);
    // The "Updating project view" overlay intercepts pointer events, so no click below can land
    // while a dock rebuild is in flight.
    await waitForOverlayGone(mainPage, 90_000);

    const trigger = mainPage.locator(BCV_TRIGGER).first();
    const showMoreBooks = mainPage.getByRole('button', { name: 'Show more books' });
    const searchInput = mainPage.locator('[cmdk-input]');

    // ── Phase 1: only the Revelation-less project is open ──────────────────────────────────────
    await waitForPapiMethodRegistered('command:platformScriptureEditor.openScriptureEditor');
    const editorId = await openScriptureEditor(targetProject.projectId);
    await expect(mainPage.locator(`iframe[data-web-view-id="${editorId}"]`)).toBeAttached({
      timeout: 60_000,
    });

    // Opening the editor re-points all of Column 3, which rebuilds the dock behind the overlay.
    await waitForOverlayGone(mainPage, 90_000);

    // Simple mode pins the navigation target to the main editor (`pinToMainEditor` in
    // `src/renderer/services/navigation-target.util.ts`), and only a `platformScriptureEditor.react`
    // web view with a project can be that editor — so no tab click is needed to make the target
    // deterministic the way power mode requires, and the Column 3 panels can never become it.
    await expect(trigger).toBeVisible({ timeout: 15_000 });
    await expect(trigger).toBeEnabled({ timeout: 60_000 });

    // The toolbar's project selector names the project the pinned editor holds — the same project
    // the book list below is asserted against. Naming the Revelation-less copy explicitly is what
    // keeps the rest of the test from passing against some OTHER project that happened to be
    // auto-opened into the editor column.
    await expect(mainPage.locator('[data-slot="select-trigger"]').first()).toContainText(
      targetProject.shortName,
      { timeout: 60_000 },
    );

    await trigger.click();
    await expect(searchInput).toBeVisible({ timeout: 15_000 });
    // The book list is populated from the target project, right up to the book before Revelation.
    await expect(mainPage.locator(GENESIS_ITEM)).toBeVisible({ timeout: 30_000 });
    await expect(mainPage.locator(JUDE_ITEM)).toBeVisible();
    // Baseline for the phase-2 assertions: opening the editor also re-points every Column 3 panel at
    // this same project, and the hook excludes the navigation target's own project, so there is no
    // book to reach beyond the project's own — neither the expansion control nor Revelation exists.
    await expect(showMoreBooks).toHaveCount(0);
    await expect(mainPage.locator(REVELATION_ITEM)).toHaveCount(0);
    await mainPage.keyboard.press('Escape');
    await expect(searchInput).toHaveCount(0);

    // ── Phase 2: point the Bible-texts panel at the project that does have Revelation ──────────
    await waitForPapiMethodRegistered('command:platformScriptureEditor.openResourceText');
    await sendPapiRequestOnce(
      'command:platformScriptureEditor.openResourceText',
      ['ScriptureResource', resourceProject.projectId],
      undefined,
      60_000,
    );
    // Re-pointing the panel reloads its web view, which rebuilds Column 3.
    await waitForOverlayGone(mainPage, 60_000);

    await trigger.click();
    await expect(searchInput).toBeVisible({ timeout: 15_000 });
    await expect(mainPage.locator(GENESIS_ITEM)).toBeVisible({ timeout: 30_000 });

    // The expansion control appears only when the navigation target is missing a book that some
    // other open web view's project has. It can therefore only be the Revelation-less project the
    // toolbar is driving — the resource copy is a superset of it, so were IT the target there would
    // be nothing extra to offer and no control to click.
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
    // The greying is not colour-only: the accessible name is a full localized sentence.
    await expect(revelationItem).toHaveAttribute('aria-label', /is not in this project/);

    // ── Navigate there ─────────────────────────────────────────────────────────────────────────
    await revelationItem.click();
    await mainPage.getByRole('option', { name: '1', exact: true }).first().click();
    // The book is the assertion the navigation is proved by. The chapter:verse is deliberately NOT
    // asserted here: the trigger shrinks in steps with the toolbar's width (see
    // `use-shrink-step.hook.ts`), and at the narrower steps it swaps the full name for the id and
    // then drops the chapter:verse entirely — so whether "1:1" is on screen depends on the window
    // this happens to run in, not on where the app navigated.
    await expect(trigger).toContainText(/Revelation|REV/, { timeout: 15_000 });
  });
});
