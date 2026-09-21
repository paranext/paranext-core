/**
 * Localize keys and the disabled-reason type for `BookNotAvailableView`.
 *
 * Split out of the component module so consumers that only need the key list can import it without
 * pulling `platform-bible-react` into their module graph. `localized-strings.test.ts` is the one
 * that motivates this: it only reads and compares a JSON file, and routing these keys through the
 * component roughly quadruples that file's collect time. The component imports fine from a `node`
 * test — this split buys collect speed, it is not working around a load-time failure. Same reason
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
 * Also imported by `localized-strings.test.ts`, which asserts en/es parity for each key list it
 * imports by name — add this module's import there when introducing a new key list, or the new keys
 * go uncovered.
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
