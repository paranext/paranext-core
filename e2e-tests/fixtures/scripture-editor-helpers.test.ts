// @vitest-environment node
/**
 * `topMatchReferencePattern`: the pattern `navigateToolbarBcv` matches against the top-match row's
 * reference span (the book id is a separate span, so it never appears in the text tested here).
 */
import { describe, expect, it } from 'vitest';
import { topMatchReferencePattern } from './scripture-editor-helpers';

describe('topMatchReferencePattern', () => {
  it('matches the reference span of a book whose name starts with a digit', () => {
    expect(topMatchReferencePattern('1 Samuel 17:1').test('1 Samuel 17:1')).toBe(true);
    expect(topMatchReferencePattern('2 Thessalonians 2:12').test('2 Thessalonians 2:12')).toBe(
      true,
    );
  });

  it('matches an unnumbered book', () => {
    expect(topMatchReferencePattern('Genesis 10:1').test('Genesis 10:1')).toBe(true);
  });

  it('is case-insensitive', () => {
    expect(topMatchReferencePattern('genesis 10:1').test('Genesis 10:1')).toBe(true);
  });

  it('rejects a longer number than the one typed', () => {
    expect(topMatchReferencePattern('Mark 4').test('Mark 40:1')).toBe(false);
    expect(topMatchReferencePattern('Mark 4:1').test('Mark 4:10')).toBe(false);
    expect(topMatchReferencePattern('1 Samuel 17:1').test('1 Samuel 17:11')).toBe(false);
  });

  it('accepts a chapter-only reference that the control completes with a verse', () => {
    expect(topMatchReferencePattern('Mark 4').test('Mark 4:1')).toBe(true);
  });

  it('does not match a different book that merely contains the reference', () => {
    expect(topMatchReferencePattern('Samuel 17:1').test('1 Samuel 17:1')).toBe(false);
  });

  it('treats regex metacharacters in the reference literally', () => {
    expect(topMatchReferencePattern('Song of Songs 1.1').test('Song of Songs 1x1')).toBe(false);
  });
});
