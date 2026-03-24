/**
 * Helper utilities for using localized strings in Storybook stories
 *
 * Since Storybook runs outside the papi environment, we can't use useLocalizedStrings hook.
 * Instead, stories should either:
 *
 * 1. Pass localized strings as props directly (recommended for library components)
 * 2. Use this helper to resolve localization keys to English strings
 */

import libStrings from '../lib/platform-bible-react/src/localizedStrings.json';

/**
 * Get English localized strings from the library
 *
 * @param keys - Array of localization keys to retrieve
 * @returns Object with key->string mappings for the given keys
 */
export function getLocalizedStrings(keys: string[]): Record<string, string> {
  const englishStrings = Object.fromEntries(Object.entries(libStrings.localizedStrings.en));
  const result: Record<string, string> = {};

  keys.forEach((key) => {
    result[key] = englishStrings[key] ?? key; // Fallback to key if not found
  });

  return result;
}

/**
 * Get a single localized string
 *
 * @param key - The localization key
 * @returns The English string, or the key if not found
 */
export function getLocalizedString(key: string): string {
  const englishStrings = Object.fromEntries(Object.entries(libStrings.localizedStrings.en));
  return englishStrings[key] ?? key;
}

/**
 * Example for a story using localized strings:
 *
 * ```tsx
 * import { getLocalizedStrings } from '.storybook/localization-helper';
 *
 * export const Default: Story = {
 *   args: {
 *     localizedStrings: getLocalizedStrings(['%key1%', '%key2%']),
 *   },
 * };
 * ```
 */
const localizationHelpers = { getLocalizedStrings, getLocalizedString };
export default localizationHelpers;
