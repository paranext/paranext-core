import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { SHARE_LAYOUT_DIALOG_STRING_KEYS } from './dialogs/share-layout.component';

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
function findUnusableKeys(strings: { [key: string]: unknown }, keys: readonly string[]) {
  return keys.filter((key) => {
    const value = strings[key];
    return typeof value !== 'string' || value.length === 0 || value === key;
  });
}

const english = readStrings('en.json');
const spanish = readStrings('es.json');

describe('Team layout dialog localization keys', () => {
  it('has a non-empty English translation for every key the dialog can request', () => {
    const missingOrInvalidKeys = findUnusableKeys(english, SHARE_LAYOUT_DIALOG_STRING_KEYS);

    if (missingOrInvalidKeys.length > 0)
      throw new Error(
        `The following team layout dialog localization key(s) have no valid entry in ` +
          `${localizationPath('en.json')}: ${missingOrInvalidKeys.join(', ')}. The localization ` +
          `service falls back to returning the key itself when a translation is missing, so any ` +
          `key listed here will render as literal "%key%" text in the dialog instead of an ` +
          `English label.`,
      );

    expect(missingOrInvalidKeys).toHaveLength(0);
  });

  // en and es are the two languages maintained in this repo (Localization-Guide.md, "Always provide
  // both en AND es"); the remaining shipped locales carry none of this dialog's keys and are
  // translated elsewhere. Nothing in the build enforces en/es parity, so this is the guard.
  it('has a non-empty Spanish translation for every key the dialog can request', () => {
    const missingOrInvalidKeys = findUnusableKeys(spanish, SHARE_LAYOUT_DIALOG_STRING_KEYS);

    if (missingOrInvalidKeys.length > 0)
      throw new Error(
        `The following team layout dialog localization key(s) have no valid entry in ` +
          `${localizationPath('es.json')}: ${missingOrInvalidKeys.join(', ')}. Add the Spanish ` +
          `translation alongside the English one — en and es are both maintained in this repo.`,
      );

    expect(missingOrInvalidKeys).toHaveLength(0);
  });

  it('names the dialog for the thing being edited rather than the act of sharing it', () => {
    expect(english['%shareLayoutDialog_teamLayout_title%']).toBe('Team layout');
  });

  // The strings this dialog replaces shipped in v0.6.0-alpha.0.rc.0 and are immutable: a downstream
  // consumer or a translator working from an exported catalog still holds them, and the replacement
  // wording means something different, so the old keys keep their old values and the dialog reads
  // from new ones instead (Localization-Guide.md, "Existing Strings Are Immutable").
  it('leaves the superseded keys untouched rather than redefining them', () => {
    expect(english['%shareLayoutDialog_title%']).toBe('Share layout with team');
  });
});
