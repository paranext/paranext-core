import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { MARKER_MENU_STRING_KEYS } from 'platform-bible-react';
import { describe, expect, it } from 'vitest';

// Guards the shipped locale assets against a key that exists only in a non-shipping source.
//
// The failure mode this protects against is SILENT: a component asks for a key, the key is defined
// in `lib/platform-bible-react/src/localizedStrings.json` (a Storybook *pseudo-localization
// fixture*, not a shipping source), Storybook renders it correctly, and the real app renders
// nothing. That is exactly how `%markerMenu_searchPlaceholder_character%` reached main.
//
// Scoped to MARKER_MENU_STRING_KEYS rather than asserting blanket en/es parity: the two files are
// not at parity today (12 en-only keys, 122 es-only), so a blanket guard would fail on unrelated
// pre-existing debt. Driven off the exported array so a key added to MarkerMenu tomorrow is covered
// without anyone remembering to edit this file.

const SHIPPED_LOCALES = ['en', 'es'] as const;

function readLocale(locale: string): Record<string, string> {
  const localePath = resolve(__dirname, `../../../assets/localization/${locale}.json`);
  // JSON.parse returns `any`, which assigns to the known flat key/value shape of a locale asset
  // without a type assertion
  const strings: Record<string, string> = JSON.parse(readFileSync(localePath, 'utf8'));
  return strings;
}

const localizedStrings = Object.fromEntries(
  SHIPPED_LOCALES.map((locale) => [locale, readLocale(locale)]),
);

describe('marker menu strings in shipped locale assets', () => {
  it('has keys to check', () => {
    // Fails loudly if the import ever resolves to an empty array, which would make every
    // assertion below vacuously pass
    expect(MARKER_MENU_STRING_KEYS.length).toBeGreaterThan(0);
  });

  describe.each(SHIPPED_LOCALES)('%s.json', (locale) => {
    // Deliberately does NOT also assert `localizedStrings.es[key] !== localizedStrings.en[key]`,
    // unlike its sibling guard in
    // extensions/src/platform-scripture-editor/src/localized-strings.test.ts. That sibling covers
    // control-specific labels, where an es/en match usually means an untranslated copy-paste.
    // MARKER_MENU_STRING_KEYS instead covers shared platform-bible-react library labels used by
    // multiple callers, not one control's own strings — this guard checks that the shipped locale
    // assets define them, the presence/absence failure this file exists to catch. A differs-from-
    // English assertion would couple this guard to translation choices rather than that failure.
    it.each([...MARKER_MENU_STRING_KEYS])('defines %s', (key) => {
      expect(localizedStrings[locale][key]).toBeTruthy();
    });
  });
});
