import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { INTERNET_BLOCKED_MESSAGE_KEYS } from './internet-block-notification.utils';

/*
 * Component tests substitute their own sentinels for these keys, so they pass whether or not the
 * real strings exist. Without this, a message missing from a locale ships silently and the user
 * sees the English fallback.
 */

// Resolved from this file rather than `process.cwd()`, so it does not depend on where vitest ran.
const LOCALIZATION_DIR = resolve(__dirname, '../../../../assets/localization');

function readStrings(fileName: string): { [key: string]: unknown } {
  return JSON.parse(readFileSync(resolve(LOCALIZATION_DIR, fileName), 'utf8'));
}

describe('internet-block messages', () => {
  // en and es are the locales under ongoing translation; the rest are book names and wizard
  // strings (see .claude/rules/localization-locale-files.md).
  it.each(['en.json', 'es.json'])('all have a translation in %s', (fileName) => {
    const strings = readStrings(fileName);
    const missing = INTERNET_BLOCKED_MESSAGE_KEYS.filter((key) => !strings[key]);
    expect(missing).toEqual([]);
  });
});
