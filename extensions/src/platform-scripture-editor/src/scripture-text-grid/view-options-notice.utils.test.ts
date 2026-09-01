import { describe, expect, it } from 'vitest';
import { PICKER_NO_PROJECT_NOTICE_KEY, resolvePickerNotice } from './view-options-notice.utils';

const NOTICE = 'No project is selected, so a resource you choose here will be downloaded.';
const STRINGS = { [PICKER_NO_PROJECT_NOTICE_KEY]: NOTICE };

describe('resolvePickerNotice', () => {
  it('says nothing when a text collection is bound', () => {
    expect(resolvePickerNotice(STRINGS, true)).toBeUndefined();
  });

  it('explains the limitation when no text collection is bound', () => {
    expect(resolvePickerNotice(STRINGS, false)).toBe(NOTICE);
  });

  it('says nothing rather than a raw key while the string is still unresolved', () => {
    // `useLocalizedStrings` seeds its result with the key itself until the real value arrives.
    expect(
      resolvePickerNotice({ [PICKER_NO_PROJECT_NOTICE_KEY]: PICKER_NO_PROJECT_NOTICE_KEY }, false),
    ).toBeUndefined();
  });

  it('says nothing when the key is missing entirely', () => {
    expect(resolvePickerNotice({}, false)).toBeUndefined();
  });
});
