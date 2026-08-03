import { describe, expect, it } from 'vitest';
import { COMMENT_LIST_ELEMENT_ID, getCommentThreadElementId } from './comment-list.types';

describe('COMMENT_LIST_ELEMENT_ID', () => {
  it('is the comment list container DOM id', () => {
    expect(COMMENT_LIST_ELEMENT_ID).toBe('comment-list');
  });
});

describe('getCommentThreadElementId', () => {
  it('returns the thread id unchanged', () => {
    expect(getCommentThreadElementId('c5bfd1ac')).toBe('c5bfd1ac');
  });

  it('returns different ids for different thread ids', () => {
    expect(getCommentThreadElementId('a')).not.toBe(getCommentThreadElementId('b'));
  });
});
