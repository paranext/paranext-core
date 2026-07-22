import { describe, expect, test } from 'vitest';
import { pickBestSetupLanguage } from './pick-best-setup-language';

// Raw locale-file tags, as returned by getSetupDialogLanguages().
const QUALIFYING = ['en', 'es', 'fr', 'km', 'zh-hans', 'zh-hant'];

describe('pickBestSetupLanguage', () => {
  test('matches a base language, ignoring region', () => {
    expect(pickBestSetupLanguage('en-US', QUALIFYING)).toBe('en');
    expect(pickBestSetupLanguage('fr-CA', QUALIFYING)).toBe('fr');
    expect(pickBestSetupLanguage('es-MX', QUALIFYING)).toBe('es');
  });

  test('resolves region-only Chinese locales to the right script (likely-subtags)', () => {
    expect(pickBestSetupLanguage('zh-CN', QUALIFYING)).toBe('zh-hans');
    expect(pickBestSetupLanguage('zh-TW', QUALIFYING)).toBe('zh-hant');
    expect(pickBestSetupLanguage('zh-Hans', QUALIFYING)).toBe('zh-hans');
    // Traditional-Chinese region other than TW resolves to zh-hant too.
    expect(pickBestSetupLanguage('zh-Hant-HK', QUALIFYING)).toBe('zh-hant');
  });

  test('matches an exact base tag', () => {
    expect(pickBestSetupLanguage('km', QUALIFYING)).toBe('km');
  });

  test('normalizes POSIX-style locales (underscore, charset/modifier suffix)', () => {
    // Linux LANG passthroughs like `en_US.UTF-8` are not valid Intl.Locale input; normalize them.
    expect(pickBestSetupLanguage('en_US', QUALIFYING)).toBe('en');
    expect(pickBestSetupLanguage('fr_CA.UTF-8', QUALIFYING)).toBe('fr');
    expect(pickBestSetupLanguage('zh_CN.UTF-8@pinyin', QUALIFYING)).toBe('zh-hans');
  });

  test('returns the qualifying tag with its own casing, not the OS-locale casing', () => {
    // Match is case-insensitive, but the returned value is the qualifying tag exactly as provided.
    expect(pickBestSetupLanguage('zh-CN', ['en', 'zh-Hans'])).toBe('zh-Hans');
  });

  test('returns undefined when nothing qualifies', () => {
    expect(pickBestSetupLanguage('ja-JP', QUALIFYING)).toBeUndefined();
    expect(pickBestSetupLanguage('de', QUALIFYING)).toBeUndefined();
  });

  test('returns undefined for an empty or invalid locale without throwing', () => {
    expect(pickBestSetupLanguage('', QUALIFYING)).toBeUndefined();
    expect(pickBestSetupLanguage('not a locale', QUALIFYING)).toBeUndefined();
  });
});
