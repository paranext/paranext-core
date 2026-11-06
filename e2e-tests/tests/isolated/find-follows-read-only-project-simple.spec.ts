import { expect, test } from '../../fixtures/isolated.fixture';
import {
  preConfigureRecentlyOpenedProjects,
  waitForAppReady,
  waitForOpenWebViewIdByType,
  waitForOverlayGone,
  waitForPapiMethodRegistered,
} from '../../fixtures/helpers';
import {
  cleanupCommentTestProject,
  createCommentTestProject,
  type CommentTestProject,
} from '../../fixtures/comment-test-helpers';
import {
  expectFindBoundToProject,
  FIND_WEBVIEW_TYPE,
  isReportedReadOnly,
  makeProjectReadOnly,
  openSimpleModeEditor,
  SCRIPTURE_EDITOR_SLOT_WEBVIEW_TYPE,
  selectProjectInTitlebar,
  waitForEditorBoundToProject,
} from '../../fixtures/simple-mode-columns.page';

/**
 * End-to-end proof that, in SIMPLE interface mode, the Find panel follows the editor onto a
 * translation project with editing switched off (`Editable=F`).
 *
 * Column 3's panels re-point from the `platformScriptureEditor.openScriptureEditor` command, and
 * Find is re-pointed by a separate call at the end of that command (`updateRelatedFindPanel`)
 * because it is the one panel that needs the id of the editor the open just created. Nothing
 * imports `main.ts`, so that call site — and in particular whether it is reached for a non-editable
 * project — is only reachable from a running app. An `Editable=F` project is the case that
 * distinguishes "Find follows the editor" from "Find follows the editor only while the project is
 * writable": a project's editability says nothing about whether searching it is useful.
 *
 * The switch under test is driven through the title bar's project picker, which lists `Editable=F`
 * projects (marked read-only) alongside editable ones. Only the starting point — Find bound to a
 * second, editable project, so that the assertion can be that Find MOVED — is set up over PAPI.
 *
 * The `main.ts` call site is covered end to end only for `Editable=F`. That Find also follows a
 * published resource is pinned by the `updateRelatedFindPanel` unit tests, which catch a
 * project-kind gate inside that function but not one reintroduced at its call site.
 *
 * This spec belongs to no subset, so `npm run test:e2e:isolated find` does not run it. Run it with
 * `npm run test:e2e:isolated tests/isolated/find-follows-read-only-project-simple.spec.ts`, or with
 * `all`.
 */

// DEV_NOISY=false keeps the test-only extensions and their tabs out of the layout. Simple mode is
// seeded through the fixture rather than a preConfigureSettings call in a hook, which the fixture
// would both override and then write back into the developer's shared settings.
test.use({
  electronLaunchOptions: { envOverrides: { DEV_NOISY: 'false' } },
  interfaceMode: 'simple',
  seedSettings: { 'platform.firstRunComplete': true },
});

test.describe('simple mode: Find follows the editor onto an Editable=F project', () => {
  // App startup plus two editor opens, each of which re-points the whole of Column 3.
  test.setTimeout(420_000);

  let editableProject: CommentTestProject;
  let readOnlyProject: CommentTestProject;
  let restoreRecentProjects: (() => void) | undefined;

  test.beforeAll(async () => {
    // Two disposable copies of the bundled WEB project. The helper is comment-flavored only in name
    // — it creates a plain project copy with a unique id. The suffixes keep the two copies' short
    // names (and therefore their folders and dock tab titles) distinct even when both are created
    // within the same millisecond. They are created here, not in the test, because the app scans
    // the projects folder exactly once at startup (`LocalParatextProjects.Initialize`) with no
    // on-demand rescan, and `beforeAll` runs before the test-scoped `electronApp` fixture.
    editableProject = await createCommentTestProject([], '_editable');
    readOnlyProject = await createCommentTestProject([], '_readonly');
    makeProjectReadOnly(readOnlyProject);

    // Simple mode auto-opens the most recent project into its empty editor slot, asynchronously and
    // late enough to replace an editor this test opened and drag every Column 3 panel along with
    // it. Pointing the list at the starting project makes that auto-open agree with this test's
    // first open instead of competing with it. Seeded after the projects exist so the id is known.
    restoreRecentProjects = preConfigureRecentlyOpenedProjects([editableProject.projectId]);
  });

  test.afterAll(() => {
    // Each step on its own: a project folder Windows still holds open makes its delete throw, which
    // must skip neither the other delete nor the recent-projects restore.
    try {
      try {
        cleanupCommentTestProject(editableProject);
      } finally {
        cleanupCommentTestProject(readOnlyProject);
      }
    } finally {
      restoreRecentProjects?.();
    }
  });

  test('re-points Find when an Editable=F project is picked in the title bar', async ({
    mainPage,
  }) => {
    await waitForAppReady(mainPage, { timeout: 180_000 });

    // Both slots have to be in the dock before the opens below: the editor open replaces the
    // Column 2 slot, and Find is re-pointed by id only if its tab is already there. Every
    // materialization of the simple layout mints fresh ids, so each slot is found by type.
    await Promise.all([
      waitForOpenWebViewIdByType(mainPage, SCRIPTURE_EDITOR_SLOT_WEBVIEW_TYPE),
      waitForOpenWebViewIdByType(mainPage, FIND_WEBVIEW_TYPE),
    ]);
    // The "Updating project view" overlay covers a dock rebuild in flight.
    await waitForOverlayGone(mainPage, 90_000);

    await waitForPapiMethodRegistered('command:platformScriptureEditor.openScriptureEditor');

    // ── Starting point: Find is bound to the editable project ─────────────────────────────────
    const editableEditorId = await openSimpleModeEditor(editableProject.projectId);
    await expect(mainPage.locator(`iframe[data-web-view-id="${editableEditorId}"]`)).toBeAttached({
      timeout: 60_000,
    });
    await waitForOverlayGone(mainPage, 90_000);
    await expectFindBoundToProject(mainPage, editableProject.projectId);

    // The project under test really does have editing switched off — otherwise this test would pass
    // against a Find panel that only ever follows editable projects.
    expect(await isReportedReadOnly(readOnlyProject.projectId)).toBe(true);

    // ── Pick the Editable=F project in the title bar; Find follows ────────────────────────────
    await selectProjectInTitlebar(mainPage, readOnlyProject.shortName);
    const readOnlyEditorId = await waitForEditorBoundToProject(mainPage, readOnlyProject.projectId);
    await expect(mainPage.locator(`iframe[data-web-view-id="${readOnlyEditorId}"]`)).toBeAttached({
      timeout: 60_000,
    });
    await waitForOverlayGone(mainPage, 90_000);
    await expectFindBoundToProject(mainPage, readOnlyProject.projectId);
  });
});
