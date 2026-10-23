import { readFileSync } from 'fs';
import path from 'path';
import { describe, expect, it } from 'vitest';

type LocalizedStringsFile = {
  localizedStrings: Record<string, Record<string, string>>;
  metadata: Record<string, { fallbackKey?: string; deprecationInfo?: { message: string } }>;
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
 * The internet-access option descriptions that name sync.
 *
 * Each key falls back to its superseded Send/Receive predecessor, so a dropped `es` value would
 * silently show the old wording instead of failing anywhere. This test is what notices.
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

/**
 * The badge on internet-access options that are listed but cannot be chosen yet.
 *
 * Its `fallbackKey` points at the superseded "Coming soon" key, so a dropped `es` value would
 * silently bring back the "coming soon" wording this key exists to replace.
 */
describe('not-yet-available badge', () => {
  const key = '%paratextRegistration_internetUse_notYetAvailable%';

  it.each(['en', 'es'])('has a %s string that does not promise a delivery date', (locale) => {
    const value = localizedStrings[locale][key];
    expect(value).toBeTruthy();
    expect(value).not.toMatch(/coming soon|próximamente|pronto/i);
  });

  it('Spanish string differs from English', () => {
    expect(localizedStrings.es[key]).not.toBe(localizedStrings.en[key]);
  });

  it('marks the "Coming soon" key it replaces as deprecated', () => {
    expect(
      metadata['%paratextRegistration_internetUse_comingSoon%'].deprecationInfo?.message,
    ).toContain(key);
  });
});
