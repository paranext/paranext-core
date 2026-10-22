/**
 * The `webViewType` of this extension's Find web view.
 *
 * In a module of its own, with no imports, so core can import it too: core keeps a mirror,
 * `FIND_WEBVIEW_TYPE` in `src/shared/models/web-view.model.ts`, that seeds Simple mode's Find tab,
 * and `web-view.model.test.ts` imports this value to fail if the two drift. A stale mirror would
 * not fail loudly: the tab would name a type no provider serves and silently fail to load.
 */
export const findWebViewType = 'platformScripture.find';
