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
const NO_PROJECTS_DESCRIPTION_REGISTERED_KEY =
  '%webView_platformScriptureEditor_emptyState_noProjects_description_registered%';
/** Core's product name, referenced as `{%product_name%}` in the registered user's description. */
const PRODUCT_NAME_KEY = '%product_name%';

export const NO_PROJECT_VIEW_KEYS = {
  NO_PROJECT_SELECTED_KEY,
  NO_PROJECTS_TITLE_KEY,
  NO_PROJECTS_DESCRIPTION_KEY,
  NO_PROJECTS_DESCRIPTION_REGISTERED_KEY,
  PRODUCT_NAME_KEY,
} as const;

/**
 * Localization keys used by `NoProjectView`. Spread these into the editor web-view's
 * localized-strings list so the values are loaded and passed into `localizedStrings`.
 */
export const NO_PROJECT_VIEW_STRING_KEYS = Object.freeze(Object.values(NO_PROJECT_VIEW_KEYS));

/**
 * The keys in {@link NO_PROJECT_VIEW_STRING_KEYS} that this extension's `localizedStrings.json`
 * defines; `%product_name%` is core's. Imported by `localized-strings.test.ts`, which asserts en/es
 * parity for each key list it imports by name.
 */
export const NO_PROJECT_VIEW_CONTRIBUTED_STRING_KEYS = Object.freeze(
  NO_PROJECT_VIEW_STRING_KEYS.filter((key) => key !== PRODUCT_NAME_KEY),
);

export type NoProjectViewStringKey = (typeof NO_PROJECT_VIEW_STRING_KEYS)[number];

export type NoProjectViewLocalizedStrings = {
  [key in NoProjectViewStringKey]?: string;
};
