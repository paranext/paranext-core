import { readFileSync } from 'fs';
import path from 'path';
import { describe, expect, it } from 'vitest';
import { COPYRIGHT_NOTICE_STRING_KEYS } from './copyright-notice.const';

type LocalizedStringsFile = { localizedStrings: Record<string, Record<string, string>> };

function readJson(relativePath: string) {
  // JSON.parse returns `any`, which each caller assigns to the shape it knows the file has
  return JSON.parse(readFileSync(path.resolve(__dirname, relativePath), 'utf-8'));
}

// The notice strings live in platform-scripture, next to the setting they describe
const { localizedStrings }: LocalizedStringsFile = readJson(
  '../../../platform-scripture/contributions/localizedStrings.json',
);
const coreEnglishStrings: Record<string, string> = readJson(
  '../../../../../assets/localization/en.json',
);

const NOTICE_KEY_PREFIX = '%platformScripture_copyrightNotice_';
const noticeKeys = COPYRIGHT_NOTICE_STRING_KEYS.filter((key) => key.startsWith(NOTICE_KEY_PREFIX));
const coreKeys = COPYRIGHT_NOTICE_STRING_KEYS.filter((key) => !key.startsWith(NOTICE_KEY_PREFIX));

const placeholdersOf = (text: string) => (text.match(/\{\w+\}/g) ?? []).sort();

// The license notice is a legal statement, so every language platform-scripture ships gets its own
// translation rather than silently falling back to English
describe('copyright notice strings', () => {
  Object.keys(localizedStrings).forEach((locale) => {
    noticeKeys.forEach((key) => {
      it(`${locale} has ${key} with the same placeholders as English`, () => {
        const text = localizedStrings[locale][key];

        expect(typeof text).toBe('string');
        expect(placeholdersOf(text)).toEqual(placeholdersOf(localizedStrings.en[key]));
      });
    });
  });

  coreKeys.forEach((key) => {
    it(`${key} is a string the platform itself provides`, () => {
      expect(typeof coreEnglishStrings[key]).toBe('string');
    });
  });
});
