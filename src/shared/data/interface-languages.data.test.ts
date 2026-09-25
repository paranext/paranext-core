import { describe, expect, it } from 'vitest';
import type { LanguageInfo } from 'platform-bible-react';
import { languageDetails } from './language-details.data';
import {
  filterToOffered,
  getOfferedLanguageDefaults,
  isOfferedInterfaceLanguage,
  OFFERED_INTERFACE_LANGUAGES,
} from './interface-languages.data';

const LOADED: Record<string, LanguageInfo> = {
  fr: { autonym: 'Français' },
  es: { autonym: 'Español' },
  'zh-hans': { autonym: '中文（简体）' },
  en: { autonym: 'English' },
  km: { autonym: 'ខ្មែរ' },
};

describe('OFFERED_INTERFACE_LANGUAGES', () => {
  it('offers exactly English and Spanish, English first', () => {
    expect([...OFFERED_INTERFACE_LANGUAGES]).toEqual(['en', 'es']);
  });
});

describe('filterToOffered', () => {
  it('keeps only offered languages, with their info', () => {
    expect(filterToOffered(LOADED)).toEqual({ en: LOADED.en, es: LOADED.es });
  });

  it('lists the offered languages in offered order, whatever order they were loaded in', () => {
    expect(Object.keys(filterToOffered(LOADED))).toEqual(['en', 'es']);
  });

  it('does not mutate its input', () => {
    const input = { ...LOADED };
    filterToOffered(input);
    expect(input).toEqual(LOADED);
  });

  it('returns an empty record when no offered language is loaded', () => {
    expect(filterToOffered({ fr: { autonym: 'Français' } })).toEqual({});
  });

  it('ignores properties inherited from Object.prototype', () => {
    expect(filterToOffered(Object.create({ en: { autonym: 'inherited' } }))).toEqual({});
  });
});

describe('getOfferedLanguageDefaults', () => {
  it('describes exactly the offered languages, in order, from the shared language details', () => {
    const defaults = getOfferedLanguageDefaults();
    expect(Object.keys(defaults)).toEqual([...OFFERED_INTERFACE_LANGUAGES]);
    expect(defaults.es).toEqual(languageDetails.es);
  });
});

describe('isOfferedInterfaceLanguage', () => {
  it('is true for offered languages only', () => {
    expect(isOfferedInterfaceLanguage('en')).toBe(true);
    expect(isOfferedInterfaceLanguage('es')).toBe(true);
    expect(isOfferedInterfaceLanguage('fr')).toBe(false);
    expect(isOfferedInterfaceLanguage('ES')).toBe(false);
  });
});
