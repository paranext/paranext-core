import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { RESOURCE_PICKER_DIALOG_STRING_KEYS } from 'platform-bible-react/experimental';
import { RESOURCE_PICKER_NOTICE_STRING_KEYS } from './dialogs/resource-picker.utils';

/**
 * Every key the resource picker can ask for: the component's own strings plus the notices the
 * dialog wrapper adds around them.
 */
const ALL_RESOURCE_PICKER_KEYS = [
  ...RESOURCE_PICKER_DIALOG_STRING_KEYS,
  ...RESOURCE_PICKER_NOTICE_STRING_KEYS,
];

// Resolved from this file's location rather than `process.cwd()` so the test is not sensitive to
// the directory `vitest` happens to be invoked from.
const LOCALIZATION_DIR = resolve(__dirname, '../../../assets/localization');

/** Prefix shared by every localization key this dialog's namespace owns */
const RESOURCE_PICKER_KEY_PREFIX = '%resourcePicker_';

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

describe('ResourcePickerDialog localization keys', () => {
  it('has a non-empty English translation for every key ResourcePickerDialog can request', () => {
    const missingOrInvalidKeys = findUnusableKeys(readStrings('en.json'), ALL_RESOURCE_PICKER_KEYS);

    if (missingOrInvalidKeys.length > 0)
      throw new Error(
        `The following ResourcePickerDialog localization key(s) have no valid entry in ` +
          `${localizationPath('en.json')}: ${missingOrInvalidKeys.join(', ')}. The localization ` +
          `service falls back to returning the key itself when a translation is missing, so any ` +
          `key listed here will render as literal "%key%" text in the dialog instead of an ` +
          `English label.`,
      );

    expect(missingOrInvalidKeys).toHaveLength(0);
  });

  // Nothing in the build enforces en/es parity, so a key added to English only ships a Spanish UI
  // that falls back to English — or to a literal `%key%` where the caller has no hardcoded
  // fallback. Guarding both arms is what catches that at the moment the key is added.
  //
  // Driven off the keys present in en.json rather than off the imported key list: `platform-bible-
  // react` resolves to its built bundle, which lags the component source until the bundle is
  // rebuilt, so a key added to the source in the same change would otherwise go unchecked here.
  it('has a non-empty Spanish translation for every resource picker key in English', () => {
    const englishKeys = Object.keys(readStrings('en.json')).filter((key) =>
      key.startsWith(RESOURCE_PICKER_KEY_PREFIX),
    );
    expect(englishKeys.length).toBeGreaterThan(0);

    const missingOrInvalidKeys = findUnusableKeys(readStrings('es.json'), englishKeys);

    if (missingOrInvalidKeys.length > 0)
      throw new Error(
        `The following ResourcePickerDialog localization key(s) have no valid entry in ` +
          `${localizationPath('es.json')}: ${missingOrInvalidKeys.join(', ')}. Add the Spanish ` +
          `translation alongside the English one — en and es are both maintained in this repo.`,
      );

    expect(missingOrInvalidKeys).toHaveLength(0);
  });
});
