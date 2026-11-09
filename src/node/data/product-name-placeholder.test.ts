import { describe, expect, it } from 'vitest';
import type { LocalizeKey, LocalizedStringValue } from 'platform-bible-utils';
import { isLocalizeKey } from 'platform-bible-utils';
import {
  getShippedLocaleTags,
  readShippedLocale,
  readShippedLocalizationMetadata,
} from '@node/utils/locale-assets.test-utils';

// Guards against a shipped locale re-hardcoding the literal product name where en.json uses the
// {%product_name%} placeholder — formatReplacementString only substitutes the name where the
// placeholder is present, so a hardcoded name in a translation never reflects a product rename and
// stays wrong until someone notices it by eye. PT-4957 found and fixed exactly this in es.json.

const PRODUCT_NAME_PLACEHOLDER = '{%product_name%}';

const englishStrings = readShippedLocale('en');
const englishProductName = englishStrings['%product_name%'];

// A deprecated key is retired and superseded (metadata.json names the replacement) — it is no
// longer shown to a production user, so a stale or hardcoded translation under it is not a live
// defect. Checking it anyway would mean this test and its translators never stop maintaining text
// nobody sees.
const deprecatedKeys = new Set(
  Object.entries(readShippedLocalizationMetadata())
    .filter(([, entry]) => entry?.deprecationInfo)
    .map(([key]) => key),
);

const keysExpectingPlaceholder = Object.entries(englishStrings)
  .filter((entry): entry is [LocalizeKey, LocalizedStringValue] => {
    const [key, value] = entry;
    return (
      typeof value === 'string' &&
      value.includes(PRODUCT_NAME_PLACEHOLDER) &&
      !deprecatedKeys.has(key) &&
      isLocalizeKey(key)
    );
  })
  .map(([key]) => key);

const localesToCheck = getShippedLocaleTags().filter((locale) => locale !== 'en');

describe('locale strings expecting {%product_name%}', () => {
  it('found English keys to check', () => {
    expect(englishProductName).toBeTruthy();
    expect(keysExpectingPlaceholder.length).toBeGreaterThan(0);
  });

  describe.each(localesToCheck)('%s.json', (locale) => {
    const localeStrings = readShippedLocale(locale);

    it.each(keysExpectingPlaceholder)(
      'does not hardcode the product name in place of {%%product_name%%} for %s',
      (key) => {
        const value = localeStrings[key];
        // Not translated; the runtime falls back to the English value, which already has the
        // placeholder.
        if (value === undefined) return;

        if (!value.includes(PRODUCT_NAME_PLACEHOLDER) && !value.includes(englishProductName)) {
          // Missing the placeholder without hardcoding the name outright isn't necessarily wrong —
          // the translation may just be phrased differently — but it's worth a human looking at,
          // since en.json considers the product name relevant to this string.
          // eslint-disable-next-line no-console
          console.warn(
            `${locale}.json "${key}" does not use ${PRODUCT_NAME_PLACEHOLDER}, while en.json does. ` +
              `Verify the translation is current: ${JSON.stringify(value)}`,
          );
        }

        expect(value).not.toContain(englishProductName);
      },
    );
  });
});
