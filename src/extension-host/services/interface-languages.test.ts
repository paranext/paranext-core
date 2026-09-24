import { describe, expect, it, vi } from 'vitest';
import type { LanguageInfo } from 'platform-bible-react';

type InterfaceLanguagesModule = typeof import('./interface-languages');

// The module holds process-wide state (the registry and its readiness), so each test gets a fresh
// copy rather than inheriting whatever an earlier test settled.
async function freshModule(): Promise<InterfaceLanguagesModule> {
  vi.resetModules();
  return import('./interface-languages');
}

const LOADED: Record<string, LanguageInfo> = {
  en: { autonym: 'English' },
  es: { autonym: 'Español' },
  fr: { autonym: 'Français' },
  'zh-hans': { autonym: '中文（简体）' },
  km: { autonym: 'ខ្មែរ' },
};

describe('OFFERED_INTERFACE_LANGUAGES', () => {
  it('offers exactly English and Spanish', async () => {
    const { OFFERED_INTERFACE_LANGUAGES } = await freshModule();
    expect([...OFFERED_INTERFACE_LANGUAGES]).toEqual(['en', 'es']);
  });
});

describe('filterToOffered', () => {
  it('keeps only offered languages, with their info', async () => {
    const { filterToOffered } = await freshModule();
    expect(filterToOffered(LOADED)).toEqual({ en: LOADED.en, es: LOADED.es });
  });

  it('does not mutate its input', async () => {
    const { filterToOffered } = await freshModule();
    const input = { ...LOADED };
    filterToOffered(input);
    expect(input).toEqual(LOADED);
  });

  it('returns an empty record when no offered language is loaded', async () => {
    const { filterToOffered } = await freshModule();
    expect(filterToOffered({ fr: LOADED.fr })).toEqual({});
  });
});

describe('getAllLoadedInterfaceLanguages', () => {
  it('waits for the locale files, then returns every loaded language including hidden ones', async () => {
    const languages = await freshModule();
    let settled = false;
    const pending = languages.getAllLoadedInterfaceLanguages().then((value) => {
      settled = true;
      return value;
    });
    await Promise.resolve();
    expect(settled).toBe(false);

    Object.assign(languages.loadedLocales, LOADED);
    languages.markLoadedLocalesReady();

    await expect(pending).resolves.toEqual(LOADED);
  });

  it('rejects when the locale files could not be loaded', async () => {
    const languages = await freshModule();
    languages.markLoadedLocalesFailed('No files found in localization folder');
    await expect(languages.getAllLoadedInterfaceLanguages()).rejects.toBe(
      'No files found in localization folder',
    );
  });
});
