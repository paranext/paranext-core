/**
 * Storybook localization utilities.
 *
 * Stories should resolve localization keys explicitly by calling getLocalizedStrings() and passing
 * the results as props. This is more reliable than DOM-walking because it works for strings used in
 * JavaScript logic (comparisons, conditionals, etc.) that never appear in the DOM.
 *
 * NOTE (issue #8): The imports below are hardcoded per-extension. If an extension is added,
 * removed, or renamed, this file must be updated manually. A future improvement would be to use
 * webpack require.context or a glob import to discover these files dynamically.
 */

import libStrings from '../lib/platform-bible-react/src/localizedStrings.json';
import platformScriptureStrings from '../extensions/src/platform-scripture/contributions/localizedStrings.json';
import platformScriptureEditorStrings from '../extensions/src/platform-scripture-editor/contributions/localizedStrings.json';
import platformGetResourcesStrings from '../extensions/src/platform-get-resources/contributions/localizedStrings.json';
import legacyCommentManagerStrings from '../extensions/src/legacy-comment-manager/contributions/localizedStrings.json';
import helloRock3Strings from '../extensions/src/hello-rock3/contributions/localizedStrings.json';
import helloSomeoneStrings from '../extensions/src/hello-someone/contributions/localizedStrings.json';
import platformLexicalToolsStrings from '../extensions/src/platform-lexical-tools/contributions/localizedStrings.json';
import paraboxRegistrationStrings from '../extensions/src/paratext-registration/contributions/localizedStrings.json';
import quickVerseStrings from '../extensions/src/quick-verse/contributions/localizedStrings.json';

/** Build a map of all localization keys to English strings */
function buildLocalizationMap(): Record<string, string> {
  const map: Record<string, string> = {};

  // Extract English strings from all localization files. Warn on key collisions so conflicts are
  // visible rather than silently resolved by last-writer-wins.
  [
    libStrings.localizedStrings.en,
    platformScriptureStrings.localizedStrings.en,
    platformScriptureEditorStrings.localizedStrings.en,
    platformGetResourcesStrings.localizedStrings.en,
    legacyCommentManagerStrings.localizedStrings.en,
    helloRock3Strings.localizedStrings.en,
    helloSomeoneStrings.localizedStrings.en,
    platformLexicalToolsStrings.localizedStrings.en,
    paraboxRegistrationStrings.localizedStrings.en,
    quickVerseStrings.localizedStrings.en,
  ].forEach((enStrings) => {
    Object.entries(enStrings).forEach(([key, value]) => {
      if (key in map && map[key] !== value) {
        // eslint-disable-next-line no-console
        console.warn(
          `[localization-decorator] Key collision: "${key}" already has value "${map[key]}", overwriting with "${value}"`,
        );
      }
      map[key] = value;
    });
  });

  return map;
}

let localizationMap: Record<string, string> | undefined;

/** Get the localization map (lazy-loaded) */
export function getLocalizationMap(): Record<string, string> {
  if (!localizationMap) {
    localizationMap = buildLocalizationMap();
  }
  return localizationMap;
}

/**
 * Helper function for use in stories to get localized strings for specific keys
 *
 * Usage in story:
 *
 * ```tsx
 * import { getLocalizedStrings } from '.storybook/localization-decorator';
 *
 * const strings = getLocalizedStrings(['%key1%', '%key2%']);
 * // returns { '%key1%': 'English text 1', '%key2%': 'English text 2' }
 * ```
 */
export function getLocalizedStrings(keys: string[]): Record<string, string> {
  const map = getLocalizationMap();
  const result: Record<string, string> = {};

  keys.forEach((key) => {
    result[key] = map[key] ?? key; // Fallback to key if not found
  });

  return result;
}

/**
 * Helper function for use in stories to replace keys in text
 *
 * Usage in story:
 *
 * ```tsx
 * import { replaceLocalizationInText } from '.storybook/localization-decorator';
 *
 * const args = {
 *   placeholder: replaceLocalizationInText('%webView_find_searchPlaceholder%'),
 * };
 * ```
 */
export function replaceLocalizationInText(text: string): string {
  const map = getLocalizationMap();
  return text.replace(/%([a-zA-Z0-9_]+)%/g, (match, key) => {
    const fullKey = `%${key}%`;
    return map[fullKey] ?? match;
  });
}
