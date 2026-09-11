import { DEFAULT_ZOOM_FACTOR, MAX_ZOOM_FACTOR, MIN_ZOOM_FACTOR } from '@shared/data/platform.data';
import {
  CONTENT_ZOOM_CSS_VARIABLE_PREFIX,
  CONTENT_ZOOM_DEFAULT_CSS_VARIABLE,
  CONTENT_ZOOM_LEVELS_STATE_KEY,
  CONTENT_ZOOM_ROOT_ATTRIBUTE,
  SCRIPTURE_EDITOR_WEBVIEW_TYPE,
} from '@shared/models/web-view.model';

/**
 * The extension-facing half of the content zoom contract is declared in `web-view.model.ts`, which
 * is published to extensions through `papi.d.ts`; it is re-exported here so core code can reach the
 * whole contract from one module.
 */
export {
  CONTENT_ZOOM_CSS_VARIABLE_PREFIX,
  CONTENT_ZOOM_DEFAULT_CSS_VARIABLE,
  CONTENT_ZOOM_LEVELS_STATE_KEY,
  CONTENT_ZOOM_ROOT_ATTRIBUTE,
};
export type { ContentZoomAreaId } from '@shared/models/web-view.model';

/**
 * The allowed range and step for a content zoom factor, defined once alongside the rest of the
 * platform's zoom constants; core code reaches them from here rather than from `platform.data`
 * directly.
 */
export { DEFAULT_ZOOM_FACTOR, MAX_ZOOM_FACTOR, MIN_ZOOM_FACTOR };

/** Amount one zoom-in / zoom-out step changes a content zoom factor. */
export const ZOOM_STEP = 0.1;

/**
 * Kinds of web view whose content zoom is remembered per project. A view's kind decides the memory
 * key it uses; views of a kind that shows no project fall back to remembering per kind.
 */
export type ContentZoomKind = 'editor' | 'resource' | 'notes';

/**
 * Pattern a well-formed zoom area id must match: lower-case letters, digits and hyphens, starting
 * with a letter. Exported so the bootstrap script can build its own runtime copy of this pattern
 * from {@link CONTENT_ZOOM_AREA_ID_PATTERN}`.source` instead of restating it.
 */
export const CONTENT_ZOOM_AREA_ID_PATTERN = /^[a-z][a-z0-9-]*$/;

/**
 * Placeholder for the area id in {@link CONTENT_ZOOM_NAMED_AREA_RULE_TEMPLATE}. Never a legal area
 * id ({@link CONTENT_ZOOM_AREA_ID_PATTERN} accepts only lower-case letters, digits and hyphens), so
 * substituting it can never collide with a real one.
 */
export const CONTENT_ZOOM_AREA_ID_PLACEHOLDER = 'AREA_ID';

/**
 * The CSS rule that scales one NAMED zoom area (not `main`, whose rule also matches the marker's
 * empty value and is baked separately): its own variable, else the default. Both the head-splice
 * helper (`areaRule` in the bootstrap-script module) and the bootstrap's own runtime `ensureRule`
 * build a named area's rule by substituting {@link CONTENT_ZOOM_AREA_ID_PLACEHOLDER} in this one
 * string, so the two can never spell the rule differently. The bootstrap module cannot call a
 * shared function for this at runtime — it executes as injected source text inside the web view,
 * not as an import — so it inlines this template and substitutes the placeholder itself.
 */
export const CONTENT_ZOOM_NAMED_AREA_RULE_TEMPLATE = `[${CONTENT_ZOOM_ROOT_ATTRIBUTE}="${CONTENT_ZOOM_AREA_ID_PLACEHOLDER}"]{zoom:var(${CONTENT_ZOOM_CSS_VARIABLE_PREFIX}${CONTENT_ZOOM_AREA_ID_PLACEHOLDER},var(${CONTENT_ZOOM_DEFAULT_CSS_VARIABLE},1))}`;

/** The CSS custom property carrying one zoom area's effective factor. */
export function getContentZoomCssVariable(areaId: string): string {
  return `${CONTENT_ZOOM_CSS_VARIABLE_PREFIX}${areaId}`;
}

/** `id` of the `<style>` element the platform injects into each web view head for content zoom. */
export const CONTENT_ZOOM_STYLE_ELEMENT_ID = 'platform-content-zoom-styles';

/**
 * Which kind of memory a first-party web view type uses for its content zoom. Core lists extension
 * web-view types by string here because core code cannot import extension source (same pattern as
 * `SCRIPTURE_EDITOR_WEBVIEW_TYPE`).
 */
export const CONTENT_ZOOM_KIND_BY_WEB_VIEW_TYPE: ReadonlyMap<string, ContentZoomKind> = new Map<
  string,
  ContentZoomKind
>([
  [SCRIPTURE_EDITOR_WEBVIEW_TYPE, 'editor'],
  ['platformEnhancedResources.enhancedResource', 'resource'],
  ['platformScriptureEditor.scriptureTextGrid', 'resource'],
  ['platformScriptureEditor.modelText', 'resource'],
  ['platformScriptureEditor.bibleTexts', 'resource'],
  ['platformScriptureEditor.commentaries', 'resource'],
  ['legacyCommentManager.commentList', 'notes'],
  ['legacyCommentManager.commentListPanel', 'notes'],
]);

/** The content-zoom kind of a web view type, or `undefined` for a type with no per-project memory. */
export function getContentZoomKind(webViewType: string): ContentZoomKind | undefined {
  return CONTENT_ZOOM_KIND_BY_WEB_VIEW_TYPE.get(webViewType);
}

/** Names of the three content-zoom commands (registered in the main-process web-view router). */
export const CONTENT_ZOOM_COMMANDS = {
  in: 'platform.webViewContentZoomIn',
  out: 'platform.webViewContentZoomOut',
  reset: 'platform.webViewContentZoomReset',
} as const;
