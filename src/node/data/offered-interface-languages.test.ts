import { describe, expect, it } from 'vitest';
import { computeSetupDialogLanguages } from '@extension-host/services/setup-dialog-languages.util';
import { getShippedLocaleTags, readShippedLocale } from '@node/utils/locale-assets.test-helper';
import {
  getOfferedLanguageDefaults,
  OFFERED_INTERFACE_LANGUAGES,
} from '@shared/data/interface-languages.data';

// Checks the offered-language list against the locale files that actually ship. It has no paired
// module: its subject is the list and the assets together. It lives under src/node/ because it
// reads the filesystem.
//
// Matching against the list is exact and case-sensitive, so a tag that does not match a locale file
// name (`zh-Hans` for `zh-hans.json`) would silently offer nothing. And a language that falls below
// the setup-dialog threshold drops out of the first-run language step and the OS-locale default
// without any other test noticing.
describe('offered interface languages', () => {
  it.each(OFFERED_INTERFACE_LANGUAGES)('"%s" has a shipped locale file', (tag) => {
    expect(getShippedLocaleTags()).toContain(tag);
  });

  it('all clear the setup-dialog translation threshold', () => {
    const qualifying = computeSetupDialogLanguages(
      readShippedLocale('en'),
      (tag) => readShippedLocale(tag),
      getOfferedLanguageDefaults(),
    );
    expect(Object.keys(qualifying)).toEqual([...OFFERED_INTERFACE_LANGUAGES]);
  });
});
