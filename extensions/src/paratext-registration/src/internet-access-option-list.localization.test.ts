import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { INTERNET_ACCESS_OPTION_LIST_STRING_KEYS } from 'platform-bible-react/experimental';

/*
 * The component tests substitute sentinels for these keys, so they pass whether or not the real
 * strings exist, and the e2e spec that reads the shipped text runs in the `isolated` project, which
 * CI does not run. That leaves nothing to catch a key the component asks for and this extension
 * never contributes — which is how the option list would ship showing `%...%` to the user.
 */

// Resolved from this file rather than `process.cwd()`, so it does not depend on where vitest ran.
const CONTRIBUTION_PATH = resolve(__dirname, '../contributions/localizedStrings.json');

function readContributedStrings(locale: string): { [key: string]: unknown } {
  const contribution = JSON.parse(readFileSync(CONTRIBUTION_PATH, 'utf8'));
  return contribution.localizedStrings[locale];
}

describe('internet access option list strings', () => {
  // en and es are the locales this extension contributes.
  it.each(['en', 'es'])('are all contributed in %s', (locale) => {
    const strings = readContributedStrings(locale);
    const missing = INTERNET_ACCESS_OPTION_LIST_STRING_KEYS.filter((key) => !strings[key]);
    expect(missing).toEqual([]);
  });
});
