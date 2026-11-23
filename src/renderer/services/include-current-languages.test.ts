import { describe, expect, it } from 'vitest';
import type { LanguageInfo } from 'platform-bible-react';
import { includeCurrentLanguages } from './include-current-languages';

const OFFERED: Record<string, LanguageInfo> = {
  en: { autonym: 'English' },
  es: { autonym: 'Español' },
};

describe('includeCurrentLanguages', () => {
  it('returns the offered languages unchanged when every current language is offered', () => {
    expect(includeCurrentLanguages(OFFERED, ['es', 'en'])).toEqual(OFFERED);
  });

  it('adds a hidden current language labeled with its real autonym', () => {
    expect(includeCurrentLanguages(OFFERED, ['fr']).fr?.autonym).toBe('Français');
  });

  it('adds hidden fallback languages too, not only the primary', () => {
    const result = includeCurrentLanguages(OFFERED, ['es', 'zh-hans']);
    expect(Object.keys(result).sort()).toEqual(['en', 'es', 'zh-hans']);
    expect(result['zh-hans']?.autonym).toBe('中文（简体）');
  });

  it('labels a tag with no known details by the raw tag', () => {
    expect(includeCurrentLanguages(OFFERED, ['es-MX'])['es-MX']).toEqual({ autonym: 'es-MX' });
  });

  it('keeps the entry it was given for a language that is already present', () => {
    const custom = { en: { autonym: 'English (custom)' } };
    expect(includeCurrentLanguages(custom, ['en']).en?.autonym).toBe('English (custom)');
  });

  it('does not mutate its input', () => {
    const input = { ...OFFERED };
    includeCurrentLanguages(input, ['fr']);
    expect(input).toEqual(OFFERED);
  });
});
