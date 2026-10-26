import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import {
  ENGLISH_FALLBACKS,
  ExtensionHostStoppedKey,
  LOCALIZED_STRING_KEYS,
  PRODUCT_NAME_KEY,
} from './extension-host-stopped-banner.component';

/**
 * The keys that must carry a translation in every shipped locale. `%product_name%` is excluded: it
 * is a proper noun that only `en.json` defines, and every other locale resolves it through the
 * fallback chain, as for the connection-lost overlay.
 */
const KEYS_REQUIRING_TRANSLATION = LOCALIZED_STRING_KEYS.filter((key) => key !== PRODUCT_NAME_KEY);

const LOCALIZATION_DIR = resolve(__dirname, '../../../../assets/localization');

function readStrings(fileName: string): { [key: string]: unknown } {
  return JSON.parse(readFileSync(resolve(LOCALIZATION_DIR, fileName), 'utf8'));
}

/** Keys whose value is missing, empty, or the key itself (what the service returns when missing). */
function findUnusableKeys(
  strings: { [key: string]: unknown },
  keys: readonly ExtensionHostStoppedKey[] = LOCALIZED_STRING_KEYS,
) {
  return keys.filter((key) => {
    const value = strings[key];
    return typeof value !== 'string' || value.length === 0 || value === key;
  });
}

describe('ExtensionHostStoppedBanner localization keys', () => {
  it('has a non-empty English translation for every key', () => {
    expect(findUnusableKeys(readStrings('en.json'))).toEqual([]);
  });

  it('has a non-empty Spanish translation for every key', () => {
    expect(findUnusableKeys(readStrings('es.json'), KEYS_REQUIRING_TRANSLATION)).toEqual([]);
  });

  // The fallbacks are the copy the user reads when the extension host dies before localization has
  // answered, so they must not drift from the shipped English.
  it('has an English fallback that matches en.json exactly for every key', () => {
    const englishStrings = readStrings('en.json');
    const fallbacks = Object.fromEntries(
      LOCALIZED_STRING_KEYS.map((key) => [key, ENGLISH_FALLBACKS[key]]),
    );
    const shippedEnglish = Object.fromEntries(
      LOCALIZED_STRING_KEYS.map((key) => [key, englishStrings[key]]),
    );
    expect(fallbacks).toEqual(shippedEnglish);
  });
});
