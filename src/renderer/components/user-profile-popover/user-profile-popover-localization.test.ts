import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

// Resolved from this file's location rather than `process.cwd()` so the test is not sensitive to
// the directory `vitest` happens to be invoked from.
const LOCALIZATION_DIR = resolve(__dirname, '../../../../assets/localization');

// JSON.parse returns `any`, which assigns to these known file shapes without a type assertion
function readJson(fileName: string) {
  return JSON.parse(readFileSync(resolve(LOCALIZATION_DIR, fileName), 'utf8'));
}
const english: { [key: string]: unknown } = readJson('en.json');
const spanish: { [key: string]: unknown } = readJson('es.json');
const metadata: { [key: string]: { deprecationInfo?: { date: string; message: string } } } =
  readJson('metadata.json');

// The Simple / Power switcher's wording was agreed with product, so the English text is pinned
// exactly. en and es are the two maintained languages and nothing in the build enforces parity, so
// a missing or echoed Spanish value would show English (or a raw `%key%`) to Spanish users.
describe('interface mode switcher strings', () => {
  it.each([
    [
      '%userProfile_interfaceMode_simple_description_2%',
      'Streamlined interface for basic exegesis, drafting and AI checks.',
    ],
    [
      '%userProfile_interfaceMode_power_description_2%',
      'Configurable interface with panels and tools — use alongside Paratext 9.',
    ],
    ['%userProfile_interfaceMode_power_preview%', '[preview]'],
  ])('%s has the agreed English text and its own Spanish text', (key, englishText) => {
    expect(english[key]).toBe(englishText);
    expect(spanish[key]).toEqual(expect.stringMatching(/\S/));
    expect(spanish[key]).not.toBe(english[key]);
  });

  // The descriptions changed meaning, so new keys carry the wording and the shipped ones are retired
  // with their values intact (Localization-Guide.md, "Existing Strings Are Immutable").
  it.each([
    '%userProfile_interfaceMode_simple_description%',
    '%userProfile_interfaceMode_power_description%',
  ])('%s is retired with a deprecation notice and its shipped value', (key) => {
    expect(metadata[key]?.deprecationInfo?.message).toMatch(/\S/);
    expect(english[key]).toEqual(expect.stringMatching(/\S/));
    expect(spanish[key]).toEqual(expect.stringMatching(/\S/));
  });
});
