/**
 * The `webViewType` of this extension's Scripture editor web views.
 *
 * In a module of its own, with no imports, so core can import it too: core keeps a mirror,
 * `SCRIPTURE_EDITOR_WEBVIEW_TYPE` in `src/shared/models/web-view.model.ts`, and
 * `web-view.model.test.ts` imports this value to fail if the two drift. A stale mirror breaks BCV
 * navigation-target resolution and the project picker with no type error.
 */
export const SCRIPTURE_EDITOR_WEBVIEW_TYPE = 'platformScriptureEditor.react';
