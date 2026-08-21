/**
 * Web view type of the Scripture editor / Resource viewer, as this extension sees it.
 *
 * `platform-scripture` cannot import `platform-scripture-editor`'s source, so the value is mirrored
 * here as the single `platform-scripture`-side copy — import this const rather than writing the
 * literal again. It must equal `SCRIPTURE_EDITOR_WEBVIEW_TYPE` in
 * `extensions/src/platform-scripture-editor/src/platform-scripture-editor.utils.ts` (and its
 * core-side mirror in `src/shared/models/web-view.model.ts`); a pinning test in
 * `scripture-editor-web-view-type.const.test.ts` catches an accidental edit to this copy.
 */
export const SCRIPTURE_EDITOR_WEBVIEW_TYPE = 'platformScriptureEditor.react';
