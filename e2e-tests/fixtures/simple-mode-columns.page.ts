import { expect, type Page } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { type CommentTestProject } from './comment-test-helpers';
import { readBars, type TabBar } from './dock-tab-helpers';
import { getOpenWebViewDefinitions, sendPapiRequestOnce } from './helpers';

/**
 * Page-object helpers for SIMPLE interface mode's fixed columns: opening a project into the Column
 * 2 editor slot, reading what the Column 3 panels are bound to afterwards, and reading the columns'
 * tabs.
 *
 * Serves `find-follows-read-only-project-simple.spec.ts`, `bcv-open-resource-books-simple.spec.ts`,
 * `comments-tab.spec.ts` and `docking/simple-mode-no-dock.spec.ts`. For simple-mode specs
 * {@link openSimpleModeEditor} supersedes the non-retrying `openScriptureEditor` in
 * `find.fixture.ts` and `openEditableScriptureEditorForProject` in `scripture-editor-helpers.ts`:
 * neither of those recovers from the dock race that a simple-mode open provokes.
 */

/**
 * Web view type of the fixed Column 2 scripture-editor slot in the simple layout
 * (`src/renderer/components/docking/simple-layout.data.ts`), and of the editor that replaces it.
 * The slot must be in the dock state before {@link openSimpleModeEditor} is called: simple mode
 * routes the open to that slot as a tab replacement, which fails outright ("target tab not found")
 * if the target tab is not there yet.
 */
export const SCRIPTURE_EDITOR_SLOT_WEBVIEW_TYPE = 'platformScriptureEditor.react';

/** Web view type of the permanent Find tab in Column 3 of the simple layout. */
export const FIND_WEBVIEW_TYPE = 'platformScripture.find';

/**
 * The rc-dock panel ids of the simple layout's three columns: copies of the constants of the same
 * names in `src/renderer/components/docking/simple-layout.data.ts`, which e2e code cannot import.
 */
export const SIMPLE_PANEL_ID_MODEL_TEXT = 'simple-panel-model-text';
export const SIMPLE_PANEL_ID_PROJECT = 'simple-panel-project';
export const SIMPLE_PANEL_ID_RESOURCES = 'simple-panel-resources';
const SIMPLE_COLUMN_IDS = [
  SIMPLE_PANEL_ID_MODEL_TEXT,
  SIMPLE_PANEL_ID_PROJECT,
  SIMPLE_PANEL_ID_RESOURCES,
];

/** The tab bars of the simple layout's three columns, in DOM order. */
export async function readSimpleColumns(page: Page): Promise<TabBar[]> {
  return (await readBars(page)).filter((bar) => SIMPLE_COLUMN_IDS.includes(bar.panelId));
}

/**
 * Waits until all three columns are in the dock with at least one tab each, and answers their tab
 * bars.
 */
export async function waitForSimpleColumns(page: Page): Promise<TabBar[]> {
  let columns: TabBar[] = [];
  await expect(async () => {
    columns = await readSimpleColumns(page);
    expect(columns.map((column) => column.panelId).sort()).toEqual([...SIMPLE_COLUMN_IDS].sort());
    columns.forEach((column) => expect(column.tabIds.length).toBeGreaterThan(0));
  }).toPass({ timeout: 60_000 });
  return columns;
}

/**
 * The open command sequentially awaits every related-panel step — the Column 3 panels, the Column 1
 * Model Text panel, the Text Collection re-point and Find's re-point once the new editor exists —
 * so the combined response routinely exceeds the default 30 s PAPI request timeout.
 */
const OPEN_EDITOR_TIMEOUT_MS = 150_000;

/** How many times {@link openSimpleModeEditor} retries a dock "Replacing tab failed" rejection. */
const OPEN_EDITOR_MAX_RETRIES = 2;

/** Options accepted by {@link openSimpleModeEditor}. */
export interface SimpleModeEditorOpenOptions {
  /** PAPI WebSocket port to send the open command on. Defaults to the app's standard port. */
  port?: number;
  /** Per-request timeout for the open command. */
  timeoutMs?: number;
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
export async function openSimpleModeEditor(
  projectId: string,
  options: SimpleModeEditorOpenOptions = {},
): Promise<string> {
  const { port, timeoutMs = OPEN_EDITOR_TIMEOUT_MS } = options;
  // Sequential retry loop: each attempt must await the PAPI response and find out whether it was
  // the dock race before deciding whether to retry, so the awaits cannot be parallelized.
  /* eslint-disable no-await-in-loop */
  for (let attempt = 0; attempt <= OPEN_EDITOR_MAX_RETRIES; attempt += 1) {
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
      if (attempt >= OPEN_EDITOR_MAX_RETRIES || !message.includes('Replacing tab failed')) throw e;
    }
  }
  /* eslint-enable no-await-in-loop */
  throw new Error(`Could not open a Scripture editor for project ${projectId}`);
}

/**
 * Make a project copy a translation project with editing switched off (`Editable=F`):
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
 * Whether the project lookup service reports `projectId` as having editing switched off
 * (`Editable=F`). A factory that omits the field means editable, so only an explicit `false`
 * counts.
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

/**
 * Switch the editor column to the project named `shortName` through the title bar's project picker,
 * the way a user does: open the picker, search for the project, pick its row.
 *
 * The picker's trigger is named for the control plus its current value ("Select project, <full
 * name> (<short name>)"), so it is matched by prefix. Find's own project picker is a combobox too,
 * but it lives inside Find's iframe, which a main-frame role query cannot reach.
 */
export async function selectProjectInTitlebar(mainPage: Page, shortName: string): Promise<void> {
  // The trigger stays disabled until the picker's first project list arrives.
  await mainPage.getByRole('combobox', { name: /^Select project/ }).click({ timeout: 60_000 });
  // Searching first keeps the pick independent of which section the row lands in and of how many
  // other projects the machine has.
  await mainPage.getByPlaceholder('Search projects…').fill(shortName);
  await mainPage.getByRole('option', { name: shortName }).click();
}

/**
 * Wait until the Column 2 editor is bound to `projectId`, and return its web view id. For a switch
 * driven through the UI, which, unlike {@link openSimpleModeEditor}, hands back no id.
 */
export async function waitForEditorBoundToProject(
  mainPage: Page,
  projectId: string,
): Promise<string> {
  let editorId: string | undefined;
  await expect(async () => {
    const definitions = await getOpenWebViewDefinitions(mainPage);
    editorId = definitions.find(
      (definition) =>
        definition.webViewType === SCRIPTURE_EDITOR_SLOT_WEBVIEW_TYPE &&
        definition.projectId?.toLowerCase() === projectId.toLowerCase(),
    )?.id;
    expect(editorId).toBeDefined();
  }).toPass({ timeout: OPEN_EDITOR_TIMEOUT_MS });
  if (!editorId) throw new Error(`No Scripture editor is bound to project ${projectId}`);
  return editorId;
}
