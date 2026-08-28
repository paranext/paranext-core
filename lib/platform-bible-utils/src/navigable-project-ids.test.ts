import { describe, expect, test } from 'vitest';
import {
  isNavigableProjectIds,
  NAVIGABLE_PROJECT_IDS_WEB_VIEW_STATE_KEY,
} from './navigable-project-ids';

describe('NAVIGABLE_PROJECT_IDS_WEB_VIEW_STATE_KEY', () => {
  test('is a stable key string', () => {
    expect(NAVIGABLE_PROJECT_IDS_WEB_VIEW_STATE_KEY).toBe('navigableProjectIds');
  });
});

describe('isNavigableProjectIds', () => {
  test('accepts an array of strings', () => {
    expect(isNavigableProjectIds(['projectA', 'projectB'])).toBe(true);
  });

  test('accepts an empty array', () => {
    expect(isNavigableProjectIds([])).toBe(true);
  });

  test.each([
    ['undefined', undefined],
    ['a plain string', 'projectA'],
    ['an array of numbers', [1, 2]],
    ['a mixed array', ['projectA', 3]],
    ['an object', { projectA: true }],
    // Web view state is JSON, so null is a real value the guard must reject.
    // eslint-disable-next-line no-null/no-null
    ['null', null],
  ])('rejects %s', (_label, value) => {
    expect(isNavigableProjectIds(value)).toBe(false);
  });
});
