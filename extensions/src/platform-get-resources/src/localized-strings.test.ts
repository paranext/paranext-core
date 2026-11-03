import { readFileSync } from 'fs';
import path from 'path';
import { describe, expect, it } from 'vitest';

type LocalizedStringsFile = {
  localizedStrings: Record<string, Record<string, string>>;
};

// JSON.parse returns `any`, which assigns to the known shape of the contribution file without a
// type assertion
const stringsFile: LocalizedStringsFile = JSON.parse(
  readFileSync(path.resolve(__dirname, '../contributions/localizedStrings.json'), 'utf-8'),
);
const { en, es } = stringsFile.localizedStrings;

/**
 * Nothing in the build enforces en/es parity: a key present in `en` and missing from `es` fails no
 * other check and shows English to a Spanish-interface user.
 */
describe('platform-get-resources localized strings', () => {
  it('has every English key in Spanish', () => {
    expect(Object.keys(en).filter((key) => !(key in es))).toEqual([]);
  });

  it('has no Spanish key without an English one', () => {
    expect(Object.keys(es).filter((key) => !(key in en))).toEqual([]);
  });

  it('has no empty Spanish string', () => {
    expect(Object.keys(es).filter((key) => !es[key].trim())).toEqual([]);
  });
});
