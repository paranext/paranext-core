import { SCRIPTURE_EDITOR_WEBVIEW_TYPE } from '@shared/models/web-view.model';
import { ContentZoomKind } from '@shared/utils/content-zoom.util';

/**
 * Web-view definition `state` key holding the pane's own content zoom levels: a map from zoom area
 * id to factor. An area with no entry follows the default from Settings. Written only by the
 * platform; web views may read it.
 *
 * @experimental This constant is unstable and may change or disappear without notice
 */
export const CONTENT_ZOOM_LEVELS_STATE_KEY = 'platform.contentZoomLevels';

/**
 * Prefix of the CSS custom properties the platform sets on every web view's root element, one per
 * zoom area, with that area's effective factor (own level, else the Settings default):
 * `--platform-content-zoom-main`, `--platform-content-zoom-footnotes`, …
 *
 * @experimental This constant is unstable and may change or disappear without notice
 */
export const CONTENT_ZOOM_CSS_VARIABLE_PREFIX = '--platform-content-zoom-';

/**
 * CSS custom property holding the Settings default, the fallback for any area without its own
 * variable.
 *
 * @experimental This constant is unstable and may change or disappear without notice
 */
export const CONTENT_ZOOM_DEFAULT_CSS_VARIABLE = '--platform-content-zoom-default';

/**
 * The CSS custom property carrying one zoom area's effective factor.
 *
 * @experimental This function is unstable and may change or disappear without notice
 */
export function getContentZoomCssVariable(areaId: string): string {
  return `${CONTENT_ZOOM_CSS_VARIABLE_PREFIX}${areaId}`;
}

/**
 * Attribute a web view puts on each element that wraps one zoom area's content (below its own
 * toolbar, outside dividers and headers). The attribute value is the area id; an empty value is the
 * `main` area. The platform's injected stylesheet applies `zoom:
 * var(--platform-content-zoom-<area>)` to it. Areas must not nest. Views without this attribute
 * ignore per-area zoom input and are scaled whole at the Settings default.
 *
 * @experimental This constant is unstable and may change or disappear without notice
 */
export const CONTENT_ZOOM_ROOT_ATTRIBUTE = 'data-platform-content-zoom-root';

/**
 * `id` of the `<style>` element the platform injects into each web view head for content zoom.
 *
 * @experimental This constant is unstable and may change or disappear without notice
 */
export const CONTENT_ZOOM_STYLE_ELEMENT_ID = 'platform-content-zoom-styles';

/**
 * Which kind of memory a first-party web view type uses for its content zoom. Core lists extension
 * web-view types by string here because core code cannot import extension source (same pattern as
 * `SCRIPTURE_EDITOR_WEBVIEW_TYPE`).
 *
 * @experimental This constant is unstable and may change or disappear without notice
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

/**
 * The content-zoom kind of a web view type, or `undefined` for a type with no per-project memory.
 *
 * @experimental This function is unstable and may change or disappear without notice
 */
export function getContentZoomKind(webViewType: string): ContentZoomKind | undefined {
  return CONTENT_ZOOM_KIND_BY_WEB_VIEW_TYPE.get(webViewType);
}

/**
 * Names of the three content-zoom commands (registered in the main-process web-view router).
 *
 * @experimental This constant is unstable and may change or disappear without notice
 */
export const CONTENT_ZOOM_COMMANDS = {
  in: 'platform.webViewContentZoomIn',
  out: 'platform.webViewContentZoomOut',
  reset: 'platform.webViewContentZoomReset',
} as const;
