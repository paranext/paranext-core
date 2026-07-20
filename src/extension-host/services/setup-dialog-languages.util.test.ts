import { describe, expect, test } from 'vitest';
import { LanguageInfo } from 'platform-bible-react';
import { computeSetupDialogLanguages } from './setup-dialog-languages.util';

const loadedLocales: Record<string, LanguageInfo> = {
  en: { autonym: 'English' },
  fr: { autonym: 'Français' },
  es: { autonym: 'Español' },
  de: { autonym: 'Deutsch' },
};

// English baseline: 10 real firstRun keys + 1 placeholder (must be excluded from the denominator).
const englishData: Record<string, string> = {
  '%firstRun_title%': 'a',
  '%firstRun_description%': 'b',
  '%firstRun_button_next%': 'c',
  '%firstRun_button_back%': 'd',
  '%firstRun_button_skip%': 'e',
  '%firstRun_button_finish%': 'f',
  '%firstRun_button_retry%': 'g',
  '%firstRun_stepIndicator%': 'h',
  '%firstRun_loading%': 'i',
  '%firstRun_error_title%': 'j',
  '%firstRun_step_language_placeholder%': 'PLACEHOLDER',
  '%general_button_submit%': 'not-a-firstRun-key',
};
const firstRunKeys = Object.keys(englishData).filter(
  (k) => k.startsWith('%firstRun_') && !k.includes('_placeholder%'),
); // the 10 real keys

const langData: Record<string, Record<string, string>> = {
  en: englishData,
  fr: Object.fromEntries(firstRunKeys.slice(0, 9).map((k) => [k, 'x'])), // 9/10 = 90% → qualifies
  es: Object.fromEntries(firstRunKeys.slice(0, 5).map((k) => [k, 'x'])), // 5/10 = 50% → excluded
  // de: all 10 real keys but NO placeholder → 100% (proves the placeholder isn't in the denominator)
  de: Object.fromEntries(firstRunKeys.map((k) => [k, 'x'])),
};

describe('computeSetupDialogLanguages', () => {
  const result = computeSetupDialogLanguages(englishData, (tag) => langData[tag], loadedLocales);

  test('includes languages at or above 90% of non-placeholder firstRun keys', () => {
    expect(Object.keys(result).sort()).toEqual(['de', 'en', 'fr']);
  });
  test('excludes languages below the threshold', () => {
    expect(result.es).toBeUndefined();
  });
  test('always includes English even if its own data is sparse', () => {
    const sparse = computeSetupDialogLanguages(
      englishData,
      (t) => (t === 'en' ? {} : langData[t]),
      loadedLocales,
    );
    expect(sparse.en).toBeDefined();
  });
  test('returns the LanguageInfo from loadedLocales (raw-tag keyed)', () => {
    expect(result.fr).toEqual({ autonym: 'Français' });
  });
  test('returns empty when there are no baseline keys', () => {
    expect(computeSetupDialogLanguages({}, () => ({}), loadedLocales)).toEqual({
      en: { autonym: 'English' },
    });
  });
});
