import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { LanguageStrings, LocalizedStringDataContribution } from 'platform-bible-utils';

// Test-only helpers for reading the localization sources the running app actually loads: the
// platform shell's own assets in `assets/localization/` (locale files plus the `metadata.json`
// sidecar) and the `localizedStrings` contributions declared by bundled extensions in
// `extensions/src/`. Lives under src/node/ rather than src/shared/ because it touches the
// filesystem, so it is Node-process-only code. Named `.test-helper.ts` (not `.test.ts`) so vitest
// does not collect it as a suite.
//
// Sibling hand-rolled readers of the same contribution files, which these helpers deliberately do
// not replace because each asserts on one extension's own strings:
// extensions/src/platform-scripture-editor/src/localized-strings.test.ts and
// extensions/src/legacy-comment-manager/src/localized-strings.test.ts.
//
// Note: using resolve(__dirname, ...) instead of fileURLToPath(new URL(..., import.meta.url))
// because the tests that consume this run under jsdom, where import.meta.url does not have a file:
// scheme.
const LOCALIZATION_DIR = resolve(__dirname, '../../../assets/localization');
const EXTENSIONS_DIR = resolve(__dirname, '../../../extensions/src');

/**
 * Extensions the extension host loads only when "noisy dev mode" is enabled, so their contributions
 * never reach a production user. Mirrors `TEST_EXTENSION_NAMES` in
 * `src/extension-host/services/extension.service.ts`, matched on the manifest `name` field. Keys
 * that exist only in one of these must NOT count as shipped.
 */
const DEV_ONLY_EXTENSION_NAMES: readonly string[] = [
  'c-sharp-provider-test',
  'evil',
  'helloSomeone',
  'helloRock3',
  'quickVerse',
];

/**
 * Reads and parses one JSON file, attributing a parse failure to the file that caused it. Without
 * this, a malformed asset surfaces as a bare `SyntaxError` naming no path, at the point a consuming
 * test file is collected.
 *
 * Generic in the parsed shape so a caller states the shape it expects once, in the variable's own
 * annotation, rather than asserting one — nothing here validates the file against `T`, so keep the
 * callers' shapes as loose as what they actually read.
 */
function readJsonFile<T>(path: string): T {
  const contents = readFileSync(path, 'utf8');
  try {
    return JSON.parse(contents);
  } catch (error) {
    throw new Error(`Could not parse JSON at ${path}: ${error}`);
  }
}

/**
 * Reads the locale tags that actually ship, from the real `assets/localization/` directory rather
 * than a hardcoded list, so a NEW locale added to the repo is picked up by consuming tests
 * automatically.
 *
 * @returns Shipped locale tags (e.g. `['en', 'es', 'fr']`), excluding the `metadata.json` sidecar.
 */
export function getShippedLocaleTags(): string[] {
  return readdirSync(LOCALIZATION_DIR)
    .filter((fileName) => fileName.endsWith('.json') && fileName !== 'metadata.json')
    .map((fileName) => fileName.replace(/\.json$/, ''));
}

/**
 * Reads one shipped locale asset.
 *
 * @param locale Locale tag whose asset to read (e.g. `'en'`).
 * @returns The locale's localization key/value pairs.
 */
export function readShippedLocale(locale: string): LanguageStrings {
  return readJsonFile<LanguageStrings>(resolve(LOCALIZATION_DIR, `${locale}.json`));
}

/**
 * Reads the keys the shell's `metadata.json` sidecar redirects elsewhere via `fallbackKey`. The
 * runtime resolves one level of `fallbackKey` before falling back to English, so a key served
 * entirely through a redirect localizes correctly while holding no value of its own in any locale
 * file — the documented way to retire a string without deleting its key.
 *
 * @returns Every key that carries a `fallbackKey` redirect.
 */
export function getFallbackRedirectedKeys(): Set<string> {
  const metadata = readJsonFile<Record<string, { fallbackKey?: string } | undefined>>(
    resolve(LOCALIZATION_DIR, 'metadata.json'),
  );
  const keys = new Set<string>();
  Object.entries(metadata).forEach(([key, entry]) => {
    if (entry?.fallbackKey) keys.add(key);
  });
  return keys;
}

/**
 * Reads the localization keys contributed by the bundled extensions a production user actually
 * loads. Extension contributions are a shipping localization source alongside the platform shell's
 * own locale assets, so a key defined only here is still localized in the real app.
 *
 * Each contribution's path comes from its manifest's `localizedStrings` field, matching what
 * `contribution.service.ts` loads at runtime, rather than assuming the conventional path — a
 * manifest pointing elsewhere would otherwise make this miss real shipping keys, and an orphaned
 * file no manifest references would count keys the app never loads.
 *
 * @param locale Locale tag whose contributed keys to read (e.g. `'en'`).
 * @returns Every key contributed for that locale by a production-loaded bundled extension.
 */
export function getExtensionContributedKeys(locale: string): Set<string> {
  const keys = new Set<string>();
  readdirSync(EXTENSIONS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .forEach((entry) => {
      const manifestPath = resolve(EXTENSIONS_DIR, entry.name, 'manifest.json');
      if (!existsSync(manifestPath)) return;
      const manifest = readJsonFile<{ name?: string; localizedStrings?: string }>(manifestPath);
      // Not every extension contributes localized strings
      if (!manifest.localizedStrings) return;
      // A key reachable only in noisy dev mode renders as its raw `%key%` for everyone else
      if (manifest.name && DEV_ONLY_EXTENSION_NAMES.includes(manifest.name)) return;
      const contribution = readJsonFile<LocalizedStringDataContribution>(
        resolve(EXTENSIONS_DIR, entry.name, manifest.localizedStrings),
      );
      Object.keys(contribution.localizedStrings?.[locale] ?? {}).forEach((key) => keys.add(key));
    });
  return keys;
}
