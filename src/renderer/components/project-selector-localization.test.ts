import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { PROJECT_SELECTOR_STRING_KEYS } from 'platform-bible-react/experimental';

// Resolved from this file's location rather than `process.cwd()` so the test is not sensitive to
// the directory `vitest` happens to be invoked from.
const LOCALIZATION_DIR = resolve(__dirname, '../../../assets/localization');

function localizationPath(fileName: string) {
  return resolve(LOCALIZATION_DIR, fileName);
}

function readStrings(fileName: string): { [key: string]: unknown } {
  return JSON.parse(readFileSync(localizationPath(fileName), 'utf8'));
}

/**
 * Keys whose value is missing, empty, or the key itself. The localization service returns the key
 * when a translation is missing, so such a key renders as literal `%key%` text.
 */
function findUnusableKeys(strings: { [key: string]: unknown }) {
  return PROJECT_SELECTOR_STRING_KEYS.filter((key) => {
    const value = strings[key];
    return typeof value !== 'string' || value.length === 0 || value === key;
  });
}

describe('ProjectSelector localization keys', () => {
  it('has a non-empty English translation for every key ProjectSelector can request', () => {
    const missingOrInvalidKeys = findUnusableKeys(readStrings('en.json'));

    if (missingOrInvalidKeys.length > 0)
      throw new Error(
        `The following ProjectSelector localization key(s) have no valid entry in ` +
          `${localizationPath('en.json')}: ${missingOrInvalidKeys.join(', ')}. The picker falls ` +
          `back to its own English default for an unresolved key, so a key listed here silently ` +
          `stops being translatable rather than failing loudly.`,
      );

    expect(missingOrInvalidKeys).toHaveLength(0);
  });

  // Nothing in the build enforces en/es parity, so a key added to English only ships a Spanish UI
  // that falls back to English. Guarding both arms is what catches that at the moment the key is
  // added.
  it('has a non-empty Spanish translation for every key ProjectSelector can request', () => {
    const missingOrInvalidKeys = findUnusableKeys(readStrings('es.json'));

    if (missingOrInvalidKeys.length > 0)
      throw new Error(
        `The following ProjectSelector localization key(s) have no valid entry in ` +
          `${localizationPath('es.json')}: ${missingOrInvalidKeys.join(', ')}. Add the Spanish ` +
          `translation alongside the English one — en and es are both maintained in this repo.`,
      );

    expect(missingOrInvalidKeys).toHaveLength(0);
  });
});
