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
 * Resolves the web view that BCV navigation should DRIVE — the web view whose reference the top
 * toolbar's book/chapter/verse controls (`platform-bible-toolbar.tsx`) and the `platform.goTo*`
 * command handlers (`scroll-group-navigation.commands.ts`) read and write. Both consumers read the
 * one resolved value (cached in `window.service-host`) so they can never disagree on the target.
 *
 * This is DISTINCT from the "last selected scripture-navigable web view"
 * ({@link isScriptureNavigableWebViewDefinition} / `getLastSelectedScriptureNavigableWebViewId`),
 * which is the raw tab the user most recently focused, with no fallback. The navigation target is
 * that raw value RESOLVED into something that is always safe to drive:
 *
 * 1. The tracked last-selected web view, if it still exists and is still navigable; else
 * 2. The first open Scripture editor web view with a project (the "main editor" fallback); else
 * 3. `undefined` (nothing to navigate — the toolbar/commands disable).
 *
 * @param trackedWebViewId The currently tracked last-selected web view id (callers supply it so
 *   reactive callers can pass their subscribed value)
 * @param pinToMainEditor When `true`, skip the tracked web view entirely and resolve straight to
 *   the main-editor fallback (step 2). Simple interface mode passes this: there the toolbar is the
 *   single navigation point and every scripture view follows the same scroll group, so navigation
 *   always targets the main project editor — focusing a secondary view (the model-text panel, or a
 *   different-project resource) must not swing the target away from it. Defaults to `false` (power
 *   mode's normal tracked-first resolution).
 */
export function resolveTargetWebView(
  trackedWebViewId: WebViewId | undefined,
  pinToMainEditor = false,
): ResolvedWebView | undefined {
  if (pinToMainEditor) return resolveMainEditorWebView();
  return resolveTrackedWebView(trackedWebViewId) ?? resolveMainEditorWebView();
}
