/**
 * Localize keys for `EmptyChapterView`.
 *
 * Split out of the component module so consumers that must not pull in React can import them.
 * `localized-strings.test.ts` is the one that forces this: it runs in the node environment (it only
 * reads and compares a JSON file), and importing the component would drag in
 * `platform-bible-react`, which touches `document` at module load. Same reason
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
 * Also imported by `localized-strings.test.ts`, which iterates every exported `*_STRING_KEYS` array
 * to assert en/es parity — so a key added here without a Spanish value fails that test.
 */
export const EMPTY_CHAPTER_VIEW_STRING_KEYS = Object.freeze(Object.values(EMPTY_CHAPTER_VIEW_KEYS));

export type EmptyChapterViewStringKey = (typeof EMPTY_CHAPTER_VIEW_STRING_KEYS)[number];

export type EmptyChapterViewLocalizedStrings = {
  [key in EmptyChapterViewStringKey]?: string;
};
