import * as platformBibleReact from 'platform-bible-react';
import * as platformBibleReactExperimental from 'platform-bible-react/experimental';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  getExtensionContributedKeys,
  getFallbackRedirectedKeys,
  readShippedLocale,
} from '@node/utils/locale-assets.test-helper';

// Guards the shipped localization sources against a key that a component asks for but no shipping
// source defines. This file has no paired module by design: its subject is the locale assets
// themselves, not code in this directory. It lives under src/node/ because it reads the filesystem
// (per .claude/rules/architecture/shared-patterns.md) and because vitest.config.ts only collects
// tests from src/**, tools/pt9-css-converter/src/**, and .erb/scripts/**.
//
// The failure mode this protects against is SILENT to whoever introduces it: a component asks for a
// key, the key is defined in `lib/platform-bible-react/src/localizedStrings.json` (a Storybook
// *pseudo-localization fixture*, not a shipping source), Storybook renders it correctly, and the
// real app renders the raw `%key%` text — the runtime warns and returns the key itself when nothing
// resolves (localization.service-host.ts). That is exactly how
// `%markerMenu_searchPlaceholder_character%` reached main.
//
// `.husky/lib/ai-hooks.sh` `run_localization_check` enforces the same rule on staged diffs. Keep the
// two definitions of "shipping source" in step: a new locale directory or a moved contributions
// path needs editing in both places.

// The two locales the marker-menu parity block below checks. Six locales ship (see
// getShippedLocaleTags) — these two are the ones any marker-menu key is expected to carry, since
// fr/km/zh contain no markerMenu keys at all. Named for that scope rather than for shipping, so it
// cannot be mistaken for the full shipped set.
const PARITY_LOCALES = ['en', 'es'] as const;

const localizedStrings = Object.fromEntries(
  PARITY_LOCALES.map((locale) => [locale, readShippedLocale(locale)]),
);

describe('marker menu strings in shipped locale assets', () => {
  it('has keys to check', () => {
    // Fails loudly if the import ever resolves to an empty array, which would make every
    // assertion below vacuously pass
    expect(platformBibleReact.MARKER_MENU_STRING_KEYS.length).toBeGreaterThan(0);
  });

  describe.each(PARITY_LOCALES)('%s.json', (locale) => {
    // Deliberately does NOT also assert `localizedStrings.es[key] !== localizedStrings.en[key]`,
    // unlike its sibling guard in
    // extensions/src/platform-scripture-editor/src/localized-strings.test.ts. That sibling covers
    // control-specific labels, where an es/en match usually means an untranslated copy-paste.
    // MARKER_MENU_STRING_KEYS instead covers shared platform-bible-react library labels used by
    // multiple callers, not one control's own strings — this guard checks that the shipped locale
    // assets define them, the presence/absence failure this file exists to catch. A differs-from-
    // English assertion would couple this guard to translation choices rather than that failure.
    it.each(platformBibleReact.MARKER_MENU_STRING_KEYS)(
      'defines a non-empty value for %s',
      (key) => {
        const value = localizedStrings[locale][key];
        expect(value).toBeTypeOf('string');
        expect(typeof value === 'string' && value.trim()).toBeTruthy();
      },
    );
  });
});

/**
 * Collects the `*_STRING_KEYS` arrays a package entry exports. Anything named that way whose
 * entries are not all strings is a naming collision this guard cannot interpret, so it fails rather
 * than skipping — a silent skip would drop an entire array's coverage, and the largest array here
 * (FOOTNOTE_EDITOR_STRING_KEYS) is composed at runtime from other packages, so it is the most
 * likely to break this way and the most costly to lose.
 */
function collectStringKeyArrays(
  entryName: string,
  entryExports: object,
): { arrayName: string; keys: string[] }[] {
  return Object.entries<unknown>(entryExports).flatMap(([arrayName, exported]) => {
    if (!arrayName.endsWith('_STRING_KEYS') || !Array.isArray(exported)) return [];
    if (!exported.every((key): key is string => typeof key === 'string'))
      throw new Error(
        `${entryName} exports ${arrayName}, which is not entirely strings and cannot be checked as a localization key list.`,
      );
    return [{ arrayName, keys: exported }];
  });
}

// Every localization key any platform-bible-react component asks for, discovered from the library's
// exported `*_STRING_KEYS` arrays rather than a hardcoded list so a NEW component's array is
// covered as soon as it is exported and the library is rebuilt. Both package entries are scanned:
// `platform-bible-react/experimental` exports five arrays the main entry does not, and production
// code consumes them. An array exported from neither entry stays invisible to this guard — the
// known case is UI_LANGUAGE_SELECTOR_STRING_KEYS.
//
// Note this reads the committed `lib/platform-bible-react/dist/`, not `src/`: no build step in CI
// regenerates that bundle, so a key added to a component is covered only once the library is
// rebuilt and the rebuilt dist committed.
const exportedStringKeyArrays = new Map<string, string[]>();
[
  ['platform-bible-react', platformBibleReact],
  ['platform-bible-react/experimental', platformBibleReactExperimental],
].forEach(([entryName, entryExports]) => {
  collectStringKeyArrays(String(entryName), Object(entryExports)).forEach(({ arrayName, keys }) => {
    exportedStringKeyArrays.set(arrayName, keys);
  });
});

// Erosion floor. Discovery is convention-driven, so a rename or an export removal quietly shrinks
// coverage; this turns that into a failure. Raise it when arrays are added; never lower it without
// saying in the commit message which array legitimately went away.
const MINIMUM_STRING_KEY_ARRAYS = 20;

// A key is localized for a production user if an ENGLISH shipping source defines it. English is the
// only guaranteed backstop: the runtime fallback chain ends at BACKUP_LANGUAGE = 'en' and then
// returns the raw `%key%`, so a key present only in es.json still renders as garbage for everyone
// else. Three sources qualify — the shell's own en.json, the `en` block of a bundled extension's
// localizedStrings contribution (where extension-owned `%webView_*%` keys live), and a
// `metadata.json` fallbackKey redirect, which the runtime resolves to another key's value. The
// Storybook pseudo-localization fixture in lib/platform-bible-react/ is NOT a shipping source,
// which is the whole point.
const shippingKeys = new Set([
  ...Object.keys(readShippedLocale('en')),
  ...getExtensionContributedKeys('en'),
  ...getFallbackRedirectedKeys(),
]);

describe('every platform-bible-react string key ships somewhere', () => {
  it('found key arrays to check', () => {
    // Fails loudly rather than vacuously passing if the export surface or naming convention changes
    expect(exportedStringKeyArrays.size).toBeGreaterThanOrEqual(MINIMUM_STRING_KEY_ARRAYS);
    expect(shippingKeys.size).toBeGreaterThan(0);
  });

  // Asserted per array rather than per key: the same failure names every missing key at once, and
  // the test count stays proportional to components rather than to every string in the app.
  it.each([...exportedStringKeyArrays])(
    '%s keys are all defined in an English shipping source',
    (_arrayName, keys) => {
      expect(keys.length).toBeGreaterThan(0);
      expect(keys.filter((key) => !shippingKeys.has(key))).toEqual([]);
    },
  );
});

// The incident this file exists to prevent was a key that lived in the Storybook fixture and
// nowhere else. Asserting the fixture is a subset of the shipping sources inverts that root cause
// directly, and unlike the array sweep above it also covers keys a component requests as a string
// literal and keys whose array is not exported at all.
describe('the Storybook pseudo-localization fixture only names keys that ship', () => {
  const fixture: { localizedStrings?: Record<string, Record<string, string>> } = JSON.parse(
    readFileSync(
      resolve(__dirname, '../../../lib/platform-bible-react/src/localizedStrings.json'),
      'utf8',
    ),
  );
  const fixtureKeys = [
    ...new Set(
      Object.values(fixture.localizedStrings ?? {}).flatMap((forLocale) => Object.keys(forLocale)),
    ),
  ];

  it('has keys to check', () => {
    expect(fixtureKeys.length).toBeGreaterThan(0);
  });

  it('names no key that is absent from every English shipping source', () => {
    expect(fixtureKeys.filter((key) => !shippingKeys.has(key))).toEqual([]);
  });
});
