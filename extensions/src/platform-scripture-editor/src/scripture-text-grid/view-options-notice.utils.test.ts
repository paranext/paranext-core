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

  it('says nothing when the entry carries some other raw key', () => {
    // A strings bag can hand back a different key's raw text, which is no more showable than this
    // key's own. Pinned here rather than only on the shared reader, because a hand-rolled
    // `value === key` check would pass the case above and fail this one.
    expect(
      resolvePickerNotice({ [PICKER_NO_PROJECT_NOTICE_KEY]: '%a_different_key%' }, false),
    ).toBeUndefined();
  });

  it('says nothing when the entry is whitespace only', () => {
    // Renders as an empty notice rather than no notice, which is worse than staying silent.
    expect(resolvePickerNotice({ [PICKER_NO_PROJECT_NOTICE_KEY]: '   ' }, false)).toBeUndefined();
  });

  it('says nothing when the key is missing entirely', () => {
    expect(resolvePickerNotice({}, false)).toBeUndefined();
  });
});
