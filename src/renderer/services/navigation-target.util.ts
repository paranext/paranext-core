import {
  getAllOpenWebViewDefinitionsSync,
  getSavedWebViewDefinitionSync,
} from '@renderer/services/web-view.service-host';
import {
  findFirstEditorWebViewDefinition,
  SavedWebViewDefinition,
  WebViewId,
} from '@shared/models/web-view.model';
import { logger } from '@shared/services/logger.service';
import { getErrorMessage } from 'platform-bible-utils';

/** A web view id paired with its current saved definition */
export type ResolvedWebView = { id: WebViewId; definition: SavedWebViewDefinition };

/**
 * Whether a web view definition is a candidate for BCV navigation: it either belongs to a project
 * (`projectId`) or shows its own BookChapterControl/ScrollGroupSelector toolbar
 * (`shouldShowToolbar`). Web views that are neither (e.g. Find, a settings-style panel) have
 * nothing to navigate.
 *
 * Shared by the window service's focus-time tracking gate and by {@link resolveTargetWebView}, which
 * re-checks it at resolution time because `projectId` is a runtime-updatable definition property —
 * a web view can stop being navigable after it was tracked.
 */
export function isScriptureNavigableWebViewDefinition(definition: SavedWebViewDefinition): boolean {
  return !!(definition.projectId || definition.shouldShowToolbar);
}

/** Step 1 of target resolution: the tracked last-selected (scripture-navigable) web view, if any */
function resolveTrackedWebView(
  trackedWebViewId: WebViewId | undefined,
): ResolvedWebView | undefined {
  if (!trackedWebViewId) return undefined;

  try {
    const definition = getSavedWebViewDefinitionSync(trackedWebViewId);
    if (!definition) return undefined;
    // Re-validate navigability at resolution time — the tracking gate admitted this web view when
    // it was focused, but its definition may have changed since (see
    // `isScriptureNavigableWebViewDefinition`). Fall through to the editor fallback rather than
    // navigating a target with nothing to navigate.
    if (!isScriptureNavigableWebViewDefinition(definition)) return undefined;
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

  const editorDefinition = findFirstEditorWebViewDefinition(definitions);
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
