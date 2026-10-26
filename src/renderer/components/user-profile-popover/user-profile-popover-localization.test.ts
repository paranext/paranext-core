import { describe, expect, it } from 'vitest';
import type { LocalizeKey } from 'platform-bible-utils';
import {
  readShippedLocale,
  readShippedLocalizationMetadata,
} from '@node/utils/locale-assets.test-utils';

const english = readShippedLocale('en');
const spanish = readShippedLocale('es');
const metadata = readShippedLocalizationMetadata();

const AGREED_ENGLISH_TEXT: [LocalizeKey, string][] = [
  [
    '%userProfile_interfaceMode_simple_description_2%',
    'Streamlined interface for basic exegesis, drafting and AI checks.',
  ],
  [
    '%userProfile_interfaceMode_power_description_2%',
    'Configurable interface with panels and tools — use alongside Paratext 9.',
  ],
  ['%userProfile_interfaceMode_power_labelWithPreview%', '{label} [preview]'],
];

// The Simple / Power switcher's wording was agreed with product, so the English text is pinned
// exactly. en and es are the two maintained languages and nothing in the build enforces parity, so
// a missing or echoed Spanish value would show English (or a raw `%key%`) to Spanish users.
describe('interface mode switcher strings', () => {
  it.each(AGREED_ENGLISH_TEXT)(
    '%s has the agreed English text and its own Spanish text',
    (key, englishText) => {
      expect(english[key]).toBe(englishText);
      expect(spanish[key]).toEqual(expect.stringMatching(/\S/));
      expect(spanish[key]).not.toBe(english[key]);
    },
  );

  // The Power label is a format string so each language can place the preview marker and the mode
  // name in its own order; a translation that drops the placeholder would lose the mode name.
  it.each([
    ['English', english],
    ['Spanish', spanish],
  ])('the %s Power label keeps the {label} placeholder', (_, strings) => {
    expect(strings['%userProfile_interfaceMode_power_labelWithPreview%']).toMatch(/\{label\}/);
  });

  // A language that has translated a retired description but not its replacement keeps showing
  // its own translation instead of falling back to English.
  it.each([
    [
      '%userProfile_interfaceMode_simple_description_2%',
      '%userProfile_interfaceMode_simple_description%',
    ],
    [
      '%userProfile_interfaceMode_power_description_2%',
      '%userProfile_interfaceMode_power_description%',
    ],
  ])('%s falls back to the description it replaces', (newKey, retiredKey) => {
    expect(metadata[newKey]?.fallbackKey).toBe(retiredKey);
  });
});
