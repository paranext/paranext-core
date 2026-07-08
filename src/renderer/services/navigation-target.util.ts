import {
  getAllOpenWebViewDefinitionsSync,
  getSavedWebViewDefinitionSync,
} from '@renderer/services/web-view.service-host';
import { SavedWebViewDefinition, WebViewId } from '@shared/models/web-view.model';
import { logger } from '@shared/services/logger.service';
import { getErrorMessage } from 'platform-bible-utils';

// Must match SCRIPTURE_EDITOR_WEBVIEW_TYPE in platform-scripture-editor.utils.ts. Core code
// cannot import from extension source, so this is intentionally duplicated (see the same pattern
// in `use-project-picker-data.hook.ts` and `shutdown-tasks.ts`).
const SCRIPTURE_EDITOR_WEBVIEW_TYPE = 'platformScriptureEditor.react';

/** A web view id paired with its current saved definition */
export type ResolvedWebView = { id: WebViewId; definition: SavedWebViewDefinition };

/** Step 1 of target resolution: the tracked last-selected (scripture-navigable) web view, if any */
function resolveTrackedWebView(
  trackedWebViewId: WebViewId | undefined,
): ResolvedWebView | undefined {
  if (!trackedWebViewId) return undefined;

  try {
    const definition = getSavedWebViewDefinitionSync(trackedWebViewId);
    if (!definition) return undefined;
    return { id: trackedWebViewId, definition };
  } catch (e) {
    logger.warn(
      `Navigation target resolution could not get web view definition for ${trackedWebViewId}: ${getErrorMessage(e)}`,
    );
    return undefined;
  }
}

/**
 * Step 2 of target resolution: the "main project" editor fallback — the first open Scripture editor
 * web view with a project, same rule `useProjectPickerData` uses to find the current project. Used
 * when nothing is tracked yet (e.g. at fresh app start) but an editor is open, possibly restored on
 * a persisted scroll group other than 0.
 */
function resolveMainEditorWebView(): ResolvedWebView | undefined {
  let definitions: SavedWebViewDefinition[];
  try {
    definitions = getAllOpenWebViewDefinitionsSync();
  } catch (e) {
    logger.warn(
      `Navigation target resolution could not enumerate open web views: ${getErrorMessage(e)}`,
    );
    return undefined;
  }

  const editorDefinition = definitions.find(
    (definition) =>
      definition.webViewType === SCRIPTURE_EDITOR_WEBVIEW_TYPE && definition.projectId,
  );
  if (!editorDefinition) return undefined;
  return { id: editorDefinition.id, definition: editorDefinition };
}

/**
 * Resolves the web view that BCV navigation targets — shared by the `platform.goTo*` /
 * `platform.openBookChapterControl` command handlers (`scroll-group-navigation.commands.ts`) and
 * the top toolbar's controls (`platform-bible-toolbar.tsx`) so the two can never disagree on the
 * target. The chain: (1) the tracked last-selected web view, else (2) the first open Scripture
 * editor web view with a project, else (3) `undefined` (nothing to navigate).
 *
 * @param trackedWebViewId The currently tracked last-selected web view id (callers supply it so
 *   reactive callers can pass their subscribed value)
 */
export function resolveTargetWebView(
  trackedWebViewId: WebViewId | undefined,
): ResolvedWebView | undefined {
  return resolveTrackedWebView(trackedWebViewId) ?? resolveMainEditorWebView();
}
