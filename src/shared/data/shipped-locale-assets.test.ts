import * as platformBibleReact from 'platform-bible-react';
import { MARKER_MENU_STRING_KEYS } from 'platform-bible-react';
import { describe, expect, it } from 'vitest';
import {
  getExtensionContributedKeys,
  readShippedLocale,
} from '@node/utils/locale-assets.test-helper';

// Guards the shipped locale assets in assets/localization/ against a key that exists only in a
// non-shipping source. This file has no paired module by design: its subject is the locale assets
// themselves, not code in this directory. It lives under src/ because vitest.config.ts only
// collects tests from src/**, tools/pt9-css-converter/src/**, and .erb/scripts/**.
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

const localizedStrings = Object.fromEntries(
  SHIPPED_LOCALES.map((locale) => [locale, readShippedLocale(locale)]),
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

// Every localization key any platform-bible-react component asks for, discovered from the library's
// exported `*_STRING_KEYS` arrays rather than a hardcoded list so a NEW component's array is covered
// the moment it is exported.
// Built imperatively rather than with filter+type-predicate: the library's export surface is a wide
// union of components, types, and constants, so a predicate narrowing an entry to
// [string, readonly string[]] is not assignable to that union's entry type. Collecting the strings
// and comparing counts narrows safely without a type assertion.
const exportedStringKeyArrays: { arrayName: string; keys: readonly string[] }[] = [];
Object.entries<unknown>(platformBibleReact).forEach(([arrayName, exported]) => {
  if (!arrayName.endsWith('_STRING_KEYS') || !Array.isArray(exported)) return;
  const entries: unknown[] = exported;
  const keys: string[] = [];
  entries.forEach((key) => {
    if (typeof key === 'string') keys.push(key);
  });
  // A `*_STRING_KEYS` export that is not entirely strings is not a key list; skip rather than
  // silently checking part of it
  if (keys.length !== entries.length) return;
  exportedStringKeyArrays.push({ arrayName, keys });
});

// A key is localized in the real app if ANY shipping source defines it. Two sources ship: the
// platform shell's own locale assets, and a bundled extension's localizedStrings contribution
// (which is where the `%webView_*%` keys legitimately live). The Storybook pseudo-localization
// fixture in lib/platform-bible-react/ is NOT a shipping source, which is the whole point.
const shippingKeys = new Set([
  ...SHIPPED_LOCALES.flatMap((locale) => Object.keys(localizedStrings[locale])),
  ...getExtensionContributedKeys(),
]);

describe('every platform-bible-react string key ships somewhere', () => {
  it('found key arrays to check', () => {
    // Fails loudly rather than vacuously passing if the export surface or naming convention changes
    expect(exportedStringKeyArrays.length).toBeGreaterThan(0);
    expect(shippingKeys.size).toBeGreaterThan(0);
  });

  // Presence only, in at least one locale — deliberately weaker than the en/es both-locales
  // assertion above. A key missing from a non-English locale falls back to English, which is
  // degraded but visible; a key missing from EVERY shipping source renders nothing at all, and that
  // is the failure this closes. Asserting per-locale parity here would fail on pre-existing debt
  // (12 en-only keys, 122 es-only) that is not this guard's subject.
  describe.each(exportedStringKeyArrays)('$arrayName', ({ keys }) => {
    it.each([...keys])('%s is defined in a shipping source', (key) => {
      expect(shippingKeys.has(key)).toBe(true);
    });
  });
});
