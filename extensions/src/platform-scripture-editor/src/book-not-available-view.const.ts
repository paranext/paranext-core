/**
 * Localize keys and the disabled-reason type for {@link BookNotAvailableView}.
 *
 * Split out of the component module so consumers that must not pull in React can import them.
 * `localized-strings.test.ts` is the one that forces this: it runs in the node environment (it only
 * reads and compares a JSON file), and importing the component would drag in
 * `platform-bible-react`, which touches `document` at module load. Same reason
 * `character-marker-control.const.ts` exists.
 */

const SIMPLE_MESSAGE_KEY = '%webView_platformScriptureEditor_bookNotAvailable_simpleMessage%';
const TITLE_KEY = '%webView_platformScriptureEditor_bookNotAvailable_title%';
const DESCRIPTION_KEY = '%webView_platformScriptureEditor_bookNotAvailable_description%';
const MANAGE_BOOKS_BUTTON_KEY =
  '%webView_platformScriptureEditor_bookNotAvailable_manageBooksButton%';
const READ_ONLY_TOOLTIP_KEY = '%webView_platformScriptureEditor_bookNotAvailable_readOnlyTooltip%';
const SYNC_IN_PROGRESS_TOOLTIP_KEY =
  '%webView_platformScriptureEditor_bookNotAvailable_syncInProgressTooltip%';

export const BOOK_NOT_AVAILABLE_VIEW_KEYS = {
  SIMPLE_MESSAGE_KEY,
  TITLE_KEY,
  DESCRIPTION_KEY,
  MANAGE_BOOKS_BUTTON_KEY,
  READ_ONLY_TOOLTIP_KEY,
  SYNC_IN_PROGRESS_TOOLTIP_KEY,
} as const;

/**
 * Localization keys used by `BookNotAvailableView`. Spread these into the editor web-view's
 * localized-strings list so the values are loaded and passed into `localizedStrings`.
 *
 * Also imported by `localized-strings.test.ts`, which iterates every exported `*_STRING_KEYS` array
 * to assert en/es parity — so a key added here without a Spanish value fails that test.
 */
export const BOOK_NOT_AVAILABLE_VIEW_STRING_KEYS = Object.freeze([
  SIMPLE_MESSAGE_KEY,
  TITLE_KEY,
  DESCRIPTION_KEY,
  MANAGE_BOOKS_BUTTON_KEY,
  READ_ONLY_TOOLTIP_KEY,
  SYNC_IN_PROGRESS_TOOLTIP_KEY,
] as const);

export type BookNotAvailableViewStringKey = (typeof BOOK_NOT_AVAILABLE_VIEW_STRING_KEYS)[number];

export type BookNotAvailableViewLocalizedStrings = {
  [key in BookNotAvailableViewStringKey]?: string;
};

/**
 * Why the Manage books action cannot be taken right now. Each reason maps to its own tooltip text
 * so the disabled button explains the actual cause instead of a generic "unavailable".
 *
 * Deliberately excludes the editor's markers view: Manage Books is a separate floating dialog, so
 * its ability to create a book does not depend on which view the editor canvas is showing.
 */
export type ManageBooksDisabledReason = 'readOnly' | 'syncInProgress';

export const DISABLED_REASON_TOOLTIP_KEYS: Record<
  ManageBooksDisabledReason,
  BookNotAvailableViewStringKey
> = {
  readOnly: READ_ONLY_TOOLTIP_KEY,
  syncInProgress: SYNC_IN_PROGRESS_TOOLTIP_KEY,
};
