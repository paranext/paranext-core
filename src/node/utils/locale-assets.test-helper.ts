import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

// Test-only helpers for reading the real shipped locale assets in assets/localization/. Lives under
// src/node/ rather than src/shared/ because it touches the filesystem, so it is Node-process-only
// code. Named `.test-helper.ts` (not `.test.ts`) so vitest does not collect it as a suite.
//
// Note: using resolve(__dirname, ...) instead of fileURLToPath(new URL(..., import.meta.url))
// because the tests that consume this run under jsdom, where import.meta.url does not have a file:
// scheme.
const LOCALIZATION_DIR = resolve(__dirname, '../../../assets/localization');
const EXTENSIONS_DIR = resolve(__dirname, '../../../extensions/src');

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
export function readShippedLocale(locale: string): Record<string, string> {
  // JSON.parse returns `any`, which assigns to the known flat key/value shape of a locale asset
  // without a type assertion
  const strings: Record<string, string> = JSON.parse(
    readFileSync(resolve(LOCALIZATION_DIR, `${locale}.json`), 'utf8'),
  );
  return strings;
}

/**
 * Reads every localization key contributed by a bundled extension. Extension contributions are a
 * shipping localization source alongside the platform shell's own locale assets, so a key defined
 * only here is still localized in the real app.
 *
 * Discovered from the real `extensions/src/` tree rather than a hardcoded list, so a NEW extension
 * is picked up by consuming tests automatically.
 *
 * @returns Every key contributed by any bundled extension, in any locale.
 */
export function getExtensionContributedKeys(): Set<string> {
  const keys = new Set<string>();
  readdirSync(EXTENSIONS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .forEach((entry) => {
      const contributionPath = resolve(
        EXTENSIONS_DIR,
        entry.name,
        'contributions/localizedStrings.json',
      );
      // Not every extension contributes localized strings
      if (!existsSync(contributionPath)) return;
      // JSON.parse returns `any`, which assigns to the known shape of a localizedStrings
      // contribution without a type assertion
      const contribution: { localizedStrings?: Record<string, Record<string, string>> } =
        JSON.parse(readFileSync(contributionPath, 'utf8'));
      Object.values(contribution.localizedStrings ?? {}).forEach((stringsForLocale) => {
        Object.keys(stringsForLocale).forEach((key) => keys.add(key));
      });
    });
  return keys;
}
