import { describe, expect, test } from 'vitest';
import { resolveReferenceHistoryDirection } from './reference-history-direction.util';

describe('resolveReferenceHistoryDirection', () => {
  test('LTR: left is back, right is forward', () => {
    expect(resolveReferenceHistoryDirection('left', 'ltr')).toBe('back');
    expect(resolveReferenceHistoryDirection('right', 'ltr')).toBe('forward');
  });

  test('RTL swaps the pair (physical-direction preserving)', () => {
    expect(resolveReferenceHistoryDirection('left', 'rtl')).toBe('forward');
    expect(resolveReferenceHistoryDirection('right', 'rtl')).toBe('back');
  });
});
