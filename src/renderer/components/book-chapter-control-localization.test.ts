import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { BOOK_CHAPTER_CONTROL_STRING_KEYS } from 'platform-bible-react';

// Resolved from this file's location rather than `process.cwd()` so the test is not sensitive to
// the directory `vitest` happens to be invoked from.
const EN_JSON_PATH = resolve(__dirname, '../../../assets/localization/en.json');

describe('BookChapterControl localization keys', () => {
  it('has a non-empty English translation for every key BookChapterControl can request', () => {
    const enStrings: { [key: string]: unknown } = JSON.parse(readFileSync(EN_JSON_PATH, 'utf8'));

    const missingOrInvalidKeys = BOOK_CHAPTER_CONTROL_STRING_KEYS.filter((key) => {
      const value = enStrings[key];
      return typeof value !== 'string' || value.length === 0 || value === key;
    });

    if (missingOrInvalidKeys.length > 0)
      throw new Error(
        `The following BookChapterControl localization key(s) have no valid entry in ` +
          `${EN_JSON_PATH}: ${missingOrInvalidKeys.join(', ')}. The localization service falls ` +
          `back to returning the key itself when a translation is missing, so any key listed ` +
          `here will render as literal "%key%" text in the toolbar instead of an English label.`,
      );

    expect(missingOrInvalidKeys).toHaveLength(0);
  });
});
