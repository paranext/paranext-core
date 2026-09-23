import { readFileSync } from 'fs';
import path from 'path';
import { describe, expect, it } from 'vitest';
import { COPYRIGHT_NOTICE_STRING_KEYS } from './copyright-notice.const';

type LocalizedStringsFile = { localizedStrings: Record<string, Record<string, string>> };

// The notice strings live in platform-scripture, next to the setting they describe
function readPlatformScriptureStrings(): LocalizedStringsFile {
  const stringsFilePath = path.resolve(
    __dirname,
    '../../../platform-scripture/contributions/localizedStrings.json',
  );
  // JSON.parse returns `any`, which assigns to the known shape without a type assertion
  const stringsFile: LocalizedStringsFile = JSON.parse(readFileSync(stringsFilePath, 'utf-8'));
  return stringsFile;
}

const { localizedStrings } = readPlatformScriptureStrings();
const placeholdersOf = (text: string) => (text.match(/\{\w+\}/g) ?? []).sort();

// The licence notice is a legal statement, so every language platform-scripture ships gets its own
// translation rather than silently falling back to English
describe('copyright notice strings', () => {
  Object.keys(localizedStrings).forEach((locale) => {
    COPYRIGHT_NOTICE_STRING_KEYS.forEach((key) => {
      it(`${locale} has ${key} with the same placeholders as English`, () => {
        const text = localizedStrings[locale][key];

        expect(typeof text).toBe('string');
        expect(placeholdersOf(text)).toEqual(placeholdersOf(localizedStrings.en[key]));
      });
    });
  });
});
