/**
 * The `webViewType` of this extension's Find web view.
 *
 * In a module of its own, with no imports, so core's tests can import it: core keeps a mirror,
 * `FIND_WEBVIEW_TYPE` in `src/shared/models/web-view.model.ts`, that seeds Simple mode's Find tab,
 * and checks that the two still match. A stale mirror would not fail loudly: the tab would name a
 * type no provider serves and silently fail to load.
 */
export const findWebViewType = 'platformScripture.find';
