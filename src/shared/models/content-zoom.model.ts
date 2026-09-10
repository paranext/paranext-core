import {
  CONTENT_ZOOM_CSS_VARIABLE_PREFIX,
  CONTENT_ZOOM_DEFAULT_CSS_VARIABLE,
  CONTENT_ZOOM_LEVELS_STATE_KEY,
  CONTENT_ZOOM_ROOT_ATTRIBUTE,
  SCRIPTURE_EDITOR_WEBVIEW_TYPE,
} from '@shared/models/web-view.model';
import { ContentZoomKind } from '@shared/utils/content-zoom.util';

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
 * The CSS custom property carrying one zoom area's effective factor.
 *
 * @experimental This function is unstable and may change or disappear without notice
 */
export function getContentZoomCssVariable(areaId: string): string {
  return `${CONTENT_ZOOM_CSS_VARIABLE_PREFIX}${areaId}`;
}

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
