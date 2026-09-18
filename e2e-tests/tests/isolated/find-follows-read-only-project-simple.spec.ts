import fs from 'fs';
import path from 'path';
import { type Page } from '@playwright/test';
import { expect, test } from '../../fixtures/isolated.fixture';
import {
  preConfigureRecentlyOpenedProjects,
  sendPapiRequestOnce,
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

/**
 * End-to-end proof that, in SIMPLE interface mode, the Find panel follows the editor onto a project
 * the user cannot edit.
 *
 * Column 3's panels re-point from `openScriptureEditor`, and Find is re-pointed by a separate call
 * at the end of that command (`updateRelatedFindPanel`) because it is the one panel that needs the
 * id of the editor the open just created. Nothing imports `main.ts`, so that call site — and in
 * particular whether it is reached for a non-editable project — is only reachable from a running
 * app. A read-only project is the case that distinguishes "Find follows the editor" from "Find
 * follows the editor only while the project is writable": a project's editability says nothing
 * about whether searching it is useful.
 *
 * ## Why a second, editable project
 *
 * The assertion is that Find MOVED, so it needs a starting project that is not the one under test.
 * The editable copy is also what the recently-opened list is pointed at, which is what keeps simple
 * mode's asynchronous auto-open from competing with this test's own opens.
 *
 * ## Why the projects are created in `beforeAll`
 *
 * The app scans the projects folder exactly once at startup (`LocalParatextProjects.Initialize`) —
 * there is no on-demand rescan — so both copies must exist on disk before Electron launches.
 * `beforeAll` runs before the test-scoped `electronApp` fixture, which is what makes that ordering
 * hold.
 */

/** Web view type of the permanent Find tab in Column 3 of the simple layout. */
const FIND_WEBVIEW_TYPE = 'platformScripture.find';

/**
 * Web view type of the fixed Column 2 scripture-editor slot in the simple layout. It must be in the
 * dock state before `openScriptureEditor` is called — simple mode routes the open to that slot as a
 * tab replacement, which fails outright if the target tab is not there yet.
 */
const SCRIPTURE_EDITOR_SLOT_WEBVIEW_TYPE = 'platformScriptureEditor.react';

/**
 * `openScriptureEditor` sequentially awaits every related-panel step — the Column 3 panels, the
 * Column 1 Model Text panel, the Text Collection re-point and Find's re-point once the new editor
 * exists — so the combined response routinely exceeds the default 30 s PAPI request timeout.
 */
const OPEN_EDITOR_TIMEOUT_MS = 150_000;

/**
 * Turn a project copy read-only, the way a project the user has no write access to arrives:
 * `platform.isEditable` reports `Settings.xml`'s `<Editable>` verbatim (`GetIsEditable` in
 * `c-sharp/Projects/ScrTextExtensions.cs`). Must run before the app launches — the setting is read
 * during the startup scan.
 */
function makeProjectReadOnly(project: CommentTestProject): void {
  const settingsPath = path.join(project.projectDir, 'Settings.xml');
  const settingsXml = fs.readFileSync(settingsPath, 'utf8');
  fs.writeFileSync(
    settingsPath,
    settingsXml.replace(/<Editable>[^<]*<\/Editable>/, '<Editable>F</Editable>'),
  );
}

/**
 * Opens the Scripture editor for `projectId`, retrying a dock "Replacing tab failed" rejection.
 * That failure is a known race: re-pointing the Column 3 panels rebuilds the dock, which can
 * briefly remove the editor slot this open is trying to replace. A short delay and retry settles
 * it.
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

/**
 * Whether the project lookup service reports `projectId` as one the user cannot edit. A factory
 * that omits the field means editable, so only an explicit `false` counts as read-only.
 */
async function isReportedReadOnly(projectId: string): Promise<boolean> {
  const projects = await sendPapiRequestOnce<{ id?: string; isEditable?: boolean }[]>(
    'object:ProjectLookupService.getMetadataForAllProjects',
    [],
    undefined,
    60_000,
  );
  const project = projects.find(
    (candidate) => candidate.id?.toLowerCase() === projectId.toLowerCase(),
  );
  return project?.isEditable === false;
}

/**
 * Assert the Find panel is bound to `projectId`.
 *
 * Read from the open web view DEFINITION rather than from Find's own project combobox: the Find tab
 * is one of several Column 3 tabs and is not necessarily the active one, and an inactive rc-dock
 * pane is `display: none`, so its control is not reliably readable without first stealing
 * activation from whatever tab the open left in front. The definition's `projectId` is what
 * `platformScripture.updateFindProject` writes, so it is the binding itself rather than a proxy for
 * it.
 *
 * Ids are compared case-insensitively: the .NET backend upper-cases them, so the same project
 * arrives spelled differently depending on which surface reported it.
 */
async function expectFindBoundToProject(mainPage: Page, projectId: string): Promise<void> {
  await expect(async () => {
    const boundProjectId = await mainPage.evaluate(async (webViewType) => {
      // `globalThis.papi` is set by the renderer and untyped in the Playwright context.
      // eslint-disable-next-line no-type-assertion/no-type-assertion -- Playwright page has no PAPI types
      const { papi } = window as unknown as {
        papi: {
          webViews: {
            getAllOpenWebViewDefinitions: () => Promise<
              { webViewType: string; projectId?: string }[]
            >;
          };
        };
      };
      const definitions = await papi.webViews.getAllOpenWebViewDefinitions();
      return definitions.find((definition) => definition.webViewType === webViewType)?.projectId;
    }, FIND_WEBVIEW_TYPE);
    expect(boundProjectId?.toLowerCase()).toBe(projectId.toLowerCase());
  }).toPass({ timeout: 90_000 });
}

// DEV_NOISY=false keeps the test-only extensions and their tabs out of the layout. Simple mode is
// seeded through the fixture rather than a preConfigureSettings call in a hook, which the fixture
// would both override and then write back into the developer's shared settings; it is also the only
// mode in which Find is re-pointed at all.
test.use({
  electronLaunchOptions: { envOverrides: { DEV_NOISY: 'false' } },
  interfaceMode: 'simple',
  seedSettings: { 'platform.firstRunComplete': true },
});

test.describe('simple mode: Find follows the editor onto a read-only project', () => {
  // App startup plus two editor opens, each of which re-points the whole of Column 3.
  test.setTimeout(420_000);

  let editableProject: CommentTestProject;
  let readOnlyProject: CommentTestProject;
  let restoreRecentProjects: (() => void) | undefined;

  test.beforeAll(async () => {
    // Two disposable copies of the bundled WEB project. The helper is comment-flavored only in name
    // — it creates a plain project copy with a unique id. The suffixes keep the two copies' short
    // names (and therefore their folders and dock tab titles) distinct even when both are created
    // within the same millisecond.
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
    cleanupCommentTestProject(editableProject);
    cleanupCommentTestProject(readOnlyProject);
    restoreRecentProjects?.();
  });

  test('re-points Find when a project the user cannot edit is opened', async ({ mainPage }) => {
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
    const editableEditorId = await openScriptureEditor(editableProject.projectId);
    await expect(mainPage.locator(`iframe[data-web-view-id="${editableEditorId}"]`)).toBeAttached({
      timeout: 60_000,
    });
    await waitForOverlayGone(mainPage, 90_000);
    await expectFindBoundToProject(mainPage, editableProject.projectId);

    // The project under test really is one the user cannot edit — otherwise this test would pass
    // against a Find panel that only ever follows editable projects.
    expect(await isReportedReadOnly(readOnlyProject.projectId)).toBe(true);

    // ── Open the read-only project; Find follows ──────────────────────────────────────────────
    const readOnlyEditorId = await openScriptureEditor(readOnlyProject.projectId);
    await expect(mainPage.locator(`iframe[data-web-view-id="${readOnlyEditorId}"]`)).toBeAttached({
      timeout: 60_000,
    });
    await waitForOverlayGone(mainPage, 90_000);
    await expectFindBoundToProject(mainPage, readOnlyProject.projectId);
  });
});
