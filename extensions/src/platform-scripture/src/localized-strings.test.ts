import { readFileSync } from 'fs';
import path from 'path';
import { describe, expect, it } from 'vitest';

type LocalizedStringsFile = {
  localizedStrings: Record<string, Record<string, string>>;
};

function readLocalizedStringsFile(): LocalizedStringsFile {
  const stringsFilePath = path.resolve(__dirname, '../contributions/localizedStrings.json');
  // JSON.parse returns `any`, which assigns to the known shape of localized strings contribution
  // files without a type assertion
  const stringsFile: LocalizedStringsFile = JSON.parse(readFileSync(stringsFilePath, 'utf-8'));
  return stringsFile;
}

const { localizedStrings } = readLocalizedStringsFile();

/**
 * The strings Find shows when extra material is withheld — the book-list note, the disabled-scope
 * explanation, and the results-area placeholder.
 *
 * Nothing in the build enforces en/es parity: a key present in `en` and missing from `es` fails no
 * other check, which is how most of this extension's `%webView_find_*` family came to be en-only.
 * Closing that gap for the whole file means supplying the missing translations, which is its own
 * piece of work. These three are guarded now so the set does not grow, and this file is where the
 * rest belongs as they are translated.
 *
 * TODO(PT-4414): This whole family goes away with the exclusion it explains.
 */
const EXTRA_MATERIAL_STRING_KEYS = [
  '%webView_find_extraMaterialNotSearched%',
  '%webView_find_extraMaterialNotSearchedScope%',
  '%webView_find_extraMaterialNotSearchedScopeResults%',
];

describe.each(EXTRA_MATERIAL_STRING_KEYS)('extra-material explanation %s', (key) => {
  it('has an English string', () => {
    expect(localizedStrings.en[key]).toBeTruthy();
  });

  it('has a Spanish string', () => {
    expect(localizedStrings.es[key]).toBeTruthy();
  });

  it('Spanish string differs from English', () => {
    expect(localizedStrings.es[key]).not.toBe(localizedStrings.en[key]);
  });
});
