/**
 * The `webViewType` of this extension's Scripture editor web views.
 *
 * In a module of its own, with no imports, so core's tests can import it: core keeps a mirror,
 * `SCRIPTURE_EDITOR_WEBVIEW_TYPE` in `src/shared/models/web-view.model.ts`, and checks that the two
 * still match. A stale mirror breaks BCV navigation-target resolution and the project picker with
 * no type error.
 */
export const SCRIPTURE_EDITOR_WEBVIEW_TYPE = 'platformScriptureEditor.react';
