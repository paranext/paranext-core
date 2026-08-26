import { SCRIPTURE_EDITOR_WEBVIEW_TYPE } from './scripture-editor-web-view-type.const';

/**
 * Web view types of the read-only scripture reference panels, as this extension sees them.
 *
 * `platform-scripture` cannot import `platform-scripture-editor`'s source, so these values are
 * mirrored here. They must equal the corresponding consts in
 * `extensions/src/platform-scripture-editor/src/main.ts`; a pinning test in
 * `resource-panel-web-view-types.const.test.ts` catches an accidental edit to these copies.
 */
export const MODEL_TEXT_PANEL_WEBVIEW_TYPE = 'platformScriptureEditor.modelText';
export const BIBLE_TEXTS_PANEL_WEBVIEW_TYPE = 'platformScriptureEditor.bibleTexts';
export const COMMENTARIES_PANEL_WEBVIEW_TYPE = 'platformScriptureEditor.commentaries';

/**
 * Mirror of `FOCUSED_RESOURCE_PROJECT_ID_STATE_KEY` in
 * `extensions/src/platform-scripture-editor/src/focused-resource-state-key.const.ts` — the web view
 * state key under which a reference panel publishes the project id of the resource it is
 * displaying. See that file for why the displayed resource is not the panel's definition
 * `projectId`.
 */
export const FOCUSED_RESOURCE_PROJECT_ID_STATE_KEY = 'focusedResourceProjectId';

/**
 * Tab types whose scripture Find can search, and therefore the ones whose projects the Find project
 * picker lists.
 *
 * Each of these tabs binds exactly one scripture/resource that Find can search, and each already
 * routes Ctrl+F to Find for it (`useOpenFindShortcut` in `platform-scripture-editor`): the editor
 * passes its own project, the reference panels pass the resource they display.
 *
 * The Text Collection (`platformScriptureEditor.scriptureTextGrid`) is deliberately excluded: it
 * shows several scriptures at once, so there is no single project for the picker to offer.
 */
export const FIND_SEARCHABLE_WEB_VIEW_TYPES = new Set<string>([
  SCRIPTURE_EDITOR_WEBVIEW_TYPE,
  MODEL_TEXT_PANEL_WEBVIEW_TYPE,
  BIBLE_TEXTS_PANEL_WEBVIEW_TYPE,
  COMMENTARIES_PANEL_WEBVIEW_TYPE,
]);
