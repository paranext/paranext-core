import { describe, expect, test } from 'vitest';
import { LanguageInfo } from 'platform-bible-react';
import { LanguageStrings } from 'platform-bible-utils';
import { computeSetupDialogLanguages } from './setup-dialog-languages.util';

const loadedLocales: Record<string, LanguageInfo> = {
  en: { autonym: 'English' },
  fr: { autonym: 'Français' },
  es: { autonym: 'Español' },
  de: { autonym: 'Deutsch' },
  it: { autonym: 'Italiano' },
};

// The 10 real (non-placeholder) firstRun baseline keys as explicit literals — deliberately NOT
// derived from the implementation's own filter, so a broken placeholder-exclusion rule can't
// silently shift the expected counts along with it.
const REAL_KEYS = [
  '%firstRun_title%',
  '%firstRun_description%',
  '%firstRun_button_next%',
  '%firstRun_button_back%',
  '%firstRun_button_skip%',
  '%firstRun_button_finish%',
  '%firstRun_button_retry%',
  '%firstRun_stepIndicator%',
  '%firstRun_loading%',
  '%firstRun_error_title%',
];

function withValues(keys: string[]): LanguageStrings {
  return Object.fromEntries(keys.map((key) => [key, 'x']));
}

// English baseline: the 10 real keys + 1 placeholder (must be excluded from the denominator) + 1
// non-firstRun key (must be ignored).
const englishData: LanguageStrings = {
  ...withValues(REAL_KEYS),
  '%firstRun_step_language_placeholder%': 'PLACEHOLDER',
  '%general_button_submit%': 'not-a-firstRun-key',
};

const langData: Record<string, LanguageStrings> = {
  en: englishData,
  fr: withValues(REAL_KEYS.slice(0, 9)), // 9/10 = 90% → qualifies (exact-tie boundary for >=)
  it: withValues(REAL_KEYS.slice(0, 8)), // 8/10 = 80% → excluded (just below the boundary)
  es: withValues(REAL_KEYS.slice(0, 5)), // 5/10 = 50% → excluded
  de: withValues(REAL_KEYS), // 10/10 = 100%, no placeholder → proves the placeholder isn't counted
};

describe('computeSetupDialogLanguages', () => {
  const result = computeSetupDialogLanguages(englishData, (tag) => langData[tag], loadedLocales);

  test('includes languages at or above 90% of non-placeholder firstRun keys', () => {
    expect(Object.keys(result).sort()).toEqual(['de', 'en', 'fr']);
  });
  test('excludes languages below the threshold (80% and 50%)', () => {
    expect(result.it).toBeUndefined();
    expect(result.es).toBeUndefined();
  });
  test('always includes English even if its own data is sparse', () => {
    const sparse = computeSetupDialogLanguages(
      englishData,
      (tag) => (tag === 'en' ? {} : langData[tag]),
      loadedLocales,
    );
    expect(sparse.en).toBeDefined();
  });
  test('returns the LanguageInfo from loadedLocales (raw-tag keyed)', () => {
    expect(result.fr).toEqual({ autonym: 'Français' });
  });
  test('returns only English when there are no baseline keys', () => {
    expect(computeSetupDialogLanguages({}, () => ({}), loadedLocales)).toEqual({
      en: { autonym: 'English' },
    });
  });
});
