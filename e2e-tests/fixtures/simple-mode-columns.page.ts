import { expect, type Page } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { type CommentTestProject } from './comment-test-helpers';
import { getOpenWebViewDefinitions, sendPapiRequestOnce } from './helpers';

/**
 * Page-object helpers for SIMPLE interface mode's fixed columns: opening a project into the Column
 * 2 editor slot and reading what the Column 3 panels are bound to afterwards.
 *
 * Serves `find-follows-read-only-project-simple.spec.ts`, `bcv-open-resource-books-simple.spec.ts`
 * and `comments-tab.spec.ts`. For simple-mode specs {@link openScriptureEditor} supersedes the
 * non-retrying `openScriptureEditor` in `find.fixture.ts` and `openScriptureEditorForProject` in
 * `scripture-editor-helpers.ts`: neither of those recovers from the dock race that a simple-mode
 * open provokes.
 */

/** Web view type of the permanent Find tab in Column 3 of the simple layout. */
export const FIND_WEBVIEW_TYPE = 'platformScripture.find';

/**
 * `openScriptureEditor` sequentially awaits every related-panel step — the Column 3 panels, the
 * Column 1 Model Text panel, the Text Collection re-point and Find's re-point once the new editor
 * exists — so the combined response routinely exceeds the default 30 s PAPI request timeout.
 */
const OPEN_EDITOR_TIMEOUT_MS = 150_000;

/** Options accepted by {@link openScriptureEditor}. */
export interface SimpleModeEditorOpenOptions {
  /** PAPI WebSocket port to send the open command on. Defaults to the app's standard port. */
  port?: number;
  /** Per-request timeout for the open command. */
  timeoutMs?: number;
  /** How many times to retry a dock "Replacing tab failed" rejection. */
  maxRetries?: number;
}

/**
 * Opens the Scripture editor for `projectId` into the Column 2 slot, retrying a dock "Replacing tab
 * failed" rejection. That failure is a known race: re-pointing the Column 3 panels rebuilds the
 * dock, which can briefly remove the editor slot this open is trying to replace. A short delay and
 * retry settles it.
 *
 * @param projectId The project to open in the editor column
 * @param options Caller overrides — see {@link SimpleModeEditorOpenOptions}
 * @returns The web view id of the editor the open produced
 */
export async function openScriptureEditor(
  projectId: string,
  options: SimpleModeEditorOpenOptions = {},
): Promise<string> {
  const { port, timeoutMs = OPEN_EDITOR_TIMEOUT_MS, maxRetries = 2 } = options;
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
        port,
        timeoutMs,
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
 * Turn a project copy read-only, the way a project the user has no write access to arrives:
 * `platform.isEditable` reports `Settings.xml`'s `<Editable>` verbatim (`GetIsEditable` in
 * `c-sharp/Projects/ScrTextExtensions.cs`). Must run before the app launches — the setting is read
 * during the startup scan.
 */
export function makeProjectReadOnly(project: CommentTestProject): void {
  const settingsPath = path.join(project.projectDir, 'Settings.xml');
  const settingsXml = fs.readFileSync(settingsPath, 'utf8');
  fs.writeFileSync(
    settingsPath,
    settingsXml.replace(/<Editable>[^<]*<\/Editable>/, '<Editable>F</Editable>'),
  );
}

/**
 * Whether the project lookup service reports `projectId` as one the user cannot edit. A factory
 * that omits the field means editable, so only an explicit `false` counts as read-only.
 */
export async function isReportedReadOnly(projectId: string): Promise<boolean> {
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
export async function expectFindBoundToProject(mainPage: Page, projectId: string): Promise<void> {
  await expect(async () => {
    const definitions = await getOpenWebViewDefinitions(mainPage);
    const boundProjectId = definitions.find(
      (definition) => definition.webViewType === FIND_WEBVIEW_TYPE,
    )?.projectId;
    expect(boundProjectId?.toLowerCase()).toBe(projectId.toLowerCase());
  }).toPass({ timeout: 90_000 });
}
