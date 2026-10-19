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
 * The internet-access option descriptions that name sync.
 *
 * Each key falls back to its retired Send/Receive predecessor, so a dropped `es` value would
 * silently show the retired wording instead of failing anywhere. This test is what notices.
 */
const INTERNET_ACCESS_DETAIL_STRING_KEYS = [
  '%paratextRegistration_description_internetUse_option_Enabled_details_2%',
  '%paratextRegistration_description_internetUse_option_VpnRequired_details_2%',
];

describe.each(INTERNET_ACCESS_DETAIL_STRING_KEYS)('internet access detail %s', (key) => {
  it('has an English string', () => {
    expect(localizedStrings.en[key]).toBeTruthy();
  });

  it('has a Spanish string', () => {
    expect(localizedStrings.es[key]).toBeTruthy();
  });
});
