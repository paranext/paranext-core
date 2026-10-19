import { readFileSync } from 'fs';
import path from 'path';
import { describe, expect, it } from 'vitest';

type LocalizedStringsFile = {
  localizedStrings: Record<string, Record<string, string>>;
  metadata: Record<string, { fallbackKey?: string }>;
};

function readLocalizedStringsFile(): LocalizedStringsFile {
  const stringsFilePath = path.resolve(__dirname, '../contributions/localizedStrings.json');
  // JSON.parse returns `any`, which assigns to the known shape of localized strings contribution
  // files without a type assertion
  const stringsFile: LocalizedStringsFile = JSON.parse(readFileSync(stringsFilePath, 'utf-8'));
  return stringsFile;
}

const { localizedStrings, metadata } = readLocalizedStringsFile();

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

/**
 * The notification shown when an edit is rejected because an automatic sync is in progress.
 *
 * This key falls back to the old Send/Receive key, so a dropped `es` value would silently show the
 * old wording instead of failing anywhere. This test is what notices.
 */
const SYNC_EDIT_BLOCKED_STRING_KEYS = ['%webView_platformScripture_error_syncEditBlocked_2%'];

describe.each(SYNC_EDIT_BLOCKED_STRING_KEYS)('sync edit-blocked notification %s', (key) => {
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

/**
 * `%manageBooks_delete_confirmBodyShared%` has no value in any language and resolves only through
 * its `fallbackKey`, which must name the renamed key, not the old one, so every language shows the
 * sync wording.
 */
describe('shared-project delete confirmation fallback', () => {
  it('falls back to the renamed key', () => {
    expect(metadata['%manageBooks_delete_confirmBodyShared%'].fallbackKey).toBe(
      '%manageBooks_delete_confirmBodySharedSendReceive_2%',
    );
  });

  it('has an English string for the fallback target', () => {
    expect(localizedStrings.en['%manageBooks_delete_confirmBodySharedSendReceive_2%']).toBeTruthy();
  });
});

/**
 * `%manageBooks_delete_confirmBodyAllShared_2%` has no Spanish value because the whole delete
 * dialog is English-only, so its English value is what the dialog shows everywhere.
 */
describe('all-shared delete confirmation', () => {
  it('has an English string that says sync', () => {
    const value = localizedStrings.en['%manageBooks_delete_confirmBodyAllShared_2%'];
    expect(value).toBeTruthy();
    expect(value).toContain('sync');
  });
});
