/**
 * Web view state key under which a read-only reference panel publishes the project id of the
 * scripture/resource it is currently displaying.
 *
 * A reference panel's web view definition `projectId` is its _container_ project — the editable
 * project whose reference list the panel shows (the model text panel additionally reads that
 * project's `platformScripture.modelTexts` setting). The resource actually on screen is a different
 * project, and it is the one that is searchable. Publishing it into web view state makes it visible
 * to other extensions through `papi.webViews.getAllOpenWebViewDefinitions` and
 * `onDidUpdateWebView`, which is how Find's project picker lists resources open in these panels.
 *
 * `platform-scripture` cannot import this extension's source, so it mirrors this key; the two must
 * stay equal. See `resource-panel-web-view-types.const.ts` in `platform-scripture` for that copy
 * and the pinning test that guards it.
 */
export const FOCUSED_RESOURCE_PROJECT_ID_STATE_KEY = 'focusedResourceProjectId';
