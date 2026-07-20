import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, test } from 'vitest';
import { languageDetails } from './language-details.data';

// Real shipped locale files drive this test so a NEW locale added without a curated autonym fails
// the build instead of silently showing its raw code (e.g. "zh-hans") in the picker.
// Note: using resolve(__dirname, ...) instead of fileURLToPath(new URL(..., import.meta.url))
// because this test runs under jsdom where import.meta.url does not have a file: scheme.
const localizationDir = resolve(__dirname, '../../../assets/localization');
const localeTags = readdirSync(localizationDir)
  .filter((f) => f.endsWith('.json') && f !== 'metadata.json')
  .map((f) => f.replace(/\.json$/, ''));

describe('languageDetails covers every shipped locale', () => {
  test.each(localeTags)('locale "%s" has a defined, non-code autonym', (tag) => {
    const info = languageDetails[tag];
    expect(info).toBeDefined();
    expect(info?.autonym).not.toBe(tag);
  });

  // Non-English locales need an English name so users who can't read the script can still search.
  const nonEnglishTags = localeTags.filter((tag) => tag !== 'en');
  test.each(nonEnglishTags)('non-English locale "%s" has an English name for search', (tag) => {
    expect(languageDetails[tag]?.uiNames?.en).toBeTruthy();
  });
});
