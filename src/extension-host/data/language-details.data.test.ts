import { describe, expect, test } from 'vitest';
import { getShippedLocaleTags } from '@node/utils/locale-assets.test-helper';
import { languageDetails } from './language-details.data';

// Real shipped locale files drive this test so a NEW locale added without a curated autonym fails
// the build instead of silently showing its raw code (e.g. "zh-hans") in the picker.
const localeTags = getShippedLocaleTags();

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
