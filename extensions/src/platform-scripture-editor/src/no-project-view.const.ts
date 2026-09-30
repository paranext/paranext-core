/**
 * Localize keys for `NoProjectView`.
 *
 * Split out of the component module for the same reason as `book-not-available-view.const.ts`:
 * `localized-strings.test.ts` imports the key list, and routing it through the component would pull
 * `platform-bible-react` into that test's module graph.
 */

const NO_PROJECT_SELECTED_KEY = '%webView_platformScriptureEditor_emptyState_noProject%';
const NO_PROJECTS_TITLE_KEY = '%webView_platformScriptureEditor_emptyState_noProjects_title%';
const NO_PROJECTS_DESCRIPTION_KEY =
  '%webView_platformScriptureEditor_emptyState_noProjects_description%';

export const NO_PROJECT_VIEW_KEYS = {
  NO_PROJECT_SELECTED_KEY,
  NO_PROJECTS_TITLE_KEY,
  NO_PROJECTS_DESCRIPTION_KEY,
} as const;

/**
 * Localization keys used by `NoProjectView`. Spread these into the editor web-view's
 * localized-strings list so the values are loaded and passed into `localizedStrings`.
 *
 * Also imported by `localized-strings.test.ts`, which asserts en/es parity for each key list it
 * imports by name.
 */
export const NO_PROJECT_VIEW_STRING_KEYS = Object.freeze(Object.values(NO_PROJECT_VIEW_KEYS));

export type NoProjectViewStringKey = (typeof NO_PROJECT_VIEW_STRING_KEYS)[number];

export type NoProjectViewLocalizedStrings = {
  [key in NoProjectViewStringKey]?: string;
};
