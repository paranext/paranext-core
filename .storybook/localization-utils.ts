/**
 * Storybook localization utilities.
 *
 * Stories should resolve localization keys explicitly by calling getLocalizedStrings() and passing
 * the results as props. This is more reliable than DOM-walking because it works for strings used in
 * JavaScript logic (comparisons, conditionals, etc.) that never appear in the DOM.
 */

import libStrings from '../lib/platform-bible-react/src/localizedStrings.json';

type LocalizedStringsFile = { localizedStrings: { en: Record<string, string> } };

// Dynamically discover all extension localized string files via webpack's require.context.
// This eliminates the need to manually update this file when extensions are added or renamed.
// `require.context` is a webpack-specific API not in the standard Node types, so we must cast
// `require` to `any` to access it without a type error.
// eslint-disable-next-line @typescript-eslint/no-explicit-any, no-type-assertion/no-type-assertion
const extensionStringsCtx = (require as any).context(
  '../extensions/src',
  true,
  /contributions\/localizedStrings\.json$/,
);

/** Build a map of all localization keys to English strings */
function buildLocalizationMap(): Record<string, string> {
  const map: Record<string, string> = {};

  // Extract English strings from a localization file. Warn on key collisions so conflicts are
  // visible rather than silently resolved by last-writer-wins.
  const addStrings = (enStrings: Record<string, string>) => {
    Object.entries(enStrings).forEach(([key, value]: [string, string]) => {
      if (key in map && map[key] !== value) {
        // Intentional warning to surface key conflicts during Storybook development.
        // eslint-disable-next-line no-console
        console.warn(
          `[localization-utils] Key collision: "${key}" already has value "${map[key]}", overwriting with "${value}"`,
        );
      }
      map[key] = value;
    });
  };

  // Add library strings
  // The JSON import lacks type information; cast to the known shape so we can safely access it.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  addStrings((libStrings as LocalizedStringsFile).localizedStrings.en);

  // Add all extension strings dynamically
  extensionStringsCtx.keys().forEach((key: string) => {
    // webpack's require.context returns `any`; cast to the known shape to access its properties.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const mod = extensionStringsCtx(key) as LocalizedStringsFile;
    addStrings(mod.localizedStrings.en);
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
 * import { getLocalizedStrings } from '.storybook/localization-utils';
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
