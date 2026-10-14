import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import {
  ENGLISH_FALLBACKS,
  LOCALIZED_STRING_KEYS,
} from './extension-host-stopped-banner.component';

const LOCALIZATION_DIR = resolve(__dirname, '../../../../assets/localization');

function readStrings(fileName: string): { [key: string]: unknown } {
  return JSON.parse(readFileSync(resolve(LOCALIZATION_DIR, fileName), 'utf8'));
}

/** Keys whose value is missing, empty, or the key itself (what the service returns when missing). */
function findUnusableKeys(strings: { [key: string]: unknown }) {
  return LOCALIZED_STRING_KEYS.filter((key) => {
    const value = strings[key];
    return typeof value !== 'string' || value.length === 0 || value === key;
  });
}

describe('ExtensionHostStoppedBanner localization keys', () => {
  it('has a non-empty English translation for every key', () => {
    expect(findUnusableKeys(readStrings('en.json'))).toEqual([]);
  });

  it('has a non-empty Spanish translation for every key', () => {
    expect(findUnusableKeys(readStrings('es.json'))).toEqual([]);
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
