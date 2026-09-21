/**
 * Localize keys for `EmptyChapterView`.
 *
 * Split out of the component module so consumers that only need the key list can import it without
 * pulling `platform-bible-react` into their module graph. `localized-strings.test.ts` is the one
 * that motivates this: it only reads and compares a JSON file, and routing these keys through the
 * component roughly quadruples that file's collect time. The component imports fine from a `node`
 * test — this split buys collect speed, it is not working around a load-time failure. Same reason
 * `book-not-available-view.const.ts` and `character-marker-control.const.ts` exist.
 */

const MESSAGE_KEY = '%webView_platformScriptureEditor_emptyChapter_message%';
const MESSAGE_RESOURCE_KEY = '%webView_platformScriptureEditor_emptyChapter_messageResource%';
const ADD_CHAPTER_NUMBER_BUTTON_KEY =
  '%webView_platformScriptureEditor_emptyChapter_addChapterNumberButton%';
const PROTECTED_TOOLTIP_KEY = '%webView_platformScriptureEditor_emptyChapter_protectedTooltip%';

export const EMPTY_CHAPTER_VIEW_KEYS = {
  MESSAGE_KEY,
  MESSAGE_RESOURCE_KEY,
  ADD_CHAPTER_NUMBER_BUTTON_KEY,
  PROTECTED_TOOLTIP_KEY,
} as const;

/**
 * Localization keys used by `EmptyChapterView`. Spread these into the editor web-view's
 * localized-strings list so the values are loaded and passed into `localizedStrings`.
 *
 * Also imported by `localized-strings.test.ts`, which asserts en/es parity for each key list it
 * imports by name — add this module's import there when introducing a new key list, or the new keys
 * go uncovered.
 */
export const EMPTY_CHAPTER_VIEW_STRING_KEYS = Object.freeze(Object.values(EMPTY_CHAPTER_VIEW_KEYS));

export type EmptyChapterViewStringKey = (typeof EMPTY_CHAPTER_VIEW_STRING_KEYS)[number];

export type EmptyChapterViewLocalizedStrings = {
  [key in EmptyChapterViewStringKey]?: string;
};
