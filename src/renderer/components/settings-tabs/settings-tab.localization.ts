import { LocalizeKey } from 'platform-bible-utils';

// The Settings sidebar's project picker is a ProjectSelector, but in `project` mode with no open
// tabs it can only render these two of the picker's strings. They are named as literals rather
// than pulled from `PROJECT_SELECTOR_STRING_KEYS` so the tab resolves two keys instead of the
// picker's whole block; `settings-project-picker-localization.test.ts` pins both spellings against
// the shipped localization assets.

/** Placeholder for the project picker's search box. */
export const PROJECT_SELECTOR_SEARCH_PLACEHOLDER_KEY: LocalizeKey =
  '%projectSelector_searchPlaceholder%';

/** Message the project picker shows when no project matches the search. */
export const PROJECT_SELECTOR_NO_RESULTS_KEY: LocalizeKey = '%projectSelector_commandEmptyMessage%';
