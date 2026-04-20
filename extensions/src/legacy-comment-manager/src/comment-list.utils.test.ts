import { LegacyComment, LegacyCommentThread } from 'platform-bible-utils';
import { describe, expect, it } from 'vitest';
import { prepareCommentThreads } from './comment-list.utils';

// #region Test helpers

function makeComment(overrides: Partial<LegacyComment> & { id: string }): LegacyComment {
  return {
    contents: 'Test comment',
    date: '2024-01-01T00:00:00.0000000Z',
    deleted: false,
    hideInTextWindow: false,
    id: overrides.id,
    isRead: false,
    language: 'en',
    startPosition: 0,
    thread: 'thread-1',
    user: 'user1',
    verseRef: 'GEN 1:1',
    ...overrides,
  };
}

function makeThread(
  overrides: Partial<LegacyCommentThread> & { id: string; comments: LegacyComment[] },
): LegacyCommentThread {
  return {
    isSpellingNote: false,
    isBTNote: false,
    isConsultantNote: false,
    isRead: false,
    modifiedDate: '2024-01-01T00:00:00.0000000Z',
    status: 'Todo',
    type: '',
    verseRef: 'GEN 1:1',
    ...overrides,
  };
}

// #endregion

describe('prepareCommentThreads', () => {
  it('returns an empty array when given an empty array', () => {
    expect(prepareCommentThreads([])).toEqual([]);
  });

  it('passes through threads with no duplicates, spelling notes, BT notes, or fully-deleted threads unchanged', () => {
    const comment = makeComment({ id: 'c1' });
    const thread = makeThread({ id: 't1', comments: [comment] });

    const result = prepareCommentThreads([thread]);

    expect(result).toHaveLength(1);
    expect(result[0]).toBe(thread);
  });

  it('filters out spelling note threads', () => {
    const thread = makeThread({
      id: 't1',
      comments: [makeComment({ id: 'c1' })],
      isSpellingNote: true,
    });

    expect(prepareCommentThreads([thread])).toHaveLength(0);
  });

  it('filters out biblical terms note threads', () => {
    const thread = makeThread({
      id: 't1',
      comments: [makeComment({ id: 'c1' })],
      isBTNote: true,
    });

    expect(prepareCommentThreads([thread])).toHaveLength(0);
  });

  it('filters out threads where all comments are deleted', () => {
    const thread = makeThread({
      id: 't1',
      comments: [makeComment({ id: 'c1', deleted: true })],
    });

    expect(prepareCommentThreads([thread])).toHaveLength(0);
  });

  it('keeps threads that have at least one non-deleted comment', () => {
    const thread = makeThread({
      id: 't1',
      comments: [makeComment({ id: 'c1', deleted: true }), makeComment({ id: 'c2' })],
    });

    const result = prepareCommentThreads([thread]);

    expect(result).toHaveLength(1);
  });

  it('merges duplicate thread IDs, combining all unique comments', () => {
    const commentA = makeComment({ id: 'c1', contents: 'First comment' });
    const commentB = makeComment({ id: 'c2', contents: 'Second comment' });
    const threadA = makeThread({ id: 't1', comments: [commentA] });
    const threadB = makeThread({ id: 't1', comments: [commentB] });

    const result = prepareCommentThreads([threadA, threadB]);

    expect(result).toHaveLength(1);
    expect(result[0].comments).toHaveLength(2);
    const ids = result[0].comments.map((c) => c.id);
    expect(ids).toContain('c1');
    expect(ids).toContain('c2');
  });

  it('does not duplicate comments that appear in both copies of a duplicate thread', () => {
    const sharedComment = makeComment({ id: 'c1' });
    const uniqueComment = makeComment({ id: 'c2' });
    const threadA = makeThread({ id: 't1', comments: [sharedComment] });
    const threadB = makeThread({ id: 't1', comments: [sharedComment, uniqueComment] });

    const result = prepareCommentThreads([threadA, threadB]);

    expect(result).toHaveLength(1);
    expect(result[0].comments).toHaveLength(2);
  });

  it('uses the thread with the later modifiedDate as the metadata base when merging', () => {
    const earlier = makeThread({
      id: 't1',
      comments: [makeComment({ id: 'c1' })],
      modifiedDate: '2024-01-01T00:00:00.0000000Z',
      verseRef: 'GEN 1:1',
    });
    const later = makeThread({
      id: 't1',
      comments: [makeComment({ id: 'c2' })],
      modifiedDate: '2024-06-01T00:00:00.0000000Z',
      verseRef: 'GEN 1:2',
    });

    const result = prepareCommentThreads([earlier, later]);

    expect(result).toHaveLength(1);
    expect(result[0].verseRef).toBe('GEN 1:2');
    expect(result[0].modifiedDate).toBe('2024-06-01T00:00:00.0000000Z');
  });

  it('uses the first thread as metadata base when modifiedDates are equal', () => {
    const sameDate = '2024-01-01T00:00:00.0000000Z';
    const first = makeThread({
      id: 't1',
      comments: [makeComment({ id: 'c1' })],
      modifiedDate: sameDate,
      verseRef: 'GEN 1:1',
    });
    const second = makeThread({
      id: 't1',
      comments: [makeComment({ id: 'c2' })],
      modifiedDate: sameDate,
      verseRef: 'GEN 1:2',
    });

    const result = prepareCommentThreads([first, second]);

    expect(result).toHaveLength(1);
    expect(result[0].verseRef).toBe('GEN 1:1');
  });

  it('drops a merged thread when all of its combined comments are deleted', () => {
    const threadA = makeThread({
      id: 't1',
      comments: [makeComment({ id: 'c1', deleted: true })],
    });
    const threadB = makeThread({
      id: 't1',
      comments: [makeComment({ id: 'c2', deleted: true })],
    });

    expect(prepareCommentThreads([threadA, threadB])).toHaveLength(0);
  });

  it('filters note types before deduplication so note-type flags do not bleed into surviving threads', () => {
    // threadA is a BT note that shares an ID with threadB (a regular thread).
    // If BT notes were not filtered first, the BT note's metadata could contaminate threadB.
    const btNote = makeThread({
      id: 't1',
      comments: [makeComment({ id: 'c1' })],
      isBTNote: true,
      modifiedDate: '2024-12-01T00:00:00.0000000Z',
    });
    const regular = makeThread({
      id: 't1',
      comments: [makeComment({ id: 'c2' })],
      isBTNote: false,
      modifiedDate: '2024-01-01T00:00:00.0000000Z',
    });

    const result = prepareCommentThreads([btNote, regular]);

    expect(result).toHaveLength(1);
    expect(result[0].isBTNote).toBe(false);
    // Comment from the BT note must not appear in the surviving thread
    const ids = result[0].comments.map((c) => c.id);
    expect(ids).not.toContain('c1');
    expect(ids).toContain('c2');
  });
});
