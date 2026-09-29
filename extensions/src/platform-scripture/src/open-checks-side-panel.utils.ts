import papi, { logger } from '@papi/backend';
import type { SavedWebViewDefinition } from '@papi/core';
import {
  ChecksSidePanelWebViewOptions,
  checksSidePanelWebViewType,
} from './checks-side-panel.web-view-provider';
import { SIMPLE_RESOURCES_PANEL_ID } from './simple-resources-panel-id.const';

/**
 * Probe options that resolve an already-open Checks side panel without ever creating one.
 * `existingId: '?'` is PAPI's "any web view of this type" wildcard; `createNewIfNotFound: false`
 * makes the probe a pure lookup.
 */
const REUSE_EXISTING_CHECKS_ONLY = { existingId: '?', createNewIfNotFound: false } as const;

/**
 * Whether an open Checks side panel already shows `projectId` for the editor `editorWebViewId`, so
 * reloading it would change nothing. An `undefined` editor id asks about the project alone: the
 * provider keeps the editor id the panel already holds when none is passed.
 */
function isChecksSidePanelCurrent(
  definition: SavedWebViewDefinition | undefined,
  projectId: string | undefined,
  editorWebViewId: string | undefined,
): boolean {
  return (
    definition?.projectId === projectId &&
    (editorWebViewId === undefined || definition?.state?.editorWebViewId === editorWebViewId)
  );
}

/**
 * Opens the Checks side panel for an editor, placed according to `platform.interfaceMode`.
 *
 * - Power mode: a new panel docked to the right of the editor tab, on every call.
 * - Simple mode: one Checks tab in Column 3, alongside the other Resources & Tools tabs. Simple's
 *   three columns are fixed, so a panel docked beside the editor would split the editor's column,
 *   and a new one per call would keep splitting it. The first call adds the tab to Column 3; later
 *   calls bring that same tab to the front. The tab is not part of Simple's starting layout — it
 *   joins Column 3 only once someone asks for it.
 *
 * In Simple mode an existing tab is reloaded when it shows a different project, or holds a
 * different editor id, from the call. A project switch replaces the editor tab and mints a new
 * editor web view id, and the panel uses that id to focus the editor and select a clicked result,
 * so an unrefreshed tab would keep the old project's results and lose result selection.
 *
 * @param options Options for the Checks side panel web view provider
 * @param editorTabId Id of the editor tab the panel opens beside in Power mode
 * @returns The id of the Checks side panel web view, or `undefined` if none could be opened
 */
export async function openChecksSidePanelWebView(
  options: ChecksSidePanelWebViewOptions,
  editorTabId: string | undefined,
): Promise<string | undefined> {
  if ((await papi.settings.get('platform.interfaceMode')) !== 'simple')
    return papi.webViews.openWebView(
      checksSidePanelWebViewType,
      { type: 'panel', direction: 'right', targetTabId: editorTabId },
      options,
    );

  const existingId = await papi.webViews.openWebView(checksSidePanelWebViewType, undefined, {
    ...options,
    ...REUSE_EXISTING_CHECKS_ONLY,
  });
  if (existingId) {
    const existingDefinition = await papi.webViews.getOpenWebViewDefinition(existingId);
    if (isChecksSidePanelCurrent(existingDefinition, options.projectId, options.editorWebViewId))
      return existingId;

    const reloadedId = await papi.webViews.reloadWebView(
      checksSidePanelWebViewType,
      existingId,
      options,
    );
    // `reloadWebView` resolves undefined when the web view closed between the probe and the reload.
    // Handing back the probe's id would name a tab that no longer exists, so open a fresh one.
    if (reloadedId) return reloadedId;
    logger.debug(
      `openChecksSidePanelWebView: web view ${existingId} was gone by the time it could be reloaded; opening a new one`,
    );
  }

  return papi.webViews.openWebView(
    checksSidePanelWebViewType,
    { type: 'tab', parentTabGroupId: SIMPLE_RESOURCES_PANEL_ID },
    options,
  );
}

/**
 * Re-points an already-open Checks side panel at `projectId`, creating nothing.
 *
 * In Simple mode the Checks tab sits in Column 3, whose panels follow the active translation
 * project; the editor re-points them when the project changes. Checks joins Column 3 only on
 * request, so the group operation does not open it, and without this an open Checks tab would keep
 * showing the previous project's results.
 *
 * `editorWebViewId` matters for the same reason it does in the opener: a project switch that
 * replaces the editor tab mints a new editor web view id, and the panel uses the id it holds to
 * focus the editor and select a clicked result.
 *
 * @param projectId Id of the project the Checks side panel should check from now on
 * @param editorWebViewId Id of the editor web view the switch produced. Omit to keep the id the
 *   panel already holds.
 * @returns The id of the re-pointed Checks side panel, or `undefined` if none was open or the
 *   reload did not take
 */
export async function updateChecksSidePanelProject(
  projectId: string,
  editorWebViewId?: string,
): Promise<string | undefined> {
  const checksWebViewId = await papi.webViews.openWebView(checksSidePanelWebViewType, undefined, {
    ...REUSE_EXISTING_CHECKS_ONLY,
    // Both calls here opt out explicitly, because `bringToFront` defaults to TRUE on the probe and
    // the reload alike. A project switch must not pull Column 3 away from the tab the user was on.
    bringToFront: false,
  });
  if (!checksWebViewId) return undefined;

  const existingDefinition = await papi.webViews.getOpenWebViewDefinition(checksWebViewId);
  if (isChecksSidePanelCurrent(existingDefinition, projectId, editorWebViewId))
    return checksWebViewId;

  // Hidden case: reloaded while hidden too. A reload is data-driven, so it works without layout, and
  // it costs one remount per project switch — the same cost the Find re-point pays.
  const options: ChecksSidePanelWebViewOptions = {
    projectId,
    // Preserved rather than passed as undefined: the provider writes this straight to
    // `scrollGroupScrRef`, so dropping it would unbind the panel from the editor's scroll group.
    editorScrollGroupId: existingDefinition?.scrollGroupScrRef,
    editorWebViewId,
    // Same explicit opt-out as the probe above; see the note there.
    bringToFront: false,
  };
  const reloadedId = await papi.webViews.reloadWebView(
    checksSidePanelWebViewType,
    checksWebViewId,
    options,
  );
  // `reloadWebView` resolves undefined when the web view closed between the probe and the reload.
  if (!reloadedId)
    logger.debug(
      `updateChecksSidePanelProject: web view ${checksWebViewId} was gone by the time it could be reloaded; nothing re-pointed`,
    );
  return reloadedId;
}
