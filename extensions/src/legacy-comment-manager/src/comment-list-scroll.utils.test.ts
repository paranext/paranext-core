import { describe, expect, it } from 'vitest';
import {
  findScrollTarget,
  ScrollRankableThread,
  shouldArmSyncScroll,
  toNavigationRecord,
} from './comment-list-scroll.utils';

function thread(id: string, verseRef: string): ScrollRankableThread {
  return { id, verseRef };
}

const MRK_11_13 = { book: 'MRK', chapterNum: 11, verseNum: 13 };

describe('findScrollTarget', () => {
  it('returns the thread at the current verse when one exists', () => {
    const threads = [thread('a', 'MRK 11:1'), thread('b', 'MRK 11:13'), thread('c', 'MRK 11:20')];
    expect(findScrollTarget(threads, MRK_11_13)).toEqual({ type: 'thread', threadId: 'b' });
  });

  it('returns the next thread in the chapter when the current verse has none', () => {
    const threads = [thread('a', 'MRK 11:1'), thread('c', 'MRK 11:20')];
    expect(findScrollTarget(threads, MRK_11_13)).toEqual({ type: 'thread', threadId: 'c' });
  });

  it('skips to a later book when nothing at/after the reference exists in this book', () => {
    const threads = [thread('a', 'MRK 11:1'), thread('d', 'LUK 2:1')];
    expect(findScrollTarget(threads, MRK_11_13)).toEqual({ type: 'thread', threadId: 'd' });
  });

  it('does not depend on the input order of threads', () => {
    const threads = [thread('d', 'LUK 2:1'), thread('c', 'MRK 11:20'), thread('a', 'MRK 11:1')];
    expect(findScrollTarget(threads, MRK_11_13)).toEqual({ type: 'thread', threadId: 'c' });
  });

  it('returns bottom when every thread is before the current reference', () => {
    const threads = [thread('a', 'GEN 1:1'), thread('b', 'MRK 11:1')];
    expect(findScrollTarget(threads, MRK_11_13)).toEqual({ type: 'bottom' });
  });

  it('returns undefined for an empty list', () => {
    expect(findScrollTarget([], MRK_11_13)).toBeUndefined();
  });

  it('skips threads whose verseRef cannot be parsed', () => {
    const threads = [thread('junk', 'not a reference'), thread('c', 'MRK 11:20')];
    expect(findScrollTarget(threads, MRK_11_13)).toEqual({ type: 'thread', threadId: 'c' });
  });

  it('returns undefined when no thread has a parseable verseRef', () => {
    const threads = [thread('junk1', ''), thread('junk2', 'not a reference')];
    expect(findScrollTarget(threads, MRK_11_13)).toBeUndefined();
  });

  it('resolves same-verse ties to the first thread in list order', () => {
    const threads = [thread('first', 'MRK 11:13'), thread('second', 'MRK 11:13')];
    expect(findScrollTarget(threads, MRK_11_13)).toEqual({ type: 'thread', threadId: 'first' });
  });

  it('ranks a verse-range reference by its start verse', () => {
    const threads = [thread('range', 'MRK 11:13-14')];
    expect(findScrollTarget(threads, MRK_11_13)).toEqual({ type: 'thread', threadId: 'range' });
  });

  it('returns undefined when the current book is not a valid book id', () => {
    const threads = [thread('a', 'MRK 11:1')];
    expect(findScrollTarget(threads, { book: 'NOPE', chapterNum: 1, verseNum: 1 })).toBeUndefined();
  });
});

describe('toNavigationRecord', () => {
  it('parses a simple reference into book/chapter/verse', () => {
    expect(toNavigationRecord('MRK 11:13')).toEqual({ book: 'MRK', chapterNum: 11, verseNum: 13 });
  });

  it('records the start verse of a verse range', () => {
    expect(toNavigationRecord('MRK 11:13-14')).toEqual({
      book: 'MRK',
      chapterNum: 11,
      verseNum: 13,
    });
  });

  it('returns undefined for unparseable text', () => {
    expect(toNavigationRecord('not a reference')).toBeUndefined();
  });

  it('returns undefined for undefined input', () => {
    expect(toNavigationRecord(undefined)).toBeUndefined();
  });
});

describe('shouldArmSyncScroll', () => {
  it('arms when no self-initiated navigation is recorded', () => {
    expect(shouldArmSyncScroll(undefined, MRK_11_13)).toBe(true);
  });

  it('does not arm when the change matches the recorded self-initiated navigation', () => {
    expect(shouldArmSyncScroll({ book: 'MRK', chapterNum: 11, verseNum: 13 }, MRK_11_13)).toBe(
      false,
    );
  });

  it('arms when the change differs from the recorded navigation in any field', () => {
    expect(shouldArmSyncScroll({ book: 'MRK', chapterNum: 11, verseNum: 14 }, MRK_11_13)).toBe(
      true,
    );
    expect(shouldArmSyncScroll({ book: 'MRK', chapterNum: 12, verseNum: 13 }, MRK_11_13)).toBe(
      true,
    );
    expect(shouldArmSyncScroll({ book: 'LUK', chapterNum: 11, verseNum: 13 }, MRK_11_13)).toBe(
      true,
    );
  });
});
