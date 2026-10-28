import { describe, expect, test } from 'vitest';
import { createCrashedViewLocalizer } from './crashed-view.util';

const RELOAD_KEY = '%webViewCrashed_reload%' as const;
const ENGLISH = { [RELOAD_KEY]: 'Reload' } as const;

describe('createCrashedViewLocalizer', () => {
  const localize = createCrashedViewLocalizer(ENGLISH);

  test('uses the localized string when it resolved', () => {
    expect(localize({ [RELOAD_KEY]: 'Recargar' }, RELOAD_KEY)).toBe('Recargar');
  });

  test('falls back to English when the value is the raw key', () => {
    expect(localize({ [RELOAD_KEY]: RELOAD_KEY }, RELOAD_KEY)).toBe('Reload');
  });

  test('falls back to English when the value is some other raw key', () => {
    // An exact `value === key` comparison passes this through and renders `%…%` at the user.
    expect(localize({ [RELOAD_KEY]: '%a_different_key%' }, RELOAD_KEY)).toBe('Reload');
  });

  test('falls back to English when the value is whitespace only', () => {
    expect(localize({ [RELOAD_KEY]: '   ' }, RELOAD_KEY)).toBe('Reload');
  });

  test('falls back to English when the key is absent', () => {
    expect(localize({}, RELOAD_KEY)).toBe('Reload');
  });
});
